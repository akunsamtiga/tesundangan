'use client'

import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

export default function GuestList() {
  const [guests, setGuests] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'rsvp'), orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(q, snapshot => {
      setGuests(snapshot.docs.map(doc => doc.data()))
    })
    return () => unsub()
  }, [])

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-center text-3xl md:text-4xl font-serif text-primary dark:text-accent mb-10">
        Daftar Kehadiran
      </h2>
      <div className="max-w-4xl mx-auto space-y-2">
        {guests.map((guest, i) => (
          <p key={i} className="text-gray-700 dark:text-gray-200 text-center">
            {guest.nama} ({guest.kehadiran}) - {guest.jumlah} orang
          </p>
        ))}
      </div>
    </section>
  )
}
