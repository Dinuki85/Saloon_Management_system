'use client';

import Link from 'next/link';
import { getCurrentUser, logout } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent italic">
              LuxeSaloon
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
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
              <Link href="/admin" className="text-purple-600 font-bold inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-purple-600 transition-colors">
                Admin Panel
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-500">Hi, {user.firstName}</span>
                <button onClick={handleLogout} className="text-gray-600 hover:text-red-500 font-bold transition-all">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-500 hover:text-gray-900 font-medium">
                  Login
                </Link>
                <Link href="/register" className="bg-purple-600 text-white px-4 py-2 rounded-full font-medium hover:bg-purple-700 transition-all shadow-md hover:shadow-lg">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
