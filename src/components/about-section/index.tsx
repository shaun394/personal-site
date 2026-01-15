import Section from "../section";
import { homeContent } from "../../content/home";
import { site } from "../../content/site";
import "./about.css";

export default function AboutSection() {
  const a = homeContent.about;

  return (
    <Section id="about" variant="panel">
      <div className="flex flex-col gap-8">
      {/* Top row: photo + text (with heading) + CV button */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Left: photo + text */}
        <div className="flex items-start gap-5">
          {/* Photo */}
          <div className="shrink-0 pt-5">
            <div className="profile-ring-lg">
              <img
                src="/profile.png"
                alt="Shaun profile"
                className="profile-img-lg"
              />
            </div>
          </div>

          {/* Heading ABOVE text, next to photo */}
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight">{a.title}</h2>
            <p className="mt-3 text-zinc-200/90 leading-relaxed">{a.summary}</p>
          </div>
        </div>

        {/* CV button */}
        <a
          href={site.cv.href}
          download
          className="cv-live-btn cv-live-btn--premium h-fit w-fit rounded-2xl px-5 py-3 text-sm text-fg md:self-center"
        >
          <span className="cv-live-btn-inner">
            {site.cv.label}
            <span className="cv-arrow">→</span>
          </span>
        </a>
      </div>

        {/* Quick facts */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {a.quickFacts.map((f) => (
            <div key={f.label} className="live-card rounded-2xl p-4">
              <div className="text-xs text-zinc-400">{f.label}</div>
              <div className="mt-1 text-sm font-medium text-zinc-100">
                {f.value}
              </div>
            </div>
          ))}
        </div>

        {/* Education + Languages */}
        <div className="grid gap-3 lg:grid-cols-3">
          <div className="live-card rounded-2xl p-5 lg:col-span-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-zinc-400">Education</div>
                <div className="mt-1 text-sm font-semibold text-zinc-100">
                  {a.education.qualification}
                </div>
                <div className="mt-1 text-xs text-zinc-400">
                  {a.education.institution} • {a.education.period}
                </div>
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-zinc-200/90">
              {a.education.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="live-card rounded-2xl p-5">
            <div className="text-xs text-zinc-400">Languages</div>
            <div className="mt-3 space-y-3">
              {a.languages.map((l) => (
                <div key={l.label} className="flex items-center justify-between">
                  <span className="text-sm text-zinc-100">{l.label}</span>
                  <span className="text-xs text-zinc-300">{l.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="live-card rounded-2xl p-5">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <div className="text-xs text-zinc-400">{a.tech.title}</div>
              <div className="mt-1 text-sm text-zinc-200/90">
                Tools I use often (and what I’m learning next).
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {a.tech.groups.map((g) => (
              <div
                key={g.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="text-xs text-zinc-400">{g.label}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="grid gap-3 lg:grid-cols-2">
          {a.experience.items.map((e) => (
            <div key={e.role} className="live-card rounded-2xl p-5">
              <div className="text-xs text-zinc-400">{a.experience.title}</div>
              <div className="mt-1 text-sm font-semibold text-zinc-100">
                {e.role}
              </div>
              <p className="mt-2 text-sm text-zinc-200/90 leading-relaxed">
                {e.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {e.tags.map((tag) => (
                  <span key={tag} className="chip chip-ghost">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
