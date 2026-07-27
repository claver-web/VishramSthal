'use client';

import { useState } from 'react';
import { 
  BellRing, Mail, Smartphone, AlertTriangle, Save
} from 'lucide-react';

export default function NotificationSettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Notification Preferences</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Configure admin alerts and system notifications.</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all">
          <Save className="w-5 h-5" /> Save Preferences
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Admin Alerts */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
          <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
            <BellRing className="w-5 h-5 text-[#ea580c]" /> Event Alerts
          </h3>
          
          <div className="space-y-4">
            {/* Item */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-gray-800">
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">New Booking Created</p>
                <p className="text-xs text-gray-500 mt-0.5">Receive alert when a guest confirms a reservation.</p>
              </div>
              <div className="flex gap-2">
                <label className="flex flex-col items-center gap-1 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#ea580c] focus:ring-[#ea580c]" />
                  <span className="text-[10px] font-bold text-gray-400"><Mail className="w-3 h-3" /></span>
                </label>
                <label className="flex flex-col items-center gap-1 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#ea580c] focus:ring-[#ea580c]" />
                  <span className="text-[10px] font-bold text-gray-400"><Smartphone className="w-3 h-3" /></span>
                </label>
              </div>
            </div>

            {/* Item */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-gray-800">
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">Booking Cancellation</p>
                <p className="text-xs text-gray-500 mt-0.5">Alert when a booking is cancelled.</p>
              </div>
              <div className="flex gap-2">
                <label className="flex flex-col items-center gap-1 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#ea580c] focus:ring-[#ea580c]" />
                  <span className="text-[10px] font-bold text-gray-400"><Mail className="w-3 h-3" /></span>
                </label>
                <label className="flex flex-col items-center gap-1 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#ea580c] focus:ring-[#ea580c]" />
                  <span className="text-[10px] font-bold text-gray-400"><Smartphone className="w-3 h-3" /></span>
                </label>
              </div>
            </div>

            {/* Item */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-gray-800">
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">New Review Submitted</p>
                <p className="text-xs text-gray-500 mt-0.5">Notification when a guest leaves a review.</p>
              </div>
              <div className="flex gap-2">
                <label className="flex flex-col items-center gap-1 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#ea580c] focus:ring-[#ea580c]" />
                  <span className="text-[10px] font-bold text-gray-400"><Mail className="w-3 h-3" /></span>
                </label>
                <label className="flex flex-col items-center gap-1 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded text-[#ea580c] focus:ring-[#ea580c]" />
                  <span className="text-[10px] font-bold text-gray-400"><Smartphone className="w-3 h-3" /></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* System Alerts */}
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
            <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" /> System Thresholds
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Low Occupancy Alert</span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" id="toggle1" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#ea580c] translate-x-5 transition-transform" />
                    <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-5 rounded-full bg-[#ea580c] cursor-pointer"></label>
                  </div>
                </label>
                <p className="text-xs text-gray-500 mt-1">Alert if weekly occupancy drops below 30%.</p>
              </div>
              
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Payment Failure Alert</span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" id="toggle2" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#ea580c] translate-x-5 transition-transform" />
                    <label htmlFor="toggle2" className="toggle-label block overflow-hidden h-5 rounded-full bg-[#ea580c] cursor-pointer"></label>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
            <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <Smartphone className="w-5 h-5 text-[#ea580c]" /> Push & SMS Integration
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">SMS Gateway API Key</label>
                <input type="password" defaultValue="sk_test_sms_12345" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-mono outline-none focus:border-[#ea580c] dark:text-white" />
              </div>
              <button className="w-full bg-gray-100 dark:bg-[#0f172a] hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-xl transition-colors text-sm">
                Enable Browser Push Notifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
