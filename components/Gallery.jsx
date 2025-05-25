'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const defaultImages = [
  '/images/w1.jpg',
  '/images/bg1.jpg',
  '/images/bg2.jpg',
  '/images/w2.jpg',
  '/images/w3.jpg',
  '/images/w4.jpg',
  '/images/w5.jpg',
  '/images/w6.jpg',
];

export default function Gallery({
  images = defaultImages,
  layout = 'masonry', // 'grid' | 'masonry'
}) {
  const [shuffled, setShuffled] = useState([]);
  const [selected, setSelected] = useState(null);

  // Shuffle images once on mount
  useEffect(() => {
    const shuffle = (arr) => {
      const newArr = [...arr];
      for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
    };
    setShuffled(shuffle(images));
  }, [images]);

  // Escape key closes lightbox
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const containerClass =
    layout === 'grid'
      ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'
      : 'columns-2 sm:columns-3 lg:columns-4 gap-4';

  return (
    <section
      aria-label="Galeri Prewedding"
      className="relative mt-16 px-6 py-12 max-w-6xl mx-auto bg-[#101010]/50 backdrop-blur-lg rounded-2xl overflow-hidden"
    >
      {/* Gradient border */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-gradient-to-br from-primary to-secondary opacity-30" />

      {/* Floating accents */}
      <motion.div
        className="absolute top-8 right-10 w-6 h-6 bg-primary/30 rounded-full filter blur-xl"
        animate={{ y: [0, 10, 0], opacity: [0.2, 0.6, 0.2] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 left-12 w-8 h-8 bg-secondary/20 rounded-full filter blur-lg"
        animate={{ x: [0, -12, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
      />

      <h2 className="relative z-10 text-center text-3xl md:text-4xl font-serif text-white mb-8">
        Galeri Kami
      </h2>

      <div className={`${containerClass} relative z-10`}>
        {shuffled.map((src, idx) => (
          <motion.div
            key={idx}
            className={`relative mb-4 overflow-hidden rounded-xl ${
              layout === 'masonry' ? 'break-inside-avoid' : ''
            }`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200 }}
            onClick={() => setSelected(src)}
          >
            <Image
              src={src}
              alt={`Galeri ${idx + 1}`}
              width={400}
              height={300}
              className="object-cover w-full h-auto transition-transform duration-300"
              loading="lazy"
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] overflow-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selected}
                alt="Foto galeri terpilih"
                width={1200}
                height={800}
                className="object-contain rounded-2xl shadow-2xl"
                priority
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2"
                aria-label="Tutup galeri"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
