import "./footer.css";
import { site } from "../../content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  // pull socials by label from site.ts
  const github = site.socials.find((s) => s.label.toLowerCase() === "github")?.href;
  const linkedin = site.socials.find((s) => s.label.toLowerCase() === "linkedin")?.href;

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Left: identity */}
          <div className="footer-brand">
            <div className="footer-name">
              <span className="footer-dot" aria-hidden="true" />
              <span>{site.name}</span>
            </div>

            <p className="footer-blurb">
              Full-stack &amp; mobile dev. I build clean, fast interfaces and practical systems.
            </p>
          </div>

          {/* Middle: nav */}
          <nav className="footer-col" aria-label="Navigate">
            <div className="footer-col-title">Navigate</div>
            <ul className="footer-links">
              <li>
                <a className="footer-link" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="footer-link" href="/contact">
                  Contact
                </a>
              </li>
              <li>
                <a className="footer-link" href="#top">
                  Back to top
                </a>
              </li>
            </ul>
          </nav>

          {/* Right: contact + meta */}
          <div className="footer-col">
            <div className="footer-col-title">Contact</div>

            <div className="footer-pill">
              <span className="footer-pill-label">Email</span>
              <a className="footer-pill-value" href="mailto:swanepoelshaun16@gmail.com">
                swanepoelshaun16@gmail.com
              </a>
            </div>

            <div className="footer-social">
              {github && (
                <a className="footer-link" href={github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}

              {linkedin && (
                <a className="footer-link" href={linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              )}
            </div>

            <dl className="footer-meta">
              <div className="footer-meta-row">
                <dt>Location</dt>
                <dd>South Africa</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">© {year} {site.name}</div>
        </div>
      </div>
    </footer>
  );
}
