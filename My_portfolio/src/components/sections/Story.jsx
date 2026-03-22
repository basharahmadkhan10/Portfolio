import React from "react";
import { motion } from "framer-motion";
import { GrCertificate } from "react-icons/gr";
import { MdSchool } from "react-icons/md";
import { IoCodeSlash } from "react-icons/io5";

const Story = () => {
  return (
    <section
      id="story"
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
              My Journey
            </span>
            <span className="text-gray-300"> Timeline</span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed">
            My academic journey and achievements in Computer Science
          </p>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-700 via-pink-600 to-transparent">
              <motion.div
                className="absolute w-full h-16 bg-gradient-to-b from-purple-500/40 via-pink-500/30 to-transparent rounded-full"
                animate={{ y: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {[
              {
                year: "2024",
                title: "Training & Certification",
                company: "Multiple Platforms",
                description:
                  "Completed Full-Stack Web Development training at CipherSchool. Earned certifications in Cloud Computing, Oracle AI Foundations, Computer Networking, and Hardware & OS.",
                icon: <GrCertificate />,
                side: "right",
              },
              {
                year: "2023 - Present",
                title: "DSA Excellence",
                company: "Competitive Programming",
                description:
                  "Solved 800+ problems across platforms. Achieved LeetCode contest rating of 1414. 5-star Python, C++, C, Java on HackerRank, 2-star on CodeChef.",
                icon: <IoCodeSlash />,
                side: "left",
              },
              {
                year: "2023 - Present",
                title: "B.Tech Computer Science",
                company: "Lovely Professional University",
                description:
                  "Currently pursuing B.Tech in Computer Science & Engineering with CGPA: 8.30. Specializing in Full-Stack Development, Data Structures, Algorithms, and Software Engineering.",
                icon: <MdSchool />,
                side: "right",
              },
              {
                year: "2020-2022",
                title: "Intermediate Education",
                company: "Dav Public School, Gaya",
                description:
                  "Completed intermediate education with focus on Physics, Chemistry, and Mathematics. Started learning programming fundamentals in C and C++.",
                icon: <MdSchool />,
                side: "left",
              },
              {
                year: "2019-2020",
                title: "Matriculation",
                company: "Elegant Public School, Gaya",
                description:
                  "Completed matriculation with strong foundation in science and mathematics. Developed interest in programming and problem-solving during this period.",
                icon: <MdSchool />,
                side: "right",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: item.side === "left" ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className={`relative flex items-start mb-16 md:mb-20 ${item.side === "left" ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="absolute left-4 md:left-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 -translate-x-1/2 z-10 shadow-2xl shadow-purple-500/40">
                  <div className="absolute inset-0 rounded-full animate-ping bg-purple-500/30" />
                </div>

                <div
                  className={`ml-14 md:ml-0 md:w-5/12 ${item.side === "left" ? "md:pr-12 md:text-right" : "md:pl-12"}`}
                >
                  <div className="group relative backdrop-blur-sm bg-gradient-to-br from-gray-900/60 to-gray-950/60 border-2 border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10 hover:border-purple-700/50 hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/40">
                        <div className="text-2xl text-white">{item.icon}</div>
                      </div>
                      <div className="text-left">
                        <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                          {item.year}
                        </span>
                        <h3 className="text-2xl font-bold text-white mt-1">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-purple-300 font-medium text-lg mb-3 text-left">
                      {item.company}
                    </p>
                    <p className="text-gray-400 leading-relaxed text-sm sm:text-base text-left">
                      {item.description}
                    </p>
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

export default Story;
