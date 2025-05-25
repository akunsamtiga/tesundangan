export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <span className="text-2xl font-playfair text-rose-600">A&L</span>
        <div className="flex gap-8">
          <a href="#story" className="hover:text-rose-500 transition">Story</a>
          <a href="#gallery" className="hover:text-rose-500 transition">Gallery</a>
          <a href="#rsvp" className="hover:text-rose-500 transition">RSVP</a>
        </div>
      </div>
    </nav>
  )
}