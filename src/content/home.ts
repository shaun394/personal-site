export type HomeContent = {
  hero: {
    pill: string;
    title: string;
    highlight: string;
    subtitle: string;
    ctas: { label: string; href: string; variant?: "primary" | "ghost" }[];
    stats?: { label: string; value: string }[];
  };

  about: {
    title: string;
    summary: string;

    quickFacts: { label: string; value: string }[];

    education: {
      qualification: string;
      institution: string;
      period: string;
      points: string[];
    };

    tech: {
      title: string;
      groups: { label: string; items: string[] }[];
    };

    languages: { label: string; value: string }[];

    experience: {
      title: string;
      items: { role: string; description: string; tags: string[] }[];
    };
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
  pill: "Full-stack & mobile developer",

  title: "Hi, I'm Shaun.",
  highlight: "I build modern software.",

  subtitle:
    "Full-stack developer with a strong focus on clean architecture, practical UI, and reliable delivery — from web applications to Android.",

  ctas: [
    { label: "View projects", href: "#projects", variant: "primary" },
    { label: "Get in touch", href: "#links", variant: "ghost" },
  ],

  stats: [
    { label: "Focus", value: "Full-stack + Mobile" },
    { label: "Frontend", value: "React + TypeScript" },
    { label: "Mobile", value: "Kotlin / Compose" },
  ],
},
  about: {
    title: "About",
    summary:
      "A driven and detail-oriented IT graduate focused on software development, mobile applications, and modern web technologies. I enjoy building practical, maintainable solutions and learning new tools as I go.",
    quickFacts: [
      { label: "Location", value: "Cape Town, South Africa" },
      { label: "Degree", value: "Bachelor of Information Technology (BITWEB)" },
      { label: "Focus", value: "Web Development & Design" },
      { label: "Workflow", value: "Git, deadlines, clean structure" },
    ],
    education: {
      qualification: "Bachelor of Information Technology (BITWEB) – Web Development and Design",
      institution: "STADIO Higher Education",
      period: "Feb 2023 – Nov 2025",
      points: [
        "Strong focus on software development, mobile apps, and web technologies",
        "Multiple practical projects simulating real-world client requirements",
        "Emphasis on UI/UX, functionality, and maintainable code",
      ],
    },
    tech: {
      title: "Tech Stack",
      groups: [
        {
          label: "Programming",
          items: ["HTML", "CSS", "JavaScript", "TypeScript", "PHP", "SQL", "Kotlin", "Java"],
        },
        { label: "Learning", items: ["Python", "C"] },
        {
          label: "Frameworks & Tools",
          items: ["React", "Next.js", "Node.js", "Android Studio", "Jetpack Compose", "Firebase (Auth/Firestore)", "Git & GitHub", "REST API's", "CI/CD pipelines", "Tailwind"],
        },
        { label: "Design & CMS", items: ["Figma (UI/UX)", "WordPress"] },
        { label: "Databases", items: ["MySQL", "PostgreSQL", "phpMyAdmin"] },
      ],
    },
    languages: [
      { label: "English", value: "Fluent" },
      { label: "Afrikaans", value: "Fluent" },
    ],
    experience: {
      title: "Experience",
      items: [
        {
          role: "Holiday Work – Chattels",
          description:
            "Worked during holidays while studying full-time to stay productive, earn extra money, and gain practical experience in a fast-paced environment.",
          tags: ["Teamwork", "Work ethic", "Reliability"],
        },
        {
          role: "Freelance-style Projects",
          description:
            "Planned, designed, and built full applications independently and in teams, using Git for version control and working to deadlines.",
          tags: ["Architecture", "UI/UX", "Iteration"],
        },
      ],
    },
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
