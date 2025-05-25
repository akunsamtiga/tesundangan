'use client';
import { useState } from 'react';
import Hero from '../components/Hero';
import CountdownTimer from '../components/CountdownTimer';
import Gallery from '../components/Gallery';
import RSVPForm from '../components/RSVPForm';
import WishesForm from '../components/WishesForm';
import WishesList from '../components/WishesList';
import Footer from '../components/Footer';
import MapEmbed from '@/components/MapEmbed';

export default function Home() {
  const [wishes, setWishes] = useState([]);

  const addWish = (wish) => {
    // di sini bisa kirim ke backend/Firebase, lalu:
    setWishes(prev => [wish, ...prev]);
  };

  const handleRSVP = async (rsvp) => {
    // kirim ke backend atau Firebase
    console.log('RSVP:', rsvp);
  };

  return (
    <>
      <Hero />
      <CountdownTimer />
      <Gallery />
      <RSVPForm onSubmit={handleRSVP} />
      <WishesForm onAddWish={addWish} />
      <MapEmbed />
      <Footer />
    </>
  );
}
