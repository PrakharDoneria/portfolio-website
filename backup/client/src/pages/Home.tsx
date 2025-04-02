import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ApiShowcase from "@/components/ApiShowcase";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import { useState, useEffect } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavbarVisible(true);
      } else {
        setNavbarVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar 
        visible={navbarVisible} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      <MobileMenu open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ApiShowcase />
      <Contact />
      <Footer />
    </div>
  );
}
