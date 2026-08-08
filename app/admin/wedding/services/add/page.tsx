'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Save, Upload, Plus, Trash2, Box, Info, Image as ImageIcon, Sparkles, CheckCircle2
} from 'lucide-react';

export default function AddServicePage() {
  const [includedItems, setIncludedItems] = useState(['']);

  const addIncludedItem = () => setIncludedItems([...includedItems, '']);
  const updateIncludedItem = (index: number, value: string) => {
    const newItems = [...includedItems];
    newItems[index] = value;
    setIncludedItems(newItems);
  };
  const removeIncludedItem = (index: number) => {
    if (includedItems.length > 1) {
      setIncludedItems(includedItems.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-16 bg-gray-50/80 dark:bg-[#0f172a]/80 backdrop-blur-md z-20 py-4 border-b border-gray-200 dark:border-gray-800 -mx-4 px-4 sm:mx-0 sm:px-0 sm:border-0 sm:bg-transparent">
        <div className="flex items-center gap-4">
          <Link href="/admin/wedding/services" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-colors bg-white dark:bg-[#1e293b] shadow-sm border border-gray-100 dark:border-gray-800">
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Add New Service</h1>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-bold shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-2">
            <Save className="w-4 h-4" /> Save Service
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column - Main Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <Info className="w-5 h-5 text-rose-500" /> Basic Information
            </h2>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Service Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="e.g., Premium Floral Decoration" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 focus:outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Category <span className="text-red-500">*</span></label>
              <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 focus:outline-none">
                <option value="">Select a category</option>
                <option value="catering">🍽️ Catering & Food</option>
                <option value="decor">💐 Decoration & Florals</option>
                <option value="photo">📸 Photography & Videography</option>
                <option value="beauty">💄 Bridal Makeup & Beauty</option>
                <option value="music">🎵 Music & Entertainment</option>
                <option value="pooja">🙏 Religious/Pooja Services</option>
                <option value="transport">🚗 Transport & Logistics</option>
                <option value="planning">📋 Event Planning</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Description</label>
              <textarea rows={4} placeholder="Describe the service..." className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 focus:outline-none resize-none"></textarea>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-rose-500" /> What's Included
            </h2>
            <p className="text-sm text-gray-500 mb-4">List the specific items or deliverables included in this service.</p>

            <div className="space-y-3">
              {includedItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input 
                    type="text" 
                    value={item}
                    onChange={(e) => updateIncludedItem(index, e.target.value)}
                    placeholder="e.g., 2 Professional Photographers" 
                    className="flex-1 px-4 py-2 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 focus:outline-none" 
                  />
                  <button 
                    onClick={() => removeIncludedItem(index)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button 
                onClick={addIncludedItem}
                className="mt-2 text-sm font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add another item
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Side Details */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <ImageIcon className="w-5 h-5 text-rose-500" /> Service Image
            </h2>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-[#0f172a] hover:bg-rose-50/50 dark:hover:bg-rose-500/5 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-white dark:bg-[#1e293b] rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5 text-rose-500" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Upload Image</h3>
              <p className="text-[10px] text-gray-500 max-w-[150px]">JPG, PNG, WEBP. Max 2MB.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-rose-500" /> Settings & Price
            </h2>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Price Range / Estimate</label>
              <input type="text" placeholder="e.g., ₹50,000 - ₹1,50,000" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 focus:outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Display Order</label>
              <input type="number" placeholder="0" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 focus:outline-none" />
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Active Status</p>
                  <p className="text-[10px] text-gray-500">Show this service to customers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-rose-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Featured Service</p>
                  <p className="text-[10px] text-gray-500">Highlight on the homepage</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-rose-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
