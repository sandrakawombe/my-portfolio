import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BlobBackground from "@/components/ui/BlobBackground";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <BlobBackground />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
