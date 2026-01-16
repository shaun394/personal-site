export type NavItem = { label: string; href: string };
export type SocialLink = { label: string; href: string };

export const site = {
  name: "Shaun Swanepoel",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Links", href: "#links" },
  ] satisfies NavItem[],
  socials: [
    { label: "GitHub", href: "https://github.com/shaun394" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shaun-swanepoel-6979731b2/" },
  ] satisfies SocialLink[],
  cv: {
    label: "Download CV",
    href: "/cv.pdf",
  },
} as const;
