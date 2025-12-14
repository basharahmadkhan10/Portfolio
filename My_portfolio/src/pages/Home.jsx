import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  TbBrandPython,
  TbBrandMongodb,
  TbBrandCpp,
  TbBrandPhp,
} from "react-icons/tb";
import {
  SiTailwindcss,
  SiRedux,
  SiDocker,
  SiPostgresql,
  SiExpress,
} from "react-icons/si";
import { MdWork, MdSchool, MdComputer } from "react-icons/md";
import {
  IoSparkles,
  IoCodeSlash,
  IoPerson,
  IoRocket,
  IoCloud,
  IoStatsChart,
  IoAnalytics,
  IoServer,
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
  const [parallaxY1, setParallaxY1] = useState(0);
  const [parallaxY2, setParallaxY2] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const sections = ["hero", "about", "skills", "story", "projects", "contact"];

  const typingOptions = [
    "Full-Stack Developer",
    "MERN Stack Specialist",
    "Problem Solver",
    "LPU Student (CGPA: 8.09)",
    "350+ DSA Problems Solved",
  ];

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

  const scrollToSection = (index) => {
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

      const parallax1 = progress * 20;
      const parallax2 = progress * 20;
      setParallaxY1(parallax1);
      setParallaxY2(parallax2);

      const newOpacity = Math.max(
        0,
        1 - scrollPos / (window.innerHeight * 0.5)
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

    
    link.onload = () => {
      setIsDownloading(false);
    };

    link.onerror = () => {
      setIsDownloading(false);
      alert(
        `Could not find file: ${cvFilename}. Please check if it's in the public folder.`
      );
    };

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    
    setTimeout(() => {
      setIsDownloading(false);
    }, 3000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const message = formData.get("message") || "";

    
    const subject = `Portfolio Contact: Message from ${name}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}%0D%0A%0D%0A---%0D%0ASent from Bashar Ahmad Khan's Portfolio`;

    const mailtoLink = `mailto:basharahmadkhan10@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    
    const mailWindow = window.open(mailtoLink, "_blank");

  
    if (
      !mailWindow ||
      mailWindow.closed ||
      typeof mailWindow.closed === "undefined"
    ) {
      
      navigator.clipboard
        .writeText("basharahmadkhan10@gmail.com")
        .then(() => {
          alert(
            `Email client blocked. Your message has been prepared.\n\nMy email (basharahmadkhan10@gmail.com) has been copied to your clipboard.\nPlease paste it into your email client and send your message.`
          );
        })
        .catch(() => {
          alert(
            `Please send your message to: basharahmadkhan10@gmail.com\n\nSubject: ${subject}\n\nMessage: ${message}\n\nFrom: ${name} (${email})`
          );
        });
    }

    
    setTimeout(() => form.reset(), 100);
  };

  if (showPreloader) {
    return <Preloader onComplete={() => setShowPreloader(false)} />;
  }

  return (
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

        {[...Array(200)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px rounded-full"
            initial={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
            }}
            animate={{
              x: [null, Math.random() * 100 + "vw"],
              y: [null, Math.random() * 100 + "vh"],
              background: [
                "rgba(168, 85, 247, 0.3)",
                "rgba(217, 70, 239, 0.3)",
                "rgba(236, 72, 153, 0.3)",
                "rgba(168, 85, 247, 0.3)",
              ],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]"
          animate={{
            background: [
              "radial-gradient(circle at center, rgba(88, 28, 135, 0.4) 0%, rgba(88, 28, 135, 0.1) 50%, transparent 80%)",
              "radial-gradient(circle at center, rgba(126, 34, 206, 0.4) 0%, rgba(126, 34, 206, 0.1) 50%, transparent 80%)",
              "radial-gradient(circle at center, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 80%)",
            ],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transform: `translate(${parallaxY1 * 0.3}%, ${parallaxY1 * 0.7}%)`,
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full blur-[140px]"
          animate={{
            background: [
              "radial-gradient(circle at center, rgba(126, 34, 206, 0.3) 0%, rgba(126, 34, 206, 0.05) 50%, transparent 80%)",
              "radial-gradient(circle at center, rgba(192, 38, 211, 0.3) 0%, rgba(192, 38, 211, 0.05) 50%, transparent 80%)",
              "radial-gradient(circle at center, rgba(126, 34, 206, 0.3) 0%, rgba(126, 34, 206, 0.05) 50%, transparent 80%)",
            ],
            scale: [0.95, 1, 1.05, 0.95],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{
            transform: `translate(${parallaxY2 * -0.4}%, ${parallaxY2 * 0.6}%)`,
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full blur-[100px]"
          animate={{
            background: [
              "radial-gradient(circle at center, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 80%)",
              "radial-gradient(circle at center, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 80%)",
              "radial-gradient(circle at center, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 80%)",
            ],
            rotate: [0, 180, 360],
          }}
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
              {sections[index].charAt(0).toUpperCase() +
                sections[index].slice(1)}
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 md:mb-16"
          >
            <div className="relative mb-8 md:mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] mb-6 md:mb-8">
                <span className="block text-gray-300 mb-3 md:mb-4">
                  Hello, I'm
                </span>
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
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="max-w-4xl mx-auto mb-12 md:mb-16"
          >
            <ReactAtropos
              rotateXMax={25}
              rotateYMax={25}
              shadowScale={1.5}
              highlight={true}
              alwaysActive={true}
              className="w-full"
            >
              <div className="relative aspect-[4/7]  sm:aspect-[16/9] md:aspect-[21/12] rounded-3xl md:rounded-4xl overflow-hidden border-2 border-purple-800/50 shadow-2xl shadow-purple-900/30">
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
                        B.Tech Computer Science & Engineering • CGPA: 8.09/10
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
                        350+ DSA problems
                      </span>{" "}
                      on LeetCode
                    </p>

                    <div className="hidden sm:flex flex-wrap justify-center gap-3 mb-8">
                      {[
                        "MERN Stack",
                        "350+ DSA",
                        "React",
                        "Node.js",
                        "MongoDB",
                        "TypeScript",
                        "Python",
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
                          LeetCode 1529 Rating
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
                          Oracle AI Certified
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-sm">
                        Available for opportunities
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-l-2 border-purple-500/50 rounded-tl-3xl" />
                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-r-2 border-pink-500/50 rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-l-2 border-purple-500/50 rounded-bl-3xl" />
                <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-r-2 border-pink-500/50 rounded-br-3xl" />
              </div>
            </ReactAtropos>
          </motion.div>

          <motion.div
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
          </motion.div>
          <div
            data-atropos-offset="0"
            className="flex justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
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
            </motion.button>
          </div>

          {isReady && (
            <div
              className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-300"
              style={{ opacity }}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-gray-500 text-xs tracking-widest uppercase">
                  Scroll to Explore
                </span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiArrowDown className="w-5 h-5 text-purple-400" />
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section
        id="about"
        className="min-h-screen flex items-center px-4 md:px-6 lg:px-8 py-12 md:py-20"
      >
        <div className="max-w-6xl  mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                About
              </span>
              <span className="text-gray-300"> Me</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
              <div className="space-y-8">
                <ReactAtropos rotateXMax={15} rotateYMax={15}>
                  <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-purple-900/20 border border-purple-700/30">
                        <IoPerson className="w-8 h-8 text-purple-300" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-200">
                        Who I Am
                      </h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
                      I'm a dedicated Computer Science Engineering student at{" "}
                      <span className="text-purple-300 font-semibold">
                        Lovely Professional University (CGPA: 8.09)
                      </span>
                      , specializing in Full-Stack MERN Development. With
                      expertise in building scalable web applications and
                      solving 350+ DSA problems, I combine academic knowledge
                      with practical skills to create efficient solutions.
                    </p>
                  </div>
                </ReactAtropos>

                <ReactAtropos rotateXMax={15} rotateYMax={15}>
                  <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-pink-900/40 to-pink-900/20 border border-pink-700/30">
                        <MdWork className="w-8 h-8 text-pink-300" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-200">
                        My Approach
                      </h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
                      I believe in writing clean, maintainable code following
                      best practices. Every project starts with understanding
                      requirements, designing optimal solutions using DSA
                      principles, and implementing with attention to performance
                      and scalability. I focus on creating robust architectures
                      backed by efficient algorithms.
                    </p>
                  </div>
                </ReactAtropos>
              </div>

              <div className="space-y-8">
                <ReactAtropos rotateXMax={15} rotateYMax={15}>
                  <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-700/30">
                        <IoRocket className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-200">
                        My Mission
                      </h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
                      To continuously enhance my skills in full-stack
                      development, cloud computing, and AI while solving complex
                      real-world problems. I aim to contribute to meaningful
                      projects that leverage cutting-edge technologies and
                      follow software engineering best practices.
                    </p>
                  </div>
                </ReactAtropos>

                <div className="backdrop-blur-sm bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10">
                  <h3 className="text-2xl font-bold text-gray-200 mb-6">
                    Connect With Me
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        icon: <FiGithub />,
                        label: "GitHub",
                        username: "@basharahmadkhan10",
                        link: "https://github.com/basharahmadkhan10",
                      },
                      {
                        icon: <FiLinkedin />,
                        label: "LinkedIn",
                        username: "Bashar Ahmad Khan",
                        link: "https://linkedin.com/in/basharahmadkhan10",
                      },
                      {
                        icon: <FiMail />,
                        label: "Email",
                        username: "basharahmadkhan10@gmail.com",
                        link: "mailto:basharahmadkhan10@gmail.com",
                      },
                      {
                        icon: <MdComputer />,
                        label: "LeetCode",
                        username: "350+ Problems Solved",
                        link: "https://leetcode.com",
                      },
                    ].map((social, idx) => (
                      <a
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col p-4 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-800/50 hover:from-purple-900/30 hover:to-pink-900/20 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-white/5">
                            {social.icon}
                          </div>
                          <span className="font-semibold text-gray-300 group-hover:text-white">
                            {social.label}
                          </span>
                        </div>
                        <span className="text-sm text-gray-400 group-hover:text-gray-300">
                          {social.username}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="skills"
        className="min-h-screen flex items-center px-4 md:px-6 lg:px-8 py-12 md:py-20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 text-center">
              <span className="text-gray-300">My Technical</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Stack
              </span>
            </h2>

            <p className="text-gray-400 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed">
              Technologies and tools I use to build modern, scalable web
              applications
            </p>

            <div className="mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-8 text-center">
                Programming Languages
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                {[
                  {
                    icon: <FaPython className="text-3xl" />,
                    name: "Python",
                    description: "5★ HackerRank",
                    color: "from-blue-800 to-yellow-700",
                    level: "Advanced",
                  },
                  {
                    icon: <TbBrandCpp className="text-3xl" />,
                    name: "C++",
                    description: "4★ HackerRank",
                    color: "from-blue-800 to-indigo-700",
                    level: "Advanced",
                  },
                  {
                    icon: <FiCode className="text-3xl" />,
                    name: "C",
                    description: "3★ HackerRank",
                    color: "from-blue-700 to-cyan-600",
                    level: "Intermediate",
                  },
                  {
                    icon: <FaJava className="text-3xl" />,
                    name: "Java",
                    description: "Object-Oriented",
                    color: "from-red-800 to-orange-700",
                    level: "Intermediate",
                  },
                  {
                    icon: <TbBrandJavascript className="text-3xl" />,
                    name: "JavaScript",
                    description: "ES6+",
                    color: "from-yellow-800 to-yellow-600",
                    level: "Advanced",
                  },
                ].map((skill, idx) => (
                  <ReactAtropos
                    key={idx}
                    className="h-full"
                    rotateXMax={25}
                    rotateYMax={25}
                    shadowScale={1.3}
                    highlight={true}
                    alwaysActive={true}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="h-full p-6 rounded-3xl backdrop-blur-sm bg-gray-900/40 border-2 border-gray-800/50 group hover:border-purple-700/50 transition-all duration-500 flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-700/0 via-purple-700/0 to-purple-700/0 group-hover:from-purple-700/20 group-hover:via-pink-700/10 group-hover:to-purple-700/20 blur-lg transition-all duration-700" />

                      <div className="relative z-10 w-full">
                        <div
                          className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${skill.color} p-1 mb-4 shadow-2xl shadow-current/20`}
                        >
                          <div className="w-full h-full rounded-2xl bg-gray-950/90 flex items-center justify-center">
                            <div className="text-white">{skill.icon}</div>
                          </div>
                        </div>

                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                          {skill.name}
                        </h4>

                        <p className="text-gray-400 text-sm mb-3">
                          {skill.description}
                        </p>

                        <div className="w-full bg-gray-800/50 rounded-full h-2 mb-1">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-700`}
                            style={{
                              width: skill.level === "Advanced" ? "90%" : "70%",
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">
                          {skill.level}
                        </span>
                      </div>
                    </motion.div>
                  </ReactAtropos>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-8 text-center">
                Web Development
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                {[
                  {
                    icon: <TbBrandReact />,
                    name: "React.js",
                    description: "Frontend Library",
                    color: "from-cyan-800 to-blue-700",
                    level: "Advanced",
                  },
                  {
                    icon: <TbBrandNodejs />,
                    name: "Node.js",
                    description: "Runtime",
                    color: "from-green-800 to-emerald-700",
                    level: "Intermediate",
                  },
                  {
                    icon: <SiExpress />,
                    name: "Express.js",
                    description: "Backend Framework",
                    color: "from-gray-700 to-gray-800",
                    level: "Intermediate",
                  },
                  {
                    icon: <TbBrandMongodb />,
                    name: "MongoDB",
                    description: "NoSQL Database",
                    color: "from-green-700 to-emerald-600",
                    level: "Intermediate",
                  },
                  {
                    icon: <SiTailwindcss />,
                    name: "Tailwind CSS",
                    description: "CSS Framework",
                    color: "from-teal-800 to-cyan-700",
                    level: "Advanced",
                  },
                  {
                    icon: <TbBrandTypescript />,
                    name: "TypeScript",
                    description: "Type Safety",
                    color: "from-blue-800 to-indigo-700",
                    level: "Intermediate",
                  },
                  {
                    icon: <TbBrandNextjs />,
                    name: "Next.js",
                    description: "React Framework",
                    color: "from-gray-800 to-gray-900",
                    level: "Intermediate",
                  },
                  {
                    icon: <TbBrandPhp />,
                    name: "PHP",
                    description: "Server-side",
                    color: "from-purple-800 to-indigo-700",
                    level: "Basic",
                  },
                ].map((skill, idx) => (
                  <ReactAtropos
                    key={idx}
                    className="h-full"
                    rotateXMax={25}
                    rotateYMax={25}
                    shadowScale={1.3}
                    highlight={true}
                    alwaysActive={true}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="h-full p-6 rounded-3xl backdrop-blur-sm bg-gray-900/40 border-2 border-gray-800/50 group hover:border-purple-700/50 transition-all duration-500 flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-700/0 via-purple-700/0 to-purple-700/0 group-hover:from-purple-700/20 group-hover:via-pink-700/10 group-hover:to-purple-700/20 blur-lg transition-all duration-700" />

                      <div className="relative z-10 w-full">
                        <div
                          className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${skill.color} p-1 mb-4 shadow-2xl shadow-current/20`}
                        >
                          <div className="w-full h-full rounded-2xl bg-gray-950/90 flex items-center justify-center">
                            <div className="text-3xl text-white">
                              {skill.icon}
                            </div>
                          </div>
                        </div>

                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                          {skill.name}
                        </h4>

                        <p className="text-gray-400 text-sm mb-3">
                          {skill.description}
                        </p>

                        <div className="w-full bg-gray-800/50 rounded-full h-2 mb-1">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-700`}
                            style={{
                              width:
                                skill.level === "Advanced"
                                  ? "90%"
                                  : skill.level === "Intermediate"
                                  ? "70%"
                                  : "50%",
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">
                          {skill.level}
                        </span>
                      </div>
                    </motion.div>
                  </ReactAtropos>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-8 text-center">
                Tools & Platforms
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                {[
                  {
                    icon: <FaGitAlt />,
                    name: "Git",
                    description: "Version Control",
                    color: "from-orange-800 to-red-700",
                    level: "Advanced",
                  },
                  {
                    icon: <IoCodeSlash />,
                    name: "VS Code",
                    description: "Code Editor",
                    color: "from-blue-800 to-cyan-700",
                    level: "Advanced",
                  },
                  {
                    icon: <SiDocker />,
                    name: "Docker",
                    description: "Containerization",
                    color: "from-blue-800 to-cyan-700",
                    level: "Basic",
                  },
                  {
                    icon: <FaAws />,
                    name: "AWS",
                    description: "Cloud Services",
                    color: "from-orange-800 to-yellow-700",
                    level: "Basic",
                  },
                  {
                    icon: <IoAnalytics />,
                    name: "Data Science",
                    description: "NumPy & Tools",
                    color: "from-blue-800 to-green-700",
                    level: "Intermediate",
                  },
                ].map((skill, idx) => (
                  <ReactAtropos
                    key={idx}
                    className="h-full"
                    rotateXMax={25}
                    rotateYMax={25}
                    shadowScale={1.3}
                    highlight={true}
                    alwaysActive={true}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="h-full p-6 rounded-3xl backdrop-blur-sm bg-gray-900/40 border-2 border-gray-800/50 group hover:border-purple-700/50 transition-all duration-500 flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-700/0 via-purple-700/0 to-purple-700/0 group-hover:from-purple-700/20 group-hover:via-pink-700/10 group-hover:to-purple-700/20 blur-lg transition-all duration-700" />

                      <div className="relative z-10 w-full">
                        <div
                          className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${skill.color} p-1 mb-4 shadow-2xl shadow-current/20`}
                        >
                          <div className="w-full h-full rounded-2xl bg-gray-950/90 flex items-center justify-center">
                            <div className="text-2xl text-white">
                              {skill.icon}
                            </div>
                          </div>
                        </div>

                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                          {skill.name}
                        </h4>

                        <p className="text-gray-400 text-sm mb-3">
                          {skill.description}
                        </p>

                        <div className="w-full bg-gray-800/50 rounded-full h-2 mb-1">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-700`}
                            style={{
                              width:
                                skill.level === "Advanced"
                                  ? "90%"
                                  : skill.level === "Intermediate"
                                  ? "70%"
                                  : "50%",
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">
                          {skill.level}
                        </span>
                      </div>
                    </motion.div>
                  </ReactAtropos>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="story"
        className="min-h-screen flex items-center px-4 md:px-6 lg:px-8 py-12 md:py-20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                My Journey
              </span>
              <span className="text-gray-300"> Timeline</span>
            </h2>

            <p className="text-gray-400 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed">
              My academic journey and achievements in Computer Science
            </p>

            <div className="relative">
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-700 via-pink-600 to-transparent">
                <motion.div
                  className="absolute w-full h-16 bg-gradient-to-b from-purple-500/40 via-pink-500/30 to-transparent rounded-full"
                  animate={{
                    y: ["0%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              {[
                {
                  year: "2023 - Present",
                  title: "B.Tech Computer Science",
                  company: "Lovely Professional University",
                  description:
                    "Currently pursuing B.Tech in Computer Science & Engineering with CGPA: 8.09. Specializing in Full-Stack Development, Data Structures, Algorithms, and Software Engineering.",
                  icon: <MdSchool />,
                  side: "left",
                },
                {
                  year: "2024",
                  title: "Training & Certification",
                  company: "Multiple Platforms",
                  description:
                    "Completed Full-Stack Web Development training at CipherSchool. Earned certifications in Cloud Computing, Oracle AI Foundations, Computer Networking, and Hardware & OS.",
                  icon: <GrCertificate />,
                  side: "right",
                },
                {
                  year: "2023",
                  title: "DSA Excellence",
                  company: "Competitive Programming",
                  description:
                    "Solved 350+ problems across platforms. Achieved LeetCode contest rating of 1529. 5-star Python, 4-star C++, 3-star C on HackerRank. 2-star on CodeChef.",
                  icon: <IoCodeSlash />,
                  side: "left",
                },
                {
                  year: "2022",
                  title: "Matriculation",
                  company: "Elegant Public School, Gaya",
                  description:
                    "Completed matriculation with strong foundation in science and mathematics. Developed interest in programming and problem-solving during this period.",
                  icon: <MdSchool />,
                  side: "right",
                },
                {
                  year: "2021 - 2022",
                  title: "Intermediate Education",
                  company: "Dav Public School, Gaya",
                  description:
                    "Completed intermediate education with focus on Physics, Chemistry, and Mathematics. Started learning programming fundamentals in C and C++.",
                  icon: <MdSchool />,
                  side: "left",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: item.side === "left" ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className={`relative flex items-center mb-16 md:mb-20 ${
                    item.side === "left" ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 -translate-x-1/2 z-10 shadow-2xl shadow-purple-500/40">
                    <div className="absolute inset-0 rounded-full animate-ping bg-purple-500/30" />
                  </div>

                  <div
                    className={`ml-14 md:ml-0 md:w-5/12 ${
                      item.side === "left"
                        ? "md:pr-12 md:text-right"
                        : "md:pl-12"
                    }`}
                  >
                    <ReactAtropos
                      rotateXMax={15}
                      rotateYMax={15}
                      shadowScale={1.1}
                      className="h-full"
                    >
                      <div className="backdrop-blur-sm bg-gradient-to-br from-gray-900/60 to-gray-950/60 border-2 border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10 hover:border-purple-700/50 transition-all duration-500">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/40">
                            <div className="text-2xl text-white">
                              {item.icon}
                            </div>
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                              {item.year}
                            </span>
                            <h3 className="text-2xl font-bold text-white mt-1">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-purple-300 font-medium text-lg mb-3">
                          {item.company}
                        </p>
                        <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                          {item.description}
                        </p>
                      </div>
                    </ReactAtropos>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="projects"
        className="min-h-screen flex items-center px-4 md:px-6 lg:px-8 py-12 md:py-20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="text-gray-300">My</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  .Projects
                </span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Full-stack applications demonstrating technical expertise and
                problem-solving abilities
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {[
                {
                  title: "Scribly - AI Note-Taking",
                  category: "MERN Stack • AI Integration",
                  description:
                    "AI-powered note-taking platform with automated summarization, semantic search, encrypted data handling, and real-time calendar syncing. Improved API throughput by 35% and user productivity by 30%.",
                  gradient: "from-purple-800 to-pink-700",
                  tags: ["React", "Node.js", "MongoDB", "OpenAI API", "JWT"],
                  status: "In Progress",
                  metrics: [
                    "35% ↑ API Throughput",
                    "30% ↑ Productivity",
                    "40% ↓ Manual Work",
                  ],
                },
                {
                  title: "Bill Quill - Invoice Management",
                  category: "MERN Stack • Real-time",
                  description:
                    "Real-time invoicing system with dynamic billing workflows, automated calculations, and client/product catalog management. Enhanced billing accuracy by 20% with audit-ready financial logging.",
                  gradient: "from-gray-800 to-purple-700",
                  tags: ["React", "Express", "MongoDB", "XLSX", "REST APIs"],
                  status: "Completed",
                  metrics: [
                    "20% ↑ Billing Accuracy",
                    "Real-time Sync",
                    "XLSX Export",
                  ],
                },
                {
                  title: "Portfolio Website",
                  category: "React • Interactive UI",
                  description:
                    "Interactive portfolio showcasing skills, projects, and journey with 3D effects, smooth animations, and responsive design. Built with modern React ecosystem and Framer Motion.",
                  gradient: "from-indigo-800 to-purple-700",
                  tags: ["React", "Framer Motion", "Tailwind", "3D Effects"],
                  status: "Completed",
                  metrics: [
                    "100% Responsive",
                    "60fps Animations",
                    "SEO Optimized",
                  ],
                },
                {
                  title: "Algorithm Visualizer",
                  category: "Educational Tool • DSA",
                  description:
                    "Interactive visualization tool for sorting and searching algorithms with step-by-step explanations and performance comparisons. Helps understand algorithm complexity visually.",
                  gradient: "from-pink-800 to-purple-700",
                  tags: ["React", "D3.js", "TypeScript", "Algorithms"],
                  status: "In Progress",
                  metrics: [
                    "15+ Algorithms",
                    "Real-time Vis",
                    "Complexity Analysis",
                  ],
                },
                {
                  title: "E-Commerce Dashboard",
                  category: "Full-Stack • Admin Panel",
                  description:
                    "Complete e-commerce solution with admin dashboard, product management, user authentication, and real-time order tracking. Features role-based access control.",
                  gradient: "from-purple-800 to-blue-700",
                  tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],
                  status: "Completed",
                  metrics: [
                    "Role-based Access",
                    "Real-time Orders",
                    "Product Mgmt",
                  ],
                },
                {
                  title: "Code Review Assistant",
                  category: "AI • Developer Tool",
                  description:
                    "AI-powered code review tool that analyzes code quality, suggests improvements, and detects common anti-patterns using OpenAI API and custom analysis algorithms.",
                  gradient: "from-pink-800 to-red-700",
                  tags: ["Python", "FastAPI", "React", "OpenAI API"],
                  status: "Planned",
                  metrics: ["AI Analysis", "Code Quality", "Best Practices"],
                },
              ].map((project, idx) => (
                <ReactAtropos
                  key={idx}
                  className="h-full"
                  rotateXMax={20}
                  rotateYMax={20}
                  shadowScale={1.2}
                  highlight={true}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="h-full p-6 sm:p-8 rounded-3xl backdrop-blur-sm bg-gradient-to-br from-gray-900/60 to-gray-950/60 border-2 border-gray-800/50 group hover:border-purple-700/50 transition-all duration-500 flex flex-col relative overflow-hidden"
                  >
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === "Completed"
                          ? "bg-green-900/30 text-green-300 border border-green-800/30"
                          : project.status === "In Progress"
                          ? "bg-yellow-900/30 text-yellow-300 border border-yellow-800/30"
                          : "bg-blue-900/30 text-blue-300 border border-blue-800/30"
                      }`}
                    >
                      {project.status}
                    </div>

                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${project.gradient} p-1 mb-6 shadow-xl`}
                    >
                      <div className="w-full h-full rounded-2xl bg-gray-950/90 flex items-center justify-center">
                        <IoSparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-purple-900/30 text-purple-300 border border-purple-800/30">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 flex-grow leading-relaxed text-sm sm:text-base mb-6">
                      {project.description}
                    </p>

                    {project.metrics && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.metrics.map((metric, metricIdx) => (
                          <span
                            key={metricIdx}
                            className="px-2 py-1 text-xs rounded-full bg-gray-800/30 text-gray-300 border border-gray-700/30"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2 py-1 text-xs rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("Project link will be added soon!");
                        }}
                        className="flex items-center gap-2 text-purple-300 text-sm font-medium hover:text-purple-200 transition-colors group/link"
                      >
                        <span>View Project</span>
                        <FiExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                      <div className="flex items-center gap-1 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs">Explore</span>
                        <FiArrowDown className="w-3 h-3" />
                      </div>
                    </div>
                  </motion.div>
                </ReactAtropos>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="contact"
        className="min-h-screen flex items-center px-4 md:px-6 lg:px-8 py-12 md:py-20"
      >
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
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
              <div className=" w-86 md:w-120 md:h-140 p-6 sm:p-8 md:p-10 rounded-3xl backdrop-blur-sm bg-gradient-to-br from-gray-900/60 to-gray-950/60 border-2 border-gray-800/50 shadow-2xl shadow-purple-900/10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  Send Me a Message
                </h3>
                <form
                  action="https://formspree.io/f/xyzrvklw"
                  method="POST"
                  className="space-y-6"
                >
                  {/* Hidden fields for configuration */}
                  <input
                    type="hidden"
                    name="_subject"
                    value="New Message from Portfolio!"
                  />
                  <input
                    type="text"
                    name="_gotcha"
                    style={{ display: "none" }}
                  />{" "}
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
                      name="text"
                      placeholder="Tell me about Yourself"
                      className="w-full p-4 bg-gray-900/50 border-2 border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-700 transition-all"
                      required
                    />
                  </div>
                  {/* Repeat for email and message fields with name="email" and name="message" */}
                  <motion.button
                    type="submit" // Keep as "submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 bg-gradient-to-r from-purple-700 to-pink-600 rounded-xl font-bold text-white tracking-wider hover:shadow-2xl hover:shadow-purple-500/30 transition-all text-lg"
                  >
                    SEND MESSAGE
                  </motion.button>
                </form>
              </div>

              <div className="flex flex-col justify-center space-y-8">
                <div className="w-86 md:w-120 backdrop-blur-sm bg-gradient-to-br from-gray-900/60 to-gray-950/60 border-2 border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                    Get In Touch
                  </h3>
                  <div className="space-y-6">
                    {[
                      {
                        icon: <FiMail />,
                        title: "Email",
                        value: "basharahmadkhan10@gmail.com",
                        link: "mailto:basharahmadkhan10@gmail.com",
                      },
                      {
                        icon: <FiLinkedin />,
                        title: "LinkedIn",
                        value: "linkedin.com/in/basharahmadkhan10",
                        link: "https://linkedin.com/in/basharahmadkhan10",
                      },
                      {
                        icon: <FiGithub />,
                        title: "GitHub",
                        value: "github.com/basharahmadkhan10",
                        link: "https://github.com/basharahmadkhan10",
                      },
                      {
                        icon: <IoCodeSlash />,
                        title: "LeetCode",
                        value: "350+ Problems Solved",
                        link: "https://leetcode.com",
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
                        <div className="flex-1">
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

                <div className=" w-86 md:w-120 backdrop-blur-sm bg-gradient-to-br from-gray-900/60 to-gray-950/60 border-2 border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Let's Collaborate
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    Seeking internships and full-time opportunities in software
                    development. Open to freelance projects and technical
                    collaborations.
                  </p>
                  <div className="grid grid-cols-2 gap-4 ">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDownloadCV}
                      disabled={isDownloading}
                      className={`flex items-center gap-2 px-4 pl-8 py-2 rounded-xl bg-gradient-to-r from-purple-900/30 to-pink-900/20 text-purple-300 border border-purple-800/30 hover:border-purple-700/50 transition-all atropos-button-fix ${
                        isDownloading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <FiDownload className="w-2 md:w-4 h-4" />
                      <span className="text-sm">
                        {isDownloading ? "Downloading..." : "Download CV"}
                      </span>
                    </motion.button>
                    <button
                      onClick={() => scrollToSection(4)}
                      className="py-3 bg-gradient-to-r from-pink-900/30 to-pink-900/10 text-pink-300 rounded-xl hover:bg-gradient-to-r hover:from-pink-800/40 hover:to-pink-800/20 transition-all border border-pink-800/30 text-sm font-medium flex items-center justify-center"
                    >
                      View Projects
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
  );
};

export default Home;

