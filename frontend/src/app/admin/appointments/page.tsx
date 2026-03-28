'use client';

import { useState, useEffect } from 'react';

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/appointments', {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
        }
      });
      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      console.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/appointments/${id}/status?status=${status}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
        }
      });
      if (response.ok) fetchAppointments();
    } catch (err) {
      console.error('Failed to update status');
    }
  };

  const filteredAppointments = appointments.filter(appt => {
    return (filterStatus === '' || appt.status === filterStatus) &&
           (filterDate === '' || appt.date === filterDate);
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center text-center sm:text-left">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manage <span className="text-purple-600">Appointments</span></h1>
          <p className="text-gray-500">Track and update all salon bookings in real-time.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-purple-500/5 flex flex-wrap gap-4 items-center">
        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
          <label className="text-xs font-bold text-gray-500 uppercase px-1">Filter by Status</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-purple-500">
            <option value="">All Statuses</option>
            <option value="BOOKED">Booked</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
          <label className="text-xs font-bold text-gray-500 uppercase px-1">Filter by Date</label>
          <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
        <button onClick={() => {setFilterStatus(''); setFilterDate(''); }} className="mt-5 text-purple-600 font-bold px-4 py-2 hover:bg-purple-50 rounded-xl transition-all">Clear Filters</button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-purple-500/5 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
              <tr>
                <th className="px-8 py-4 font-bold">Customer</th>
                <th className="px-8 py-4 font-bold">Service</th>
                <th className="px-8 py-4 font-bold">Stylist</th>
                <th className="px-8 py-4 font-bold">Date & Time</th>
                <th className="px-8 py-4 font-bold">Status</th>
                <th className="px-8 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAppointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <p className="font-bold text-gray-900">{appt.user.firstName} {appt.user.lastName}</p>
                    <p className="text-xs text-gray-500 underline uppercase tracking-tighter">{appt.user.email}</p>
                  </td>
                  <td className="px-8 py-6 text-gray-700 font-medium">{appt.service.name}</td>
                  <td className="px-8 py-6 text-gray-600">{appt.staff.name}</td>
                  <td className="px-8 py-6">
                    <div className="font-bold text-gray-900">{appt.date}</div>
                    <div className="text-sm text-gray-500">{appt.timeSlot}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      appt.status === 'BOOKED' ? 'bg-blue-100 text-blue-600' :
                      appt.status === 'CANCELLED' ? 'bg-red-100 text-red-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <select value={appt.status} onChange={(e) => handleStatusUpdate(appt.id, e.target.value)} className="text-sm font-bold bg-transparent outline-none border-b-2 border-purple-200 focus:border-purple-600 transition-all cursor-pointer">
                      <option value="BOOKED">Booked</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filteredAppointments.length === 0 && (
                <tr>
                   <td colSpan={6} className="px-8 py-20 text-center text-gray-400 italic">No appointments match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
