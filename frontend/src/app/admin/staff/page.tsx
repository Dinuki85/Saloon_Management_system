'use client';

import { useState, useEffect } from 'react';

export default function AdminStaffPage() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', specialization: '', availability: 'Available' });

  const fetchStaff = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/staff', {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
        }
      });
      const data = await response.json();
      setStaff(data);
    } catch (err) {
      console.error('Failed to fetch staff');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingStaff 
      ? `http://localhost:8080/api/staff/${editingStaff.id}`
      : 'http://localhost:8080/api/admin/staff';
    const method = editingStaff ? 'PUT' : 'POST';

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
        setEditingStaff(null);
        setFormData({ name: '', specialization: '', availability: 'Available' });
        fetchStaff();
      }
    } catch (err) {
      console.error('Failed to save staff');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this staff member?')) return;
    try {
      const response = await fetch(`http://localhost:8080/api/staff/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
        }
      });
      if (response.ok) fetchStaff();
    } catch (err) {
      console.error('Failed to delete staff');
    }
  };

  const openModal = (member: any = null) => {
    if (member) {
      setEditingStaff(member);
      setFormData({ 
        name: member.name, 
        specialization: member.specialization, 
        availability: member.availability || 'Available'
      });
    } else {
      setEditingStaff(null);
      setFormData({ name: '', specialization: '', availability: 'Available' });
    }
    setModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manage <span className="text-purple-600">Staff</span></h1>
          <p className="text-gray-500">Coordinate your team of expert stylists.</p>
        </div>
        <button onClick={() => openModal()} className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-purple-500/20 transition-all">
          + Add New Staff
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-purple-500/5 border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr>
              <th className="px-8 py-4 font-bold">Name</th>
              <th className="px-8 py-4 font-bold">Specialization</th>
              <th className="px-8 py-4 font-bold">Availability</th>
              <th className="px-8 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                      {member.name[0]}
                    </div>
                    <p className="font-bold text-gray-900">{member.name}</p>
                  </div>
                </td>
                <td className="px-8 py-6 text-gray-600">{member.specialization}</td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    member.availability === 'Available' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {member.availability || 'Available'}
                  </span>
                </td>
                <td className="px-8 py-6 text-right space-x-4">
                  <button onClick={() => openModal(member)} className="text-purple-600 font-bold hover:text-purple-800 transition-colors">Edit</button>
                  <button onClick={() => handleDelete(member.id)} className="text-red-500 font-bold hover:text-red-700 transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-10 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">{editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Specialization</label>
                <input type="text" value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Current Availability</label>
                <select value={formData.availability} onChange={(e) => setFormData({...formData, availability: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="Available">Available</option>
                  <option value="Away">Away</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-500/20">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
