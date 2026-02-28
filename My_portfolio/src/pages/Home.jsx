import React, { useState, useEffect, useRef, useMemo } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import {
  FiArrowDown,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiExternalLink,
  FiDownload,
  FiCode,
} from "react-icons/fi";
import {
  TbBrandReact,
  TbBrandNextjs,
  TbBrandJavascript,
  TbBrandTypescript,
  TbBrandNodejs,
  TbBrandMongodb,
  TbBrandCpp,
  TbBrandPhp,
} from "react-icons/tb";
import { SiTailwindcss, SiDocker, SiExpress } from "react-icons/si";
import { MdWork, MdSchool, MdComputer } from "react-icons/md";
import {
  IoSparkles,
  IoCodeSlash,
  IoPerson,
  IoRocket,
  IoCloud,
  IoStatsChart,
  IoAnalytics,
} from "react-icons/io5";
import { FaAws, FaGitAlt, FaPython, FaJava } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";

import Preloader from "../components/Preloader";
import Header from "../components/Headers";
import ReactAtropos from "../components/ReactAtropos";
import RippleEffect from "../components/RippleEffect";

const Home = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const [particleCount, setParticleCount] = useState(120);
  const activeSectionRef = useRef(0);
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const sections = useMemo(
    () => ["hero", "about", "skills", "story", "projects", "contact"],
    []
  );

  const typingOptions = useMemo(
    () => [
      "Full-Stack Developer",
      "MERN Stack Specialist",
      "Problem Solver",
      "LPU Student (CGPA: 8.30)",
      "2-Star Rating at CodeChef",
      "800+ DSA Problems Solved",
    ],
    []
  );

  const derived = useMemo(() => {
    const opacity = Math.max(0, 1 - scrollProgress * 2);
    const parallax1 = scrollProgress * 20;
    const parallax2 = scrollProgress * 20;
    return { opacity, parallax1, parallax2 };
  }, [scrollProgress]);

  const [canUse3D, setCanUse3D] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setCanUse3D(mq.matches && !prefersReducedMotion);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 768px)");
    const update = () => {
      if (prefersReducedMotion) return setParticleCount(0);
      setParticleCount(mqMobile.matches ? 40 : 120);
    };
    update();
    mqMobile.addEventListener?.("change", update);
    return () => mqMobile.removeEventListener?.("change", update);
  }, [prefersReducedMotion]);

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
            setTypingSpeed(70);
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
  }, [typingText, isDeleting, typingIndex, typingSpeed, showPreloader, typingOptions]);

  const scrollToSection = (index) => {
    activeSectionRef.current = index;
    setActiveSection(index);
    const section = document.getElementById(sections[index]);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
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

      for (let index = 0; index < sections.length; index++) {
        const el = document.getElementById(sections[index]);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const sectionMiddle = rect.top + rect.height / 2;
        if (sectionMiddle >= 0 && sectionMiddle <= window.innerHeight) {
          if (activeSectionRef.current !== index) {
            activeSectionRef.current = index;
            setActiveSection(index);
          }
          break;
        }
      }
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", throttledScroll);
  }, [showPreloader, sections]);

  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (!showPreloader) {
      const timer = setTimeout(() => setIsReady(true), 500);
      return () => clearTimeout(timer);
    }
  }, [showPreloader]);

  const [isDownloading, setIsDownloading] = useState(false);

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
      alert(
        `Could not find file: ${cvFilename}. Please check if it's in the public folder.`
      );
    };

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setIsDownloading(false), 2000);
  };

  if (showPreloader) {
    return <Preloader onComplete={() => setShowPreloader(false)} />;
  }

  const MaybeAtropos = ({ children, ...props }) =>
    canUse3D ? <ReactAtropos {...props}>{children}</ReactAtropos> : children;

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen bg-gray-950 mt-10 text-gray-100 overflow-x-hidden">
        <RippleEffect />

        {isReady && (
          <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-900 origin-left z-40 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 transition-transform duration-100 ease-out"
              style={{ transform: `scaleX(${scrollProgress})` }}
            />
          </div>
        )}

        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(to right, #a855f7 1px, transparent 1px),
                             linear-gradient(to bottom, #a855f7 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
          {[...Array(particleCount)].map((_, i) => (
            <m.div
              key={i}
              className="absolute w-px h-px rounded-full"
              initial={{
                x: Math.random() * 100 + "vw",
                y: Math.random() * 100 + "vh",
              }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      x: [null, Math.random() * 100 + "vw"],
                      y: [null, Math.random() * 100 + "vh"],
                      background: [
                        "rgba(168, 85, 247, 0.25)",
                        "rgba(217, 70, 239, 0.25)",
                        "rgba(236, 72, 153, 0.25)",
                        "rgba(168, 85, 247, 0.25)",
                      ],
                    }
              }
              transition={{
                duration: 4 + Math.random() * 6,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          <m.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    background: [
                      "radial-gradient(circle at center, rgba(88, 28, 135, 0.4) 0%, rgba(88, 28, 135, 0.1) 50%, transparent 80%)",
                      "radial-gradient(circle at center, rgba(126, 34, 206, 0.4) 0%, rgba(126, 34, 206, 0.1) 50%, transparent 80%)",
                      "radial-gradient(circle at center, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 80%)",
                    ],
                    scale: [1, 1.1, 0.95, 1],
                  }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transform: `translate(${derived.parallax1 * 0.3}%, ${
                derived.parallax1 * 0.7
              }%)`,
            }}
          />

          <m.div
            className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full blur-[140px]"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    background: [
                      "radial-gradient(circle at center, rgba(126, 34, 206, 0.3) 0%, rgba(126, 34, 206, 0.05) 50%, transparent 80%)",
                      "radial-gradient(circle at center, rgba(192, 38, 211, 0.3) 0%, rgba(192, 38, 211, 0.05) 50%, transparent 80%)",
                      "radial-gradient(circle at center, rgba(126, 34, 206, 0.3) 0%, rgba(126, 34, 206, 0.05) 50%, transparent 80%)",
                    ],
                    scale: [0.95, 1, 1.05, 0.95],
                  }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            style={{
              transform: `translate(${derived.parallax2 * -0.4}%, ${
                derived.parallax2 * 0.6
              }%)`,
            }}
          />
          <m.div
            className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full blur-[100px]"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    background: [
                      "radial-gradient(circle at center, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 80%)",
                      "radial-gradient(circle at center, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 80%)",
                      "radial-gradient(circle at center, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 80%)",
                    ],
                    rotate: [0, 180, 360],
                  }
            }
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
        
        <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4 md:gap-5">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className="group relative flex items-center justify-center"
              aria-label={`Go to ${sections[index]} section`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 relative ${
                  activeSection === index
                    ? "bg-gradient-to-br from-purple-400 to-pink-400 scale-125 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    : "bg-gray-700 group-hover:bg-purple-600"
                }`}
              >
                {activeSection === index && (
                  <div className="absolute inset-0 rounded-full animate-ping bg-purple-500/30" />
                )}
              </div>
              <span className="absolute right-6 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded border border-gray-800">
                {sections[index].charAt(0).toUpperCase() + sections[index].slice(1)}
              </span>
            </button>
          ))}
        </div>
        
        <Header />
        
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8 pt-20 md:pt-24"
        >
          <div className="max-w-6xl mx-auto w-full text-center">
            <m.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 md:mb-16"
            >
              <div className="relative mb-8 md:mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] mb-6 md:mb-8">
                  <span className="block text-gray-300 mb-3 md:mb-4">Hello, I'm</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-3 md:mb-4">
                    Bashar Ahmad Khan
                  </span>
                  <span className="block text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mt-6 md:mt-8">
                    <span className="text-[#fff]">A </span>
                    <span className="typing-text text-transparent bg-clip-text bg-[#fff] pr-1">
                      {typingText}
                    </span>
                    <span className="cursor-blink animate-pulse">|</span>
                  </span>
                </h1>
              </div>
            </m.div>

            <m.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="max-w-4xl mx-auto mb-12 md:mb-16"
            >
              <MaybeAtropos
                rotateXMax={25}
                rotateYMax={25}
                shadowScale={1.5}
                highlight={true}
                alwaysActive={true}
                className="w-full"
              >
                <div className="relative aspect-[4/7] sm:aspect-[16/9] md:aspect-[21/12] rounded-3xl md:rounded-4xl overflow-hidden border-2 border-purple-800/50 shadow-2xl shadow-purple-900/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/30 to-gray-950/90" />

                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `
                        radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.4) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.4) 0%, transparent 50%),
                        linear-gradient(45deg, transparent 49%, rgba(168, 85, 247, 0.2) 50%, transparent 51%),
                        linear-gradient(-45deg, transparent 49%, rgba(168, 85, 247, 0.2) 50%, transparent 51%)
                      `,
                        backgroundSize:
                          "100px 100px, 100px 100px, 40px 40px, 40px 40px",
                      }}
                    />
                  </div>

                  <div
                    className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur-2xl opacity-40"
                    data-atropos-offset="20"
                  />
                  <div
                    className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 blur-2xl opacity-40"
                    data-atropos-offset="15"
                  />

                  <div
                    className="relative z-10 h-full flex flex-col items-center justify-center p-6 sm:p-8 md:p-12"
                    data-atropos-offset="10"
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-700/30">
                        <IoCodeSlash className="w-8 h-8 sm:w-10 sm:h-10 text-purple-300" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h2 className="text-md sm:text-3xl md:text-4xl font-bold text-white mb-1">
                          Lovely Professional University
                        </h2>
                        <p className="text-purple-300 text-sm sm:text-base md:text-lg">
                          B.Tech Computer Science & Engineering • CGPA: 8.30/10
                        </p>
                      </div>
                    </div>

                    <div className="max-w-2xl mx-auto">
                      <p className="text-gray-300 text-md sm:text-xl md:text-2xl leading-relaxed mb-6">
                        Passionate about building{" "}
                        <span className="text-purple-300 font-semibold">
                          scalable web applications
                        </span>{" "}
                        with MERN stack and solving{" "}
                        <span className="text-pink-300 font-semibold">
                          500+ DSA problems
                        </span>{" "}
                        on LeetCode
                      </p>

                      <div className="hidden sm:flex flex-wrap justify-center gap-3 mb-8">
                        {[
                          "MERN Stack",
                          "800+ DSA",
                          "React",
                          "Node.js",
                          "MongoDB",
                          "TypeScript",
                          "Python",
                          "C",
                          "C++",
                          "Java",
                        ].map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-purple-900/30 to-pink-900/20 text-purple-300 text-md sm:text-sm border border-purple-800/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap justify-center gap-3 mb-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-900/20 to-emerald-900/10 text-green-300 border border-green-800/30">
                          <IoStatsChart className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-md sm:text-sm">
                            LeetCode 1414 Rating
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-900/20 to-orange-900/10 text-yellow-300 border border-yellow-800/30">
                          <FaPython className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm">
                            5★ Python HackerRank
                          </span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-900/20 to-cyan-900/10 text-blue-300 border border-blue-800/30">
                          <IoCloud className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm">
                            2★ CodeChef
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-sm">Available for opportunities</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-l-2 border-purple-500/50 rounded-tl-3xl" />
                  <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-r-2 border-pink-500/50 rounded-tr-3xl" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-l-2 border-purple-500/50 rounded-bl-3xl" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-r-2 border-pink-500/50 rounded-br-3xl" />
                </div>
              </MaybeAtropos>
            </m.div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="max-w-2xl mx-auto mb-12 md:mb-16"
            >
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
                Building{" "}
                <span className="text-purple-300 font-medium">
                  production-ready applications
                </span>{" "}
                with clean architecture,{" "}
                <span className="text-pink-300 font-medium">
                  optimized algorithms
                </span>
                , and modern tech stack
              </p>
            </m.div>

            <div data-atropos-offset="0" className="flex justify-center items-center">
              <m.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDownloadCV}
                disabled={isDownloading}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-900/30 to-pink-900/20 text-purple-300 border border-purple-800/30 hover:border-purple-700/50 transition-all atropos-button-fix ${
                  isDownloading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FiDownload className="w-4 h-4" />
                <span className="text-sm">
                  {isDownloading ? "Downloading..." : "Download CV"}
                </span>
              </m.button>
            </div>

            {isReady && (
              <div
                className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-300"
                style={{ opacity: derived.opacity }}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-gray-500 text-xs tracking-widest uppercase">
                    Scroll to Explore
                  </span>
                  <m.div
                    animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FiArrowDown className="w-5 h-5 text-purple-400" />
                  </m.div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* FIXED CONTACT SECTION */}
        <section
          id="contact"
          className="min-h-screen flex items-center px-4 md:px-6 lg:px-8 py-12 md:py-20"
        >
          <div className="max-w-5xl mx-auto w-full">
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12">
                <span className="text-gray-300">Let's Build</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Something Amazing
                </span>
              </h2>

              <p className="text-gray-400 text-lg md:text-xl mb-12 md:mb-16 leading-relaxed max-w-3xl mx-auto">
                I'm currently seeking internships and full-time opportunities in
                software development. Let's discuss how we can work together on
                innovative projects!
              </p>

              <div className="grid lg:grid-cols-2 gap-10 md:gap-12">
                {/* Left side - Contact Form */}
                <div className="w-full p-6 sm:p-8 md:p-10 rounded-3xl backdrop-blur-sm bg-gradient-to-br from-gray-900/60 to-gray-950/60 border-2 border-gray-800/50 shadow-2xl shadow-purple-900/10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                    Send Me a Message
                  </h3>

                  <form
                    action="https://formspree.io/f/xyzrvklw"
                    method="POST"
                    className="space-y-6"
                  >
                    <input type="hidden" name="_subject" value="New Message from Portfolio!" />
                    <input type="text" name="_gotcha" style={{ display: "none" }} />

                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        className="w-full p-4 bg-gray-900/50 border-2 border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-700 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="John@gmail.com"
                        className="w-full p-4 bg-gray-900/50 border-2 border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-700 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <textarea
                        name="message"
                        placeholder="Tell me about yourself"
                        rows="4"
                        className="w-full p-4 bg-gray-900/50 border-2 border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-700 transition-all"
                        required
                      />
                    </div>

                    <m.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-4 bg-gradient-to-r from-purple-700 to-pink-600 rounded-xl font-bold text-white tracking-wider hover:shadow-2xl hover:shadow-purple-500/30 transition-all text-lg"
                    >
                      SEND MESSAGE
                    </m.button>
                  </form>
                </div>

                {/* Right side contact cards */}
                <div className="flex flex-col justify-center space-y-8">
                  <div className="w-full backdrop-blur-sm bg-gradient-to-br from-gray-900/60 to-gray-950/60 border-2 border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Get In Touch</h3>
                    <div className="space-y-6">
                      {[
                        { 
                          icon: <FiMail className="w-5 h-5" />, 
                          title: "Email", 
                          value: "basharahmadkhan10@gmail.com", 
                          link: "mailto:basharahmadkhan10@gmail.com" 
                        },
                        { 
                          icon: <FiLinkedin className="w-5 h-5" />, 
                          title: "LinkedIn", 
                          value: "linkedin.com/in/basharahmadkhan10",
                          link: "https://linkedin.com/in/basharahmadkhan10" 
                        },
                        { 
                          icon: <FiGithub className="w-5 h-5" />, 
                          title: "GitHub", 
                          value: "github.com/basharahmadkhan10", 
                          link: "https://github.com/basharahmadkhan10" 
                        },
                        { 
                          icon: <IoCodeSlash className="w-5 h-5" />, 
                          title: "LeetCode", 
                          value: "350+ Problems Solved", 
                          link: "https://leetcode.com" 
                        },
                      ].map((contact, idx) => (
                        <a 
                          key={idx} 
                          href={contact.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-4 p-4 rounded-2xl bg-gray-900/30 hover:bg-gray-800/40 transition-all duration-300 group atropos-clickable" 
                          data-atropos-offset="0"
                        >
                          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/20 group-hover:from-purple-800/40 group-hover:to-pink-800/20 transition-all">
                            {contact.icon}
                          </div>
                          <div className="flex-1 text-left">
                            <h4 className="font-semibold text-gray-300 group-hover:text-white">
                              {contact.title}
                            </h4>
                            <p className="text-gray-200 text-sm group-hover:text-gray-300">
                              {contact.value}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="w-full backdrop-blur-sm bg-gradient-to-br from-gray-900/60 to-gray-950/60 border-2 border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10">
                    <h3 className="text-2xl font-bold text-white mb-4">Let's Collaborate</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      Seeking internships and full-time opportunities in software development. 
                      Open to freelance projects and technical collaborations.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownloadCV}
                        disabled={isDownloading}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-900/30 to-pink-900/20 text-purple-300 border border-purple-800/30 hover:border-purple-700/50 transition-all atropos-button-fix ${
                          isDownloading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <FiDownload className="w-4 h-4" />
                        <span className="text-sm">
                          {isDownloading ? "Downloading..." : "Download CV"}
                        </span>
                      </m.button>
                      <button
                        onClick={() => scrollToSection(4)}
                        className="py-2 bg-gradient-to-r from-pink-900/30 to-pink-900/10 text-pink-300 rounded-xl hover:bg-gradient-to-r hover:from-pink-800/40 hover:to-pink-800/20 transition-all border border-pink-800/30 text-sm font-medium flex items-center justify-center"
                      >
                        View Projects
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        <footer className="py-8 border-t border-gray-900/50">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-700 to-pink-600 flex items-center justify-center">
                  <span className="font-black text-black text-sm">B</span>
                </div>
                <span className="text-gray-400 text-sm">
                  © 2024 Bashar Ahmad Khan. All rights reserved.
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-sm">
                  Built with React, Framer Motion & Tailwind CSS
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </LazyMotion>
  );
};

export default Home;
