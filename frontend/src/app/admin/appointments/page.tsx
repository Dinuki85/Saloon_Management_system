'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllAppointments, updateAppointmentStatus, getCurrentUser } from '@/utils/api';

export default function AdminAppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      const data = await getAllAppointments();
      setAppointments(data);
    } catch (err: any) {
      setError('Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await updateAppointmentStatus(id, status);
      setSuccess(`Appointment ${status} successfully.`);
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError('Failed to update status.');
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse">Loading appointments...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
            Manage <span className="text-purple-600">Appointments</span>
          </h1>
          <div className="flex gap-4">
             <button onClick={() => router.push('/admin')} className="text-gray-500 hover:text-purple-600 font-bold">Dashboard</button>
          </div>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 border border-red-100 font-medium">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-8 border border-green-100 font-medium">{success}</div>}

        <div className="bg-white rounded-3xl shadow-xl shadow-purple-500/5 border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-5 font-black">Customer</th>
                  <th className="px-8 py-5 font-black">Service</th>
                  <th className="px-8 py-5 font-black">Stylist</th>
                  <th className="px-8 py-5 font-black">Date & Time</th>
                  <th className="px-8 py-5 font-black">Status</th>
                  <th className="px-8 py-5 font-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6 font-bold">{appt.user.firstName} {appt.user.lastName}</td>
                    <td className="px-8 py-6">{appt.service.name}</td>
                    <td className="px-8 py-6 text-gray-500">{appt.staff.name}</td>
                    <td className="px-8 py-6">
                      <div className="font-bold">{appt.date}</div>
                      <div className="text-xs text-gray-400">{appt.timeSlot}</div>
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
                    <td className="px-8 py-6 text-right space-x-2">
                      {appt.status === 'BOOKED' && (
                        <>
                          <button 
                            onClick={() => handleStatusUpdate(appt.id, 'ACCEPTED')}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-700 transition-all"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(appt.id, 'CANCELLED')}
                            className="text-red-500 hover:text-red-700 text-xs font-bold"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
