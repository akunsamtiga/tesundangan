import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* ... bagian lainnya sama ... */}
        
        <div>
          <h4 className="text-lg mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-rose-500 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-rose-500 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-rose-500 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}