import HomepageHero from "../../components/homepage-hero";
import { homeContent } from "../../content/home";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg text-fg">
      <HomepageHero data={homeContent.hero} />
    </main>
  );
}
