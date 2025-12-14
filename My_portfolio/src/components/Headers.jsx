import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiHome, FiUser, FiFolder, FiMail, FiBriefcase } from "react-icons/fi";
import { TbCertificate } from "react-icons/tb";
import { IoCodeSlash } from "react-icons/io5";

const Headers = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { id: "hero", label: "Home", icon: <FiHome className="w-4 h-4" /> },
    { id: "about", label: "About", icon: <FiUser className="w-4 h-4" /> },
    {
      id: "skills",
      label: "Skills",
      icon: <TbCertificate className="w-4 h-4" />,
    },
    {
      id: "story",
      label: "Journey",
      icon: <FiBriefcase className="w-4 h-4" />,
    },
    {
      id: "projects",
      label: "Projects",
      icon: <FiFolder className="w-4 h-4" />,
    },
    { id: "contact", label: "Contact", icon: <FiMail className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 90);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.id);
      const scrollPos = window.scrollY + 100; // Offset for header

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (
            scrollPos >= sectionTop &&
            scrollPos < sectionTop + sectionHeight
          ) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 99,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto"
    >
      {/* Main Navigation Container */}
      <div className="relative">
        {/* Glowing background effect */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-900/20 via-purple-800/10 to-pink-900/20 blur-xl transition-all duration-500 ${
            scrolled ? "opacity-100" : "opacity-50"
          }`}
        />

        {/* Floating Navigation Bar */}
        <div
          className={`relative backdrop-blur-xl border border-gray-800/50 rounded-2xl transition-all duration-500 ${
            scrolled
              ? "bg-gray-900/80 shadow-2xl shadow-purple-900/20"
              : "bg-gray-900/40 shadow-lg shadow-purple-900/10"
          }`}
        >
          {/* Decorative top line */}
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

          <nav className="flex items-center px-4 py-2">
            {/* Logo/Initial */}
            <motion.div whileHover={{ scale: 1.1 }} className="mr-4 md:mr-6">
              <button
                onClick={() => scrollToSection("hero")}
                className="relative group"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-900/30">
                  <IoCodeSlash className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-purple-600/30 to-pink-600/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </motion.div>

            {/* Navigation Items */}
            <div className="flex items-center gap-1 md:gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`relative px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 group ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 hover:text-purple-300"
                      }`}
                    >
                      {/* Icon */}
                      <span
                        className={`transition-transform duration-300 ${
                          isActive ? "scale-110" : "group-hover:scale-110"
                        }`}
                      >
                        {item.icon}
                      </span>

                      {/* Label - Hidden on mobile, visible on md+ */}
                      <span className="hidden md:inline text-sm font-medium tracking-tight">
                        {item.label}
                      </span>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-900/40 to-pink-900/30 border border-purple-700/30"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Hover effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-900/0 via-purple-900/0 to-pink-900/0 group-hover:from-purple-900/20 group-hover:via-purple-900/10 group-hover:to-pink-900/20 transition-all duration-300" />
                    </button>

                    {/* Tooltip for mobile */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900/90 backdrop-blur-sm rounded-lg text-xs font-medium text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 md:hidden border border-gray-800/50">
                      {item.label}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/90 rotate-45 border-b border-r border-gray-800/50" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </nav>

          {/* Decorative bottom line */}
          <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />
        </div>

        {/* Connection line between items (desktop only) */}
        <div className="absolute left-[4.5rem] right-4 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-purple-600/10 via-purple-500/10 to-pink-600/10 hidden md:block pointer-events-none" />
      </div>
    </motion.header>
  );
};

export default Headers;
