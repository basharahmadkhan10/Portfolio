import React, { useState } from "react";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import ReactAtropos from "./ReactAtropos";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    // Simulate form submission
    setStatus({ type: "loading", message: "Sending message..." });

    setTimeout(() => {
      setStatus({
        type: "success",
        message: "Message sent successfully! I will get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FiMail />,
      title: "Email",
      info: "hello@portfolio.dev",
      link: "mailto:hello@portfolio.dev",
    },
    {
      icon: <FiPhone />,
      title: "Phone",
      info: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <FiMapPin />,
      title: "Location",
      info: "San Francisco, CA",
      link: "#",
    },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Have a project in mind? Let's discuss how we can work together to
            bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <ReactAtropos className="h-full">
            <div className="h-full p-6 md:p-8 rounded-2xl glass-effect">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-gray-300 mb-2">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="Project Inquiry"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                {/* Status Message */}
                {status.message && (
                  <div
                    className={`p-4 rounded-lg flex items-center gap-3 ${
                      status.type === "success"
                        ? "bg-green-500/10 border border-green-500/20"
                        : status.type === "error"
                        ? "bg-red-500/10 border border-red-500/20"
                        : "bg-blue-500/10 border border-blue-500/20"
                    }`}
                  >
                    {status.type === "success" ? (
                      <FiCheck className="text-green-400" />
                    ) : status.type === "error" ? (
                      <FiAlertCircle className="text-red-400" />
                    ) : (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent" />
                    )}
                    <span
                      className={`${
                        status.type === "success"
                          ? "text-green-400"
                          : status.type === "error"
                          ? "text-red-400"
                          : "text-blue-400"
                      }`}
                    >
                      {status.message}
                    </span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status.type === "loading"}
                  className="w-full py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  {status.type === "loading" ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </ReactAtropos>

          {/* Contact Info */}
          <div className="space-y-6 md:space-y-8">
            {contactInfo.map((info, index) => (
              <ReactAtropos
                key={index}
                className="h-full"
                rotateXMax={10}
                rotateYMax={10}
              >
                <a
                  href={info.link}
                  className="block h-full p-6 md:p-8 rounded-2xl glass-effect hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
                      <div className="text-cyan-300 text-xl">{info.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                      <p className="text-gray-300">{info.info}</p>
                    </div>
                  </div>
                </a>
              </ReactAtropos>
            ))}

            {/* Availability Card */}
            <ReactAtropos className="h-full">
              <div className="h-full p-6 md:p-8 rounded-2xl bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-cyan-500/20">
                <h3 className="text-xl font-bold mb-4">Availability</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <div>
                      <p className="font-semibold">Currently Available</p>
                      <p className="text-sm text-gray-300">
                        for freelance projects
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-amber-400 rounded-full" />
                    <div>
                      <p className="font-semibold">Response Time</p>
                      <p className="text-sm text-gray-300">Within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full" />
                    <div>
                      <p className="font-semibold">Working Hours</p>
                      <p className="text-sm text-gray-300">9 AM - 6 PM PST</p>
                    </div>
                  </div>
                </div>
              </div>
            </ReactAtropos>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
