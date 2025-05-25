'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay, 
      duration: 1, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    },
  }),
};

const floatingShapeProps = (randomDuration) => ({
  animate: { 
    y: [0, 15, 0],
    rotate: [0, 5, -5, 0]
  },
  transition: { 
    duration: randomDuration || 4,
    repeat: Infinity,
    ease: 'easeInOut'
  }
});

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-[#0d0d0d] overflow-hidden px-6 text-white">
      {/* Optimized Background Image */}
      <Image
        src="/images/w1.jpg"
        alt="Pasangan prewedding"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 75vw"
        className="object-cover object-center opacity-20 z-0"
        quality={85}
        placeholder="blur"
        blurDataURL="/images/w1-blur.jpg"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black z-10" />

      {/* Dynamic Glow Orbs */}
      <motion.div
        className="absolute top-1/3 left-0 w-48 h-48 bg-purple-500/20 blur-3xl rounded-full"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-0 w-48 h-48 bg-cyan-500/20 blur-3xl rounded-full"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
      />

      {/* Animated Shapes */}
      <motion.div 
        className="absolute rounded-full border border-gray-600/30 w-40 h-40 top-20 left-10"
        {...floatingShapeProps(4.5)}
      />
      <motion.div 
        className="absolute rounded-full border border-gray-400/20 w-24 h-24 bottom-32 right-20"
        {...floatingShapeProps(5.2)}
      />
      <motion.div 
        className="absolute rounded-full border border-gray-300/10 w-52 h-52 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
      />

      {/* Main Content */}
      <motion.div className="relative z-20 text-center max-w-xl space-y-4">
        <motion.h1
          variants={textVariant}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight drop-shadow-lg leading-tight"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="inline-block relative">
            <span className="relative z-10">Andra</span>
            <div className="absolute bottom-0 w-full h-2 bg-white/20 -rotate-1" />
          </div>
          <span className="text-gray-400 font-light text-4xl md:text-5xl"> & </span>
          <div className="inline-block relative mt-2">
            <span className="relative z-10">Naya</span>
            <div className="absolute bottom-0 w-full h-2 bg-white/20 rotate-1" />
          </div>
        </motion.h1>

        <motion.p
          variants={textVariant}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="mt-4 text-lg sm:text-xl text-gray-300 font-light font-sans max-w-[500px] mx-auto"
        >
          Kami mengundang Anda menyaksikan kisah cinta kami di bawah cahaya bulan purnama.
        </motion.p>

        <motion.p
          variants={textVariant}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="mt-2 text-sm uppercase tracking-[0.2em] text-gray-500 font-sans"
        >
          12 Oktober 2025 • Bandung
        </motion.p>

        <motion.div
          variants={textVariant}
          initial="hidden"
          animate="visible"
          custom={1.2}
          className="mt-8"
        >
          <a
            href="#rsvp"
            aria-label="Konfirmasi kehadiran"
            className="inline-block px-8 py-4 rounded-full bg-white/95 text-black font-semibold font-sans shadow-lg hover:bg-gray-200 hover:scale-105 transition-all duration-300 text-lg"
          >
            RSVP Sekarang
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="animate-bounce w-6 h-10 border-2 border-gray-400 rounded-full">
          <div className="w-1 h-2 bg-gray-400 mx-auto mt-2 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}