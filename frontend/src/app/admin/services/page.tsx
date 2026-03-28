'use client';

import { useState, useEffect } from 'react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', duration: '' });

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/services', {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
        }
      });
      const data = await response.json();
      setServices(data);
    } catch (err) {
      console.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingService 
      ? `http://localhost:8080/api/services/${editingService.id}`
      : 'http://localhost:8080/api/admin/services';
    const method = editingService ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setModalOpen(false);
        setEditingService(null);
        setFormData({ name: '', description: '', price: '', duration: '' });
        fetchServices();
      }
    } catch (err) {
      console.error('Failed to save service');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const response = await fetch(`http://localhost:8080/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
        }
      });
      if (response.ok) fetchServices();
    } catch (err) {
      console.error('Failed to delete service');
    }
  };

  const openModal = (service: any = null) => {
    if (service) {
      setEditingService(service);
      setFormData({ 
        name: service.name, 
        description: service.description, 
        price: service.price.toString(), 
        duration: service.duration.toString() 
      });
    } else {
      setEditingService(null);
      setFormData({ name: '', description: '', price: '', duration: '' });
    }
    setModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manage <span className="text-purple-600">Services</span></h1>
          <p className="text-gray-500">Add, edit, or remove salon treatments.</p>
        </div>
        <button onClick={() => openModal()} className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-purple-500/20 transition-all">
          + Add New Service
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-purple-500/5 border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr>
              <th className="px-8 py-4 font-bold">Service Name</th>
              <th className="px-8 py-4 font-bold">Price</th>
              <th className="px-8 py-4 font-bold">Duration</th>
              <th className="px-8 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6">
                  <p className="font-bold text-gray-900">{service.name}</p>
                  <p className="text-sm text-gray-500 line-clamp-1">{service.description}</p>
                </td>
                <td className="px-8 py-6 font-bold text-gray-900">${service.price}</td>
                <td className="px-8 py-6 text-gray-600">{service.duration} mins</td>
                <td className="px-8 py-6 text-right space-x-4">
                  <button onClick={() => openModal(service)} className="text-purple-600 font-bold hover:text-purple-800 transition-colors">Edit</button>
                  <button onClick={() => handleDelete(service.id)} className="text-red-500 font-bold hover:text-red-700 transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-10 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500" rows={3}></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Duration (mins)</label>
                  <input type="number" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500" required />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-500/20">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
