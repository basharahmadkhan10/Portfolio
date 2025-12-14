import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const [pulseText, setPulseText] = useState("INITIALIZING");

  useEffect(() => {
    const texts = [
      "INITIALIZING",
      "LOADING ASSETS",
      "SYNCING DATA",
      "BOOTING UP",
    ];
    let textIndex = 0;

    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % texts.length;
      setPulseText(texts[textIndex]);
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setTimeout(() => {
            setShow(false);
            onComplete?.();
          }, 3000);
          return 100;
        }
        
        const increment = prev < 70 ? 3 : 1.5;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden flex flex-col items-center justify-center px-4"
    >
     
      <div className="absolute inset-0 opacity-[0.03]">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${i * 5}%`,
              background:
                "linear-gradient(90deg, transparent, #a855f7, transparent)",
            }}
          />
        ))}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${i * 2.5}%`,
              background:
                "linear-gradient(180deg, transparent, #a855f7, transparent)",
            }}
          />
        ))}
      </div>

      {/* Floating orbs - Responsive sizing */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full blur-xl sm:blur-2xl md:blur-3xl"
        animate={{
          background: [
            "radial-gradient(circle, rgba(126, 34, 206, 0.4) 0%, rgba(126, 34, 206, 0.1) 50%, transparent 80%)",
            "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 80%)",
            "radial-gradient(circle, rgba(217, 70, 239, 0.4) 0%, rgba(217, 70, 239, 0.1) 50%, transparent 80%)",
            "radial-gradient(circle, rgba(126, 34, 206, 0.4) 0%, rgba(126, 34, 206, 0.1) 50%, transparent 80%)",
          ],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-full blur-xl sm:blur-2xl md:blur-3xl"
        animate={{
          background: [
            "radial-gradient(circle, rgba(217, 70, 239, 0.3) 0%, rgba(217, 70, 239, 0.05) 50%, transparent 80%)",
            "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 80%)",
            "radial-gradient(circle, rgba(126, 34, 206, 0.3) 0%, rgba(126, 34, 206, 0.05) 50%, transparent 80%)",
            "radial-gradient(circle, rgba(217, 70, 239, 0.3) 0%, rgba(217, 70, 239, 0.05) 50%, transparent 80%)",
          ],
          scale: [0.95, 1, 1.05, 0.95],
        }}
        transition={{
          duration: 100,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center w-full max-w-lg px-4">
        {/* Animated title */}
        <div className="relative mb-8 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Subtle text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-2 sm:mt-4"
            >
              <p className="text-gray-300 text-sm sm:text-lg md:text-2xl font-bold tracking-wider px-2">
                Full-Stack Developer & Computer Science Engineer
              </p>
            </motion.div>
          </motion.div>

          {/* Glowing effect - Responsive blur */}
          <div className="absolute -inset-2 sm:-inset-4 md:-inset-8 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 blur-sm sm:blur-xl md:blur-3xl" />
        </div>


        {/* Futuristic loading bar - Responsive width */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-6 sm:mb-8">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span className="text-xs sm:text-sm">SYSTEM BOOT</span>
            <span className="font-mono text-xs sm:text-sm">
              {progress.toString().padStart(3, "0")}%
            </span>
          </div>

          <div className="relative h-1.5 sm:h-2 bg-gray-800/50 rounded-full overflow-hidden border border-gray-700/50">
            {/* Main progress */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute h-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"
            />

            {/* Scan line effect */}
            <motion.div
              className="absolute top-0 bottom-0 w-0.5 sm:w-1 bg-white/80 blur-sm"
              animate={{
                left: ["0%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-sm" />
          </div>

          {/* Grid dots under progress bar */}
          <div className="flex justify-between mt-1 sm:mt-2">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-purple-700/30" />
            ))}
          </div>
        </div>

        {/* Pulsing status text */}
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-8 sm:mb-12"
        >
          <p className="text-gray-300 font-mono tracking-wider text-xs sm:text-sm md:text-base flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <span className="flex items-center gap-1 sm:gap-2">
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"
              />
              <span className="text-xs sm:text-sm">{pulseText}</span>
            </span>
            <span className="text-purple-400 font-mono text-xs sm:text-sm">[LPU-CS]</span>
          </p>
        </motion.div>

        {/* Binary code rain effect */}
        <div className="absolute left-0 right-0 bottom-4 sm:bottom-10 h-16 sm:h-20 opacity-10 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute font-mono text-[10px] sm:text-xs text-purple-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-20px",
              }}
              animate={{
                y: [0, 100],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated rings - Responsive sizing */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute border border-purple-500/20 rounded-full"
            style={{
              width: `clamp(100px, ${120 + i * 60}px, 300px)`,
              height: `clamp(100px, ${120 + i * 60}px, 300px)`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, rgba(168, 85, 247, 0.2) 100%)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, (Math.random() - 0.5) * 15, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
};

export default Preloader;
