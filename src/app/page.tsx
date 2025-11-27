'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

// Import components
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Experience from '@/components/Experience';

// Dynamically import SplashCursor (client-side only)
const SplashCursor = dynamic(() => import('@/components/SplashCursor'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 pointer-events-none bg-black z-0"></div>
  ),
});

// Register ScrollTrigger only on client
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
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            once: false,
          },
        });
      });

      // Parallax effect for background (if you have .parallax-bg somewhere)
      gsap.to('.parallax-bg', {
        yPercent: 40,
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
    <div ref={containerRef} className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Full-Screen Fluid Background */}
      <SplashCursor 
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        PRESSURE_ITERATIONS={20}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        SHADING={true}
        COLOR_UPDATE_SPEED={10}
        BACK_COLOR={{ r: 0, g: 0, b: 0 }} // Black background for contrast
        TRANSPARENT={false}
      />

      {/* UI Layer - Stays above the canvas */}
      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />
          <div className="animate-on-scroll"><About /></div>
          <div className="animate-on-scroll"><Experience /></div>
          <div className="animate-on-scroll"><Skills /></div>
          <div className="animate-on-scroll"><Projects /></div>
          <div className="animate-on-scroll"><Gallery /></div>
          <div className="animate-on-scroll"><Contact /></div>
        </main>
        <Footer />
      </div>
    </div>
  );
}