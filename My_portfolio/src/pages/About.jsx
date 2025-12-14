import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-dark section-padding pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 gradient-text">
          About Me
        </h1>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-gray-300 text-lg mb-6">
              I'm a passionate developer specializing in creating immersive 3D
              web experiences.
            </p>
            <p className="text-gray-300 text-lg">
              With expertise in React, modern JavaScript, and interactive
              animations, I build websites that engage and captivate users.
            </p>
          </div>
          <div className="glass-effect p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "JavaScript",
                "Three.js",
                "Atropos",
                "CSS3",
                "HTML5",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-cyan-500/20 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
