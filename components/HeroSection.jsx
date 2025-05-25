export default function HeroSection() {
  return (
    <section className="hero-pattern min-h-screen flex items-center justify-center relative">
      <div className="text-center text-white z-10">
        <h1 className="text-5xl md:text-7xl font-playfair mb-6 animate-fade-in">
          Ari & Lina
        </h1>
        <p className="text-xl md:text-2xl mb-8">28 September 2024 • Bali, Indonesia</p>
        
        <div className="floating bg-white/10 backdrop-blur p-6 rounded-full inline-block">
          <span className="text-3xl font-bold text-rose-500">28</span>
          <span className="block text-sm uppercase tracking-widest">September</span>
        </div>
      </div>
    </section>
  )
}