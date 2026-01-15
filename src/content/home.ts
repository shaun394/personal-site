export type HeroCta = { label: string; href: string; variant?: "primary" | "ghost" };

export type HomeContent = {
  hero: {
    pill: string;
    title: string;
    highlight: string;
    subtitle: string;
    ctas: HeroCta[];
    stats: { label: string; value: string }[];
  };
};

export const homeContent: HomeContent = {
  hero: {
    pill: "Available for internships / junior roles",
    title: "Building clean, modern",
    highlight: "web & app experiences.",
    subtitle:
      "I focus on React + TypeScript frontends, solid architecture, and smooth UI. This site is fully data-driven so updating content stays painless.",
    ctas: [
      { label: "View Projects", href: "#projects", variant: "primary" },
      { label: "Contact", href: "#contact", variant: "ghost" },
    ],
    stats: [
      { label: "Focus", value: "Full-Stack" },
      { label: "Stack", value: "React / TS" },
      { label: "Deploy", value: "Vercel / Docker" },
    ],
  },
};
