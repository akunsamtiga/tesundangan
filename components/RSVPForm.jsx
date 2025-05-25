'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function RSVPForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    guests: 1,
    attending: 'yes',
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'null', 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null); // Reset status before new submission

    try {
      // Simulate API call or external submission
      await onSubmit?.(form);
      setForm({ name: '', guests: 1, attending: 'yes' }); // Clear form on success
      setStatus('success');
    } catch (err) {
      console.error('RSVP submission error:', err); // Log the error for debugging
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="rsvp-heading"
      className="mt-16 px-6 py-12 bg-zinc-900/80 backdrop-blur-sm rounded-lg max-w-lg mx-auto shadow-xl border border-zinc-700" // Lebih gelap, border halus
    >
      <h2
        id="rsvp-heading"
        className="text-center text-3xl font-serif text-white mb-8 drop-shadow-md"
      >
        Konfirmasi Kehadiran
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nama */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-300 mb-2" // Warna teks label
          >
            Nama Lengkap Anda <span className="text-red-400">*</span>
          </label>
          <motion.input
            whileFocus={{ scale: 1.01, boxShadow: '0 0 0 3px rgba(113, 113, 122, 0.5)' }} // Glow abu-abu
            transition={{ type: 'spring', stiffness: 300 }}
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            aria-required="true"
            className="w-full p-3 rounded-md bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 transition-all duration-200 border border-zinc-700" // Input lebih gelap
            placeholder="Contoh: Budi Susanto"
          />
        </div>

        {/* Jumlah Tamu */}
        <div>
          <label
            htmlFor="guests"
            className="block text-sm font-medium text-zinc-300 mb-2"
          >
            Jumlah Tamu (termasuk Anda) <span className="text-red-400">*</span>
          </label>
          <motion.input
            whileFocus={{ scale: 1.01, boxShadow: '0 0 0 3px rgba(113, 113, 122, 0.5)' }} // Glow abu-abu
            transition={{ type: 'spring', stiffness: 300 }}
            type="number"
            id="guests"
            name="guests"
            min="1"
            max="10"
            value={form.guests}
            onChange={handleChange}
            required
            aria-required="true"
            className="w-full p-3 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-zinc-600 transition-all duration-200 border border-zinc-700" // Input lebih gelap
            aria-describedby="guest-help-text"
          />
          <p id="guest-help-text" className="mt-1 text-xs text-zinc-400">
            Maksimal 10 tamu per konfirmasi.
          </p>
        </div>

        {/* Kehadiran */}
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-zinc-300">
            Apakah Anda akan hadir? <span className="text-red-400">*</span>
          </legend>
          <div className="flex flex-col sm:flex-row gap-4">
            {['yes', 'no'].map((opt) => (
              <label
                key={opt}
                htmlFor={`attending-${opt}`}
                className="inline-flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  id={`attending-${opt}`}
                  name="attending"
                  value={opt}
                  checked={form.attending === opt}
                  onChange={handleChange}
                  required
                  className="accent-zinc-500 h-4 w-4" // Accent warna abu-abu
                />
                <span className="text-zinc-200 capitalize select-none">
                  {opt === 'yes' ? 'Ya, saya akan hadir' : 'Tidak bisa hadir'}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Submit */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          disabled={submitting}
          className="w-full py-3 bg-zinc-700 text-white font-semibold rounded-md shadow-lg hover:bg-zinc-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" // Tombol abu-abu
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
              Mengirim...
            </>
          ) : (
            'Kirim Konfirmasi Kehadiran'
          )}
        </motion.button>
      </form>

      {/* Status Message */}
      {status === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center text-green-400 font-medium bg-green-900/30 p-3 rounded-md border border-green-700" // Pesan sukses
        >
          Terima kasih banyak! Konfirmasi kehadiran Anda sudah tercatat. Kami tidak sabar bertemu dengan Anda!
        </motion.p>
      )}
      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center text-red-400 font-medium bg-red-900/30 p-3 rounded-md border border-red-700" // Pesan error
        >
          Maaf, terjadi kesalahan saat mengirim konfirmasi Anda. Silakan coba lagi nanti atau hubungi kami secara langsung.
        </motion.p>
      )}
    </section>
  );
}