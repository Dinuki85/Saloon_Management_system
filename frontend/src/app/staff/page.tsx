"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getStaff } from '@/utils/api';
import { Staff } from '@/types';
import { motion } from 'framer-motion';

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getStaff()
      .then((data: Staff[]) => {
        setStaff(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError('Failed to load staff list.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Our Expert <span className="text-purple-600">Stylists</span></h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 mb-8">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-black text-gray-900 mb-1 leading-tight">{member.name}</h3>
                  <p className="text-indigo-600 font-bold mb-4 text-sm md:text-base">{member.specialization}</p>
                  <p className="text-gray-500 mb-6 text-sm leading-relaxed">{member.availability || 'Available daily'}</p>
                  <Link href={`/appointment?staff=${member.id}`} className="block w-full">
                    <button className="w-full bg-indigo-600 text-white py-4 md:py-2 rounded-2xl md:rounded-lg hover:bg-indigo-700 transition font-black uppercase tracking-tighter shadow-lg hover:shadow-indigo-500/20 active:scale-95 text-sm">
                      Book with {member.name.split(' ')[0]}
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
