'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getServices, getStaff, bookAppointment, getCurrentUser } from '@/utils/api';

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialServiceId = searchParams.get('service');

  const [services, setServices] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    serviceId: initialServiceId || '',
    staffId: '',
    date: '',
    timeSlot: ''
  });

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/login?redirect=/booking');
      return;
    }

    const fetchData = async () => {
      try {
        const [servicesData, staffData] = await Promise.all([
          getServices(),
          getStaff()
        ]);
        setServices(servicesData);
        setStaff(staffData);
      } catch (err: any) {
        setError('Failed to load booking options. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const user = getCurrentUser();
    
    try {
      await bookAppointment({
        userId: user.id,
        serviceId: parseInt(formData.serviceId),
        staffId: parseInt(formData.staffId),
        date: formData.date,
        timeSlot: formData.timeSlot
      });
      router.push('/dashboard?booked=true');
    } catch (err: any) {
      setError(err.message || 'Failed to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-2xl shadow-purple-500/5 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Book Your <span className="text-purple-600">Appointment</span>
          </h1>
          <p className="mt-2 text-gray-500 italic">Experience luxury, one slot at a time.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Select Service</label>
              <select name="serviceId" required value={formData.serviceId} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-white">
                <option value="">-- Choose a Service --</option>
                {services.map(s => <option key={s.id} value={s.id}>{s.name} - ${s.price}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Select Stylist</label>
              <select name="staffId" required value={formData.staffId} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-white">
                <option value="">-- Choose a Stylist --</option>
                {staff.map(st => <option key={st.id} value={st.id}>{st.name} ({st.specialization})</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Date</label>
                <input type="date" name="date" required min={new Date().toISOString().split('T')[0]} value={formData.date} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-white font-medium" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Time</label>
                <select name="timeSlot" required value={formData.timeSlot} onChange={handleChange} className="block w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-white font-medium">
                  <option value="">-- Choose Time --</option>
                  {TIME_SLOTS.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button type="submit" disabled={submitting} className="w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? 'Confirming Booking...' : 'Confirm Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
