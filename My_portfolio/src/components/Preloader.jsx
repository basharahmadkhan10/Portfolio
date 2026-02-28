import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);
  const [matrixText, setMatrixText] = useState("");

  const bootLines = [
    "> SYSTEM INITIALIZATION SEQUENCE",
    "> LOADING KERNEL MODULES...",
    "> MOUNTING FILE SYSTEMS...",
    "> ESTABLISHING NETWORK CONNECTION...",
    "> LOADING DEVELOPMENT ENVIRONMENT...",
    "> SYNCING PROJECT FILES...",
    "> OPTIMIZING PERFORMANCE...",
    "> READY TO DEPLOY"
  ];

  const matrixChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

  useEffect(() => {
    let currentLineIndex = 0;
    const lineInterval = setInterval(() => {
      if (currentLineIndex < bootLines.length - 1) {
        currentLineIndex++;
        setCurrentLine(currentLineIndex);
      }
    }, 400);

    const matrixInterval = setInterval(() => {
      let text = "";
      for (let i = 0; i < 50; i++) {
        text += matrixChars[Math.floor(Math.random() * matrixChars.length)];
      }
      setMatrixText(text);
    }, 100);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(lineInterval);
          clearInterval(matrixInterval);
          setTimeout(() => {
            setShow(false);
            onComplete?.();
          }, 800);
          return 100;
        }
        
        const increment = prev < 70 ? 2.5 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    return () => {
      clearInterval(progressInterval);
      clearInterval(lineInterval);
      clearInterval(matrixInterval);
    };
  }, [onComplete]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-black overflow-hidden flex items-center justify-center"
    >
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #a855f7 1px, transparent 1px),
            linear-gradient(to bottom, #a855f7 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: ['-25%', '25%', '-25%'],
          y: ['-25%', '25%', '-25%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 w-full max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <span className="text-black font-bold text-lg">B</span>
              </div>
              <span className="text-gray-400 font-mono text-sm">bashar@portfolio:~$</span>
            </div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-500"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          className="absolute top-20 left-0 right-0 text-center font-mono text-xs text-purple-500 whitespace-nowrap overflow-hidden"
          style={{ transform: 'rotate(2deg)' }}
        >
          {matrixText}
        </motion.div>

        <div className="space-y-3 mb-12 font-mono">
          {bootLines.slice(0, currentLine + 1).map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 text-sm"
            >
              <span className="text-purple-500">$</span>
              <span className={index === currentLine ? "text-white" : "text-gray-500"}>
                {line}
              </span>
              {index === currentLine && progress < 100 && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-5 bg-purple-500"
                />
              )}
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="text-purple-400">PROGRESS</span>
            <motion.span 
              key={progress}
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-white font-bold"
            >
              {Math.floor(progress)}%
            </motion.span>
          </div>
          
          <div className="relative h-[2px] bg-gray-800 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
            />
            <motion.div
              className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white to-transparent blur-sm"
              animate={{
                left: ["-20%", "120%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <div className="flex gap-1 justify-center">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: Math.random() > 0.5 ? [0.2, 1, 0.2] : 0.2,
                  scale: Math.random() > 0.5 ? [1, 1.5, 1] : 1,
                }}
                transition={{
                  duration: 0.5 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="w-1 h-1 rounded-full bg-purple-500"
              />
            ))}
          </div>
        </div>


        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-4 text-center font-mono text-xs"
        >
          {[
            { label: "MODULES", value: "42" },
            { label: "FUNCTIONS", value: "128" },
            { label: "VERSION", value: "2.0.4" },
          ].map((stat, i) => (
            <div key={i} className="border border-purple-500/20 p-3">
              <div className="text-gray-600 mb-1">{stat.label}</div>
              <motion.div
                key={progress}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-purple-400 font-bold"
              >
                {stat.value}
              </motion.div>
            </div>
          ))}
        </motion.div>

        <motion.div
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute bottom-8 left-0 right-0 text-center font-mono text-[8px] text-purple-500/30 tracking-[0.5em]"
        >
          {progress < 100 ? ">_ LOADING" : ">_ READY"}
        </motion.div>
      </div>

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-purple-500/10 text-2xl font-bold"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {Math.random() > 0.5 ? "{ }" : "< />"}
        </motion.div>
      ))}

      {progress >= 100 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-20"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: 2,
            }}
            className="text-center"
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              SYSTEM READY
            </div>
            <div className="text-gray-600 text-sm mt-2 font-mono">
              Welcome, Bashar Ahmad Khan
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Preloader;
