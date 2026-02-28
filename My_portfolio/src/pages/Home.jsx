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
  FiStar,
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
    "800+ DSA Problems Solved",
    "Competitive Programmer",
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

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const message = formData.get("message") || "";
    
    const subject = `Portfolio Contact: Message from ${name}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    const mailtoLink = `mailto:basharahmadkhan10@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(mailtoLink, "_blank");
    setTimeout(() => form.reset(), 100);
  };

  const projectLinks = {
    civicfix: "https://civicfix-frontend02.onrender.com",
    billquill: "https://bill-quill-frontend.onrender.com",
    portfolio: "https://portfolio03.onrender.com",
  };

  if (showPreloader) {
    return <Preloader onComplete={() => setShowPreloader(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
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

      <section id="hero" className="min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8 pt-20 md:pt-24">
        <div className="max-w-6xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 md:mb-16"
          >
            <div className="relative mb-8 md:mb-12">
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[0.9] mb-6 md:mb-8">
                <span className="block text-gray-300 mb-3 md:mb-4">Hello, I'm</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-3 md:mb-4">
                  Bashar Ahmad Khan
                </span>
                <span className="block text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mt-6 md:mt-8">
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
  className="max-w-4xl mx-auto mb-8 md:mb-16 px-4 sm:px-0"
>
  <ReactAtropos
    rotateXMax={15}
    rotateYMax={15}
    shadowScale={1.2}
    highlight={true}
    alwaysActive={true}
    className="w-full"
  >
    <div className="relative aspect-[3/4] sm:aspect-[16/9] md:aspect-[21/12] rounded-2xl sm:rounded-3xl md:rounded-4xl overflow-hidden border border-purple-800/50 shadow-xl shadow-purple-900/30">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/30 to-gray-950/90" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-12">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
          <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-700/30">
            <IoCodeSlash className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-purple-300" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5 sm:mb-1">
              Lovely Professional University
            </h2>
            <p className="text-purple-300 text-xs sm:text-sm md:text-base lg:text-lg">
              B.Tech CSE • CGPA: 8.30/10
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <p className="text-gray-300 text-sm sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-3 sm:mb-6 px-2 sm:px-0">
            Passionate about building{" "}
            <span className="text-purple-300 font-semibold">
              scalable web apps
            </span>{" "}
            with MERN & solving{" "}
            <span className="text-pink-300 font-semibold">
              800+ DSA problems
            </span>
          </p>

          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3 mb-3 sm:mb-8 px-2">
            {[
              "MERN", 
              "800+ DSA", 
              "React", 
              "Node.js", 
              "MongoDB", 
              "TypeScript", 
              "Python", 
              "Java"
            ].map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-gradient-to-r from-purple-900/30 to-pink-900/20 text-purple-300 text-[10px] sm:text-xs md:text-sm border border-purple-800/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:hidden mt-1">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-900/20 border border-purple-800/30">
            <span className="text-[8px] text-purple-300">LPU</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-pink-900/20 border border-pink-800/30">
            <span className="text-[8px] text-pink-300">8.30 CGPA</span>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-16 border-t-2 border-l-2 border-purple-500/50 rounded-tl-2xl sm:rounded-tl-3xl" />
      <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-16 border-t-2 border-r-2 border-pink-500/50 rounded-tr-2xl sm:rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-12 sm:h-16 border-b-2 border-l-2 border-purple-500/50 rounded-bl-2xl sm:rounded-bl-3xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-16 border-b-2 border-r-2 border-pink-500/50 rounded-br-2xl sm:rounded-br-3xl" />
    </div>
  </ReactAtropos>
</motion.div>

          <div className="flex justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadCV}
              disabled={isDownloading}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-900/30 to-pink-900/20 text-purple-300 border border-purple-800/30 hover:border-purple-700/50 transition-all ${
                isDownloading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FiDownload className="w-4 h-4" />
              <span className="text-sm">{isDownloading ? "Downloading..." : "Download CV"}</span>
            </motion.button>
          </div>

          {isReady && (
            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-300" style={{ opacity }}>
              <div className="flex flex-col items-center gap-2">
                <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll to Explore</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <FiArrowDown className="w-5 h-5 text-purple-400" />
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="about" className="min-h-screen flex items-center px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">About</span>
              <span className="text-gray-300"> Me</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
              <div className="space-y-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group relative backdrop-blur-sm bg-gray-900/50 border border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10 overflow-hidden transition-all duration-300 hover:shadow-purple-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-purple-900/20 border border-purple-700/30">
                      <IoPerson className="w-8 h-8 text-purple-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-200">Who I Am</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
                    I'm a dedicated Computer Science Engineering student at{" "}
                    <span className="text-purple-300 font-semibold">Lovely Professional University (CGPA: 8.30)</span>
                    , specializing in Full-Stack MERN Development. With expertise in building scalable web applications
                    and solving 800+ DSA problems, I combine academic knowledge with practical skills to create efficient solutions.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group relative backdrop-blur-sm bg-gray-900/50 border border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10 overflow-hidden transition-all duration-300 hover:shadow-purple-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-pink-900/40 to-pink-900/20 border border-pink-700/30">
                      <MdWork className="w-8 h-8 text-pink-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-200">My Approach</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
                    I believe in writing clean, maintainable code following best practices. Every project starts with
                    understanding requirements, designing optimal solutions using DSA principles, and implementing with
                    attention to performance and scalability. I focus on creating robust architectures backed by efficient algorithms.
                  </p>
                </motion.div>
              </div>

              <div className="space-y-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group relative backdrop-blur-sm bg-gray-900/50 border border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10 overflow-hidden transition-all duration-300 hover:shadow-purple-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-700/30">
                      <IoRocket className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-200">My Mission</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
                    To continuously enhance my skills in full-stack development, cloud computing, and AI while solving
                    complex real-world problems. I aim to contribute to meaningful projects that leverage cutting-edge
                    technologies and follow software engineering best practices.
                  </p>
                </motion.div>

                <div className="backdrop-blur-sm bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10">
                  <h3 className="text-2xl font-bold text-gray-200 mb-6">Connect With Me</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: <FiGithub />, label: "GitHub", username: "@basharahmadkhan10", link: "https://github.com/basharahmadkhan10" },
                      { icon: <FiLinkedin />, label: "LinkedIn", username: "Bashar Ahmad Khan", link: "https://linkedin.com/in/basharahmadkhan10" },
                      { icon: <FiMail />, label: "Email", username: "basharahmadkhan10@gmail.com", link: "mailto:basharahmadkhan10@gmail.com" },
                      { icon: <MdComputer />, label: "DSA", username: "800+ Problems Solved", link: "https://codolio.com/profile/Bash24k" },
                    ].map((social, idx) => (
                      <a
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col p-4 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-800/50 hover:from-purple-900/30 hover:to-pink-900/20 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-white/5">{social.icon}</div>
                          <span className="font-semibold text-gray-300 group-hover:text-white">{social.label}</span>
                        </div>
                        <span className="text-sm text-gray-400 group-hover:text-gray-300">{social.username}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <section id="skills" className="min-h-screen flex items-center px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 text-center">
              <span className="text-gray-300">Technical </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Skills</span>
            </h2>

            <p className="text-gray-400 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed">
              Technologies and tools I use to build modern, scalable web applications
            </p>

            <div className="mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-8 text-center">Programming Languages</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                {[
                  { icon: <FaPython className="text-3xl" />, name: "Python", description: "5★ HackerRank", color: "from-blue-800 to-yellow-700", level: "Intermediate" },
                  { icon: <TbBrandCpp className="text-3xl" />, name: "C++", description: "5★ HackerRank", color: "from-blue-800 to-indigo-700", level: "Intermediate"},
                  { icon: <FiCode className="text-3xl" />, name: "C", description: "5★ HackerRank", color: "from-blue-700 to-cyan-600", level: "Intermediate"},
                  { icon: <FaJava className="text-3xl" />, name: "Java", description: "5★ HackerRank", color: "from-red-800 to-orange-700", level: "Intermediate" },
                  { icon: <TbBrandJavascript className="text-3xl" />, name: "JavaScript", description: "ES6+", color: "from-yellow-800 to-yellow-600", level: "Intermediate" },
                ].map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    className="group relative h-full p-6 rounded-3xl backdrop-blur-sm bg-gray-900/40 border-2 border-gray-800/50 hover:border-purple-700/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    <div className="relative z-10 w-full">
                      <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${skill.color} p-1 mb-4 shadow-2xl shadow-current/20`}>
                        <div className="w-full h-full rounded-2xl bg-gray-950/90 flex items-center justify-center">
                          <div className="text-white">{skill.icon}</div>
                        </div>
                      </div>

                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                        {skill.name}
                      </h4>

                      <p className="text-gray-400 text-sm mb-3 flex items-center justify-center gap-1">
                        {skill.description}
            
                      </p>

                      <div className="w-full bg-gray-800/50 rounded-full h-2 mb-1">
                        <div className={`h-full rounded-full bg-gradient-to-r ${skill.color}`} style={{ width: "95%" }} />
                      </div>
                      <span className="text-xs text-gray-400">{skill.level}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-8 text-center">Web Development</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                {[
                  { icon: <TbBrandReact />, name: "React.js", description: "Frontend Library", color: "from-cyan-800 to-blue-700", level: "Intermediate" },
                  { icon: <TbBrandNodejs />, name: "Node.js", description: "Runtime", color: "from-green-800 to-emerald-700", level: "Intermediate" },
                  { icon: <SiExpress />, name: "Express.js", description: "Backend Framework", color: "from-gray-700 to-gray-800", level: "Intermediate" },
                  { icon: <TbBrandMongodb />, name: "MongoDB", description: "NoSQL Database", color: "from-green-700 to-emerald-600", level: "Intermediate" },
                  { icon: <SiTailwindcss />, name: "Tailwind CSS", description: "CSS Framework", color: "from-teal-800 to-cyan-700", level: "Intermediate" },
                  { icon: <TbBrandTypescript />, name: "TypeScript", description: "Type Safety", color: "from-blue-800 to-indigo-700", level: "Intermediate" },
                  { icon: <TbBrandNextjs />, name: "Next.js", description: "React Framework", color: "from-gray-800 to-gray-900", level: "Intermediate" },
                  { icon: <TbBrandPhp />, name: "PHP", description: "Server-side", color: "from-purple-800 to-indigo-700", level: "Basic" },
                ].map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    className="group relative h-full p-6 rounded-3xl backdrop-blur-sm bg-gray-900/40 border-2 border-gray-800/50 hover:border-purple-700/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    <div className="relative z-10 w-full">
                      <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${skill.color} p-1 mb-4 shadow-2xl shadow-current/20`}>
                        <div className="w-full h-full rounded-2xl bg-gray-950/90 flex items-center justify-center">
                          <div className="text-3xl text-white">{skill.icon}</div>
                        </div>
                      </div>

                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                        {skill.name}
                      </h4>

                      <p className="text-gray-400 text-sm mb-3">{skill.description}</p>

                      <div className="w-full bg-gray-800/50 rounded-full h-2 mb-1">
                        <div className={`h-full rounded-full bg-gradient-to-r ${skill.color}`} style={{ width: skill.level === "Advanced" ? "90%" : skill.level === "Intermediate" ? "70%" : "50%" }} />
                      </div>
                      <span className="text-xs text-gray-400">{skill.level}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-8 text-center">Tools & Platforms</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 justify-center">
                {[
                  { icon: <FaGitAlt />, name: "Git", description: "Version Control", color: "from-orange-800 to-red-700", level: "Advanced" },
                  { icon: <IoCodeSlash />, name: "VS Code", description: "Code Editor", color: "from-blue-800 to-cyan-700", level: "Advanced" },
                  { icon: <SiDocker />, name: "Docker", description: "Containerization", color: "from-blue-800 to-cyan-700", level: "Basic" },
        
                ].map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    className="group relative h-full p-6 rounded-3xl backdrop-blur-sm bg-gray-900/40 border-2 border-gray-800/50 hover:border-purple-700/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    <div className="relative z-10 w-full">
                      <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${skill.color} p-1 mb-4 shadow-2xl shadow-current/20`}>
                        <div className="w-full h-full rounded-2xl bg-gray-950/90 flex items-center justify-center">
                          <div className="text-2xl text-white">{skill.icon}</div>
                        </div>
                      </div>

                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                        {skill.name}
                      </h4>

                      <p className="text-gray-400 text-sm mb-3">{skill.description}</p>

                      <div className="w-full bg-gray-800/50 rounded-full h-2 mb-1">
                        <div className={`h-full rounded-full bg-gradient-to-r ${skill.color}`} style={{ width: skill.level === "Advanced" ? "90%" : skill.level === "Intermediate" ? "70%" : "50%" }} />
                      </div>
                      <span className="text-xs text-gray-400">{skill.level}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="story" className="min-h-screen flex items-center px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">My Journey</span>
              <span className="text-gray-300"> Timeline</span>
            </h2>

            <p className="text-gray-400 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed">
              My academic journey and achievements in Computer Science
            </p>

            <div className="relative">
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-700 via-pink-600 to-transparent">
                <motion.div
                  className="absolute w-full h-16 bg-gradient-to-b from-purple-500/40 via-pink-500/30 to-transparent rounded-full"
                  animate={{ y: ["0%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {[
                { year: "2024", title: "Training & Certification", company: "Multiple Platforms", description: "Completed Full-Stack Web Development training at CipherSchool. Earned certifications in Cloud Computing, Oracle AI Foundations, Computer Networking, and Hardware & OS.", icon: <GrCertificate />, side: "right" },
                { year: "2023 - Present", title: "DSA Excellence", company: "Competitive Programming", description: "Solved 800+ problems across platforms. Achieved LeetCode contest rating of 1414. 5-star Python, C++, C, Java on HackerRank, 2-star on CodeChef.", icon: <IoCodeSlash />, side: "left" },
                { year: "2023 - Present", title: "B.Tech Computer Science", company: "Lovely Professional University", description: "Currently pursuing B.Tech in Computer Science & Engineering with CGPA: 8.30. Specializing in Full-Stack Development, Data Structures, Algorithms, and Software Engineering.", icon: <MdSchool />, side: "left" },  
                { year: "2020-2022", title: "Intermediate Education", company: "Dav Public School, Gaya", description: "Completed intermediate education with focus on Physics, Chemistry, and Mathematics. Started learning programming fundamentals in C and C++.", icon: <MdSchool />, side: "left" },
                { year: "2019-2020", title: "Matriculation", company: "Elegant Public School, Gaya", description: "Completed matriculation with strong foundation in science and mathematics. Developed interest in programming and problem-solving during this period.", icon: <MdSchool />, side: "right" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: item.side === "left" ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className={`relative flex items-start mb-16 md:mb-20 ${item.side === "left" ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="absolute left-4 md:left-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 -translate-x-1/2 z-10 shadow-2xl shadow-purple-500/40">
                    <div className="absolute inset-0 rounded-full animate-ping bg-purple-500/30" />
                  </div>

                  <div className={`ml-14 md:ml-0 md:w-5/12 ${item.side === "left" ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="group relative backdrop-blur-sm bg-gradient-to-br from-gray-900/60 to-gray-950/60 border-2 border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10 hover:border-purple-700/50 hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/40">
                          <div className="text-2xl text-white">{item.icon}</div>
                        </div>
                        <div className="text-left">
                          <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                            {item.year}
                          </span>
                          <h3 className="text-2xl font-bold text-white mt-1">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-purple-300 font-medium text-lg mb-3 text-left">{item.company}</p>
                      <p className="text-gray-400 leading-relaxed text-sm sm:text-base text-left">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="min-h-screen flex items-center px-4 md:px-6 lg:px-8 py-12 md:py-20">
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Projects</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Full-stack applications demonstrating technical expertise and problem-solving abilities
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {[
                {
                  id: "civicfix",
                  title: "CivicFix - Civic Issue Reporting Platform",
                  category: "MERN Stack • RBAC • SLA Monitoring",
                  description: "A civic issue management system enabling citizens and government stakeholders to report, track, and resolve public infrastructure issues with transparent accountability.",
                  gradient: "from-purple-800 to-pink-700",
                  tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "RBAC", "REST APIs"],
                  metrics: ["4 Role-based User Types", "100% Valid Status Transitions", "40% ↓ Manual Work"],
                },
                {
                  id: "billquill",
                  title: "Bill Quill - Invoice Management",
                  category: "MERN Stack • Real-time",
                  description: "Real-time invoicing system with dynamic billing workflows, automated calculations, and client/product catalog management. Enhanced billing accuracy by 20% with audit-ready financial logging.",
                  gradient: "from-gray-800 to-purple-700",
                  tags: ["React", "Express", "MongoDB", "XLSX", "REST APIs"],
                  metrics: ["20% ↑ Billing Accuracy", "Real-time Sync", "XLSX Export"],
                },
                {
                  id: "portfolio",
                  title: "Portfolio Website",
                  category: "React • Interactive UI",
                  description: "Interactive portfolio showcasing skills, projects, and journey with smooth animations and responsive design. Built with modern React ecosystem and optimized for performance.",
                  gradient: "from-indigo-800 to-purple-700",
                  tags: ["React", "Framer Motion", "Tailwind", "Optimized"],
                  metrics: ["100% Responsive", "60fps Animations", "SEO Optimized"],
                },
              ].map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative h-full p-6 sm:p-8 rounded-3xl backdrop-blur-sm bg-gradient-to-br from-gray-900/60 to-gray-950/60 border-2 border-gray-800/50 hover:border-purple-700/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-300 border border-green-800/30">
                    Completed
                  </div>

                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${project.gradient} p-1 mb-6 shadow-xl`}>
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

                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base mb-6 min-h-[100px]">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.metrics.map((metric, metricIdx) => (
                      <span key={metricIdx} className="px-2 py-1 text-xs rounded-full bg-gray-800/30 text-gray-300 border border-gray-700/30">
                        {metric}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="px-2 py-1 text-xs rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <a
                      href={projectLinks[project.id]}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (!projectLinks[project.id]) {
                          e.preventDefault();
                          alert("Project link will be added soon!");
                        }
                      }}
                      className="flex items-center gap-2 text-purple-300 text-sm font-medium hover:text-purple-200 transition-colors group/link z-10"
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
              ))}
            </div>
          </motion.div>
        </div>
      </section>

  
      <section id="contact" className="min-h-screen flex items-center px-4 md:px-6 lg:px-8 py-12 md:py-20">
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Something Amazing</span>
            </h2>

            <p className="text-gray-400 text-lg md:text-xl mb-12 md:mb-16 leading-relaxed max-w-3xl mx-auto">
              I'm currently seeking internships and full-time opportunities in software development.
              Let's discuss how we can work together on innovative projects!
            </p>

            <div className="grid lg:grid-cols-2 gap-10 md:gap-12">
              <div className="w-full p-6 sm:p-8 md:p-10 rounded-3xl backdrop-blur-sm bg-gradient-to-br from-gray-900/60 to-gray-950/60 border-2 border-gray-800/50 shadow-2xl shadow-purple-900/10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Send Me a Message</h3>
                <form action="https://formspree.io/f/xyzrvklw" method="POST" className="space-y-6">
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
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 bg-gradient-to-r from-purple-700 to-pink-600 rounded-xl font-bold text-white tracking-wider hover:shadow-2xl hover:shadow-purple-500/30 transition-all text-lg"
                  >
                    SEND MESSAGE
                  </motion.button>
                </form>
              </div>

              <div className="flex flex-col justify-center space-y-8">
                <div className="w-full backdrop-blur-sm bg-gradient-to-br from-gray-900/60 to-gray-950/60 border-2 border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Get In Touch</h3>
                  <div className="space-y-6">
                    {[
                      { icon: <FiMail />, title: "Email", value: "basharahmadkhan10@gmail.com", link: "mailto:basharahmadkhan10@gmail.com" },
                      { icon: <FiLinkedin />, title: "LinkedIn", value: "linkedin.com/in/basharahmadkhan10", link: "https://linkedin.com/in/basharahmadkhan10" },
                      { icon: <FiGithub />, title: "GitHub", value: "github.com/basharahmadkhan10", link: "https://github.com/basharahmadkhan10" },
                      { icon: <IoCodeSlash />, title: "LeetCode", value: "500+ Problems Solved", link: "https://leetcode.com/u/Bash__24k/" },
                    ].map((contact, idx) => (
                      <a
                        key={idx}
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-2xl bg-gray-900/30 hover:bg-gray-800/40 transition-all duration-300 group"
                      >
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/20 group-hover:from-purple-800/40 group-hover:to-pink-800/20 transition-all">
                          {contact.icon}
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="font-semibold text-gray-300 group-hover:text-white">{contact.title}</h4>
                          <p className="text-gray-200 text-sm group-hover:text-gray-300">{contact.value}</p>
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
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDownloadCV}
                      disabled={isDownloading}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-900/30 to-pink-900/20 text-purple-300 border border-purple-800/30 hover:border-purple-700/50 transition-all justify-center ${
                        isDownloading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <FiDownload className="w-4 h-4" />
                      <span className="text-sm">{isDownloading ? "Downloading..." : "Download CV"}</span>
                    </motion.button>
                    <button
                      onClick={() => scrollToSection(4)}
                      className="py-3 bg-gradient-to-r from-pink-900/30 to-pink-900/10 text-pink-300 rounded-xl hover:bg-gradient-to-r hover:from-pink-800/40 hover:to-pink-800/20 transition-all border border-pink-800/30 text-sm font-medium"
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
              <span className="text-gray-400 text-sm">© 2025 Bashar Ahmad Khan. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">Built with React, Framer Motion & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;




