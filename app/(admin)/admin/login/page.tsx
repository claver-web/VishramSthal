'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Reveal from '@/components/Reveal';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('Admin');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        toast.success('Welcome back, Admin!');
        router.push('/admin/dashboard');
      } else {
        toast.error(data.error || 'Invalid credentials');
      }
    } catch (err) {
      toast.error('An error occurred during login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12 px-4 transition-colors">
      <Reveal>
        <div className="max-w-md w-full bg-white dark:bg-gray-900 p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

          <div className="relative text-center mb-10">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-extrabold text-3xl mx-auto mb-6 shadow-xl transform rotate-3 hover:rotate-6 transition-transform">
              VS
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Admin Portal</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Secure access to Vishram Sthal</p>
          </div>
          
          <form onSubmit={handleLogin} className="relative space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Username</label>
              <input 
                type="text" 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-2xl focus:border-orange-500 focus:ring-0 outline-none transition-colors text-gray-900 dark:text-white font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Password</label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-2xl focus:border-orange-500 focus:ring-0 outline-none transition-colors text-gray-900 dark:text-white font-medium"
              />
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl text-xs text-orange-600 dark:text-orange-400 text-center font-medium border border-orange-100 dark:border-orange-800/30">
              Hint: use Username: <strong className="font-black">Admin</strong>, Password: <strong className="font-black">admin</strong>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 mt-4 bg-gray-900 hover:bg-black dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-bold text-lg rounded-2xl transition-all shadow-xl transform hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50 disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  Authenticating...
                </span>
              ) : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>
      </Reveal>
    </div>
  );
}
