'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { login } from '@/utils/api';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('registered')) {
      setSuccess('Registration successful! Please sign in.');
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

        try {
      await login(formData);
      const redirect = searchParams.get('redirect') || '/';
      router.push(redirect);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl shadow-purple-500/5 border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to manage your appointments
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 p-4 rounded-xl text-sm font-medium border border-green-100">
            {success}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email-address" className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email address</label>
              <input id="email-address" name="email" type="email" required value={formData.email} onChange={handleChange} className="appearance-none rounded-2xl relative block w-full px-5 py-4 border border-gray-100 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-bold placeholder-gray-300" placeholder="admin@luxesaloon.com" />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
              <input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} className="appearance-none rounded-2xl relative block w-full px-5 py-4 border border-gray-100 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-bold placeholder-gray-300" placeholder="••••••••" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="#" className="font-medium text-purple-600 hover:text-purple-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button type="submit" disabled={loading} className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black uppercase tracking-widest rounded-2xl text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all shadow-xl shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
             <p className="text-[10px] font-black uppercase tracking-widest text-purple-600 mb-1">Administrator Access</p>
             <p className="text-xs text-purple-500">Use <span className="font-bold">admin@luxesaloon.com</span> / <span className="font-bold">admin123</span></p>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-purple-600 hover:text-purple-500">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
