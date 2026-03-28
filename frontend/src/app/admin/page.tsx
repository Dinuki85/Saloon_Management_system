'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllAppointments, getServices, getCurrentUser } from '@/utils/api';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ totalAppointments: 0, pending: 0, services: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || !user.roles?.includes('ROLE_ADMIN')) {
      router.push('/login');
      return;
    }
    fetchStats();
  }, [router]);

  const fetchStats = async () => {
    try {
      const appointments = await getAllAppointments();
      const services = await getServices();
      
      const pending = appointments.filter((a: any) => a.status === 'BOOKED').length;
      const revenue = appointments
        .filter((a: any) => a.status === 'ACCEPTED' || a.status === 'COMPLETED')
        .reduce((acc: number, a: any) => acc + (a.service?.price || 0), 0);

      setStats({
        totalAppointments: appointments.length,
        pending,
        services: services.length,
        revenue
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse font-black uppercase tracking-widest">Loading Analytics...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
            Operational <span className="text-purple-600">Insights</span>
          </h1>
          <div className="flex gap-4 italic text-sm font-bold text-gray-400">
             Admin Control Center
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Bookings", value: stats.totalAppointments, icon: "📅", color: "bg-blue-500" },
            { label: "Pending Approval", value: stats.pending, icon: "⏳", color: "bg-orange-500" },
            { label: "Active Services", value: stats.services, icon: "✂️", color: "bg-purple-500" },
            { label: "Est. Revenue", value: `$${stats.revenue}`, icon: "💰", color: "bg-green-500" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-purple-500/5 border border-gray-100 relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-5 rounded-bl-full group-hover:scale-150 transition-transform`} />
              <div className="text-3xl mb-4">{stat.icon}</div>
              <div className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-3xl font-black text-gray-900">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-purple-500/5 border border-gray-100">
            <h2 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => router.push('/admin/appointments')}
                className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-purple-200 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">📝</span>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">Manage Appointments</div>
                    <div className="text-xs text-gray-400 font-medium">Accept, reject or update bookings</div>
                  </div>
                </div>
                <span className="text-gray-300 group-hover:text-purple-600 transition-colors">→</span>
              </button>
              
              <button 
                onClick={() => router.push('/admin/services')}
                className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-purple-200 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">✂️</span>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">Manage Services</div>
                    <div className="text-xs text-gray-400 font-medium">Add, edit or adjust salon pricing</div>
                  </div>
                </div>
                <span className="text-gray-300 group-hover:text-purple-600 transition-colors">→</span>
              </button>

              <button 
                onClick={() => router.push('/admin/users')}
                className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-purple-200 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">👥</span>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">Customer Records</div>
                    <div className="text-xs text-gray-400 font-medium">View and manage registered members</div>
                  </div>
                </div>
                <span className="text-gray-300 group-hover:text-purple-600 transition-colors">→</span>
              </button>

              <button 
                onClick={() => router.push('/admin/analytics')}
                className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-purple-200 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">📈</span>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">Revenue Analytics</div>
                    <div className="text-xs text-gray-400 font-medium">Detailed financial and booking trends</div>
                  </div>
                </div>
                <span className="text-gray-300 group-hover:text-purple-600 transition-colors">→</span>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-10 rounded-3xl text-white shadow-2xl shadow-purple-500/20 flex flex-col justify-center">
            <h2 className="text-2xl font-black mb-4 leading-tight">Salon Status</h2>
            <p className="text-purple-100 mb-8 font-medium">You have {stats.pending} appointments waiting for approval. Quick management keeps clients happy!</p>
            <div className="flex gap-4">
               <button onClick={() => router.push('/admin/appointments')} className="bg-white text-purple-600 px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-xl">Review Pending</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
