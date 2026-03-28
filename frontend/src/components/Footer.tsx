import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent italic">
              LuxeSaloon
            </span>
            <p className="mt-4 text-gray-500 max-w-md">
              Experience the pinnacle of beauty and relaxation. Our expert stylists are dedicated to bringing out your inner radiance through tailored hair and skin treatments.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/" className="text-base text-gray-500 hover:text-gray-900">Home</Link></li>
              <li><Link href="/services" className="text-base text-gray-500 hover:text-gray-900">Services</Link></li>
              <li><Link href="/appointments" className="text-base text-gray-500 hover:text-gray-900">Book Appointment</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-4 text-gray-500">
              <li>123 Beauty Lane, Styled City</li>
              <li>+1 (555) 000-1234</li>
              <li>hello@luxesaloon.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 flex justify-between items-center">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} LuxeSaloon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
