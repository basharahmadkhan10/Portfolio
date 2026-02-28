import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

const PALETTE = {
  purpleStrong: "rgba(126, 34, 206, 0.6)",
  purpleMedium: "rgba(168, 85, 247, 0.5)",
  purpleSoft: "rgba(192, 132, 252, 0.3)",
  purpleGlow: "rgba(217, 70, 239, 0.4)",
  pinkSoft: "rgba(236, 72, 153, 0.3)",
  whiteSoft: "rgba(255, 255, 255, 0.2)",
  whiteFaint: "rgba(255, 255, 255, 0.08)",
  graySoft: "rgba(156, 163, 175, 0.15)",
};

const MAX_RIPPLES = 8;
const RIPPLE_LIFETIME = 900;
const CLEANUP_INTERVAL = 120;

const RippleEffect = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);
  const rafRef = useRef(null);
  const lastCursorUpdate = useRef(0);
  const cursorPosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const now = Date.now();
    if (now - lastCursorUpdate.current > 16) { // ~60fps
      cursorPosition.current = { x: e.clientX, y: e.clientY };
      setCursor({ x: e.clientX, y: e.clientY });
      lastCursorUpdate.current = now;
    }
  }, []);

  const handleClick = useCallback((e) => {
    setRipples((prev) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        size: 40 + Math.random() * 40, 
      };
    
      const updated = [...prev.slice(-(MAX_RIPPLES - 1)), newRipple];
      return updated;
    });
  }, []);

  useEffect(() => {
    let animationFrame;
    
    const cleanupRipples = () => {
      setRipples((prev) => 
        prev.filter((ripple) => Date.now() - ripple.id < RIPPLE_LIFETIME)
      );
      animationFrame = requestAnimationFrame(cleanupRipples);
    };
    
    animationFrame = requestAnimationFrame(cleanupRipples);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [handleMouseMove, handleClick]);

  const gridLines = useMemo(() => ({
    horizontal: [...Array(12)].map((_, i) => i),
    vertical: [...Array(24)].map((_, i) => i),
    floatingOrbs: [...Array(4)].map((_, i) => i),
  }), []);

  return (
    <div className="fixed inset-0 z-20 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute rounded-full"
        style={{
          left: cursor.x,
          top: cursor.y,
          width: 120,
          height: 120,
          x: "-50%",
          y: "-50%",
          background: `
            radial-gradient(
              circle at 30% 30%,
              ${PALETTE.purpleGlow} 0%,
              ${PALETTE.purpleSoft} 30%,
              transparent 70%
            )
          `,
          filter: "blur(8px)",
          mixBlendMode: "screen",
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      <motion.div
        className="absolute rounded-full bg-white"
        style={{
          left: cursor.x,
          top: cursor.y,
          width: 4,
          height: 4,
          x: "-50%",
          y: "-50%",
          boxShadow: `0 0 20px ${PALETTE.purpleGlow}`,
        }}
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className="absolute rounded-full border"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            x: "-50%",
            y: "-50%",
            borderColor: PALETTE.purpleMedium,
            borderWidth: 1,
          }}
          initial={{ scale: 0.2, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      ))}

      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 4 + i * 2,
            height: 4 + i * 2,
            background: `radial-gradient(circle, ${PALETTE.purpleGlow}, ${PALETTE.purpleSoft})`,
            filter: "blur(1px)",
          }}
          animate={{
            x: cursor.x + Math.cos((i * Math.PI * 2) / 3 + Date.now() * 0.002) * (20 + i * 10),
            y: cursor.y + Math.sin((i * Math.PI * 2) / 3 + Date.now() * 0.002) * (20 + i * 10),
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 0,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={PALETTE.purpleSoft} strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating orbs - more elegant */}
      {gridLines.floatingOrbs.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: 200 + i * 50,
            height: 200 + i * 50,
            left: `${15 + i * 25}%`,
            top: `${20 + i * 20}%`,
            background: `radial-gradient(circle, ${PALETTE.purpleSoft} 0%, transparent 70%)`,
            mixBlendMode: "overlay",
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 0% 0%, ${PALETTE.purpleSoft} 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, ${PALETTE.pinkSoft} 0%, transparent 50%)
          `,
          opacity: 0.3,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
};

export default RippleEffect;
