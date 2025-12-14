import React from "react";
import {
  FiCode,
  FiLayers,
  FiZap,
  FiGlobe,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import ReactAtropos from "./ReactAtropos";

const Features = () => {
  const features = [
    {
      icon: <FiCode className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Modern Stack",
      description:
        "Built with React, TypeScript, Tailwind CSS, and latest libraries",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: <FiLayers className="w-6 h-6 md:w-8 md:h-8" />,
      title: "3D Effects",
      description: "Interactive 3D tilt effects using Atropos.js library",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <FiZap className="w-6 h-6 md:w-8 md:h-8" />,
      title: "High Performance",
      description: "Optimized for fast loading and smooth animations",
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      icon: <FiGlobe className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Responsive Design",
      description: "Perfect experience on all devices and screen sizes",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <FiShield className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Secure & Reliable",
      description: "Built with security best practices and reliable hosting",
      gradient: "from-red-500 to-rose-500",
    },
    {
      icon: <FiUsers className="w-6 h-6 md:w-8 md:h-8" />,
      title: "User Focused",
      description: "Intuitive UX/UI designed with users in mind",
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <section
      id="features"
      className="section-padding bg-gradient-to-b from-gray-900/50 to-transparent"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Why Choose My Work</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Combining cutting-edge technology with exceptional design to deliver
            outstanding results for every project.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <ReactAtropos
              key={index}
              className="h-full card-hover"
              rotateXMax={15}
              rotateYMax={15}
            >
              <div className="h-full p-6 md:p-8 rounded-2xl glass-effect">
                {/* Icon with gradient background */}
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-r ${feature.gradient} p-0.5 mb-4 md:mb-6`}
                >
                  <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div
                  className="absolute bottom-0 left-0 w-full h-1"
                  data-atropos-offset="5"
                >
                  <div
                    className={`h-full bg-gradient-to-r ${feature.gradient} opacity-50 rounded-b-2xl`}
                  />
                </div>
              </div>
            </ReactAtropos>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-12 md:mt-20 p-6 md:p-8 rounded-2xl glass-effect">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "99.9%", label: "Uptime" },
              { value: "<100ms", label: "Load Time" },
              { value: "A+", label: "Performance" },
              { value: "24/7", label: "Support" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-1 md:mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
