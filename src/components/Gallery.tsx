'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

type GalleryItem = {
  id: number;
  title: string;
  images: string[]; // multiple images per item
  description?: string;
  date?: string;
};

const Gallery: React.FC = () => {
 const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'React & Tailwind UI',
    images: [
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    description: 'Building responsive UI components with React and Tailwind.',
  },
  {
    id: 2,
    title: 'Photography Hobby',
    images: [
      'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/414172/pexels-photo-414172.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/414173/pexels-photo-414173.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/414174/pexels-photo-414174.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    date: 'July 2025',
    description: 'Exploring nature and urban photography during weekends.',
  },
  {
    id: 3,
    title: 'Next.js Portfolio',
    images: [
      'https://images.pexels.com/photos/1181319/pexels-photo-1181319.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1181320/pexels-photo-1181320.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    description: 'Creating fast, SEO-friendly portfolios with Next.js.',
  },
  {
    id: 4,
    title: 'Hiking in the Mountains',
    images: [
      'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/518544/pexels-photo-518544.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    date: 'June 2025',
    description: 'Weekend hiking trip to recharge and connect with nature.',
  },
  {
    id: 5,
    title: 'AI Experimentation',
    images: [
      'https://images.pexels.com/photos/5473953/pexels-photo-5473953.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/5473954/pexels-photo-5473954.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    description: 'Playing with machine learning models and neural networks.',
  },
  {
    id: 6,
    title: 'Family Picnic',
    images: [
      'https://images.pexels.com/photos/1183356/pexels-photo-1183356.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1183357/pexels-photo-1183357.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    date: 'May 2025',
    description: 'A sunny day out with family and friends.',
  },
  {
    id: 7,
    title: 'Cityscape Views',
    images: [
      'https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/373913/pexels-photo-373913.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/373914/pexels-photo-373914.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    description: 'Capturing breathtaking city skylines during sunset.',
  },
  {
    id: 8,
    title: 'Cooking Adventures',
    images: [
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    description: 'Trying new recipes and food styling.',
  },
];


  // Track which gallery item is opened and which image index inside that item
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Open modal for given gallery index and reset image index to 0
  const openModal = (galleryIndex: number) => {
    setSelectedGalleryIndex(galleryIndex);
    setSelectedImageIndex(0);
  };

  // Close modal
  const closeModal = () => {
    setSelectedGalleryIndex(null);
    setSelectedImageIndex(0);
  };

  // Go to next image inside modal slider
  const nextImage = () => {
    if (selectedGalleryIndex === null) return;
    const images = galleryItems[selectedGalleryIndex].images;
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  // Go to previous image inside modal slider
  const prevImage = () => {
    if (selectedGalleryIndex === null) return;
    const images = galleryItems[selectedGalleryIndex].images;
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
            My Personal Gallery
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Showcasing my skills and life moments in one place.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, galleryIndex) => (
            <motion.div
              key={item.id}
              className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg cursor-pointer overflow-hidden"
              onClick={() => openModal(galleryIndex)}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-t-xl">
                {/* Show first image of gallery item as preview */}
                <motion.img
                  src={item.images[0]}
                  alt={item.title}
                  className="object-cover w-full h-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="mt-2 text-xl font-bold text-gray-800 dark:text-gray-100">{item.title}</h3>
                {(item.description || item.date) && (
                  <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {item.description} {item.date && <span>— {item.date}</span>}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal with slider for selected gallery item */}
      <AnimatePresence>
        {selectedGalleryIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Slider controls */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/40 rounded-full hover:bg-black/70 transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/40 rounded-full hover:bg-black/70 transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image */}
              <Image
                width={0}
                height={0}
                src={galleryItems[selectedGalleryIndex].images[selectedImageIndex]}
                alt={galleryItems[selectedGalleryIndex].title}
                className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                loading="lazy"
              />

              {/* Description */}
              <div className="p-6 text-center">
                <h3 className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-100">
                  {galleryItems[selectedGalleryIndex].title}
                </h3>
                {(galleryItems[selectedGalleryIndex].description || galleryItems[selectedGalleryIndex].date) && (
                  <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg">
                    {galleryItems[selectedGalleryIndex].description}{' '}
                    {galleryItems[selectedGalleryIndex].date && <span>— {galleryItems[selectedGalleryIndex].date}</span>}
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Image {selectedImageIndex + 1} of {galleryItems[selectedGalleryIndex].images.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
