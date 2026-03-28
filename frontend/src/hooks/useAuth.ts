'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, logout as apiLogout } from '@/utils/api';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      setUser(getCurrentUser());
      setLoading(false);
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  const refreshUser = () => {
    setUser(getCurrentUser());
  };

  return { user, loading, logout, refreshUser };
}
