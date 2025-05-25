'use client';
import { motion } from 'framer-motion';

export default function MapEmbed({
  mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.831836582028!2d111.82157901478692!3d-8.094599490726313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78ff425f8a6311%3A0x4027a76d949b7f0!2sTulungagung%2C%20Tulungagung%20Regency%2C%20East%20Java%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1684971966501!5m2!1sen!2sid',
  mapDirectionsUrl = 'https://www.google.com/maps/search/?api=1&query=-8.094599,111.821579',
  label = 'Lokasi Acara Pernikahan di Tulungagung',
}) {
  return (
    <section
      aria-label="Lokasi Acara Pernikahan"
      className="relative mt-16 px-6 py-12 bg-zinc-900/80 backdrop-blur-sm rounded-lg max-w-4xl mx-auto shadow-xl border border-zinc-700"
    >
      <h2 className="text-center text-3xl font-serif text-white mb-8 drop-shadow-md">
        Lokasi Acara
      </h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-lg shadow-2xl border border-zinc-700"
        style={{ paddingTop: '56.25%' }} // 16:9 aspect ratio
      >
        <iframe
          src={mapEmbedUrl}
          title={label}
          aria-label={label}
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full border-0 filter grayscale-[50%] contrast-[80%]"
        />
      </motion.div>

      <div className="text-center mt-8">
        <a
          href={mapDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center py-3 px-6 bg-zinc-700 text-white font-semibold rounded-md shadow-lg hover:bg-zinc-600 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657m10.314-10.314L13.414 3.1a1.998 1.998 0 00-2.828 0L6.343 6.343m10.314 10.314A10.027 10.027 0 0018 9c0-5.523-4.477-10-10-10S-2 3.477-2 9c0 2.22-.796 4.307-2.203 5.922L12 22l4.828-4.828z" />
          </svg>
          Buka di Google Maps
        </a>
        <p className="mt-4 text-sm text-zinc-400">
          (Klik tombol di atas untuk membuka peta di aplikasi Google Maps)
        </p>
      </div>
    </section>
  );
}
