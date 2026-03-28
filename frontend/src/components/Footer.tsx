'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent italic">
              LuxeSaloon
            </Link>
            <p className="mt-4 text-gray-500 max-w-xs leading-relaxed">
              Experience the pinnacle of beauty and relaxation at LuxeSaloon. Our expert stylists are dedicated to bringing out your best self.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-500 hover:text-purple-600 transition-colors">Home</Link></li>
              <li><Link href="/services" className="text-gray-500 hover:text-purple-600 transition-colors">Services</Link></li>
              <li><Link href="/staff" className="text-gray-500 hover:text-purple-600 transition-colors">Our Stylists</Link></li>
              <li><Link href="/appointment" className="text-gray-500 hover:text-purple-600 transition-colors">Book Now</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-purple-50 hover:text-purple-600 transition-all cursor-pointer">f</div>
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-purple-50 hover:text-purple-600 transition-all cursor-pointer">ig</div>
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-purple-50 hover:text-purple-600 transition-all cursor-pointer">tw</div>
            </div>
            <p className="mt-6 text-sm text-gray-400">Join our newsletter for exclusive beauty tips.</p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} LuxeSaloon Management. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
