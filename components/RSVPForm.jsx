'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function RSVPForm() {
  const [form, setForm] = useState({
    name: '',
    guests: 1,
    attending: 'yes',
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      await addDoc(collection(db, 'rsvps'), {
        ...form,
        guests: Number(form.guests),
        createdAt: serverTimestamp(),
      });
      setForm({ name: '', guests: 1, attending: 'yes' });
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="my-20 flex items-center justify-center bg-[#101010] p-4">
      <section className="bg-zinc-800 rounded-lg p-8 max-w-md w-full shadow-lg border border-zinc-700">
        <h2 className="text-white text-3xl font-serif mb-6 text-center drop-shadow-md">
          Konfirmasi Kehadiran
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-zinc-300"
            >
              Nama Lengkap Anda <span className="text-red-400">*</span>
            </label>
            <motion.input
              whileFocus={{ scale: 1.02, boxShadow: '0 0 8px rgba(255,255,255,0.4)' }}
              transition={{ type: 'spring', stiffness: 300 }}
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="Contoh: Budi Susanto"
            />
          </div>

          <div>
            <label
              htmlFor="guests"
              className="block mb-2 text-sm font-medium text-zinc-300"
            >
              Jumlah Tamu (termasuk Anda) <span className="text-red-400">*</span>
            </label>
            <motion.input
              whileFocus={{ scale: 1.02, boxShadow: '0 0 8px rgba(255,255,255,0.4)' }}
              transition={{ type: 'spring', stiffness: 300 }}
              type="number"
              id="guests"
              name="guests"
              min="1"
              max="10"
              value={form.guests}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <fieldset>
            <legend className="mb-3 text-sm font-medium text-zinc-300">
              Apakah Anda akan hadir? <span className="text-red-400">*</span>
            </legend>
            <div className="flex gap-6">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={form.attending === 'yes'}
                  onChange={handleChange}
                  required
                  className="accent-zinc-500"
                />
                <span className="ml-2 text-zinc-200">Ya, saya akan hadir</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={form.attending === 'no'}
                  onChange={handleChange}
                  required
                  className="accent-zinc-500"
                />
                <span className="ml-2 text-zinc-200">Tidak bisa hadir</span>
              </label>
            </div>
          </fieldset>

          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-zinc-700 text-white rounded-md font-semibold shadow-lg hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {submitting ? 'Mengirim...' : 'Kirim Konfirmasi Kehadiran'}
          </motion.button>
        </form>

        {status === 'success' && (
          <p className="mt-6 text-center text-green-400 bg-green-900/30 p-3 rounded border border-green-700">
            Terima kasih! Konfirmasi Anda sudah tercatat.
          </p>
        )}
        {status === 'error' && (
          <p className="mt-6 text-center text-red-400 bg-red-900/30 p-3 rounded border border-red-700">
            Terjadi kesalahan, silakan coba lagi.
          </p>
        )}
      </section>
    </div>
  );
}
