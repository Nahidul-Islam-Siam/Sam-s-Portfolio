'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Experience from '@/components/Experience';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate elements on scroll
      gsap.utils.toArray<HTMLElement>('.animate-on-scroll').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 100,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Parallax effect for background
      gsap.to('.parallax-bg', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.parallax-bg',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 mx-auto">
      <AnimatedBackground />
      <Navigation />
      <main>
        <Hero />
        <div className="animate-on-scroll">
          <About />
        </div>
        <div className="animate-on-scroll">
          <Experience />
        </div>
        <div className="animate-on-scroll">
          <Skills />
        </div>
        <div className="animate-on-scroll">
          <Projects />
        </div>
        <div className="animate-on-scroll">
          <Gallery />
        </div>
        <div className="animate-on-scroll">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
