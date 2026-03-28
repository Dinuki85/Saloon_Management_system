'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUsers, getCurrentUser } from '@/utils/api';
import { motion } from 'framer-motion';

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      const data = await getUsers();
      setUsers(data);
    } catch (err: any) {
      setError('Failed to load user database.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse font-black uppercase tracking-widest">Accessing Secure Records...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter shadow-purple-500/10">
              Customer <span className="text-purple-600">Database</span>
            </h1>
            <p className="text-gray-400 font-medium italic mt-1">Viewing all registered salon members</p>
          </div>
          <button onClick={() => router.push('/admin')} className="text-gray-500 hover:text-purple-600 font-bold transition-colors">Dashboard</button>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 border border-red-100 font-medium">{error}</div>}

        <div className="bg-white rounded-[40px] shadow-2xl shadow-purple-500/5 border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50">
                <tr>
                   <th className="px-10 py-6 text-xs font-black uppercase tracking-widest text-gray-400">Identity</th>
                   <th className="px-10 py-6 text-xs font-black uppercase tracking-widest text-gray-400">Email</th>
                   <th className="px-10 py-6 text-xs font-black uppercase tracking-widest text-gray-400">Roles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((u, i) => (
                  <motion.tr 
                    key={u.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-purple-50/30 transition-colors group"
                  >
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                         <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-black text-sm uppercase">
                           {u.firstName?.[0]}{u.lastName?.[0]}
                         </div>
                         <div className="font-bold text-gray-900">{u.firstName} {u.lastName}</div>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-gray-500 font-medium italic">{u.email}</td>
                    <td className="px-10 py-6">
                       <div className="flex gap-2">
                         {u.roles?.map((role: any) => (
                           <span key={role.name} className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                             role.name === 'ROLE_ADMIN' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'
                           }`}>
                             {role.name.replace('ROLE_', '')}
                           </span>
                         ))}
                       </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
