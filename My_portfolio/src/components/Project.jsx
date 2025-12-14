import React, { useState } from "react";
import { FiExternalLink, FiGithub, FiArrowRight } from "react-icons/fi";
import ReactAtropos from "./ReactAtropos";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web",
      description:
        "Full-stack e-commerce with real-time inventory and payments",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "AI Content Generator",
      category: "ai",
      description: "ML-powered content creation with GPT-3.5 integration",
      technologies: ["Python", "FastAPI", "React", "OpenAI"],
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "Fitness Tracker App",
      category: "mobile",
      description: "Mobile app with AR exercise guidance and tracking",
      technologies: ["React Native", "Firebase", "ARCore"],
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 4,
      title: "Crypto Dashboard",
      category: "web",
      description: "Real-time cryptocurrency tracking and analytics",
      technologies: ["Next.js", "TypeScript", "WebSocket", "Chart.js"],
      image:
        "https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 5,
      title: "Travel Planning AI",
      category: "ai",
      description: "AI-powered travel itinerary generator",
      technologies: ["Python", "Django", "React", "OpenAI"],
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 6,
      title: "Social Media Dashboard",
      category: "web",
      description: "Analytics and management for social media platforms",
      technologies: ["Vue.js", "Express", "PostgreSQL", "Redis"],
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Apps" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "ai", label: "AI/ML" },
  ];

  const filteredProjects = projects.filter(
    (project) => activeFilter === "all" || project.category === activeFilter
  );

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 px-4">
            Explore my latest work showcasing innovative solutions and
            cutting-edge technologies.
          </p>

          
          <div className="inline-flex flex-wrap gap-2 p-1 rounded-xl glass-effect mb-8">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg transition-all text-sm md:text-base ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <ReactAtropos
              key={project.id}
              className="h-full card-hover"
              rotateXMax={20}
              rotateYMax={20}
            >
              <div className="h-full rounded-2xl overflow-hidden glass-effect">
                
                <div
                  className="relative h-48 md:h-56 overflow-hidden"
                  data-atropos-offset="-5"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm">
                      {project.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                
                <div className="p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base mb-4">
                    {project.description}
                  </p>

                  
                  <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs md:text-sm rounded-full glass-effect"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  
                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-white/10">
                    <a
                      href={project.liveUrl}
                      className="flex items-center gap-1 md:gap-2 text-cyan-300 hover:text-cyan-200 transition-colors text-sm md:text-base"
                    >
                      <FiExternalLink />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      className="flex items-center gap-1 md:gap-2 text-gray-300 hover:text-white transition-colors text-sm md:text-base"
                    >
                      <FiGithub />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </ReactAtropos>
          ))}
        </div>

        
        <div className="text-center mt-8 md:mt-12">
          <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg glass-effect hover:bg-white/10 transition-colors">
            View All Projects
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
