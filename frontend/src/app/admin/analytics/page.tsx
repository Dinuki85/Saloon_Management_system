'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminStats, getCurrentUser } from '@/utils/api';
import { motion } from 'framer-motion';

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || !user.roles?.includes('ROLE_ADMIN')) {
      router.push('/login');
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse font-black uppercase tracking-widest text-purple-600">Generating Report...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
              Revenue <span className="text-purple-600">Hub</span>
            </h1>
            <p className="text-gray-400 font-medium italic mt-1">Advanced business performance tracking</p>
          </div>
          <button onClick={() => router.push('/admin')} className="text-gray-500 hover:text-purple-600 font-bold transition-colors">Dashboard</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
           <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-purple-500/5 border border-gray-100">
             <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-8 ml-2">Booking Velocity</h3>
             <div className="space-y-6">
                {Object.entries(stats?.bookingsTrend || {}).map(([date, count]: [string, any], i) => (
                  <div key={date} className="flex items-center gap-4">
                     <div className="text-xs font-bold text-gray-500 w-24">{date}</div>
                     <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${(count / 10) * 100}%` }} 
                          className="bg-purple-600 h-full rounded-full" 
                        />
                     </div>
                     <div className="text-xs font-black text-purple-600">{count}</div>
                  </div>
                ))}
             </div>
           </div>

           <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-purple-500/5 border border-gray-100">
             <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-8 ml-2">Revenue Streams</h3>
             <div className="space-y-6">
                {Object.entries(stats?.revenueTrend || {}).map(([date, amount]: [string, any], i) => (
                  <div key={date} className="flex items-center gap-4">
                     <div className="text-xs font-bold text-gray-500 w-24">{date}</div>
                     <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${(amount / 500) * 100}%` }} 
                          className="bg-green-500 h-full rounded-full" 
                        />
                     </div>
                     <div className="text-xs font-black text-green-600">${amount}</div>
                  </div>
                ))}
             </div>
           </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-12 rounded-[50px] text-white shadow-2xl shadow-purple-500/20">
           <div className="max-w-2xl">
              <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Performance Analysis</h2>
              <p className="text-purple-100 font-medium mb-8 leading-relaxed italic">
                Typical saloon growth is measured by appointment retention. Your current total revenue of <span className="text-white font-black">${stats?.totalRevenue}</span> across <span className="text-white font-black">{stats?.totalBookings}</span> bookings shows a healthy trajectory.
              </p>
              <div className="flex gap-4">
                 <button onClick={() => window.print()} className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">Export Report (PDF)</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
