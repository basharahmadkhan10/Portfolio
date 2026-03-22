import React from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiArrowDown } from "react-icons/fi";
import { IoSparkles } from "react-icons/io5";

const Projects = () => {
  const projectLinks = {
    civicfix: "https://civicfix-frontend02.onrender.com",
    billquill: "https://bill-quill-frontend.onrender.com",
    portfolio: "https://portfolio03.onrender.com",
  };

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center px-4 md:px-6 lg:px-8 py-12 md:py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gray-300">My</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {" "}
                Projects
              </span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Full-stack applications demonstrating technical expertise and
              problem-solving abilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                id: "codex-arena",
                title: "CodeX Arena",
                category: "MERN • Competitive Coding",
                description:
                  "Real-time 1v1 competitive coding platform featuring live matchmaking, synchronized duel execution, and Elo-based rating system. Built with event-driven architecture and WebSocket communication for low-latency coding battles.",
                gradient: "from-blue-800 to-purple-700",
                tags: [
                  "React",
                  "Node.js",
                  "Socket.io",
                  "MongoDB",
                  "Monaco Editor",
                  "Zustand",
                ],
                metrics: [
                  "<100ms Latency",
                  "Real-time Sync",
                  "Elo Rating System",
                ],
              },
              {
                id: "civicfix",
                title: "CivicFix - Civic Issue Reporting Platform",
                category: "MERN Stack • RBAC • SLA Monitoring",
                description:
                  "A civic issue management system enabling citizens and government stakeholders to report, track, and resolve public infrastructure issues with transparent accountability.",
                gradient: "from-purple-800 to-pink-700",
                tags: [
                  "React.js",
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "JWT",
                  "RBAC",
                  "REST APIs",
                ],
                metrics: [
                  "4 Role-based User Types",
                  "100% Valid Status Transitions",
                  "40% ↓ Manual Work",
                ],
              },
              {
                id: "billquill",
                title: "Bill Quill - Invoice Management",
                category: "MERN Stack • Real-time",
                description:
                  "Real-time invoicing system with dynamic billing workflows, automated calculations, and client/product catalog management. Enhanced billing accuracy by 20% with audit-ready financial logging.",
                gradient: "from-gray-800 to-purple-700",
                tags: ["React", "Express", "MongoDB", "XLSX", "REST APIs"],
                metrics: [
                  "20% ↑ Billing Accuracy",
                  "Real-time Sync",
                  "XLSX Export",
                ],
              },
            ].map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative h-full p-6 sm:p-8 rounded-3xl backdrop-blur-sm bg-gradient-to-br from-gray-900/60 to-gray-950/60 border-2 border-gray-800/50 hover:border-purple-700/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-300 border border-green-800/30">
                  Completed
                </div>

                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${project.gradient} p-1 mb-6 shadow-xl`}
                >
                  <div className="w-full h-full rounded-2xl bg-gray-950/90 flex items-center justify-center">
                    <IoSparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>

                <div className="mb-4">
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-purple-900/30 text-purple-300 border border-purple-800/30">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-400 leading-relaxed text-sm sm:text-base mb-6 min-h-[100px]">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.metrics.map((metric, metricIdx) => (
                    <span
                      key={metricIdx}
                      className="px-2 py-1 text-xs rounded-full bg-gray-800/30 text-gray-300 border border-gray-700/30"
                    >
                      {metric}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-2 py-1 text-xs rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <a
                    href={projectLinks[project.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!projectLinks[project.id]) {
                        e.preventDefault();
                        alert("Project link will be added soon!");
                      }
                    }}
                    className="flex items-center gap-2 text-purple-300 text-sm font-medium hover:text-purple-200 transition-colors group/link z-10"
                  >
                    <span>View Project</span>
                    <FiExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                  <div className="flex items-center gap-1 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs">Explore</span>
                    <FiArrowDown className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
