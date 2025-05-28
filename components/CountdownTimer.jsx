'use client';
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

// Ganti tanggal sesuai kebutuhan
const startDate = new Date('2025-05-25T00:00:00');
const targetDate = new Date('2025-08-28T00:00:00');

const formatNumber = (num) => String(num).padStart(2, '0');

export default function CountdownTimer() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [progress, setProgress] = useState(0);

  const updateCountdown = useCallback(() => {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      setTimeLeft(null);
      setProgress(100);
      return;
    }

    const total = targetDate - startDate;
    const done = Math.max(0, now - startDate);
    const percent = Math.min(100, (done / total) * 100);

    setTimeLeft({
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    });
    setProgress(percent);
  }, []);

  useEffect(() => {
    setMounted(true);
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [updateCountdown]);

  if (!mounted) return null;

  return (
    <section className="w-full px-6 py-16 flex flex-col items-center justify-center bg-[#101010] text-white relative overflow-hidden">
      {/* Animated Backgrounds */}
      <motion.div
        className="absolute left-1/3 top-0 w-64 h-64 bg-purple-400/10 blur-3xl rounded-full z-0"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-1/4 bottom-0 w-64 h-64 bg-cyan-400/10 blur-3xl rounded-full z-0"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl sm:text-5xl font-serif font-bold mb-6 text-center drop-shadow relative z-10"
      >
        Menuju Hari Bahagia
      </motion.h2>

      {timeLeft ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center text-lg sm:text-xl text-gray-300 font-light space-y-2 relative z-10"
          aria-live="polite"
        >
          <p>
            <span className="font-medium text-white">{formatNumber(timeLeft.days)}</span> Hari{' '}
            <span className="font-medium text-white">{formatNumber(timeLeft.hours)}</span> Jam{' '}
            <span className="font-medium text-white">{formatNumber(timeLeft.minutes)}</span> Menit{' '}
            <span className="font-medium text-white">{formatNumber(timeLeft.seconds)}</span> Detik
          </p>
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="text-center text-lg md:text-xl text-green-400 relative z-10"
        >
          Acara telah dimulai! 🎉
        </motion.p>
      )}

      <div className="mt-8 w-full max-w-md relative z-10">
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          className="w-full bg-gray-700/40 rounded-full h-4 overflow-hidden"
        >
          <motion.div
            className="h-4 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 rounded-full shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <div className="text-right text-sm text-gray-300 mt-1">
          {progress.toFixed(0)}% Menuju Hari H
        </div>
      </div>
    </section>
  );
}
