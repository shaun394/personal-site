import { useEffect, useState } from "react";
import { site } from "../../content/site";
import "./navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close menu on resize to desktop
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
        <a
          key={item.label}
          href={item.href}
          onClick={onClick}
          className="hover:text-fg transition"
        >
          {item.label}
        </a>
      ))}
      <a
        href={site.cv.href}
        download
        onClick={onClick}
        className="rounded-xl border border-white/10 bg-primary/25 px-3 py-1.5 text-xs text-fg hover:bg-primary/40 transition"
      >
        {site.cv.label}
      </a>
    </>
  );

  return (
    <header className="navbar border-b border-white/10 bg-bg/70">
      <div className="navbar-glow pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <a href="/" className="text-sm font-semibold tracking-tight">
          {site.name}
        </a>

        {/* Desktop */}
        <nav className="hidden items-center gap-4 text-sm text-zinc-300 md:flex">
          <NavLinks />
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 transition"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {/* simple icon */}
          <span className="block h-[2px] w-5 bg-zinc-200 mb-1.5" />
          <span className="block h-[2px] w-5 bg-zinc-200 mb-1.5" />
          <span className="block h-[2px] w-5 bg-zinc-200" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-bg/95">
          <div className="mx-auto max-w-5xl px-4 py-4">
            <nav className="flex flex-col gap-3 text-sm text-zinc-300">
              <NavLinks onClick={() => setOpen(false)} />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
