import type { ReactNode } from "react";

type Props = {
  id?: string;
  variant?: "base" | "panel";
  children: ReactNode;
};

export default function Section({ id, variant = "base", children }: Props) {
  const isPanel = variant === "panel";

  return (
    <section
      id={id}
      className={[
        "border-t border-white/10",
        isPanel ? "bg-white/[0.03]" : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-5xl px-4 py-14">{children}</div>
    </section>
  );
}
