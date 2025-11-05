'use client'

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Facebook, Github, Mail } from "lucide-react";
import GradientText from "@/components/GradientText";
import Orb from "@/components/Gsap/Orb";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Create master timeline
      const masterTL = gsap.timeline();

      // Animate title with split text effect
      if (titleRef.current) {
        const titleChars = titleRef.current.textContent?.split('') || [];
        titleRef.current.innerHTML = titleChars.map(char => 
          char === ' ' ? ' ' : `<span class="char">${char}</span>`
        ).join('');
        
        gsap.set('.char', { opacity: 0, y: 100, rotationX: -90 });
        masterTL.to('.char', {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'back.out(1.7)',
        });
      }

      // Animate subtitle
      if (subtitleRef.current) {
        masterTL.from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.8,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        );
      }

      // Animate description
      if (descriptionRef.current) {
        masterTL.from(
          descriptionRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        );
      }

      // Animate buttons with stagger
      if (buttonsRef.current) {
        masterTL.from(
          '.hero-button',
          {
            opacity: 0,
            scale: 0,
            rotation: -180,
            duration: 0.6,
            stagger: 0.2,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        );
      }

      // Animate social icons
      if (socialRef.current) {
        masterTL.from(
          '.social-icon',
          {
            opacity: 0,
            scale: 0,
            rotation: 360,
            duration: 0.5,
            stagger: 0.1,
            ease: 'elastic.out(1, 0.5)',
          },
          '-=0.2'
        );
      }

      // Animate arrow
      if (arrowRef.current) {
        masterTL.from(
          arrowRef.current,
          {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.2'
        );

        // Continuous bounce animation
        gsap.to(arrowRef.current, {
          y: 10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }

      // Parallax effect on scroll
      gsap.to('.hero-content', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Magnetic effect for buttons
            const buttons = document.querySelectorAll<HTMLButtonElement>('.hero-button');
            buttons.forEach((button) => {
              button.addEventListener('mousemove', (e) => {
                const mouseEvent = e as MouseEvent;
                const rect = button.getBoundingClientRect();
                const x = mouseEvent.clientX - rect.left - rect.width / 2;
                const y = mouseEvent.clientY - rect.top - rect.height / 2;
      
                gsap.to(button, {
                  x: x * 0.3,
                  y: y * 0.3,
                  duration: 0.3,
                  ease: 'power2.out',
                });
              });
      
              button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                  x: 0,
                  y: 0,
                  duration: 0.5,
                  ease: 'elastic.out(1, 0.5)',
                });
              });
            });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      // Smooth scroll with GSAP (animating scrollTop)
      const targetY = aboutSection.getBoundingClientRect().top + window.pageYOffset;
      const startY = window.pageYOffset;
      
      gsap.to({ value: startY }, {
        value: targetY,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: function() {
          window.scrollTo(0, this.targets()[0].value);
        }
      });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Content - behind Orb */}
      <div className="hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              textSize="text-5xl md:text-7xl"
            >
              Nahidul Islam Siam
            </GradientText>
          </h1>

          <motion.p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
          >
            Full-Stack Developer
          </motion.p>

          <motion.p
            ref={descriptionRef}
            className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Crafting beautiful, functional, and user-centered digital
            experiences with modern technologies and creative problem-solving.
          </motion.p>

          <motion.div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToAbout}
              className="hero-button px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              View My Work
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hero-button px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-semibold hover:border-blue-600 dark:hover:border-blue-400 transition-colors"
            >
              <a target="_blank" href="https://drive.google.com/file/d/1jlCaWSemEyphnvqytkdm6cZ1D1pY5Zeh/view?usp=sharing">
                {" "}
                Download Resume
              </a>
            </motion.button>
          </motion.div>

          <motion.div
            ref={socialRef}
            className="flex items-center justify-center space-x-6 mb-16"
          >
            {[
              { Icon: Github, url: "https://github.com/Nahidul-Islam-Siam" },
              { Icon: Facebook, url: "https://www.facebook.com/nahidulislam.siam.39" },
              { Icon: Mail, url: "mailto:siamnahidul093@gmail.com" },
            ].map(({ Icon, url }, index) => (
              <motion.a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="social-icon p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          ref={arrowRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToAbout}
            className="p-2 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowDown className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </motion.button>
        </motion.div>
      </div>

      {/* Orb overlay on top */}
      <div className="absolute inset-0 z-20 opacity-70 pointer-events-none">
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>
    </section>
  );
};

export default Hero;
