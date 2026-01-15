import { useEffect, useMemo, useState } from "react";
import Section from "../section";
import { homeContent } from "../../content/home";
import "./projects.css";

type Repo = {
  name: string;
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

function timeAgo(iso: string) {
  const d = new Date(iso).getTime();
  const diff = Date.now() - d;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

export default function ProjectsSection() {
  const { projects } = homeContent;

  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const res = await fetch("/api/github", { headers: { Accept: "application/json" } });

        // If you see HTML here in local dev, run: npx vercel dev
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json")) {
          const text = await res.text();
          throw new Error(
            `API did not return JSON. (content-type: ${ct})\n` +
              `Tip: Vite doesn't run /api routes. Use: npx vercel dev\n` +
              `Preview: ${text.slice(0, 80)}`
          );
        }

        if (!res.ok) throw new Error(await res.text());

        const data = (await res.json()) as Repo[];
        if (!alive) return;

        setRepos(data);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message ?? "Failed to load GitHub projects.");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const langSummary = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of repos) {
      const key = r.language ?? r.languagesTop?.[0]?.name ?? "";
      if (!key) continue;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4);
  }, [repos]);

  const totalCommits30d = useMemo(() => {
    return repos.reduce((sum, r) => sum + (r.recentCommits30d || 0), 0);
  }, [repos]);

  return (
    <Section id="projects" variant="panel">
      <div className="projects-wrap">
        {/* Distinct “main event” header (NOT a copy of Links) */}
        <div className="projects-hero">
          <div>
            <div className="projects-kicker">Work</div>
            <h2 className="projects-title">{projects.title}</h2>
            <p className="projects-subtitle">
              Live GitHub overview — languages, recent activity, and quick context per repo.
            </p>
            <div className="projects-rule" />
          </div>

          <div className="projects-metrics">
            <div className="projects-metric">
              <div className="projects-metric-label">Repos shown</div>
              <div className="projects-metric-value">{repos.length || "—"}</div>
            </div>

            <div className="projects-metric">
              <div className="projects-metric-label">Commits (30d)</div>
              <div className="projects-metric-value">{repos.length ? totalCommits30d : "—"}</div>
            </div>

            <div className="projects-chips">
              {langSummary.map(([lang, n]) => (
                <span key={lang} className="projects-chip">
                  {lang} <span className="projects-chip-muted">· {n}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* states */}
        {loading && <div className="projects-state">Loading GitHub projects…</div>}

        {!loading && err && (
          <div className="projects-state">
            Couldn’t load GitHub data.
            <div className="projects-state-muted">
              {err}
              <div style={{ marginTop: 8 }}>
                Local dev fix: run <code>npx vercel dev</code> instead of <code>npm run dev</code>.
              </div>
            </div>
          </div>
        )}

        {/* grid (NO fallback projects) */}
        {!loading && !err && (
          <div className="projects-grid">
            {repos.map((r) => (
              <a
                key={r.name}
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
                className="project-card"
              >
                <div className="project-top">
                  <div>
                    <div className="project-name">{r.name}</div>
                    <p className="project-desc">{r.description ?? "No description yet."}</p>
                  </div>

                  <div className="project-updated">Updated {timeAgo(r.updated_at)}</div>
                </div>

                <div className="project-stats">
                  {r.language && (
                    <span className="project-lang">
                      <span className="project-dot" />
                      {r.language}
                    </span>
                  )}

                  <span className="project-sep">•</span>

                  <span>
                    {r.recentCommits30d}
                    <span className="project-muted"> commits (30d)</span>
                  </span>

                  <span className="project-sep">•</span>

                  <span>
                    {r.stargazers_count}
                    <span className="project-muted"> stars</span>
                  </span>

                  <span className="project-sep">•</span>

                  <span>
                    {r.forks_count}
                    <span className="project-muted"> forks</span>
                  </span>
                </div>

                {r.languagesTop?.length > 0 && (
                  <div className="project-langbar">
                    <div className="project-bar">
                      {r.languagesTop.map((l) => (
                      <div
                        key={l.name}
                        className="project-bar-seg"
                        style={{
                          width: `${Math.max(l.percent || 0, 2)}%`,
                          ["--p" as any]: l.percent ?? 0,
                        }}
                        title={`${l.name}${l.percent ? ` · ${l.percent}%` : ""}`}
                      />
                      ))}
                    </div>

                    <div className="project-tags">
                      {r.languagesTop.map((l) => (
                        <span key={l.name} className="project-tag">
                          {l.name}
                          {l.percent ? (
                            <span className="project-tag-muted"> · {l.percent}%</span>
                          ) : null}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {r.homepage && (
                  <div className="project-live">
                    Live: <span className="project-live-url">{r.homepage}</span>
                  </div>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
