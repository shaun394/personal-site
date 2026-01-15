import Section from "../section";
import { homeContent } from "../../content/home";

export default function ProjectsSection() {
  const { projects } = homeContent;

  return (
    <Section id="projects" variant="panel">
      <h2 className="text-2xl font-semibold tracking-tight">{projects.title}</h2>
      <p className="mt-2 text-zinc-300">
        A few highlights. This will become more detailed over time.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {projects.items.map((p) => (
          <div
            key={p.name}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
          >
            <div className="text-sm font-semibold">{p.name}</div>
            <p className="mt-2 text-sm text-zinc-300">{p.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-zinc-200"
                >
                  {t}
                </span>
              ))}
            </div>

            {p.href && (
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-xs text-zinc-300 hover:text-fg transition"
              >
                View → 
              </a>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
