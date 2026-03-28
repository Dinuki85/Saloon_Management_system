'use client';

import { useState, useEffect } from 'react';
import { getAdminStats } from '@/utils/api';
import AnalyticsCharts from '@/components/AnalyticsCharts';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStatsData();
  }, []);

  const statCards = [
    { name: 'Total Bookings', value: stats?.totalBookings || 0, icon: '📅', color: 'blue' },
    { name: 'Total Revenue', value: `$${stats?.totalRevenue || 0}`, icon: '💰', color: 'green' },
    { name: 'Total Customers', value: stats?.totalCustomers || 0, icon: '👥', color: 'purple' },
    { name: 'Pending Approvals', value: 0, icon: '⏳', color: 'orange' },
  ];

  if (loading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-12 bg-gray-200 rounded-2xl w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-gray-200 rounded-3xl"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Admin <span className="text-purple-600">Overview</span>
        </h1>
        <p className="text-gray-500 mt-2">Here's what's happening at LuxeSaloon today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.name} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-purple-500/5 hover:border-purple-200 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{card.icon}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-purple-600 transition-colors">
                {card.name}
              </span>
            </div>
            <p className="text-3xl font-black text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {stats && <AnalyticsCharts stats={stats} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center sm:text-left">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-purple-500/5">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
             <p className="text-gray-500 italic">No recent activity to display.</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-purple-500/20">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl font-bold transition-all border border-white/20">Add New Service</button>
            <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl font-bold transition-all border border-white/20">Manage Staff</button>
          </div>
        </div>
      </div>
    </div>
  );
}
