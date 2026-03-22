import React from "react";
import { motion } from "framer-motion";
import { FiArrowDown, FiDownload } from "react-icons/fi";
import { IoCodeSlash } from "react-icons/io5";
import ReactAtropos from "../common/ReactAtropos";

const Hero = ({ typingText, handleDownloadCV, isDownloading, opacity }) => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8 pt-40 mt-10 md:pt-24"
    >
      <div className="max-w-6xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <div className="relative mb-8 md:mb-12">
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[0.9] mb-6 md:mb-8">
              <span className="block text-gray-300 mb-3 md:mb-4">
                Hello, I'm
              </span>
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
                      "Java",
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
            <span className="text-sm">
              {isDownloading ? "Downloading..." : "Download CV"}
            </span>
          </motion.button>
        </div>

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
      </div>
    </section>
  );
};

export default Hero;
