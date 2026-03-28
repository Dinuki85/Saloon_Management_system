'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Reveal Your <span className="text-purple-400 italic">Natural Radiance</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Where luxury meets artistry. Our premium treatments and expert stylists are dedicated to creating the perfect look for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-purple-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-purple-700 transition-all shadow-xl hover:shadow-purple-500/20 active:scale-95">
              Get Started
            </Link>
            <Link href="/appointments" className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all active:scale-95">
              Book Appointment
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Our Signature Services</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-lg">Indulge in our curated selection of treatments designed to rejuvenate and inspire.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[{ id: 1, name: "Hair Styling", desc: "Expert cuts, coloring and styling for any occasion.", price: "from $45" },
              { id: 2, name: "Skin Care", desc: "Rejuvenating facials and treatments for healthy skin.", price: "from $60" },
              { id: 3, name: "Nail Care", desc: "Manicures and pedicures with a touch of luxury.", price: "from $35" }].map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-purple-100/50 rounded-2xl flex items-center justify-center mb-6 border border-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  <span className="text-2xl font-bold">0{service.id}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.name}</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">{service.desc}</p>
                <div className="font-bold text-purple-600 text-xl">{service.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
