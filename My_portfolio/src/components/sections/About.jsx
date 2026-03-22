import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { IoPerson, IoRocket } from "react-icons/io5";
import { MdWork, MdSchool, MdComputer } from "react-icons/md";

const About = () => {
  return (
    <section
      id="about"
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              About
            </span>
            <span className="text-gray-300"> Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            <div className="space-y-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative backdrop-blur-sm bg-gray-900/50 border border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10 overflow-hidden transition-all duration-300 hover:shadow-purple-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-purple-900/20 border border-purple-700/30">
                    <IoPerson className="w-8 h-8 text-purple-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-200">Who I Am</h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
                  I'm a dedicated Computer Science Engineering student at{" "}
                  <span className="text-purple-300 font-semibold">
                    Lovely Professional University (CGPA: 8.30)
                  </span>
                  , specializing in Full-Stack MERN Development. With expertise
                  in building scalable web applications and solving 800+ DSA
                  problems, I combine academic knowledge with practical skills
                  to create efficient solutions.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative backdrop-blur-sm bg-gray-900/50 border border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10 overflow-hidden transition-all duration-300 hover:shadow-purple-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-pink-900/40 to-pink-900/20 border border-pink-700/30">
                    <MdWork className="w-8 h-8 text-pink-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-200">
                    My Approach
                  </h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
                  I believe in writing clean, maintainable code following best
                  practices. Every project starts with understanding
                  requirements, designing optimal solutions using DSA
                  principles, and implementing with attention to performance and
                  scalability. I focus on creating robust architectures backed
                  by efficient algorithms.
                </p>
              </motion.div>
            </div>

            <div className="space-y-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative backdrop-blur-sm bg-gray-900/50 border border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10 overflow-hidden transition-all duration-300 hover:shadow-purple-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-700/30">
                    <IoRocket className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-200">
                    My Mission
                  </h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
                  To continuously enhance my skills in full-stack development,
                  cloud computing, and AI while solving complex real-world
                  problems. I aim to contribute to meaningful projects that
                  leverage cutting-edge technologies and follow software
                  engineering best practices.
                </p>
              </motion.div>

              <div className="backdrop-blur-sm bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10">
                <h3 className="text-2xl font-bold text-gray-200 mb-6">
                  Connect With Me
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      icon: <FiGithub />,
                      label: "GitHub",
                      username: "@basharahmadkhan10",
                      link: "https://github.com/basharahmadkhan10",
                    },
                    {
                      icon: <FiLinkedin />,
                      label: "LinkedIn",
                      username: "Bashar Ahmad Khan",
                      link: "https://linkedin.com/in/basharahmadkhan10",
                    },
                    {
                      icon: <FiMail />,
                      label: "Email",
                      username: "basharahmadkhan10@gmail.com",
                      link: "mailto:basharahmadkhan10@gmail.com",
                    },
                    {
                      icon: <MdComputer />,
                      label: "DSA",
                      username: "800+ Problems Solved",
                      link: "https://codolio.com/profile/Bash24k",
                    },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col p-4 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-800/50 hover:from-purple-900/30 hover:to-pink-900/20 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-white/5">
                          {social.icon}
                        </div>
                        <span className="font-semibold text-gray-300 group-hover:text-white">
                          {social.label}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400 group-hover:text-gray-300">
                        {social.username}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
