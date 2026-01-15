import type { VercelRequest, VercelResponse } from "@vercel/node";

type RepoOut = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string | null;
  languagesTop: { name: string; percent: number }[];
  recentCommits30d: number;
};

const GH_API = "https://api.github.com";

// simple cache per serverless instance
let cache: { ts: number; data: RepoOut[] } | null = null;
const CACHE_MS = 1000 * 60 * 20; // 20 min

function ghHeaders(token?: string) {
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "shaun-portfolio",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function splitCsv(v?: string) {
  return (v || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function uniqBy<T>(arr: T[], key: (x: T) => string) {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of arr) {
    const k = key(item);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(item);
  }
  return out;
}

async function repoToOut(r: any, token?: string): Promise<RepoOut> {
  // languages
  const langResp = await fetch(r.languages_url, { headers: ghHeaders(token) });
  const langs = langResp.ok ? ((await langResp.json()) as Record<string, number>) : {};
  const total = Object.values(langs).reduce((a, b) => a + b, 0) || 1;

  const languagesTop = Object.entries(langs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, bytes]) => ({
      name,
      percent: Math.round((bytes / total) * 100),
    }));

  // recent commits (last 30d)
  const since = new Date();
  since.setDate(since.getDate() - 30);
  const sinceISO = since.toISOString();

  const commitsResp = await fetch(
    `${GH_API}/repos/${r.full_name}/commits?per_page=100&since=${encodeURIComponent(sinceISO)}`,
    { headers: ghHeaders(token) }
  );

  let recentCommits30d = 0;
  if (commitsResp.ok) {
    const commits = (await commitsResp.json()) as any[];
    recentCommits30d = Array.isArray(commits) ? commits.length : 0;
  }

  return {
    name: r.name,
    full_name: r.full_name,
    html_url: r.html_url,
    description: r.description,
    homepage: r.homepage,
    stargazers_count: r.stargazers_count,
    forks_count: r.forks_count,
    updated_at: r.updated_at,
    language: r.language,
    languagesTop,
    recentCommits30d,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;

    const featuredNames = splitCsv(process.env.GITHUB_FEATURED_REPOS); // repo names only
    const externalRepos = splitCsv(process.env.GITHUB_EXTERNAL_REPOS); // owner/repo

    if (!username) {
      return res.status(500).json({ error: "Missing GITHUB_USERNAME env var." });
    }

    // CDN caching hint (Vercel)
    res.setHeader("Cache-Control", "s-maxage=1200, stale-while-revalidate=3600");

    if (cache && Date.now() - cache.ts < CACHE_MS) {
      return res.status(200).json(cache.data);
    }

    // 1) fetch your repos
    const reposResp = await fetch(
      `${GH_API}/users/${username}/repos?per_page=100&sort=updated`,
      { headers: ghHeaders(token) }
    );

    if (!reposResp.ok) {
      const txt = await reposResp.text();
      return res.status(reposResp.status).json({ error: txt });
    }

    const repos = (await reposResp.json()) as any[];

    // only your owned repos (not forks)
    let owned = repos.filter((r) => !r.fork);

    // if featured list exists, keep only those names
    if (featuredNames.length) {
      owned = owned.filter((r) => featuredNames.includes(r.name));
    }

    // 2) fetch external repos (owner/repo)
    const externalFetched: any[] = [];
    for (const full of externalRepos) {
      // expects owner/repo
      if (!full.includes("/")) continue;

      const resp = await fetch(`${GH_API}/repos/${full}`, { headers: ghHeaders(token) });
      if (!resp.ok) continue;

      const repo = await resp.json();
      externalFetched.push(repo);
    }

    // 3) merge + cap
    const merged = uniqBy([...owned, ...externalFetched], (r) => r.full_name).slice(0, 12);

    // 4) enrich
    const out: RepoOut[] = [];
    for (const r of merged) {
      out.push(await repoToOut(r, token));
    }

    cache = { ts: Date.now(), data: out };
    return res.status(200).json(out);
  } catch (e: any) {
    return res.status(500).json({ error: e?.message ?? "Unknown error" });
  }
}
