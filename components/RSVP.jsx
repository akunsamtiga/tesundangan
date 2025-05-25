export default function RSVP() {
  return (
    <section className="py-20 bg-gradient-to-r from-rose-100 to-pink-100" id="rsvp">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="font-playfair text-4xl text-rose-600 mb-8">RSVP</h2>
        
        <form className="space-y-6">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500"
          />
          
          <input 
            type="email" 
            placeholder="Your Email" 
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500"
          />
          
          <div className="space-y-4">
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition">
                Attending
              </button>
              <button className="px-8 py-3 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition">
                Regret
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}