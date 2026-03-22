import React from "react";

const ProgressBar = ({ scrollProgress }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-900 origin-left z-40 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </div>
  );
};

export default ProgressBar;
