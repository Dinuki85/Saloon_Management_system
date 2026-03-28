'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-white/20 shadow-sm hover:shadow-md transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent italic">
              LuxeSaloon
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:ml-6 md:flex md:space-x-8">
            <Link href="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-purple-500 transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-purple-500 transition-colors">
              Services
            </Link>
            {user && (
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-purple-500 transition-colors">
                Dashboard
              </Link>
            )}
            {user && user.roles && user.roles.includes('ROLE_ADMIN') && (
              <div className="flex space-x-4 border-l pl-6 border-gray-100 italic">
                <Link href="/admin/appointments" className="text-purple-600 font-black inline-flex items-center px-1 pt-1 text-sm uppercase tracking-tighter hover:text-purple-800 transition-colors">
                  Appointments
                </Link>
                <Link href="/admin/services" className="text-purple-600 font-black inline-flex items-center px-1 pt-1 text-sm uppercase tracking-tighter hover:text-purple-800 transition-colors">
                  Services
                </Link>
                <Link href="/admin/staff" className="text-purple-600 font-black inline-flex items-center px-1 pt-1 text-sm uppercase tracking-tighter hover:text-purple-800 transition-colors">
                  Staff
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden md:flex items-center gap-4 pl-4 border-l border-gray-100">
                <div className="flex flex-col items-end mr-2">
                  <span className="text-xs font-black text-gray-900 leading-none">👋 Hi, {user.firstName}</span>
                  {user.roles?.includes('ROLE_ADMIN') && <span className="text-[9px] font-black text-purple-600 uppercase tracking-tighter mt-1">Administrator</span>}
                </div>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-50 text-red-500 hover:bg-red-100 px-3 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/login" className="text-gray-500 hover:text-gray-900 font-medium">
                  Login
                </Link>
                <Link href="/register" className="bg-purple-600 text-white px-4 py-2 rounded-full font-medium hover:bg-purple-700 transition-all shadow-md hover:shadow-lg">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden sticky top-16 w-full z-50 bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-3">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-2xl text-base font-bold text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all">Home</Link>
              <Link href="/services" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-2xl text-base font-bold text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all">Services</Link>
              
              {user && (
                <div className="px-4 py-4 bg-purple-50 rounded-2xl border border-purple-100 mb-3">
                   <p className="text-[10px] font-black uppercase tracking-widest text-purple-600 mb-1">Welcome back</p>
                   <p className="text-lg font-black text-gray-900 italic">👋 Hi, {user.firstName}!</p>
                </div>
              )}
              
              {user && (
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-2xl text-base font-bold text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all">My Appointments</Link>
              )}
              
              {user && user.roles && user.roles.includes('ROLE_ADMIN') && (
                <div className="space-y-1 bg-purple-50 rounded-2xl p-2 border border-purple-100">
                  <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-purple-600 italic">Admin Controls</p>
                  <Link href="/admin/appointments" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-bold text-purple-700 hover:bg-white transition-colors">Manage Bookings</Link>
                  <Link href="/admin/services" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-bold text-purple-700 hover:bg-white transition-colors">Manage Services</Link>
                  <Link href="/admin/staff" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-bold text-purple-700 hover:bg-white transition-colors">Manage Staff</Link>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <Link href={user ? "/appointment" : "/login?redirect=/appointment"} onClick={() => setIsMenuOpen(false)} className="w-full bg-purple-600 text-white text-center py-4 rounded-2xl font-black shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                  BOOK NOW
                </Link>
                
                {!user ? (
                  <>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full py-3 text-center text-gray-600 font-bold hover:bg-gray-50 rounded-2xl transition-all">Login</Link>
                    <Link href="/register" onClick={() => setIsMenuOpen(false)} className="w-full py-3 text-center text-purple-600 font-bold hover:bg-purple-50 rounded-2xl transition-all">Register</Link>
                  </>
                ) : (
                  <button 
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }} 
                    className="w-full py-4 text-center text-red-600 font-bold hover:bg-red-50 rounded-2xl transition-all"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
