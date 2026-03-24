import React from "react";
const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-700 to-pink-600 flex items-center justify-center">
            </div>
            <span className="text-gray-400 text-sm">
              © 2025 Bashar Ahmad Khan
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
