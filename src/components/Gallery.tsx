import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Gallery: React.FC = () => {
  const galleryItems = [
    {
      id: 1,
      title: 'React & Tailwind UI',
      image:
        'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Building responsive UI components with React and Tailwind.',
    },
    {
      id: 2,
      title: 'Photography Hobby',
      image:
        'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: 'July 2025',
      description: 'Exploring nature and urban photography during weekends.',
    },
    {
      id: 3,
      title: 'Next.js Portfolio',
      image:
        'https://images.pexels.com/photos/1181319/pexels-photo-1181319.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Creating fast, SEO-friendly portfolios with Next.js.',
    },
    {
      id: 4,
      title: 'Hiking in the Mountains',
      image:
        'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: 'June 2025',
      description: 'Weekend hiking trip to recharge and connect with nature.',
    },
    {
      id: 5,
      title: 'AI Experimentation',
      image:
        'https://images.pexels.com/photos/5473953/pexels-photo-5473953.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Playing with machine learning models and neural networks.',
    },
    {
      id: 6,
      title: 'Family Picnic',
      image:
        'https://images.pexels.com/photos/1183356/pexels-photo-1183356.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: 'May 2025',
      description: 'A sunny day out with family and friends.',
    },
  ];

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg cursor-pointer overflow-hidden"
              onClick={() => setSelectedImage(index)}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-t-xl">
                <motion.img
                  src={item.image}
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

      {/* Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <img
                src={galleryItems[selectedImage].image}
                alt={galleryItems[selectedImage].title}
                className="w-full h-auto max-h-[70vh] object-contain"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-100">
                  {galleryItems[selectedImage].title}
                </h3>
                {(galleryItems[selectedImage].description || galleryItems[selectedImage].date) && (
                  <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg">
                    {galleryItems[selectedImage].description}{' '}
                    {galleryItems[selectedImage].date && <span>— {galleryItems[selectedImage].date}</span>}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
