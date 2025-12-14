import React from "react";

const Projects = () => {
  const projects = [
    { id: 1, name: "E-Commerce Platform", tech: ["React", "Node.js"] },
    { id: 2, name: "Portfolio Website", tech: ["React", "Atropos"] },
    { id: 3, name: "Dashboard App", tech: ["React", "Chart.js"] },
  ];

  return (
    <div className="min-h-screen bg-dark section-padding pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 gradient-text">
          My Projects
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-effect p-6 rounded-2xl card-hover"
            >
              <h3 className="text-xl font-bold mb-3">{project.name}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:opacity-90">
                View Project
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
