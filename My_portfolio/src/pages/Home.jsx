import React, { useState, useEffect } from "react";
import Preloader from "../components/common/Preloader";
import Layout from "../components/layout/Layout";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Story from "../components/sections/Story";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";

const sections = ["hero", "about", "skills", "story", "projects", "contact"];

const Home = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [isDownloading, setIsDownloading] = useState(false);

  const typingOptions = [
    "Full-Stack Developer",
    "MERN Stack Specialist",
    "Problem Solver",
    "800+ DSA Problems Solved",
    "Competitive Programmer",
  ];

  // Typing effect (unchanged)
  useEffect(() => {
    if (!showPreloader) {
      const currentText = typingOptions[typingIndex];
      const handleTyping = () => {
        if (!isDeleting) {
          if (typingText.length < currentText.length) {
            setTypingText(currentText.substring(0, typingText.length + 1));
            setTypingSpeed(100);
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
            setTypingSpeed(100);
          }
        } else {
          if (typingText.length > 0) {
            setTypingText(currentText.substring(0, typingText.length - 1));
            setTypingSpeed(100);
          } else {
            setIsDeleting(false);
            setTypingIndex((prev) => (prev + 1) % typingOptions.length);
            setTypingSpeed(100);
          }
        }
      };
      const timer = setTimeout(handleTyping, typingSpeed);
      return () => clearTimeout(timer);
    }
  }, [typingText, isDeleting, typingIndex, typingSpeed, showPreloader]);

  // Set isReady after preloader disappears
  useEffect(() => {
    if (!showPreloader) {
      const timer = setTimeout(() => setIsReady(true), 500);
      return () => clearTimeout(timer);
    }
  }, [showPreloader]);

  // Scroll handling (unchanged)
  const scrollToSection = (index) => {
    setActiveSection(index);
    const section = document.getElementById(sections[index]);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    if (showPreloader) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollPos / docHeight : 0;
      setScrollProgress(progress);
      const newOpacity = Math.max(
        0,
        1 - scrollPos / (window.innerHeight * 0.5),
      );
      setOpacity(newOpacity);

      sections.forEach((_, index) => {
        const section = document.getElementById(sections[index]);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionMiddle = rect.top + rect.height / 2;
          if (sectionMiddle >= 0 && sectionMiddle <= window.innerHeight) {
            setActiveSection(index);
          }
        }
      });
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [showPreloader]);

  // CV download handler (unchanged)
  const handleDownloadCV = () => {
    setIsDownloading(true);
    const cvFilename = "Bashar_Ahmad_Khan_CV.pdf";
    const cvUrl = `/${cvFilename}`;
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = cvFilename;
    link.target = "_blank";
    link.onload = () => setIsDownloading(false);
    link.onerror = () => {
      setIsDownloading(false);
      alert(`Could not find file: ${cvFilename}`);
    };
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsDownloading(false), 3000);
  };

  if (showPreloader) {
    return <Preloader onComplete={() => setShowPreloader(false)} />;
  }

  return (
    <Layout
      scrollProgress={scrollProgress}
      sections={sections}
      activeSection={activeSection}
      scrollToSection={scrollToSection}
      isReady={isReady}
    >
      <Hero
        typingText={typingText}
        handleDownloadCV={handleDownloadCV}
        isDownloading={isDownloading}
        opacity={opacity}
        isReady={isReady}
      />
      <About />
      <Skills />
      <Story />
      <Projects />
      <Contact
        handleDownloadCV={handleDownloadCV}
        isDownloading={isDownloading}
        scrollToSection={scrollToSection}
      />
    </Layout>
  );
};

export default Home;
