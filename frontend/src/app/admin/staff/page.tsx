'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getStaff, createStaff, updateStaff, deleteStaff, getCurrentUser } from '@/utils/api';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminStaffPage() {
  const router = useRouter();
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', specialization: '', availability: 'Available' });

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
      const data = await getStaff();
      setStaff(data);
    } catch (err: any) {
      setError('Failed to load staff members.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (member: any = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({ 
        name: member.name, 
        specialization: member.specialization, 
        availability: member.availability || 'Available'
      });
    } else {
      setEditingMember(null);
      setFormData({ name: '', specialization: '', availability: 'Available' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (editingMember) {
        await updateStaff(editingMember.id, formData);
        setSuccess('Staff profile updated!');
      } else {
        await createStaff(formData);
        setSuccess('New staff member added!');
      }
      setIsModalOpen(false);
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError('Failed to save staff member.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this staff member?')) return;
    setError('');
    setSuccess('');
    try {
      await deleteStaff(id);
      setSuccess('Staff member removed.');
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError('Failed to delete staff member.');
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse font-black tracking-widest uppercase">Syncing Team Data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter leading-none">
              Manage <span className="text-purple-600">Staff</span>
            </h1>
            <p className="text-gray-400 mt-2 font-medium italic">Coordinate your team of expert stylists</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => fetchData()} className="text-gray-400 hover:text-purple-600 p-2 transition-colors">🔄</button>
            <button 
              onClick={() => handleOpenModal()} 
              className="bg-purple-600 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-purple-700 transition-all shadow-xl shadow-purple-500/20"
            >
              + Add Member
            </button>
          </div>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 border border-red-100 font-medium">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-8 border border-green-100 font-medium">{success}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((member) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-purple-500/5 border border-gray-100 relative group overflow-hidden"
            >
              <div className="flex items-center gap-6 mb-6">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-purple-600 text-2xl font-black">
                  {member.name[0]}
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-xl tracking-tight">{member.name}</h3>
                  <p className="text-purple-600 text-sm font-bold uppercase tracking-widest">{member.specialization}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter ${
                  member.availability === 'Available' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  {member.availability || 'Available'}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenModal(member)} className="p-2 text-gray-400 hover:text-purple-600 transition-colors">Edit</button>
                  <button onClick={() => handleDelete(member.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">Delete</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                className="bg-white rounded-[40px] w-full max-w-lg p-12 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-bl-full" />
                <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tighter">
                  {editingMember ? 'Update' : 'New'} <span className="text-purple-600">Profile</span>
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Stylist Name</label>
                    <input 
                      type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      className="w-full bg-gray-50 border-0 rounded-2xl p-4 font-bold focus:ring-2 focus:ring-purple-600 transition-all" 
                      placeholder="Jane Doe" required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Specialization</label>
                    <input 
                      type="text" value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} 
                      className="w-full bg-gray-50 border-0 rounded-2xl p-4 font-bold focus:ring-2 focus:ring-purple-600 transition-all" 
                      placeholder="Master Colorist" required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Availability Status</label>
                    <select 
                      value={formData.availability} onChange={(e) => setFormData({...formData, availability: e.target.value})} 
                      className="w-full bg-gray-50 border-0 rounded-2xl p-4 font-bold focus:ring-2 focus:ring-purple-600 transition-all appearance-none"
                    >
                      <option value="Available">Available</option>
                      <option value="Away">Away</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </div>
                  <div className="flex gap-4 pt-6">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 font-bold text-gray-400 hover:text-gray-600 transition-all">Cancel</button>
                    <button type="submit" className="flex-1 bg-purple-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-purple-500/20 hover:bg-purple-700 transition-all">
                      Save Profile
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
