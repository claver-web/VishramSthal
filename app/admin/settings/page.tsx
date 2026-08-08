'use client';

import { useState } from 'react';
import { 
  Save, Building2, MapPin, Palette, Link as LinkIcon, 
  Upload, Clock, Phone, Mail, Camera, Globe
} from 'lucide-react';


export default function GeneralSettingsPage() {
  const [primaryColor, setPrimaryColor] = useState('#ea580c');
  const [secondaryColor, setSecondaryColor] = useState('#1e293b');

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">General Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage core hotel information and branding.</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all">
          <Save className="w-5 h-5" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Basic Hotel Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
            <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <Building2 className="w-5 h-5 text-[#ea580c]" /> Hotel Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Hotel Brand Name</label>
                <input type="text" defaultValue="Vishram Sthal" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:border-[#ea580c] dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-2">Wedding Brand Name</label>
                <input type="text" defaultValue="Shani Marriage Palace" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-rose-200 dark:border-rose-900/40 rounded-xl text-sm font-bold outline-none focus:border-rose-500 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Hotel Tagline</label>
                <input type="text" defaultValue="Your Spiritual Retreat" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-2">Wedding Tagline</label>
                <input type="text" defaultValue="The Perfect Beginning" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-rose-200 dark:border-rose-900/40 rounded-xl text-sm outline-none focus:border-rose-500 dark:text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> Physical Address</label>
                <textarea rows={2} defaultValue="Word No. 6, Dehra Gopipur" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white"></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2"><Clock className="w-4 h-4" /> Default Check-in Time</label>
                <input type="time" defaultValue="14:00" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:border-[#ea580c] dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2"><Clock className="w-4 h-4" /> Default Check-out Time</label>
                <input type="time" defaultValue="11:00" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:border-[#ea580c] dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Currency</label>
                <select className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:border-[#ea580c] dark:text-white">
                  <option>₹ (INR)</option>
                  <option>$ (USD)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Timezone</label>
                <select className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:border-[#ea580c] dark:text-white">
                  <option>Asia/Kolkata (IST)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
            <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <Phone className="w-5 h-5 text-[#ea580c]" /> Contact Page Settings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2"><Phone className="w-4 h-4" /> Hotel Phone</label>
                <input type="text" defaultValue="+91 98765 43210" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2"><Mail className="w-4 h-4" /> Hotel Email</label>
                <input type="email" defaultValue="info@vishramsthal.com" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white" />
              </div>
              
              <div className="md:col-span-2 my-2 border-t border-gray-100 dark:border-gray-800"></div>
              
              <div>
                <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-2 flex items-center gap-2"><Phone className="w-4 h-4" /> Wedding Enquiries Phone</label>
                <input type="text" defaultValue="+91 98765 55555" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-rose-200 dark:border-rose-900/40 rounded-xl text-sm outline-none focus:border-rose-500 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-2 flex items-center gap-2"><Mail className="w-4 h-4" /> Wedding Enquiries Email</label>
                <input type="email" defaultValue="weddings@vishramsthal.com" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-rose-200 dark:border-rose-900/40 rounded-xl text-sm outline-none focus:border-rose-500 dark:text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-2">Dedicated Wedding Coordinator</label>
                <input type="text" defaultValue="Priya Sharma - Lead Planner" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-rose-200 dark:border-rose-900/40 rounded-xl text-sm outline-none focus:border-rose-500 dark:text-white" />
              </div>

              <div className="md:col-span-2 my-2 border-t border-gray-100 dark:border-gray-800"></div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Contact Form Recipient Email</label>
                <input type="email" defaultValue="admin@vishramsthal.com" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Google Maps API Key</label>
                <input type="password" defaultValue="AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white font-mono" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Map Coordinates</label>
                <input type="text" defaultValue="31.8795° N, 76.2230° E" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white font-mono" />
              </div>
            </div>
          </div>
        </div>

        {/* Branding Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
            <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <Palette className="w-5 h-5 text-[#ea580c]" /> Branding
            </h3>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Primary Color</label>
              <div className="flex items-center gap-4">
                <input 
                  type="color" 
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value)} 
                  className="w-12 h-12 rounded-xl cursor-pointer border-0 p-0"
                />
                <input type="text" value={primaryColor} readOnly className="flex-1 p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-mono font-bold dark:text-white outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Secondary Color</label>
              <div className="flex items-center gap-4">
                <input 
                  type="color" 
                  value={secondaryColor} 
                  onChange={(e) => setSecondaryColor(e.target.value)} 
                  className="w-12 h-12 rounded-xl cursor-pointer border-0 p-0"
                />
                <input type="text" value={secondaryColor} readOnly className="flex-1 p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-mono font-bold dark:text-white outline-none" />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Logo (Light & Dark)</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0f172a] cursor-pointer hover:border-[#ea580c] transition-colors">
                  <Upload className="w-6 h-6 text-gray-400 mb-2" />
                  <span className="text-[10px] font-bold text-gray-500">Light Logo</span>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-900 cursor-pointer hover:border-[#ea580c] transition-colors">
                  <Upload className="w-6 h-6 text-gray-400 mb-2" />
                  <span className="text-[10px] font-bold text-gray-300">Dark Logo</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Favicon</label>
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0f172a] cursor-pointer hover:border-[#ea580c] transition-colors">
                <img src="/globe.svg" alt="favicon" className="w-8 h-8 opacity-50 mb-2 filter dark:invert" />
                <span className="text-[10px] font-bold text-gray-500">Upload .ico or .png</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
            <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <LinkIcon className="w-5 h-5 text-[#ea580c]" /> Social Links
            </h3>
            <div className="space-y-4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Hotel Social Media</label>
              <div className="flex relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center bg-gray-100 dark:bg-[#0f172a] border-r border-gray-200 dark:border-gray-700 rounded-l-xl"><Camera className="w-4 h-4 text-gray-500" /></div>
                <input type="text" placeholder="Instagram URL" className="w-full pl-14 pr-4 py-3 bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white" />
              </div>
              <div className="flex relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center bg-gray-100 dark:bg-[#0f172a] border-r border-gray-200 dark:border-gray-700 rounded-l-xl"><Globe className="w-4 h-4 text-gray-500" /></div>
                <input type="text" placeholder="Facebook URL" className="w-full pl-14 pr-4 py-3 bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white" />
              </div>
              
              <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">Wedding Social Media</label>
              <div className="flex relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center bg-rose-50 dark:bg-rose-900/20 border-r border-rose-200 dark:border-rose-900/40 rounded-l-xl"><Camera className="w-4 h-4 text-rose-500" /></div>
                <input type="text" placeholder="Wedding Instagram URL" className="w-full pl-14 pr-4 py-3 bg-gray-50 dark:bg-[#1e293b] border border-rose-200 dark:border-rose-900/40 rounded-xl text-sm outline-none focus:border-rose-500 dark:text-white" />
              </div>
              <div className="flex relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center bg-rose-50 dark:bg-rose-900/20 border-r border-rose-200 dark:border-rose-900/40 rounded-l-xl"><Globe className="w-4 h-4 text-rose-500" /></div>
                <input type="text" placeholder="Wedding Facebook URL" className="w-full pl-14 pr-4 py-3 bg-gray-50 dark:bg-[#1e293b] border border-rose-200 dark:border-rose-900/40 rounded-xl text-sm outline-none focus:border-rose-500 dark:text-white" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
