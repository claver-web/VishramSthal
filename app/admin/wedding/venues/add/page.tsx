'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Save, Upload, Check, ChevronRight, CheckCircle2,
  Image as ImageIcon, Video, AlertCircle, Info, Calendar as CalendarIcon, Clock, DollarSign
} from 'lucide-react';

const TABS = [
  { id: 'basic', label: 'Basic Info', icon: Info },
  { id: 'amenities', label: 'Features & Amenities', icon: CheckCircle2 },
  { id: 'media', label: 'Media Upload', icon: ImageIcon },
  { id: 'pricing', label: 'Pricing & Packages', icon: DollarSign },
  { id: 'rules', label: 'Availability & Rules', icon: Clock },
  { id: 'seo', label: 'SEO & Display', icon: Search },
];

function Search({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
}

export default function AddVenuePage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-16 bg-gray-50/80 dark:bg-[#0f172a]/80 backdrop-blur-md z-20 py-4 -mx-4 px-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <Link href="/admin/wedding/venues" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Add New Venue</h1>
            <p className="text-xs font-bold text-gray-500 mt-0.5 flex items-center gap-2">
              <span className="text-amber-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Unsaved Changes</span>
              • Auto-saving in 45s
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-5 py-2.5 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">
            Save as Draft
          </button>
          <button className="flex-1 sm:flex-none px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-bold shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-2">
            <Save className="w-4 h-4" /> Publish Venue
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Vertical Tabs Navigation */}
        <div className="w-full lg:w-64 shrink-0 bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-2 sticky top-40">
          <nav className="flex flex-col gap-1">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive 
                      ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#0f172a]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <tab.icon className={`w-4 h-4 ${isActive ? 'text-rose-500' : 'text-gray-400'}`} />
                    {tab.label}
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 w-full bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          
          {/* Step 1: Basic Info Mock */}
          {activeTab === 'basic' && (
            <div className="p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Basic Information</h2>
                <p className="text-sm text-gray-500">Provide the primary details for this venue space.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Venue Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="e.g., Grand Banquet Hall" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Venue Type <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 focus:outline-none">
                    <option>Banquet Hall</option>
                    <option>Lawn</option>
                    <option>Terrace</option>
                    <option>Garden</option>
                    <option>Intimate Hall</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Max Capacity (Guests)</label>
                  <input type="number" placeholder="500" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Venue Size (sq. ft.)</label>
                  <input type="number" placeholder="2500" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 focus:outline-none" />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Description</label>
                  <textarea rows={6} placeholder="Describe the venue's ambiance, best use cases, and specialties..." className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 focus:outline-none resize-none"></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Amenities Mock */}
          {activeTab === 'amenities' && (
            <div className="p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Features & Amenities</h2>
                <p className="text-sm text-gray-500">Select all amenities available in this venue.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'Air Conditioning', 'Power Backup', 'Valet Parking', 'Wheelchair Accessible',
                  'Green Room', 'Kitchen Facility', 'Sound System', 'Projector/Screen',
                  'WiFi', 'Outdoor Area', 'Rain Backup', 'Fire Safety', 'Jain Food Available',
                  'Alcohol Allowed', 'Outside Decorator Allowed'
                ].map((item, i) => (
                  <label key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-rose-500/50 hover:bg-rose-50/50 dark:hover:bg-rose-500/10 cursor-pointer transition-colors">
                    <input type="checkbox" className="rounded border-gray-300 text-rose-500 focus:ring-rose-500 w-4 h-4" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Media Upload Mock */}
          {activeTab === 'media' && (
            <div className="p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Media Upload</h2>
                <p className="text-sm text-gray-500">Upload high-quality images and virtual tours.</p>
              </div>

              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-[#0f172a] hover:bg-rose-50/50 dark:hover:bg-rose-500/5 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-white dark:bg-[#1e293b] rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Click or drag images here</h3>
                <p className="text-xs text-gray-500 max-w-sm">Support for JPG, PNG, WEBP. Max file size 5MB. Recommended resolution 1920x1080.</p>
              </div>
            </div>
          )}

          {/* Placeholders for other tabs */}
          {['pricing', 'rules', 'seo'].includes(activeTab) && (
            <div className="p-6 md:p-8 h-96 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-right-4">
              <div className="w-16 h-16 bg-gray-100 dark:bg-[#0f172a] rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Form fields for {activeTab}</h3>
              <p className="text-sm text-gray-500 max-w-md">The complex inputs and settings for this section would be rendered here in the full implementation.</p>
            </div>
          )}
          
          {/* Form Footer */}
          <div className="bg-gray-50 dark:bg-[#0f172a] border-t border-gray-100 dark:border-gray-800 p-6 flex justify-between items-center">
            <button 
              onClick={() => {
                const currentIndex = TABS.findIndex(t => t.id === activeTab);
                if (currentIndex > 0) setActiveTab(TABS[currentIndex - 1].id);
              }}
              disabled={activeTab === 'basic'}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              Previous Step
            </button>
            <button 
              onClick={() => {
                const currentIndex = TABS.findIndex(t => t.id === activeTab);
                if (currentIndex < TABS.length - 1) setActiveTab(TABS[currentIndex + 1].id);
              }}
              disabled={activeTab === 'seo'}
              className="px-6 py-2.5 bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 rounded-xl text-sm font-bold hover:bg-rose-100 dark:hover:bg-rose-500/20 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              Next Step <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
