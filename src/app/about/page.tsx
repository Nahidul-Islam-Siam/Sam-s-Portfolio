'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import Footer from '@/components/Footer';
import { Code, Palette, Zap, Target, Rocket, Heart } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Page entrance animation
      const tl = gsap.timeline();
      
      if (titleRef.current) {
        tl.from(titleRef.current, {
          opacity: 0,
          y: -50,
          duration: 1,
          ease: 'power3.out',
        });
      }

      if (subtitleRef.current) {
        tl.from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.5'
        );
      }

      // Animate features with stagger
      if (featuresRef.current) {
        gsap.from('.feature-card', {
          opacity: 0,
          y: 80,
          rotationX: -90,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Animate stats counter
      gsap.utils.toArray<HTMLElement>('.stat-number').forEach((stat) => {
        const target = parseInt(stat.textContent || '0');
        gsap.to(stat, {
          textContent: target,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          stagger: 0.3,
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Parallax scroll effects
      gsap.to('.parallax-element', {
        y: (i, el) => {
          const speed = parseFloat(el.getAttribute('data-speed') || '0.5');
          return -100 * speed;
        },
        ease: 'none',
        scrollTrigger: {
          trigger: '.parallax-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code following best practices and design patterns.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Palette,
      title: 'Creative Design',
      description: 'Crafting beautiful user interfaces with attention to detail, user experience, and modern aesthetics.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing applications for speed, accessibility, and seamless user interactions across all devices.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Delivering pixel-perfect implementations that match designs exactly and exceed client expectations.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'Staying ahead with cutting-edge technologies and innovative solutions to complex problems.',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Bringing enthusiasm and dedication to every project, ensuring quality and excellence in delivery.',
      color: 'from-red-500 to-pink-500',
    },
  ];

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '3+', label: 'Years Experience' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <AnimatedBackground />
      <Navigation />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden parallax-container">
          <div className="absolute inset-0 parallax-element" data-speed="0.3">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              ref={titleRef}
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              About Me
            </h1>
            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              I&lsquo;m a passionate Full-Stack Developer dedicated to creating exceptional digital experiences
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/50 to-white/10 dark:from-gray-800/50 dark:to-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/20"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  <span className="stat-number">{stat.number}</span>
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section ref={featuresRef} className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              What I Bring
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="feature-card group relative p-8 rounded-2xl bg-gradient-to-br from-white/50 to-white/10 dark:from-gray-800/50 dark:to-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/20 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:scale-105"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                    <div className="relative z-10">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Personal Story Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-md border border-white/20 dark:border-gray-700/20">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                My Journey
              </h2>
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  I&lsquo;ve been passionate about web development for over 3 years, constantly learning and evolving with the industry.
                  My journey started with curiosity about how websites work, and it has grown into a deep love for creating
                  beautiful, functional, and user-centered digital experiences.
                </p>
                <p>
                  I specialize in modern web technologies, focusing on creating responsive, performant, and accessible applications.
                  Every project is an opportunity to push boundaries and deliver something exceptional.
                </p>
                <p>
                  When I&lsquo;m not coding, you&lsquo;ll find me exploring new technologies, contributing to open-source projects, or
                  sharing knowledge with the developer community. I believe in continuous learning and staying updated with
                  the latest trends and best practices.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

