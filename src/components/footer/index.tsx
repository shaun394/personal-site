import { site } from "../../content/site";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer border-t border-white/10 bg-bg/70">
      <div className="footer-glow pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-zinc-300">
            © {new Date().getFullYear()} {site.name}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-zinc-300">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-fg transition"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
