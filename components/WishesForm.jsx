'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase'; // pastikan path sesuai

export default function WishesForm() {
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'null', 'success', 'error', 'error-validation'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !wish.trim()) {
      setStatus('error-validation');
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      await addDoc(collection(db, 'wishes'), {
        name: name.trim(),
        text: wish.trim(),
        time: serverTimestamp(),
      });
      setName('');
      setWish('');
      setStatus('success');
    } catch (err) {
      console.error('Error sending wish:', err);
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="my-20 flex items-center justify-center bg-[#101010] px-4">
      <section
        aria-labelledby="wishes-form-heading"
        className="bg-zinc-900/80 backdrop-blur-sm rounded-lg max-w-lg w-full p-8 shadow-xl border border-zinc-700"
      >
        <h2
          id="wishes-form-heading"
          className="text-center text-3xl font-serif text-white mb-8 drop-shadow-md"
        >
          Kirim Ucapan & Doa
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama Anda */}
          <div>
            <label htmlFor="wisher-name" className="block text-sm font-medium text-zinc-300 mb-2">
              Nama Anda <span className="text-red-400">*</span>
            </label>
            <motion.input
              whileFocus={{ scale: 1.01, boxShadow: '0 0 0 3px rgba(113, 113, 122, 0.5)' }}
              transition={{ type: 'spring', stiffness: 300 }}
              type="text"
              id="wisher-name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Sarah & Keluarga"
              required
              aria-required="true"
              className="w-full p-3 rounded-md bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 transition-all duration-200 border border-zinc-700"
            />
          </div>

          {/* Ucapan & Doa */}
          <div>
            <label htmlFor="wisher-wish" className="block text-sm font-medium text-zinc-300 mb-2">
              Ucapan & Doa untuk Kami <span className="text-red-400">*</span>
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.01, boxShadow: '0 0 0 3px rgba(113, 113, 122, 0.5)' }}
              transition={{ type: 'spring', stiffness: 300 }}
              id="wisher-wish"
              name="wish"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="Selamat atas pernikahan kalian! Semoga selalu bahagia..."
              required
              aria-required="true"
              rows={5}
              className="w-full p-3 rounded-md bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 resize-y transition-all duration-200 border border-zinc-700"
            />
          </div>

          {/* Tombol Kirim */}
          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-3 bg-zinc-700 text-white font-semibold rounded-md shadow-lg hover:bg-zinc-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Mengirim Ucapan...
              </>
            ) : (
              'Kirim Ucapan'
            )}
          </motion.button>
        </form>

        {/* Pesan Status */}
        {status === 'success' && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center text-green-400 font-medium bg-green-900/30 p-3 rounded-md border border-green-700"
          >
            Terima kasih atas ucapan dan doa tulusnya!
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center text-red-400 font-medium bg-red-900/30 p-3 rounded-md border border-red-700"
          >
            Maaf, terjadi kesalahan saat mengirim ucapan. Silakan coba lagi.
          </motion.p>
        )}
        {status === 'error-validation' && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center text-orange-400 font-medium bg-orange-900/30 p-3 rounded-md border border-orange-700"
          >
            Mohon isi nama dan ucapan Anda sebelum mengirim.
          </motion.p>
        )}
      </section>
    </div>
  );
}
