import React from "react";
import Header from "../Headers";
import Footer from "./Footer";
import RippleEffect from "../common/RippleEffect";
import ProgressBar from "./progressBar";
import ScrollNav from "./ScrollNav";

const Layout = ({
  children,
  scrollProgress,
  sections,
  activeSection,
  scrollToSection,
  isReady,
}) => {
  return (
    <div className="relative min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      <RippleEffect />
      {isReady && <ProgressBar scrollProgress={scrollProgress} />}
      <ScrollNav
        sections={sections}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
