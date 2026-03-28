'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getUserAppointments, cancelAppointment, getCurrentUser, logout } from '@/utils/api';

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/login');
      return;
    }

    if (searchParams.get('booked')) {
      setSuccess('Appointment booked successfully!');
    }

    fetchAppointments();
  }, [router, searchParams]);

  const fetchAppointments = async () => {
    const user = getCurrentUser();
    try {
      const data = await getUserAppointments(user.id);
      setAppointments(data);
    } catch (err: any) {
      setError('Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: number) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;
    
    try {
      await cancelAppointment(id);
      setSuccess('Appointment cancelled successfully.');
      fetchAppointments();
    } catch (err: any) {
      setError('Failed to cancel appointment.');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const user = getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Welcome, <span className="text-purple-600">{user?.firstName}</span>
            </h1>
            <p className="text-gray-500">Manage your luxury salon experiences here.</p>
          </div>
          <button onClick={handleLogout} className="text-gray-600 hover:text-red-600 font-bold transition-colors flex items-center gap-2">
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 border border-red-100 font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-8 border border-green-100 font-medium">
            {success}
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl shadow-purple-500/5 border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Your Appointments</h2>
          </div>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                <tr>
                  <th className="px-8 py-4 font-bold">Service</th>
                  <th className="px-8 py-4 font-bold">Stylist</th>
                  <th className="px-8 py-4 font-bold">Date & Time</th>
                  <th className="px-8 py-4 font-bold">Status</th>
                  <th className="px-8 py-4 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="font-bold text-gray-900">{appt.service.name}</div>
                      <div className="text-sm text-gray-500">${appt.service.price}</div>
                    </td>
                    <td className="px-8 py-6 text-gray-600">{appt.staff.name}</td>
                    <td className="px-8 py-6">
                      <div className="font-medium text-gray-900">{appt.date}</div>
                      <div className="text-sm text-gray-500">{appt.timeSlot}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter ${
                        appt.status === 'BOOKED' ? 'bg-blue-100 text-blue-600' :
                        appt.status === 'ACCEPTED' ? 'bg-green-100 text-green-600' :
                        appt.status === 'CANCELLED' ? 'bg-red-100 text-red-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {appt.status === 'BOOKED' && (
                        <button onClick={() => handleCancel(appt.id)} className="text-red-500 hover:text-red-700 text-sm font-bold transition-colors">
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {appointments.map((appt) => (
              <div key={appt.id} className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-gray-900 text-lg uppercase tracking-tight">{appt.service.name}</h3>
                    <p className="text-sm text-gray-500">with {appt.staff.name}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    appt.status === 'BOOKED' ? 'bg-blue-100 text-blue-600' :
                    appt.status === 'CANCELLED' ? 'bg-red-100 text-red-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {appt.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-900 font-bold">
                    {appt.date} at {appt.timeSlot}
                  </div>
                  <div className="text-purple-600 font-black">${appt.service.price}</div>
                </div>

                {appt.status === 'BOOKED' && (
                  <button 
                    onClick={() => handleCancel(appt.id)}
                    className="w-full py-4 text-center bg-red-50 text-red-600 rounded-2xl text-sm font-black uppercase tracking-widest active:scale-95 transition-all"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            ))}
          </div>

          {appointments.length === 0 && (
            <div className="px-8 py-20 text-center text-gray-500 italic">
              No appointments found. Start by booking a service!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
