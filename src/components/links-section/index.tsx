import { site } from "../../content/site";
import Section from "../section";

export default function LinksSection() {
  return (
    <Section id="links" variant="panel">
      <h2 className="text-2xl font-semibold tracking-tight">Links</h2>
      <p className="mt-2 text-zinc-300">Quick access to my profiles.</p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {site.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{s.label}</div>
              <div className="text-xs text-zinc-400 group-hover:text-zinc-200 transition">
                Open →
              </div>
            </div>
            <div className="mt-2 text-xs text-zinc-400 break-all">{s.href}</div>
          </a>
        ))}
      </div>
    </Section>
  );
}
