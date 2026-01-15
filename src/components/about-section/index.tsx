import { homeContent } from "../../content/home";
import { site } from "../../content/site";
import Section from "../section";

export default function AboutSection() {
  return (
    <Section id="about" variant="base">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight">
            {homeContent.about.title}
          </h2>
          <p className="mt-3 text-zinc-300 leading-relaxed">
            {homeContent.about.body}
          </p>
        </div>

        <a
          href={site.cv.href}
          download
          className="w-fit rounded-2xl border border-white/10 bg-primary/25 px-5 py-3 text-sm hover:bg-primary/40 transition"
        >
          {site.cv.label}
        </a>
      </div>
    </Section>
  );
}
