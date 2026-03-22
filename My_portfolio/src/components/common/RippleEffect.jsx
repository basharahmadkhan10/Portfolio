import React, { useEffect, useRef } from "react";

const RippleEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let ripples = [];
    let animationId;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const createRipple = (x, y) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.min(width, height) * 0.2,
        alpha: 0.8,
        speed: 3,
      });
    };

    const updateRipples = () => {
      for (let i = 0; i < ripples.length; i++) {
        const ripple = ripples[i];
        ripple.radius += ripple.speed;
        ripple.alpha -= 0.01;
        if (ripple.radius >= ripple.maxRadius || ripple.alpha <= 0) {
          ripples.splice(i, 1);
          i--;
        }
      }
    };

    const drawRipples = () => {
      ctx.clearRect(0, 0, width, height);
      for (const ripple of ripples) {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(168, 85, 247, ${ripple.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(236, 72, 153, ${ripple.alpha * 0.8})`;
        ctx.stroke();
      }
    };

    const animate = () => {
      updateRipples();
      drawRipples();
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      createRipple(e.clientX, e.clientY);
    };

    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("mousemove", handleMouseMove);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  );
};

export default RippleEffect;
