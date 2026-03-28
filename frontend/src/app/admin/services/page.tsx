'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getServices, createService, updateService, deleteService, getCurrentUser } from '@/utils/api';

export default function AdminServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: 0, duration: 30 });

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
      const data = await getServices();
      setServices(data);
    } catch (err: any) {
      setError('Failed to load services.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setFormData({ 
      name: service.name, 
      description: service.description, 
      price: service.price, 
      duration: service.duration 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService) {
        await updateService(editingService.id, formData);
        setSuccess('Service updated successfully!');
      } else {
        await createService(formData);
        setSuccess('Service created successfully!');
      }
      setFormData({ name: '', description: '', price: 0, duration: 30 });
      setEditingService(null);
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError('Operation failed.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteService(id);
      setSuccess('Service deleted.');
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError('Delete failed.');
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse tracking-widest uppercase font-black">Loading services...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
            Manage <span className="text-purple-600">Services</span>
          </h1>
          <button onClick={() => router.push('/admin')} className="text-gray-500 hover:text-purple-600 font-bold">Dashboard</button>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 font-medium border border-red-100">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-8 font-medium border border-green-100">{success}</div>}

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-purple-500/5 mb-12 border border-gray-100">
          <h2 className="text-xl font-bold mb-6">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-400 traycking-widest">Service Name</label>
              <input 
                type="text" value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-gray-50 border-0 rounded-xl p-4 focus:ring-2 focus:ring-purple-600 transition-all font-bold" required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-400 traycking-widest">Price ($)</label>
              <input 
                type="number" value={formData.price} 
                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                className="w-full bg-gray-50 border-0 rounded-xl p-4 focus:ring-2 focus:ring-purple-600 transition-all font-bold" required 
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-black uppercase text-gray-400 traycking-widest">Description</label>
              <textarea 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-gray-50 border-0 rounded-xl p-4 focus:ring-2 focus:ring-purple-600 transition-all font-bold h-24" required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-400 traycking-widest">Duration (min)</label>
              <input 
                type="number" value={formData.duration} 
                onChange={e => setFormData({...formData, duration: Number(e.target.value)})}
                className="w-full bg-gray-50 border-0 rounded-xl p-4 focus:ring-2 focus:ring-purple-600 transition-all font-bold" required 
              />
            </div>
            <div className="md:col-span-2 flex gap-4 pt-4">
              <button type="submit" className="bg-purple-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-purple-700 transition-all">
                {editingService ? 'Update Service' : 'Create Service'}
              </button>
              {editingService && (
                <button type="button" onClick={() => {setEditingService(null); setFormData({name:'', description:'', price:0, duration:30})}} className="text-gray-500 font-bold px-8 py-4">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {services.map(service => (
            <div key={service.id} className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-lg transition-all">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tighter">{service.name}</h3>
                <p className="text-gray-400 text-sm max-w-md">{service.description}</p>
                <div className="flex gap-4 mt-2">
                  <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">Price: ${service.price}</span>
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">Duration: {service.duration} min</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(service)} className="p-3 bg-gray-50 hover:bg-purple-100 text-gray-400 hover:text-purple-600 rounded-xl transition-all">Edit</button>
                <button onClick={() => handleDelete(service.id)} className="p-3 bg-gray-50 hover:bg-red-100 text-gray-400 hover:text-red-600 rounded-xl transition-all">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
