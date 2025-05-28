'use client';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative mt-0 px-6 py-14 bg-[#101010] text-white rounded-t-3xl shadow-[0_-2px_30px_rgba(0,0,0,0.4)] overflow-hidden"
    >
      {/* Glowing Orb */}
      <motion.div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-600/20 blur-3xl rounded-full opacity-25 pointer-events-none z-0"
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      />

      {/* Decorative Line */}
      <div className="relative z-10 mx-auto mb-6 w-28 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Thank You Text */}
      <p className="relative z-10 text-center text-gray-300 text-base md:text-lg tracking-wide">
        Terima kasih telah menjadi bagian dari hari bahagia kami.
      </p>

      {/* Social Icons */}
      <div className="relative z-10 mt-6 flex justify-center gap-6">
        <SocialLink
          href="https://instagram.com/username"
          label="Instagram"
          icon={<InstagramIcon />}
        />
        <SocialLink
          href="https://facebook.com/username"
          label="Facebook"
          icon={<FacebookIcon />}
        />
        <SocialLink
          href="mailto:youremail@example.com"
          label="Email"
          icon={<EmailIcon />}
        />
      </div>

      {/* Copyright */}
      <p className="relative z-10 mt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Sanzystore • All rights reserved.
      </p>
    </motion.footer>
  );
}

function SocialLink({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-gray-400 hover:text-white transition-transform duration-300 transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <div className="w-6 h-6">{icon}</div>
    </a>
  );
}

// --- SVG Icons ---
const InstagramIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 1.5a3 3 0 110 6 3 3 0 010-6zm4.75-.88a1.12 1.12 0 11-2.24 0 1.12 1.12 0 012.24 0z" />
  </svg>
);

const FacebookIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.77l-.44 2.9h-2.33v6.99C18.34 21.13 22 17 22 12z" />
  </svg>
);

const EmailIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
  </svg>
);
