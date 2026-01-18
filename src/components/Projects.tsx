'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

const Projects: React.FC = () => {
  const projects = [
    
    {
      title: "Flex - Ride Sharing App",
      description:
        "A responsive ride sharing platform with user authentication, search functionality, and real-time updates.",
      image:
        "/flex.png",
      tags: ["Next.js", "TypeScript", "Redux", "Framer Motion","Ant Design"],
      github: "https://github.com/Nahidul-Islam-Siam/flex-frontend",
      live: "https://flex-frontend-drab.vercel.app/",
    },

    {
      title: "Pauliana - Bricklayer's Portfolio Showcase",
      description:
        "A portfolio website for a bricklayer with a portfolio of his works and a contact form.",
      image:
        "/pauliana.png",
      tags: ["Next.js", "TypeScript", "Redux", "Shadcdn UI", "MongoDB","NextAuth"],
      github: "https://github.com/Nahidul-Islam-Siam/paulina2029-frontend",
      live: "https://paulina2029-frontend.vercel.app/",
    },
    {
      title: "AiaRealty - Property Management Platform",
      description:
        "A property management platform with user authentication,Advanced search functionality and Portfolio type.",
      image:
        "/aiarealty.png",
      tags: ["Next.js", "TypeScript", "Google Maps API", "Redux", "Ant Design"],
      github: "https://github.com/Nahidul-Islam-Siam/aiarealty_client-nahidul",
      live: "https://aiarealty.com/",
    },
    {
      title: "Jimen - A bricklayer's works portfolio ",
      description:
        "An interactive portfolio website showcasing a collection of bricklayer's works.",
      image:
        "/jimen.png",
      tags: ["Next.js", "TypeScript", "Redux", "Shadcdn UI", "MongoDB","NextAuth"],
      github: "https://github.com/Nahidul-Islam-Siam/paulina2029-frontend",
      live: "https://paulina2029-frontend.vercel.app/",
    },
    {
      title: "PicRez - A Job seeker's and recruiter's platform",
      description:
        "A job seeker's and recruiter's platform with group chat,blog, facebook type social media and more .",
      image:
        "/picrez.png",
      tags: ["Next.js","TypeScript", "WebSockets","Ant Design" ,"Custom Auth", "Redux", "Next JS", "MongoDB","PostSql"],
      // github: "https://github.com/Nahidul-Islam-Siam/paulina2029-frontend",
      live: "https://picrez.com/",
    },

    {
      title: "SkillSwitch - A Trader's Platform",
      description:
        "A rplatform like fiverr or upwork with user authentication, chat, sell and buy services.",
      image:
        "/skillswith.png",
      tags: ["Next.js", "TypeScript", "Redux", "Socket.io","Ant Design","Custom Auth", "Stripe-js", "Stripe Authentication"],
      github: "https://github.com/Nahidul-Islam-Siam/flex-frontend",
      live: "https://kmathew95-client.vercel.app/",
    },

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
                <Image
                  width={500}
                  height={500}
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
                    target="_blank"
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center px-3 py-1.5 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
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
