import React from "react";
import { motion } from "framer-motion";
import { FiCode } from "react-icons/fi";
import { FaPython, FaJava, FaGitAlt } from "react-icons/fa";
import {
  TbBrandReact,
  TbBrandNextjs,
  TbBrandJavascript,
  TbBrandTypescript,
  TbBrandNodejs,
  TbBrandMongodb,
  TbBrandCpp,
  TbBrandPhp,
} from "react-icons/tb";
import {
  SiTailwindcss,
  SiRedux,
  SiDocker,
  SiPostgresql,
  SiExpress,
} from "react-icons/si";
import { IoCodeSlash } from "react-icons/io5";

const Skills = () => {
  return (
    <section
      id="skills"
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
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 text-center">
            <span className="text-gray-300">Technical </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Skills
            </span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed">
            Technologies and tools I use to build modern, scalable web
            applications
          </p>

          <div className="mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-8 text-center">
              Programming Languages
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
              {[
                {
                  icon: <FaPython className="text-3xl" />,
                  name: "Python",
                  description: "5★ HackerRank",
                  color: "from-blue-800 to-yellow-700",
                  level: "Intermediate",
                },
                {
                  icon: <TbBrandCpp className="text-3xl" />,
                  name: "C++",
                  description: "5★ HackerRank",
                  color: "from-blue-800 to-indigo-700",
                  level: "Intermediate",
                },
                {
                  icon: <FiCode className="text-3xl" />,
                  name: "C",
                  description: "5★ HackerRank",
                  color: "from-blue-700 to-cyan-600",
                  level: "Intermediate",
                },
                {
                  icon: <FaJava className="text-3xl" />,
                  name: "Java",
                  description: "5★ HackerRank",
                  color: "from-red-800 to-orange-700",
                  level: "Intermediate",
                },
                {
                  icon: <TbBrandJavascript className="text-3xl" />,
                  name: "JavaScript",
                  description: "ES6+",
                  color: "from-yellow-800 to-yellow-600",
                  level: "Intermediate",
                },
              ].map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="group relative h-full p-6 rounded-3xl backdrop-blur-sm bg-gray-900/40 border-2 border-gray-800/50 hover:border-purple-700/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  <div className="relative z-10 w-full">
                    <div
                      className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${skill.color} p-1 mb-4 shadow-2xl shadow-current/20`}
                    >
                      <div className="w-full h-full rounded-2xl bg-gray-950/90 flex items-center justify-center">
                        <div className="text-white">{skill.icon}</div>
                      </div>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                      {skill.name}
                    </h4>

                    <p className="text-gray-400 text-sm mb-3 flex items-center justify-center gap-1">
                      {skill.description}
                    </p>

                    <div className="w-full bg-gray-800/50 rounded-full h-2 mb-1">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                        style={{ width: "95%" }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{skill.level}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-8 text-center">
              Web Development
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
              {[
                {
                  icon: <TbBrandReact />,
                  name: "React.js",
                  description: "Frontend Library",
                  color: "from-cyan-800 to-blue-700",
                  level: "Intermediate",
                },
                {
                  icon: <TbBrandNodejs />,
                  name: "Node.js",
                  description: "Runtime",
                  color: "from-green-800 to-emerald-700",
                  level: "Intermediate",
                },
                {
                  icon: <SiExpress />,
                  name: "Express.js",
                  description: "Backend Framework",
                  color: "from-gray-700 to-gray-800",
                  level: "Intermediate",
                },
                {
                  icon: <TbBrandMongodb />,
                  name: "MongoDB",
                  description: "NoSQL Database",
                  color: "from-green-700 to-emerald-600",
                  level: "Intermediate",
                },
                {
                  icon: <SiTailwindcss />,
                  name: "Tailwind CSS",
                  description: "CSS Framework",
                  color: "from-teal-800 to-cyan-700",
                  level: "Intermediate",
                },
                {
                  icon: <TbBrandTypescript />,
                  name: "TypeScript",
                  description: "Type Safety",
                  color: "from-blue-800 to-indigo-700",
                  level: "Intermediate",
                },
                {
                  icon: <TbBrandNextjs />,
                  name: "Next.js",
                  description: "React Framework",
                  color: "from-gray-800 to-gray-900",
                  level: "Intermediate",
                },
                {
                  icon: <TbBrandPhp />,
                  name: "PHP",
                  description: "Server-side",
                  color: "from-purple-800 to-indigo-700",
                  level: "Basic",
                },
              ].map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="group relative h-full p-6 rounded-3xl backdrop-blur-sm bg-gray-900/40 border-2 border-gray-800/50 hover:border-purple-700/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  <div className="relative z-10 w-full">
                    <div
                      className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${skill.color} p-1 mb-4 shadow-2xl shadow-current/20`}
                    >
                      <div className="w-full h-full rounded-2xl bg-gray-950/90 flex items-center justify-center">
                        <div className="text-3xl text-white">{skill.icon}</div>
                      </div>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                      {skill.name}
                    </h4>

                    <p className="text-gray-400 text-sm mb-3">
                      {skill.description}
                    </p>

                    <div className="w-full bg-gray-800/50 rounded-full h-2 mb-1">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                        style={{
                          width:
                            skill.level === "Advanced"
                              ? "90%"
                              : skill.level === "Intermediate"
                                ? "70%"
                                : "50%",
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{skill.level}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-8 text-center">
              Tools & Platforms
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 justify-center">
              {[
                {
                  icon: <FaGitAlt />,
                  name: "Git",
                  description: "Version Control",
                  color: "from-orange-800 to-red-700",
                  level: "Advanced",
                },
                {
                  icon: <IoCodeSlash />,
                  name: "VS Code",
                  description: "Code Editor",
                  color: "from-blue-800 to-cyan-700",
                  level: "Advanced",
                },
                {
                  icon: <SiDocker />,
                  name: "Docker",
                  description: "Containerization",
                  color: "from-blue-800 to-cyan-700",
                  level: "Basic",
                },
              ].map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="group relative h-full p-6 rounded-3xl backdrop-blur-sm bg-gray-900/40 border-2 border-gray-800/50 hover:border-purple-700/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  <div className="relative z-10 w-full">
                    <div
                      className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${skill.color} p-1 mb-4 shadow-2xl shadow-current/20`}
                    >
                      <div className="w-full h-full rounded-2xl bg-gray-950/90 flex items-center justify-center">
                        <div className="text-2xl text-white">{skill.icon}</div>
                      </div>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                      {skill.name}
                    </h4>

                    <p className="text-gray-400 text-sm mb-3">
                      {skill.description}
                    </p>

                    <div className="w-full bg-gray-800/50 rounded-full h-2 mb-1">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                        style={{
                          width:
                            skill.level === "Advanced"
                              ? "90%"
                              : skill.level === "Intermediate"
                                ? "70%"
                                : "50%",
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{skill.level}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
