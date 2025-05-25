'use client';
import { motion, AnimatePresence } from 'framer-motion';

const listVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
  }),
};

export default function WishesList({ wishes = [] }) {
  return (
    <section
      aria-labelledby="wishes-list-heading"
      className="mt-12 px-6 max-w-3xl mx-auto"
    >
      <h2
        id="wishes-list-heading"
        className="text-center text-3xl font-serif text-white mb-8"
      >
        Ucapan Tamu
      </h2>

      <div className="space-y-6">
        <AnimatePresence>
          {wishes.map((w, idx) => (
            <motion.div
              key={w.time + idx}
              custom={idx}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
              variants={listVariant}
              className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 shadow-md"
            >
              <p className="text-gray-200 italic">“{w.text}”</p>
              <div className="mt-2 flex justify-between items-center text-sm text-gray-400">
                <span className="font-medium text-white">{w.name}</span>
                <time dateTime={w.time}>
                  {new Date(w.time).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </time>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {wishes.length === 0 && (
          <p className="text-center text-gray-400">Belum ada ucapan, jadilah yang pertama!</p>
        )}
      </div>
    </section>
  );
}
