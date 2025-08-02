import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const Projects: React.FC = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution built with React, Node.js, and PostgreSQL.",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      github: "#",
      live: "#",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative project management tool with drag-and-drop functionality and team collaboration.",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "TypeScript", "Socket.io", "MongoDB"],
      github: "#",
      live: "#",
    },
    {
      title: "AI-Powered Analytics Dashboard",
      description:
        "An intelligent analytics platform with predictive analytics and automated reporting.",
      image:
        "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Next.js", "Python", "TensorFlow", "D3.js"],
      github: "#",
      live: "#",
    },
    // --- Add more dummy projects to test pagination ---
    ...Array.from({ length: 12 }, (_, i) => ({
      title: `Sample Project ${i + 4}`,
      description: "A placeholder project for pagination testing.",
      image:
        "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "Tailwind", "Framer Motion"],
      github: "#",
      live: "#",
    })),
  ];

  const ITEMS_PER_PAGE = 6;
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const displayedProjects = showAll
    ? projects
    : projects.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <section id="projects" className="py-20 bg-white/50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A curated list of my recent work. Toggle to view all for a complete showcase.
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.05, rotateX: 4, rotateY: -4 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center px-3 py-1.5 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </motion.a>
                  <motion.a
                    href={project.live}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-md transition-shadow"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Live
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination & View All */}
        {!showAll && (
          <div className="flex justify-center items-center mt-10 space-x-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm disabled:opacity-50"
            >
              Next
            </button>
            <button
              onClick={() => setShowAll(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md text-sm"
            >
              View All
            </button>
          </div>
        )}
        {showAll && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => {
                setShowAll(false);
                setCurrentPage(1);
              }}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md text-sm"
            >
              Show Less
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
