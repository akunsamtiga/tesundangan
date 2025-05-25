export default function CoupleStory() {
  return (
    <section className="py-20 px-4 bg-rose-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-playfair text-rose-600">Our Love Story</h2>
          <p className="text-gray-600 leading-relaxed">
            It started with a chance meeting at a coffee shop. Two strangers, 
            one spilled latte, and a conversation that never ended...
          </p>
          <img 
            src="/images/couple-1.jpg" 
            alt="Couple" 
            className="rounded-2xl shadow-xl" 
          />
        </div>
        
        <div className="space-y-6">
          <img 
            src="/images/couple-2.jpg" 
            alt="Couple" 
            className="rounded-2xl shadow-xl" 
          />
          <p className="text-gray-600 leading-relaxed">
            Through adventures, challenges, and countless memories, 
            we've grown together and now begin our greatest journey...
          </p>
        </div>
      </div>
    </section>
  )
}