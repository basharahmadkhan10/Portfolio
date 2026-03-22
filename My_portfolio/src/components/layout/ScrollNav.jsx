import React from "react";

const ScrollNav = ({ sections, activeSection, scrollToSection }) => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {sections.map((section, index) => (
        <button
          key={index}
          onClick={() => scrollToSection(index)}
          className="group relative flex items-center justify-center focus:outline-none"
          aria-label={`Go to ${section} section`}
        >
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index
                ? "bg-gradient-to-br from-purple-400 to-pink-400 scale-125 shadow-lg shadow-purple-500/50"
                : "bg-gray-600 group-hover:bg-purple-500 group-hover:scale-110"
            }`}
          />
          <span className="absolute right-5 text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap bg-gray-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-500/30 pointer-events-none">
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ScrollNav;
