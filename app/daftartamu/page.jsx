'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

function formatDate(timestamp) {
  if (!timestamp?.seconds) return '-';
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function GuestList() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGuests() {
      try {
        const q = query(collection(db, 'rsvps'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        setGuests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error('Error fetching guests:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGuests();
  }, []);

  return (
    <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-900 to-zinc-800">
      <div className="max-w-3xl mx-auto">
        {/* Judul utama */}
        <h2 className="text-3xl font-extrabold text-white mb-2 text-center tracking-tight">
          Daftar Tamu
        </h2>

        {/* Jumlah yang telah mengisi */}
        <p className="text-center text-zinc-400 mb-8">
          Jumlah tamu yang telah mengisi:{' '}
          <span className="text-white font-semibold">{guests.length}</span>
        </p>

        {loading ? (
          <div className="flex justify-center items-center space-x-3 text-indigo-400 text-lg">
            <svg
              className="animate-spin h-7 w-7 text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12" cy="12" r="10"
                stroke="currentColor" strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <p>Memuat daftar tamu...</p>
          </div>
        ) : guests.length === 0 ? (
          <p className="text-center text-zinc-400 text-lg">
            Belum ada tamu yang mengisi RSVP.
          </p>
        ) : (
          <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-transparent">
            {guests.map(guest => (
              <div
                key={guest.id}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition hover:bg-indigo-900/20 shadow-md"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">
                    {guest.name}
                  </h3>
                  <span className="text-sm text-zinc-400 italic">
                    {formatDate(guest.createdAt)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-zinc-300">
                  <span>
                    Jumlah Tamu:{' '}
                    <span className="font-medium text-indigo-300">
                      {guest.guests || 1}
                    </span>
                  </span>
                  <span>|</span>
                  <span>
                    Kehadiran:{' '}
                    <span
                      className={
                        guest.attending === 'yes'
                          ? 'text-green-400'
                          : 'text-red-400'
                      }
                    >
                      {guest.attending === 'yes' ? 'Hadir' : 'Tidak Hadir'}
                    </span>
                  </span>
                </div>
                {guest.message && (
                  <p className="mt-3 text-indigo-400 italic max-w-xl">
                    💬 {guest.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
