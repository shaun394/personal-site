import "./hero.css";

type HeroCta = {
  label: string;
  href: string;
  variant?: "primary" | "ghost";
};

type HeroStat = {
  label: string;
  value: string;
};

export type HomepageHeroData = {
  pill: string;
  title: string;
  highlight: string;
  subtitle: string;
  ctas: HeroCta[];
  stats?: HeroStat[];
};

export default function HomepageHero({ data }: { data: HomepageHeroData }) {
  return (
    <section className="hero">
      {/* Content */}
      <div className="hero-inner">
        <div className="hero-grid">
          {/* Left: Copy */}
          <div className="hero-copy">
            <div className="hero-pill">{data.pill}</div>

            <h1 className="hero-title">
              Hi, I'm Shaun.
              <br />
              <span className="live-red-text">I build modern software.</span>
            </h1>

            <p className="hero-subtitle">{data.subtitle}</p>

            <div className="hero-ctas">
              {data.ctas.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className={
                    c.variant === "primary" ? "hero-btn hero-btn-primary" : "hero-btn hero-btn-ghost"
                  }
                >
                  {c.label}
                </a>
              ))}
            </div>

            {/* quick stats row */}
            {data.stats?.length ? (
              <div className="hero-stats">
                {data.stats.map((s) => (
                  <div key={s.label} className="hero-stat">
                    <div className="hero-stat-label">{s.label}</div>
                    <div className="hero-stat-value">{s.value}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Right: subtle “signal” panel */}
          <div className="hero-panel">
            <div className="hero-panel-card">
              <div className="hero-panel-kicker">Now</div>
              <div className="hero-panel-title">Building & iterating</div>
              <div className="hero-panel-text">
                I like projects with clean structure, strong UI polish, and a real deployment pipeline.
              </div>

              <div className="hero-panel-badges">
                <span className="hero-badge">React</span>
                <span className="hero-badge">TypeScript</span>
                <span className="hero-badge">Tailwind</span>
                <span className="hero-badge">Vercel</span>
              </div>
            </div>

            <div className="hero-panel-mini">
              <div className="hero-mini">
                <div className="hero-mini-label">Preferred workflow</div>
                <div className="hero-mini-value">Git • small commits • steady progress</div>
              </div>
              <div className="hero-mini">
                <div className="hero-mini-label">Style</div>
                <div className="hero-mini-value">Minimal • high-contrast • red accents</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* subtle bottom divider */}
      <div className="hero-divider" />
    </section>
  );
}
