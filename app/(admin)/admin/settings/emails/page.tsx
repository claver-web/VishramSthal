'use client';

import { useState } from 'react';
import { 
  Mail, Save, RotateCcw, Play, Eye, FileText, CheckCircle, Tag
} from 'lucide-react';

const templates = [
  { id: 't1', name: 'Hotel Booking Confirmation', type: 'Transactional' },
  { id: 't2', name: 'Hotel Payment Receipt', type: 'Transactional' },
  { id: 't3', name: 'Hotel Check-in Reminder', type: 'Automated' },
  { id: 't4', name: 'Hotel Review Request', type: 'Automated' },
  { id: 'w1', name: 'Wedding Enquiry Confirmation', type: 'Transactional - Wedding' },
  { id: 'w2', name: 'Wedding Enquiry Notification', type: 'Admin Alert' },
  { id: 'w3', name: 'Wedding Booking Confirmation', type: 'Transactional - Wedding' },
  { id: 'w4', name: 'Wedding Payment Receipt', type: 'Transactional - Wedding' },
  { id: 'w5', name: 'Wedding Event Reminder', type: 'Automated - Wedding' },
  { id: 'w6', name: 'Wedding Review Request', type: 'Automated - Wedding' },
  { id: 'w7', name: 'Wedding Quote/Proposal', type: 'Sales - Wedding' },
];

export default function EmailTemplatesPage() {
  const [activeTab, setActiveTab] = useState('t1');

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Email Templates</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Design and configure automated email communications.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-gray-100 dark:bg-[#1e293b] text-gray-700 dark:text-white px-5 py-2.5 rounded-xl font-bold shadow-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <Play className="w-4 h-4" /> Send Test
          </button>
          <button className="flex items-center gap-2 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all">
            <Save className="w-5 h-5" /> Save Template
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[70vh]">
        {/* Sidebar */}
        <div className="w-full lg:w-72 bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><Mail className="w-4 h-4" /> Templates</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {templates.map(t => (
              <button 
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${activeTab === t.id ? 'bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 text-[#ea580c]' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0f172a] border border-transparent'}`}
              >
                <div className="font-bold text-sm">{t.name}</div>
                <div className="text-[10px] uppercase font-bold text-gray-400 mt-1">{t.type}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col min-w-0">
          {/* Email Settings */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 space-y-4 bg-gray-50 dark:bg-[#0f172a] rounded-t-3xl">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subject Line</label>
              <input type="text" defaultValue="Booking Confirmed: Welcome to Vishram Sthal!" className="w-full p-3 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:border-[#ea580c] dark:text-white" />
            </div>
            
            {/* Dynamic Variables Bar */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1"><Tag className="w-3 h-3" /> Available Variables</label>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-bold text-gray-400 w-full mb-1">Hotel Variables:</span>
                {['{guest_name}', '{booking_id}', '{room_name}', '{check_in}', '{check_out}', '{amount}'].map(v => (
                  <span key={v} className="text-[10px] font-mono bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30 px-2 py-1 rounded cursor-pointer hover:bg-orange-100">{v}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-bold text-gray-400 w-full mb-1">Wedding Variables:</span>
                {['{bride_name}', '{groom_name}', '{wedding_date}', '{venue_name}', '{event_type}', '{guest_count}', '{package_name}', '{total_amount}'].map(v => (
                  <span key={v} className="text-[10px] font-mono bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 px-2 py-1 rounded cursor-pointer hover:bg-rose-100">{v}</span>
                ))}
              </div>
            </div>
          </div>

          {/* HTML Rich Editor Toolbar */}
          <div className="p-2 border-b border-gray-100 dark:border-gray-800 flex flex-wrap gap-2">
            <button className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded font-bold text-sm dark:text-white">B</button>
            <button className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded italic text-sm dark:text-white">I</button>
            <button className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded underline text-sm dark:text-white">U</button>
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>
            <button className="px-3 py-1 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">HTML</button>
            <button className="px-3 py-1 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex items-center gap-1"><Eye className="w-3 h-3" /> Preview</button>
          </div>

          {/* Editor Textarea */}
          <div className="flex-1 p-0">
            <textarea 
              className="w-full h-full p-6 outline-none bg-transparent resize-none text-sm leading-loose dark:text-white font-mono"
              defaultValue={`<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
  <div style="background-color: #ea580c; padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Vishram Sthal</h1>
  </div>
  <div style="padding: 30px;">
    <h2>Jai Shri Krishna, {guest_name}!</h2>
    <p>Your booking has been successfully confirmed.</p>
    
    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <p><strong>Booking ID:</strong> {booking_id}</p>
      <p><strong>Room:</strong> {room_name}</p>
      <p><strong>Check-in:</strong> {check_in}</p>
      <p><strong>Check-out:</strong> {check_out}</p>
    </div>
    
    <p>We look forward to hosting your spiritual retreat.</p>
  </div>
</div>`}
            ></textarea>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0f172a] rounded-b-3xl">
            <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-red-500 transition-colors">
              <RotateCcw className="w-3 h-3" /> Reset to Default Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
