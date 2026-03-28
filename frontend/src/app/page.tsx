'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gray-900 -mt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-gray-900/90 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-[center_top] md:bg-center" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-none">
            Reveal Your <span className="text-purple-400 italic">Natural Radiance</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Where luxury meets artistry. Our premium treatments and expert stylists are dedicated to creating the perfect look for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href={user ? "/appointment" : "/login?redirect=/appointment"}
                className="bg-white text-purple-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl hover:bg-gray-50 active:scale-95 transition-all text-sm"
              >
                Get Started
              </Link>
              <Link 
                href="/services"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/20 active:scale-95 transition-all text-sm"
              >
                View Services
              </Link>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Our Signature Services</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-lg">Indulge in our curated selection of treatments designed to rejuvenate and inspire.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[{ id: 1, name: "Hair Styling", desc: "Expert cuts, coloring and styling for any occasion.", price: "from $45" },
              { id: 2, name: "Skin Care", desc: "Rejuvenating facials and treatments for healthy skin.", price: "from $60" },
              { id: 3, name: "Nail Care", desc: "Manicures and pedicures with a touch of luxury.", price: "from $35" }].map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-purple-100/50 rounded-2xl flex items-center justify-center mb-6 border border-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  <span className="text-2xl font-bold">0{service.id}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 uppercase tracking-tighter">{service.name}</h3>
                <p className="text-gray-500 mb-6 leading-relaxed text-sm">{service.desc}</p>
                <div className="mt-auto font-black text-purple-600 text-xl">{service.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative">
              <div className="absolute -inset-4 bg-purple-100/50 rounded-3xl -rotate-2 -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80" 
                alt="Luxury Salon Interior" 
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <span className="text-purple-600 font-bold uppercase tracking-widest text-sm">Experience the Difference</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">Elevating Beauty into an <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Art Form</span></h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Since our inception, LuxeSaloon has been dedicated to providing a transformative beauty experience. Our stylists are more than professionals; they are artists committed to unveiling your truest self through precision, passion, and the world's finest products.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <h4 className="font-black text-gray-900 text-3xl">10k+</h4>
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-tighter">Satisfied clients</p>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-3xl">15+</h4>
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-tighter">Expert Stylists</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-16 tracking-tight">Why Choose <span className="text-purple-600">LuxeSaloon</span>?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Premium Products", desc: "We use only the world's most luxurious organic hair and skin care lines.", icon: "✨" },
              { title: "Expert Artists", desc: "Our team undergoes continuous training to master the latest global trends.", icon: "✂️" },
              { title: "Hygienic Standards", desc: "Your safety is our priority with medical-grade sanitization protocols.", icon: "🧤" },
              { title: "Modern Ambiance", desc: "An oasis of relaxation designed to soothe your senses and mind.", icon: "🛋️" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-purple-500/5 transition-all text-center"
              >
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-tighter">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Style <span className="text-purple-600">Gallery</span></h2>
          <p className="text-gray-500">Glimpses of beauty created with precision.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 max-w-full">
          {[
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1595476108010-b4d1f8c2b1b1?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1481504027410-675127cfec31?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80"
          ].map((url, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="aspect-square rounded-2xl overflow-hidden group relative"
            >
              <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact & Location */}
      <section id="contact" className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Visit Our <span className="text-purple-400">Sanctuary</span></h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl text-purple-400 text-2xl">📍</div>
                  <div>
                    <h4 className="font-bold text-lg">Our Location</h4>
                    <p className="text-gray-400">123 Luxury Avenue, Colombo 07, Sri Lanka</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl text-purple-400 text-2xl">📞</div>
                  <div>
                    <h4 className="font-bold text-lg">Call Us</h4>
                    <p className="text-gray-400">+94 77 123 4567 / +94 11 234 5678</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl text-purple-400 text-2xl">✉️</div>
                  <div>
                    <h4 className="font-bold text-lg">Email Us</h4>
                    <p className="text-gray-400">info@luxesaloon.com</p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                 <Link href="/appointment" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all shadow-2xl shadow-purple-500/20">Book Now</Link>
              </div>
            </div>
            <div className="h-[400px] rounded-3xl overflow-hidden border border-white/10 relative z-10">
              <img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80" alt="Map" className="w-full h-full object-cover grayscale opacity-50 grayscale-0" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 text-center">
                  <p className="font-bold text-lg mb-2">Find Us on Google Maps</p>
                  <button className="bg-white text-black px-6 py-2 rounded-xl text-sm font-bold">Open Maps</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
