import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ContactSection from "../../components/contact-section";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg text-fg">
      <Navbar />
      <ContactSection />
      <Footer />
    </main>
  );
}
