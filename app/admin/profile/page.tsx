'use client';

import { useState } from 'react';
import { 
  User, Shield, Key, Smartphone, Monitor, Save, Lock, LogOut, CheckCircle 
} from 'lucide-react';

const activeSessions = [
  { id: 1, device: 'MacBook Pro 16" - Safari', ip: '192.168.1.45', time: 'Active now', current: true },
  { id: 2, device: 'iPhone 13 Pro - Safari', ip: '117.200.45.12', time: 'Last active 2 hours ago', current: false },
  { id: 3, device: 'Windows PC - Chrome', ip: '103.155.20.1', time: 'Last active 3 days ago', current: false },
];

export default function AdminProfilePage() {
  const [strength, setStrength] = useState(0);

  const checkPasswordStrength = (val: string) => {
    let score = 0;
    if (val.length > 8) score++;
    if (val.match(/[A-Z]/)) score++;
    if (val.match(/[0-9]/)) score++;
    if (val.match(/[^A-Za-z0-9]/)) score++;
    setStrength(score);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Profile & Security</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your administrator account and security settings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Profile & Password */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
            <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <User className="w-5 h-5 text-[#ea580c]" /> Personal Information
            </h3>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#ea580c] to-[#c2410c] text-white flex items-center justify-center text-4xl font-black shadow-lg shadow-orange-500/30">A</div>
                <button className="text-xs font-bold text-[#ea580c] hover:underline">Change Photo</button>
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Username (Read-only)</label>
                  <input type="text" value="admin_master" readOnly className="w-full p-3 bg-gray-100 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Display Name</label>
                  <input type="text" defaultValue="Super Admin" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:border-[#ea580c] dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email for Notifications</label>
                  <input type="email" defaultValue="admin@vishramsthal.com" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:border-[#ea580c] dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                  <input type="text" defaultValue="+91 9805271636" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:border-[#ea580c] dark:text-white" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
              <button className="flex items-center gap-2 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all">
                <Save className="w-4 h-4" /> Save Profile
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
            <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <Key className="w-5 h-5 text-[#ea580c]" /> Change Password
            </h3>
            
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-mono outline-none focus:border-[#ea580c] dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">New Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  onChange={(e) => checkPasswordStrength(e.target.value)}
                  className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-mono outline-none focus:border-[#ea580c] dark:text-white" 
                />
                <div className="flex gap-1 mt-2">
                  <div className={`h-1 flex-1 rounded-full ${strength >= 1 ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${strength >= 2 ? 'bg-yellow-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${strength >= 3 ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${strength >= 4 ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Confirm New Password</label>
                <input type="password" placeholder="••••••••" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-mono outline-none focus:border-[#ea580c] dark:text-white" />
              </div>
              <button className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3 rounded-xl mt-4">Update Password</button>
            </div>
          </div>
        </div>

        {/* Right Col: Security Settings */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
            <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <Shield className="w-5 h-5 text-[#ea580c]" /> Advanced Security
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-[#ea580c]">Two-Factor Authentication</h4>
                  <span className="text-[10px] font-bold bg-orange-100 text-[#ea580c] px-2 py-0.5 rounded-full">Recommended</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Add an extra layer of security to your admin account using Google Authenticator.</p>
                <button className="text-sm font-bold bg-[#ea580c] text-white px-4 py-2 rounded-lg">Enable 2FA</button>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-[#0f172a] border border-gray-100 dark:border-gray-800 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">API Access Tokens</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Manage keys for external integrations.</p>
                <button className="text-sm font-bold bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:border-[#ea580c] transition-colors">Manage Keys</button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
            <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <Monitor className="w-5 h-5 text-[#ea580c]" /> Active Sessions
            </h3>
            
            <div className="space-y-4">
              {activeSessions.map((session) => (
                <div key={session.id} className="flex items-start justify-between p-3 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-[#0f172a]">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-gray-400">
                      {session.device.includes('iPhone') ? <Smartphone className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                        {session.device}
                        {session.current && <span className="bg-green-100 text-green-700 text-[10px] px-1.5 rounded flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Current</span>}
                      </p>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">{session.ip}</p>
                      <p className="text-xs text-gray-400 mt-1">{session.time}</p>
                    </div>
                  </div>
                  {!session.current && (
                    <button className="text-gray-400 hover:text-red-500 transition-colors tooltip-trigger" title="Terminate Session"><LogOut className="w-4 h-4" /></button>
                  )}
                </div>
              ))}
              
              <button className="w-full text-sm font-bold text-red-500 bg-red-50 dark:bg-red-500/10 py-3 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors mt-2">
                Sign out of all other sessions
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
