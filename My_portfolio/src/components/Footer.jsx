import React from "react";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiArrowUp,
  FiHeart,
} from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FiGithub />, href: "https://github.com", label: "GitHub" },
    { icon: <FiLinkedin />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FiTwitter />, href: "https://twitter.com", label: "Twitter" },
  ];

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Projects", href: "#projects" },
    { label: "Demo", href: "#demo" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-gradient-to-t from-gray-900 to-transparent pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="font-bold">P</span>
              </div>
              <span className="text-xl font-bold gradient-text">
                PortfolioPro
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Creating immersive digital experiences with cutting-edge 3D
              effects and modern web technologies.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg glass-effect hover:bg-white/10 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-3">
              {[
                "Web Development",
                "UI/UX Design",
                "3D Animation",
                "Consulting",
                "Technical Support",
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates on new projects and technologies.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 rounded-lg font-semibold transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm text-center md:text-left">
            <p>
              © {currentYear} PortfolioPro. All rights reserved. | Built with{" "}
              <FiHeart className="inline-block text-red-400 animate-pulse" />{" "}
              using React & Atropos
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-300 text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-300 text-sm transition-colors"
            >
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg glass-effect hover:bg-white/10 transition-colors group"
              aria-label="Back to top"
            >
              <FiArrowUp className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
