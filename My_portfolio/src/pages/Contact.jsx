import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (This is a demo)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-dark section-padding pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 gradient-text">
          Contact Me
        </h1>
        <div className="grid lg:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <textarea
              placeholder="Your Message"
              rows="6"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:opacity-90"
            >
              Send Message
            </button>
          </form>
          <div className="glass-effect p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Contact Info</h3>
            <p className="text-gray-300 mb-6">hello@portfolio.dev</p>
            <p className="text-gray-300">Available for freelance work</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
