import { useEffect, useMemo, useRef, useState } from "react";
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

function BuildLoopReactor() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [playing, setPlaying] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = useMemo(() => ["Idea", "Code", "Test", "Ship"], []);

  const mouse = useRef({ x: 0, y: 0, active: false });
  const t0 = useRef(performance.now());
  const dims = useRef({ w: 0, h: 0, dpr: 1 });

  // auto-advance the highlight
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setStepIndex((s) => (s + 1) % steps.length);
    }, 1100);
    return () => window.clearInterval(id);
  }, [playing, steps.length]);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ro = new ResizeObserver(() => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      dims.current = { w: Math.floor(rect.width), h: Math.floor(rect.height), dpr };

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${Math.floor(rect.width)}px`;
      canvas.style.height = `${Math.floor(rect.height)}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });

    ro.observe(host);

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.active = true;
    };
    const onLeave = () => (mouse.current.active = false);

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    const draw = (now: number) => {
      const { w, h } = dims.current;
      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const dt = Math.min(0.032, (now - t0.current) / 1000);
      t0.current = now;

      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.5;

      // subtle centered glow (very light)
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.65);
      glow.addColorStop(0, "rgba(220,38,38,0.10)");
      glow.addColorStop(0.30, "rgba(220,38,38,0.04)");
      glow.addColorStop(1, "rgba(0,0,0,0.00)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // gentle vignette
      const vignette = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(w, h) * 0.95);
      vignette.addColorStop(0, "rgba(255,255,255,0.02)");
      vignette.addColorStop(0.35, "rgba(0,0,0,0.00)");
      vignette.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      // mouse parallax (tiny)
      let mx = 0, my = 0;
      if (mouse.current.active) {
        mx = (mouse.current.x - cx) / Math.max(1, w);
        my = (mouse.current.y - cy) / Math.max(1, h);
      }

      // rect-grid background (matches "rectangle vibe")
      const gridSize = Math.max(22, Math.min(w, h) / 14);
      const ox = cx + mx * 18;
      const oy = cy + my * 18;

      // animated opacity pulse (super subtle)
      const pulse = playing ? 0.04 + 0.01 * Math.sin(now / 900) : 0.035;

      ctx.save();
      ctx.translate(ox, oy);

      ctx.strokeStyle = `rgba(255,255,255,${pulse})`;
      ctx.lineWidth = 1;

      const halfW = w * 0.55;
      const halfH = h * 0.55;

      // vertical lines
      for (let x = -halfW; x <= halfW; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, -halfH);
        ctx.lineTo(x, halfH);
        ctx.stroke();
      }

      // horizontal lines
      for (let y = -halfH; y <= halfH; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(-halfW, y);
        ctx.lineTo(halfW, y);
        ctx.stroke();
      }

      // center focus box
      ctx.strokeStyle = "rgba(220,38,38,0.12)";
      ctx.lineWidth = 1;
      const boxW = Math.min(w, h) * 0.58;
      const boxH = Math.min(w, h) * 0.58;
      ctx.strokeRect(-boxW / 2, -boxH / 2, boxW, boxH);

      // tiny center dot
      ctx.beginPath();
      ctx.arc(0, 0, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(220,38,38,0.35)";
      ctx.fill();

      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  return (
    <div
      className={`reactor ${playing ? "is-playing" : "is-paused"}`}
      ref={hostRef}
      onClick={() => setPlaying((p) => !p)}
      role="button"
      aria-label="Build loop reactor (click to pause/play)"
    >
      <div className="reactor-top">
        <div className="reactor-kicker">BUILD LOOP</div>
        {/* removed Move • click • pause */}
      </div>

      <canvas ref={canvasRef} className="reactor-canvas" />

      <div className="reactor-flow" onClick={(e) => e.stopPropagation()}>
        {steps.map((s, i) => (
          <button
            key={s}
            className={`flow-step ${i === stepIndex ? "is-active" : ""}`}
            onClick={() => setStepIndex(i)}
            type="button"
          >
            <span className="flow-text">{s}</span>
          </button>
        ))}
        {/* removed caption */}
      </div>
    </div>
  );
}

export default function HomepageHero({ data }: { data: HomepageHeroData }) {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-grid">
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
                    c.variant === "primary"
                      ? "hero-btn hero-btn-primary"
                      : "hero-btn hero-btn-ghost"
                  }
                >
                  {c.label}
                </a>
              ))}
            </div>

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

          <div className="hero-panel">
            <BuildLoopReactor />
          </div>
        </div>
      </div>

      <div className="hero-divider" />
    </section>
  );
}
