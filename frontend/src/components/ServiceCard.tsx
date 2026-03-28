'use client';

import Link from 'next/link';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
}

export default function ServiceCard({ service, showBookButton = true }: { service: Service; showBookButton?: boolean }) {
  return (
    <article className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-purple-500/5 border border-gray-100 hover:border-purple-200 transition-all group h-full flex flex-col">
      <div className="p-8 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors uppercase tracking-tight">
            {service.name}
          </h3>
          <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">
            {service.duration} mins
          </span>
        </div>
        <p className="text-gray-500 mb-6 line-clamp-3 leading-relaxed">
          {service.description || 'No description available for this luxury treatment.'}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-3xl font-extrabold text-gray-900">${service.price}</span>
          {showBookButton && (
            <Link 
              href={`/booking?service=${service.id}`} 
              aria-label={`Book ${service.name} treatment`}
              className="bg-purple-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-md hover:shadow-purple-500/20 active:scale-95"
            >
              Book Now
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
