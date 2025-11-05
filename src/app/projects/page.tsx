'use client'

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import Footer from '@/components/Footer';
import { ExternalLink, Github, Filter, X } from 'lucide-react';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: 'Flex - Ride Sharing App',
      description: 'A responsive ride sharing platform with user authentication, search functionality, and real-time updates. Built with modern technologies for optimal performance.',
      image: '/flex.png',
      tags: ['Next.js', 'TypeScript', 'Redux', 'Framer Motion', 'Ant Design'],
      github: 'https://github.com/Nahidul-Islam-Siam/flex-frontend',
      live: 'https://flex-frontend-drab.vercel.app/',
      category: 'Full Stack',
      featured: true,
    },
    {
      id: 2,
      title: 'AiaRealty - Property Management',
      description: 'A comprehensive property management platform with advanced search, authentication, and portfolio management features.',
      image: '/aiarealty.png',
      tags: ['Next.js', 'TypeScript', 'MongoDB', 'Node.js'],
      github: 'https://github.com/yourusername/aiarealty',
      live: 'https://aiarealty.vercel.app/',
      category: 'Full Stack',
      featured: true,
    },
    {
      id: 3,
      title: 'Jimen - E-commerce Platform',
      description: 'Modern e-commerce solution with shopping cart, payment integration, and admin dashboard.',
      image: '/jimen.png',
      tags: ['React', 'Node.js', 'Express', 'PostgreSQL'],
      github: 'https://github.com/yourusername/jimen',
      live: 'https://jimen.vercel.app/',
      category: 'Full Stack',
      featured: false,
    },
    {
      id: 4,
      title: 'PicRez - Image Processing',
      description: 'Advanced image processing application with real-time filters and optimization tools.',
      image: '/picrez.png',
      tags: ['React', 'Canvas API', 'Image Processing'],
      github: 'https://github.com/yourusername/picrez',
      live: 'https://picrez.vercel.app/',
      category: 'Frontend',
      featured: false,
    },
    {
      id: 5,
      title: 'SkillsWith - Learning Platform',
      description: 'Interactive learning platform with courses, progress tracking, and certification system.',
      image: '/skillswith.png',
      tags: ['Next.js', 'TypeScript', 'Prisma', 'Stripe'],
      github: 'https://github.com/yourusername/skillswith',
      live: 'https://skillswith.vercel.app/',
      category: 'Full Stack',
      featured: false,
    },
    {
      id: 6,
      title: 'Pauliana - Portfolio Showcase',
      description: 'Beautiful portfolio website with smooth animations and modern design principles.',
      image: '/pauliana.png',
      tags: ['React', 'GSAP', 'Framer Motion'],
      github: 'https://github.com/yourusername/pauliana',
      live: 'https://pauliana.vercel.app/',
      category: 'Frontend',
      featured: false,
    },
  ];

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];

  const filteredProjects = selectedFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedFilter);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Page entrance
      gsap.from('.page-title', {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.page-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3,
      });

      // Animate filter buttons
      gsap.from('.filter-btn', {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 0.5,
      });

      // Animate project cards
      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 100,
          rotationX: -15,
          duration: 1,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Magnetic effect on hover
      const projectCards = document.querySelectorAll<HTMLElement>('.project-card');
      projectCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const mouseEvent = e as MouseEvent;
          const rect = card.getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left;
          const y = mouseEvent.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const moveX = (x - centerX) / 10;
          const moveY = (y - centerY) / 10;

          gsap.to(card, {
            x: moveX,
            y: moveY,
            rotationY: moveX / 10,
            rotationX: -moveY / 10,
            duration: 0.5,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)',
          });
        });
      });

      // Parallax effect for featured projects
      gsap.utils.toArray<HTMLElement>('.featured-project').forEach((project) => {
        gsap.to(project, {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: project,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <AnimatedBackground />
      <Navigation />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="page-title text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Projects
            </h1>
            <p className="page-subtitle text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore my work and see how I bring ideas to life
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedFilter(category)}
                  className={`filter-btn px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedFilter === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110'
                      : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => {
                const isFeatured = project.featured;
                return (
                  <div
                    key={project.id}
                    className={`project-card group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/50 to-white/10 dark:from-gray-800/50 dark:to-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/20 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl ${
                      isFeatured ? 'featured-project lg:col-span-2 lg:row-span-2' : ''
                    }`}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    style={{ perspective: '1000px' }}
                  >
                    {/* Image */}
                    <div className="relative h-64 lg:h-80 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {isFeatured && (
                        <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-full">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

