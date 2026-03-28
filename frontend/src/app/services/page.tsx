'use client';

import { useState, useEffect } from 'react';
import { getServices } from '@/utils/api';
import Link from 'next/link';

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err: any) {
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Our Premium <span className="text-purple-600 italic">Services</span>
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Choose from our range of expertly crafted beauty and relaxation treatments.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center mb-8 border border-red-100">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-purple-500/5 border border-gray-100 hover:border-purple-200 transition-all group">
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors uppercase tracking-tight">
                    {service.name}
                  </h3>
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-bold">
                    {service.duration} mins
                  </span>
                </div>
                <p className="text-gray-500 mb-6 line-clamp-3 leading-relaxed">
                  {service.description || 'No description available for this luxury treatment.'}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-3xl font-extrabold text-gray-900">${service.price}</span>
                  <Link href={`/booking?service=${service.id}`} className="bg-purple-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-md hover:shadow-purple-500/20 active:scale-95">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && !error && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No services available at the moment. Please check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
