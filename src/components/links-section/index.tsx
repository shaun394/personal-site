import { site } from "../../content/site";
import Section from "../section";
import "./links.css";

export default function LinksSection() {
  return (
    <Section id="links" variant="base">
      <div className="links-wrap">
        <div className="links-head">
          <div className="links-head-left">
            <h2 className="links-title">Find me online</h2>
            <p className="links-subtitle">
              These are the platforms where I share code, projects, and professional updates.
              If you want to see how I work in practice, start here.
            </p>
            <div className="links-accent" />
          </div>

          <div className="links-head-right">
            <div className="links-meta-label">What you’ll find</div>

            <ul className="links-bullets">
              <li><span className="bullet-dot" />Real projects + pinned repos</li>
              <li><span className="bullet-dot" />Clean commits and structure</li>
              <li><span className="bullet-dot" />Career updates + background</li>
            </ul>
          </div>
        </div>

        <div className="links-grid">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="link-card"
            >
              <div className="link-card-top">
                <div className="link-badge">
                  <span className="link-dot" />
                  {s.label}
                </div>

                <span className="link-open">
                  Open <span className="link-arrow">→</span>
                </span>
              </div>

              <div className="link-url">{s.href}</div>

              <div className="link-foot">
                <span className="link-hint">Tap / click to open</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
