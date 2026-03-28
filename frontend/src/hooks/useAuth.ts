'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, logout as apiLogout } from '@/utils/api';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getCurrentUser());
    setLoading(false);
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
