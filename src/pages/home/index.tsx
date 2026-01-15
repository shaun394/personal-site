import Navbar from "../../components/navbar";
import HomepageHero from "../../components/homepage-hero";
import AboutSection from "../../components/about-section";
import LinksSection from "../../components/links-section";
import ProjectsSection from "../../components/projects-section";
import Footer from "../../components/footer";
import { homeContent } from "../../content/home";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg text-fg">
      <Navbar />

      {/* 1) Hero */}
      <HomepageHero data={homeContent.hero} />

      {/* 2) About */}
      <AboutSection />

      {/* 3) Links */}
      <LinksSection />

      {/* 4) Projects */}
      <ProjectsSection />

      {/* 5) Footer */}
      <Footer />
    </main>
  );
}
