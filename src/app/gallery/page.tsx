'use client'

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import Footer from '@/components/Footer';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type GalleryItem = {
  id: number;
  title: string;
  images: string[];
  description?: string;
  category: string;
};

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: 'React & Tailwind UI',
      images: [
        'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      description: 'Modern UI designs built with React and Tailwind CSS',
      category: 'UI/UX',
    },
    {
      id: 2,
      title: 'Next.js Applications',
      images: [
        'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      description: 'Full-stack applications powered by Next.js',
      category: 'Web Development',
    },
    {
      id: 3,
      title: 'Mobile Responsive Designs',
      images: [
        'https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      description: 'Beautiful mobile-first responsive designs',
      category: 'UI/UX',
    },
    {
      id: 4,
      title: 'Animation Showcases',
      images: [
        'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      description: 'Interactive animations and micro-interactions',
      category: 'Animation',
    },
  ];

  const categories = ['All', 'UI/UX', 'Web Development', 'Animation'];

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

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

      // Animate gallery items
      gsap.utils.toArray<HTMLElement>('.gallery-item').forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          scale: 0.8,
          rotation: Math.random() * 20 - 10,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

// 3D tilt effect on hover
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item) => {
  const el = item as HTMLElement;

  el.addEventListener('mousemove', (e) => {
    const mouseEvent = e as MouseEvent;
    const rect = el.getBoundingClientRect();
    const x = mouseEvent.clientX - rect.left;
    const y = mouseEvent.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(el, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  el.addEventListener('mouseleave', () => {
    gsap.to(el, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  });
});
    }, containerRef);

    return () => ctx.revert();
  }, [filteredItems]);

  useEffect(() => {
    if (selectedItem) {
      gsap.from('.modal-content', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
      });
    }
  }, [selectedItem]);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setSelectedImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (selectedItem) {
      setSelectedImageIndex((prev) => (prev + 1) % selectedItem.images.length);
    }
  };

  const prevImage = () => {
    if (selectedItem) {
      setSelectedImageIndex((prev) => (prev - 1 + selectedItem.images.length) % selectedItem.images.length);
    }
  };

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
              Gallery
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A visual journey through my creative work
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
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

        {/* Gallery Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="gallery-item group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/50 to-white/10 dark:from-gray-800/50 dark:to-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/20 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl cursor-pointer"
                  onClick={() => openModal(item)}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-200">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="modal-content relative max-w-6xl w-full mx-4 max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {selectedItem.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="relative w-full h-[80vh] rounded-lg overflow-hidden">
              <Image
                src={selectedItem.images[selectedImageIndex]}
                alt={selectedItem.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="mt-4 text-center text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
              {selectedItem.description && (
                <p className="text-gray-300">{selectedItem.description}</p>
              )}
              <div className="flex justify-center gap-2 mt-4">
                {selectedItem.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === selectedImageIndex ? 'bg-white w-8' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

