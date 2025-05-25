'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { FiHeart } from 'react-icons/fi'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Header = () => {
  const headerRef = useRef(null)
  const [isSticky, setIsSticky] = useState(false)

  const menuItems = [
    { name: 'Beranda', href: '#home' },
    { name: 'Mempelai', href: '#couple' },
    { name: 'Acara', href: '#event' },
    { name: 'Galeri', href: '#gallery' },
    { name: 'RSVP', href: '#rsvp' }
  ]

  useEffect(() => {
    // Animasi masuk header
    gsap.from(headerRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 1.5,
      ease: 'power3.out'
    })

    // Sticky effect setelah melewati hero section
    ScrollTrigger.create({
      trigger: '#hero-section',
      start: 'bottom top',
      end: 'bottom top',
      onEnter: () => setIsSticky(true),
      onLeaveBack: () => setIsSticky(false),
      markers: false
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <>
      {/* Header normal di bawah hero */}
      <header 
        ref={headerRef}
        className="w-full bg-white/90 backdrop-blur-sm shadow-sm py-4 relative z-30"
        id="main-header"
      >
        <div className="container mx-auto px-6">
          <nav className="flex flex-col md:flex-row items-center justify-between">
            <Link 
              href="#home" 
              className="flex items-center mb-4 md:mb-0 group"
            >
              <FiHeart className="text-rose-500 mr-2 group-hover:text-rose-600 transition-colors" />
              <span className="text-xl font-serif text-gray-800 group-hover:text-rose-600 transition-colors">
                Wedding
              </span>
            </Link>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors relative py-1 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Clone header untuk sticky effect */}
      <header 
        className={`w-full bg-white/90 backdrop-blur-sm shadow-sm py-4 fixed top-0 left-0 z-40 transition-all duration-500 ${isSticky ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}
        aria-hidden="true"
      >
        <div className="container mx-auto px-6">
          <nav className="flex flex-col md:flex-row items-center justify-between">
            <Link 
              href="#home" 
              className="flex items-center mb-4 md:mb-0 group"
            >
              <FiHeart className="text-rose-500 mr-2 group-hover:text-rose-600 transition-colors" />
              <span className="text-xl font-serif text-gray-800 group-hover:text-rose-600 transition-colors">
                Wedding
              </span>
            </Link>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors relative py-1 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header