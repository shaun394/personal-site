export type NavItem = { label: string; href: string };
export type SocialLink = { label: string; href: string };

export const site = {
  name: "Shaun",
  tagline: "Personal Website",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ] satisfies NavItem[],
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ] satisfies SocialLink[],
} as const;
