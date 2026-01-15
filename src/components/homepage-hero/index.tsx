import type { HomeContent } from "../../content/home";
import "./hero.css";

type Props = {
  data: HomeContent["hero"];
};

export default function HomepageHero({ data }: Props) {
  return (
    <section className="hero border-b border-white/10 bg-bg">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-glow-primary hero-float absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl" />
        <div className="hero-glow-accent hero-float absolute -bottom-56 left-12 h-[520px] w-[520px] rounded-full blur-3xl" />
        <div className="hero-glow-primary hero-float absolute -bottom-40 right-10 h-[420px] w-[420px] rounded-full blur-3xl opacity-75" />
      </div>

      {/* Grid overlay */}
      <div className="hero-grid pointer-events-none absolute inset-0" />

      {/* Content */}
      <div className="relative mx-auto max-w-5xl px-4 py-20 md:py-28">
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
        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-300 md:text-lg">
          {data.subtitle}
        </p>

        {/* CTAs */}
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
                    ? "bg-primary/25 hover:bg-primary/40"
                    : "bg-white/5 hover:bg-white/10",
                ].join(" ")}
              >
                {cta.label}
              </a>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
          {data.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-xs text-zinc-400">{s.label}</div>
              <div className="mt-1 text-sm font-medium text-zinc-100">
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
