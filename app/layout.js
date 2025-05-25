// app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Undangan Pernikahan Andra & Naya',
  description: 'Undangan digital pernikahan modern untuk Andra & Naya.',
  keywords: ['undangan pernikahan', 'wedding invitation', 'digital wedding', 'nextjs'],
  openGraph: {
    title: 'Undangan Pernikahan Andra & Naya',
    description: 'Kami mengundang Anda untuk hadir di hari bahagia kami.',
    images: [
      {
        url: '/foto1.jpg',
        width: 1200,
        height: 630,
        alt: 'Undangan Pernikahan Andra & Naya',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Undangan Pernikahan Andra & Naya',
    description: 'Kami mengundang Anda untuk hadir di hari bahagia kami.',
    images: ['/foto1.jpg'],
  },
  metadataBase: new URL('https://yourdomain.com'), // Ganti dengan domain kamu
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`scroll-smooth bg-white text-gray-800 dark:bg-gray-900 dark:text-white ${inter.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
