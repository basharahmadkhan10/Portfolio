import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const PALETTE = {
  purpleStrong: "rgba(126, 34, 206, 0.6)", // Purple-700
  purpleMedium: "rgba(168, 85, 247, 0.5)", // Purple-500
  purpleSoft: "rgba(192, 132, 252, 0.3)", // Purple-400
  purpleGlow: "rgba(217, 70, 239, 0.4)", // Pink-500
  pinkSoft: "rgba(236, 72, 153, 0.3)", // Pink-500
  whiteSoft: "rgba(255, 255, 255, 0.2)",
  whiteFaint: "rgba(255, 255, 255, 0.08)",
  graySoft: "rgba(156, 163, 175, 0.15)", // Gray-400
};

const RippleEffect = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);
  const rafRef = useRef(null);

 
  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  
  useEffect(() => {
    const click = (e) => {
      setRipples((r) => [
        ...r.slice(-5),
        {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
        },
      ]);
    };
    window.addEventListener("click", click);
    return () => window.removeEventListener("click", click);
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setRipples((r) => r.filter((x) => Date.now() - x.id < 900));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-20 pointer-events-none overflow-hidden">
      {/* Cursor glow (subtle, premium) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: cursor.x,
          top: cursor.y,
          width: 70,
          height: 70,
          x: "-50%",
          y: "-50%",
          background: `
            radial-gradient(
              circle,
              ${PALETTE.purpleGlow} 0%,
              ${PALETTE.purpleSoft} 40%,
              transparent 70%
            )
          `,
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className="absolute rounded-full"
          style={{
            left: r.x,
            top: r.y,
            width: 60,
            height: 60,
            x: "-50%",
            y: "-50%",
            backgroundColor: PALETTE.whiteSoft,
            boxShadow: `0 0 40px ${PALETTE.purpleGlow}`,
          }}
          initial={{ scale: 0.2, opacity: 0.6 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      ))}

      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 6,
            height: 6,
            background: PALETTE.whiteSoft,
          }}
          animate={{
            x: cursor.x + Math.cos((i * Math.PI * 2) / 3) * 24,
            y: cursor.y + Math.sin((i * Math.PI * 2) / 3) * 24,
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="absolute inset-0 opacity-[0.06]">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${i * 6}%`,
              background: PALETTE.whiteFaint,
            }}
          />
        ))}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${i * 8}%`,
              background: PALETTE.whiteFaint,
            }}
          />
        ))}
      </div>

      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-2xl"
          style={{
            width: 180,
            height: 180,
            left: `${20 + i * 25}%`,
            top: `${30 + i * 20}%`,
            background: PALETTE.purpleSoft,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 14 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default RippleEffect;
