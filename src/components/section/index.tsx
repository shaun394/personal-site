import type { ReactNode } from "react";

type Props = {
  id?: string;
  variant?: "base" | "panel";
  children: ReactNode;
};

export default function Section({
  id,
  variant = "base",
  children,
}: Props) {
  const isPanel = variant === "panel";

  return (
    <section
      id={id}
      className={[
        // consistent separation between sections
        "border-t border-white/10",

        // ✅ ensures anchor links (#about, #links) don't hide under sticky navbar
        "scroll-mt-24 md:scroll-mt-28",

        // panel = frosted black (About, Projects, etc.)
        isPanel ? "bg-black/45 backdrop-blur-md" : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-5xl px-4 py-14">{children}</div>
    </section>
  );
}
