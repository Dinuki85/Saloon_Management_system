'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUser, logout } from '@/utils/api';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'ROLE_ADMIN') {
      router.push('/login');
    } else {
      setUser(currentUser);
    }
  }, [router]);

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Services', href: '/admin/services', icon: '✂️' },
    { name: 'Staff', href: '/admin/staff', icon: '👥' },
    { name: 'Appointments', href: '/admin/appointments', icon: '📅' },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-200 transition-all duration-300 z-50 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="text-xl font-black text-gray-900 tracking-tighter">
              {isSidebarOpen ? (
                <>LUXE<span className="text-purple-600">ADMIN</span></>
              ) : (
                <span className="text-purple-600">L</span>
              )}
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${
                isActive ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}>
                <span className="text-xl">{item.icon}</span>
                {isSidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={() => logout() && router.push('/')} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all">
            <span className="text-xl">🚪</span>
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Nav */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-md bg-white/80">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
            {isSidebarOpen ? '⬅️' : '➡️'}
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-purple-600 font-bold uppercase tracking-wider">Administrator</p>
            </div>
            <div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 font-bold">
              {user.firstName[0]}
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
