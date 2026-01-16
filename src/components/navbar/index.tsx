import { useEffect, useState } from "react";
import { site } from "../../content/site";
import "./navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {site.nav.map((item) => (
        <a key={item.label} href={item.href} onClick={onClick} className="nav-link">
          {item.label}
        </a>
      ))}

      <a
        href={site.cv.href}
        download
        onClick={onClick}
        className="nav-cv"
        aria-label={site.cv.label}
      >
        {site.cv.label}
      </a>
    </>
  );

  return (
    <header className="navbar" aria-label="Top navigation">
      <div className="navbar-glow" aria-hidden="true" />

      <div className="navbar-inner">
        <a href="/" className="nav-brand" aria-label="Home">
          <span className="nav-brand-dot" aria-hidden="true" />
          <span className="nav-brand-text">{site.name}</span>
        </a>

        {/* Desktop */}
        <nav className="nav-desktop" aria-label="Primary">
          <NavLinks />
        </nav>

        {/* Mobile button */}
        <button
          className={`nav-burger ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`nav-mobile ${open ? "is-open" : ""}`}>
        <div className="nav-mobile-inner">
          <nav className="nav-mobile-links" aria-label="Mobile">
            <NavLinks onClick={() => setOpen(false)} />
          </nav>
        </div>
      </div>
    </header>
  );
}
