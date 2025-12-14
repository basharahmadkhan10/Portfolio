import React from "react";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import ReactAtropos from "./ReactAtropos";

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="section-padding pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect w-fit">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-sm">Available for freelance work</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block">Creative</span>
              <span className="block gradient-text">Developer</span>
              <span className="block">Portfolio</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
              Building immersive web experiences with modern technologies.
              Specializing in React, 3D animations, and interactive UIs.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:opacity-90 transition-all hover:gap-3"
                onClick={() => scrollToSection("#projects")}
              >
                View Projects
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group flex items-center gap-2 px-6 py-3 glass-effect rounded-lg font-semibold hover:bg-white/10 transition-colors">
                <FiDownload />
                Download CV
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { number: "50+", label: "Projects" },
                { number: "30+", label: "Clients" },
                { number: "4+", label: "Years Exp" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - 3D Card */}
          <div className="relative">
            <ReactAtropos className="w-full max-w-lg mx-auto">
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
                {/* Background */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/20"
                  data-atropos-offset="-10"
                />

                {/* Floating elements */}
                <div
                  className="absolute top-20 left-10 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl rotate-12"
                  data-atropos-offset="20"
                />
                <div
                  className="absolute bottom-32 right-10 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  data-atropos-offset="15"
                />

                {/* Main content */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  data-atropos-offset="5"
                >
                  <div className="text-center p-6 md:p-8">
                    <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-1">
                      <div className="w-full h-full rounded-full bg-gray-900" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      John Developer
                    </h3>
                    <p className="text-gray-300">Full Stack Developer</p>
                  </div>
                </div>

                {/* Tech icons */}
                <div
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 md:gap-4"
                  data-atropos-offset="10"
                >
                  {["React", "TS", "Node", "3D"].map((tech) => (
                    <div
                      key={tech}
                      className="px-2 py-1 md:px-3 md:py-1 glass-effect rounded-lg text-xs md:text-sm"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </ReactAtropos>

            {/* Animated floating elements */}
            <div className="absolute -top-4 -left-4 w-6 h-6 md:w-8 md:h-8 bg-cyan-400 rounded-full float-animation" />
            <div className="absolute -bottom-4 -right-4 w-4 h-4 md:w-6 md:h-6 bg-purple-400 rounded-full float-animation delay-200" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
