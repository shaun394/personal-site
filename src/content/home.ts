export type HomeContent = {
  hero: {
    pill: string;
    title: string;
    highlight: string;
    subtitle: string;
    ctas: { label: string; href: string; variant?: "primary" | "ghost" }[];
  };
  about: {
    title: string;
    body: string;
  };
  projects: {
  title: string;
  items: {
    name: string;
    description: string;
    tech: string[];
    href?: string;
  }[];
};
};

export const homeContent: HomeContent = {
  hero: {
    pill: "Red & black | minimal | data-driven",
    title: "Hi, I'm Shaun.",
    highlight: "I build modern software.",
    subtitle:
      "React + TypeScript frontends, strong architecture, and clean UI. This site is structured to stay simple as it grows.",
    ctas: [
      { label: "See Links", href: "#links", variant: "primary" },
      { label: "About Me", href: "#about", variant: "ghost" },
    ],
  },
  about: {
    title: "About",
    body:
      "I’m a developer focused on building practical, well-structured projects. I care about clean code, readable UI, and shipping features that work.",
  },
  projects: {
  title: "Projects",
  items: [
    {
      name: "Scheduler App",
      description: "Task scheduling app with a clean UI and practical workflows.",
      tech: ["Kotlin", "Android", "UI"],
    },
    {
      name: "Secure Messaging App",
      description: "Messaging app focused on privacy, structure, and usability.",
      tech: ["Kotlin", "Compose", "Firebase"],
    },
    {
      name: "Personal Website",
      description: "This website — data-driven sections with reusable components.",
      tech: ["React", "TypeScript", "Tailwind"],
    },
  ],
},
};
