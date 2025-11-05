'use client'

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, Check, Github, Facebook, Linkedin } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Page entrance
      const tl = gsap.timeline();
      
      tl.from('.page-title', {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out',
      });

      tl.from('.page-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.5');

      // Animate contact cards
      gsap.from('.contact-card', {
        opacity: 0,
        scale: 0.8,
        rotation: -10,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.contact-cards',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate form
      gsap.from('.form-field', {
        opacity: 0,
        x: -50,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Floating animation for contact icons
      gsap.to('.contact-icon', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.2,
      });

      // Success animation
      if (isSubmitted) {
        gsap.from('.success-message', {
          scale: 0,
          rotation: -180,
          duration: 0.8,
          ease: 'back.out(1.7)',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'siamnahidul093@gmail.com',
      link: 'mailto:siamnahidul093@gmail.com',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Available Worldwide',
      link: '#',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Nahidul-Islam-Siam', label: 'GitHub' },
    { icon: Facebook, href: 'https://www.facebook.com/nahidulislam.siam.39', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

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
              Get In Touch
            </h1>
            <p className="page-subtitle text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Let&lsquo;s discuss your next project or just say hello
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 contact-cards">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a
                    key={index}
                    href={info.link}
                    className="contact-card group relative p-8 rounded-2xl bg-gradient-to-br from-white/50 to-white/10 dark:from-gray-800/50 dark:to-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/20 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:scale-105"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                    <div className="relative z-10 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center contact-icon group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{info.label}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Form */}
              <div className="contact-form">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Send a Message</h2>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="form-field">
                    <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {isSubmitted ? (
                    <div className="success-message p-4 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center gap-3">
                      <Check className="w-6 h-6" />
                      <span className="font-semibold">Message sent successfully!</span>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  )}
                </form>
              </div>

              {/* Social Links */}
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Connect With Me</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  I&lsquo;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
                <div className="space-y-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-br from-white/50 to-white/10 dark:from-gray-800/50 dark:to-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/20 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{social.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

