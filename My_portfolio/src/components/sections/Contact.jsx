import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiDownload, FiGithub, FiLinkedin } from "react-icons/fi";
import { IoCodeSlash } from "react-icons/io5";

const Contact = ({ handleDownloadCV, isDownloading, scrollToSection }) => {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center px-4 md:px-6 lg:px-8 py-12 md:py-20"
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12">
            <span className="text-gray-300">Let's Build</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Something Amazing
            </span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl mb-12 md:mb-16 leading-relaxed max-w-3xl mx-auto">
            I'm currently seeking internships and full-time opportunities in
            software development. Let's discuss how we can work together on
            innovative projects!
          </p>

          <div className="grid lg:grid-cols-2 gap-10 md:gap-12">
            <div className="w-full p-6 sm:p-8 md:p-10 rounded-3xl backdrop-blur-sm bg-gradient-to-br from-gray-900/60 to-gray-950/60 border-2 border-gray-800/50 shadow-2xl shadow-purple-900/10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Send Me a Message
              </h3>
              <form
                action="https://formspree.io/f/xyzrvklw"
                method="POST"
                className="space-y-6"
              >
                <input
                  type="hidden"
                  name="_subject"
                  value="New Message from Portfolio!"
                />
                <input type="text" name="_gotcha" style={{ display: "none" }} />
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    className="w-full p-4 bg-gray-900/50 border-2 border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-700 transition-all"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="John@gmail.com"
                    className="w-full p-4 bg-gray-900/50 border-2 border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-700 transition-all"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Tell me about yourself"
                    rows="4"
                    className="w-full p-4 bg-gray-900/50 border-2 border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-700 transition-all"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 bg-gradient-to-r from-purple-700 to-pink-600 rounded-xl font-bold text-white tracking-wider hover:shadow-2xl hover:shadow-purple-500/30 transition-all text-lg"
                >
                  SEND MESSAGE
                </motion.button>
              </form>
            </div>

            <div className="flex flex-col justify-center space-y-8">
              <div className="w-full backdrop-blur-sm bg-gradient-to-br from-gray-900/60 to-gray-950/60 border-2 border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  Get In Touch
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: <FiMail />,
                      title: "Email",
                      value: "basharahmadkhan10@gmail.com",
                      link: "mailto:basharahmadkhan10@gmail.com",
                    },
                    {
                      icon: <FiLinkedin />,
                      title: "LinkedIn",
                      value: "linkedin.com/in/basharahmadkhan10",
                      link: "https://linkedin.com/in/basharahmadkhan10",
                    },
                    {
                      icon: <FiGithub />,
                      title: "GitHub",
                      value: "github.com/basharahmadkhan10",
                      link: "https://github.com/basharahmadkhan10",
                    },
                    {
                      icon: <IoCodeSlash />,
                      title: "LeetCode",
                      value: "500+ Problems Solved",
                      link: "https://leetcode.com/u/Bash__24k/",
                    },
                  ].map((contact, idx) => (
                    <a
                      key={idx}
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl bg-gray-900/30 hover:bg-gray-800/40 transition-all duration-300 group"
                    >
                      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/20 group-hover:from-purple-800/40 group-hover:to-pink-800/20 transition-all">
                        {contact.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-gray-300 group-hover:text-white">
                          {contact.title}
                        </h4>
                        <p className="text-gray-200 text-sm group-hover:text-gray-300">
                          {contact.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="w-full backdrop-blur-sm bg-gradient-to-br from-gray-900/60 to-gray-950/60 border-2 border-gray-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-purple-900/10">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Let's Collaborate
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Seeking internships and full-time opportunities in software
                  development. Open to freelance projects and technical
                  collaborations.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownloadCV}
                    disabled={isDownloading}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-900/30 to-pink-900/20 text-purple-300 border border-purple-800/30 hover:border-purple-700/50 transition-all justify-center ${
                      isDownloading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <FiDownload className="w-4 h-4" />
                    <span className="text-sm">
                      {isDownloading ? "Downloading..." : "Download CV"}
                    </span>
                  </motion.button>
                  <button
                    onClick={() => scrollToSection(4)}
                    className="py-3 bg-gradient-to-r from-pink-900/30 to-pink-900/10 text-pink-300 rounded-xl hover:bg-gradient-to-r hover:from-pink-800/40 hover:to-pink-800/20 transition-all border border-pink-800/30 text-sm font-medium"
                  >
                    View Projects
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
