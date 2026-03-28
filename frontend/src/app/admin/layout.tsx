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
    if (!currentUser || !currentUser.roles?.includes('ROLE_ADMIN')) {
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
    { name: 'Users', href: '/admin/users', icon: '👤' },
    { name: 'Analytics', href: '/admin/analytics', icon: '📈' },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-stretch">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-200 transition-all duration-300 z-40 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col sticky top-16 h-[calc(100vh-64px)] overflow-y-auto`}>
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
          <button onClick={() => { logout(); router.push('/'); }} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all">
            <span className="text-xl">🚪</span>
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
