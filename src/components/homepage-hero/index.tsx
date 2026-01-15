import type { HomeContent } from "../../content/home";
import "./hero.css";

type Props = {
  data: HomeContent["hero"];
};

export default function HomepageHero({ data }: Props) {
  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-5xl px-4 py-24 md:py-32">
        {/* Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
          <span className="h-2 w-2 rounded-full bg-accent" />
          {data.pill}
        </div>

        {/* Title */}
        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
          {data.title}{" "}
          <span className="relative inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {data.highlight}
            <span className="hero-underline" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-200/90 md:text-lg">
          {data.subtitle}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          {data.ctas.map((cta) => {
            const primary = cta.variant === "primary";
            return (
              <a
                key={cta.label}
                href={cta.href}
                className={[
                  "rounded-xl px-4 py-2 text-sm transition",
                  "border border-white/10",
                  primary
                    ? "bg-primary/25 hover:bg-primary/40 text-fg"
                    : "bg-white/5 hover:bg-white/10 text-zinc-200",
                ].join(" ")}
              >
                {cta.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
