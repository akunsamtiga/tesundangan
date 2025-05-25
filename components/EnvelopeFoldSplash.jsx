'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EnvelopeFoldSplash({ onFinish }) {
  const [isOpened, setIsOpened] = useState(false);

  // Variants flap folding
  const flapVariants = {
    closed: { rotateX: 0, originY: '100%', transition: { duration: 1.5, ease: [0.6, 0.01, 0.05, 0.9] } },
    open: { rotateX: -160, originY: '100%', transition: { duration: 1.5, ease: [0.6, 0.01, 0.05, 0.9] } },
  };

  // Variants envelope body fade + slide up
  const bodyVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, y: -60, transition: { duration: 1, delay: 1.5 } },
  };

  // Handle click buka amplop
  function handleOpen() {
    if (isOpened) return;
    setIsOpened(true);

    setTimeout(() => {
      if (onFinish) onFinish();
    }, 2800); // waktu total animasi + delay sebelum splash hilang
  }

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          key="envelope-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          className="fixed inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex flex-col items-center justify-center cursor-pointer select-none perspective-600"
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpen()}
        >
          <motion.div
            className="relative w-64 h-44"
            style={{ transformStyle: 'preserve-3d' }}
            initial="closed"
            animate={isOpened ? 'open' : 'closed'}
          >
            {/* Flap */}
            <motion.div
              variants={flapVariants}
              className="absolute top-0 left-0 w-full h-20 bg-gradient-to-br from-indigo-700 to-purple-700 rounded-t-xl shadow-lg origin-bottom"
              style={{ transformOrigin: 'bottom center', boxShadow: '0 8px 16px rgb(70 44 173 / 0.7)' }}
            >
              {/* Flap shine */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{
                  background:
                    'linear-gradient(120deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0.0) 100%)',
                  transform: 'translateX(-100%)',
                  animation: 'shine 2.5s linear infinite',
                }}
              />
            </motion.div>

            {/* Envelope body */}
            <motion.div
              variants={bodyVariants}
              className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-b-xl shadow-xl border border-indigo-800"
              style={{
                boxShadow: '0 12px 20px rgb(70 44 173 / 0.8)',
                borderTop: '2px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Front envelope detail lines */}
              <svg
                className="absolute top-4 left-4 w-56 h-16 pointer-events-none"
                viewBox="0 0 224 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M0 0L112 64L224 0"
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M8 0L112 54L216 0"
                  stroke="rgba(255, 255, 255, 0.06)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-10 text-indigo-300 text-lg font-semibold select-none tracking-wide"
          >
            Klik amplop untuk membuka undangan
          </motion.p>

          <style jsx>{`
            @keyframes shine {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(150%);
              }
            }
            .perspective-600 {
              perspective: 600px;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
