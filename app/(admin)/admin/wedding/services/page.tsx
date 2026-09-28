'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, Plus, List, LayoutGrid, Filter, ChevronDown, 
  MoreVertical, Edit, Trash2, Eye, Box,
  Utensils, Flower2, Camera, Sparkles, Music, Star, Car, Briefcase
} from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

const CATEGORIES = [
  { id: 'catering', label: 'Catering & Food', icon: Utensils, color: 'bg-orange-100 text-orange-600' },
  { id: 'decor', label: 'Decoration & Florals', icon: Flower2, color: 'bg-pink-100 text-pink-600' },
  { id: 'photo', label: 'Photography & Videography', icon: Camera, color: 'bg-blue-100 text-blue-600' },
  { id: 'beauty', label: 'Bridal Makeup & Beauty', icon: Sparkles, color: 'bg-purple-100 text-purple-600' },
  { id: 'music', label: 'Music & Entertainment', icon: Music, color: 'bg-indigo-100 text-indigo-600' },
  { id: 'pooja', label: 'Religious/Pooja Services', icon: Star, color: 'bg-yellow-100 text-yellow-600' },
  { id: 'transport', label: 'Transport & Logistics', icon: Car, color: 'bg-gray-100 text-gray-600' },
  { id: 'planning', label: 'Event Planning', icon: Briefcase, color: 'bg-teal-100 text-teal-600' },
];

export default function ServicesPage() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [search, setSearch] = useState('');
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/wedding/services')
      .then(res => res.json())
      .then(data => {
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load services');
        setLoading(false);
      });
  }, []);

  const getCategoryDetails = (catId: string) => {
    return CATEGORIES.find(c => c.id === catId) || CATEGORIES[0];
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <Box className="w-6 h-6 text-rose-500" /> Wedding Services
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage catering, decoration, photography, and other add-on services</p>
        </div>
        <Link href="/admin/wedding/services/add" className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-rose-500/20 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Service
        </Link>
      </div>

      {/* Category Pills (Optional visual filter) */}
      <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
        <button className="px-4 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold whitespace-nowrap shadow-sm shadow-rose-500/20">All Services</button>
        {CATEGORIES.map(cat => (
          <button key={cat.id} className="px-4 py-2 bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0f172a] rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2">
            <cat.icon className="w-3.5 h-3.5" /> {cat.label}
          </button>
        ))}
      </div>

      {/* Filters & Actions */}
      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-1 gap-4 w-full md:w-auto">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search services..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>
          <button className="px-4 py-2 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Filter className="w-4 h-4" /> Filters <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#0f172a] p-1 rounded-xl border border-gray-200 dark:border-gray-700">
          <button 
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white dark:bg-[#1e293b] shadow-sm text-rose-500' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-[#1e293b] shadow-sm text-rose-500' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'table' ? (
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-[#0f172a] text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Service Name</th>
                  <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Category</th>
                  <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Price Range</th>
                  <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Status</th>
                  <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">Loading services...</td>
                  </tr>
                ) : services.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No services found.</td>
                  </tr>
                ) : services.map((service) => {
                  const cat = getCategoryDetails(service.category);
                  return (
                    <tr key={service.id} className="hover:bg-gray-50/50 dark:hover:bg-[#0f172a]/50 transition-colors group">
                      <td className="px-4 py-4">
                        <p className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                          {service.name}
                        </p>
                        <p className="text-[10px] text-gray-500">{service.id}</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.color} dark:bg-opacity-20`}>
                            <cat.icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cat.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{service.priceRange || 'N/A'}</p>
                      </td>
                      <td className="px-4 py-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={true} />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-rose-500"></div>
                          <span className="ml-2 text-[10px] font-bold text-gray-500">Active</span>
                        </label>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/admin/wedding/services/${service.id}`} className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"><Edit className="w-4 h-4" /></Link>
                          <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-sm text-gray-500">
            <p>Showing {services.length > 0 ? 1 : 0} to {services.length} of {services.length} entries</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
             <div className="col-span-full text-center text-gray-500 py-10">Loading services...</div>
          ) : services.length === 0 ? (
             <div className="col-span-full text-center text-gray-500 py-10">No services found.</div>
          ) : services.map((service) => {
            const cat = getCategoryDetails(service.category);
            return (
              <div key={service.id} className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.color} dark:bg-opacity-20`}>
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={true} />
                    <div className="w-7 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-rose-500"></div>
                  </label>
                </div>
                
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1 leading-tight">{service.name}</h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">{cat.label}</p>
                
                <div className="bg-gray-50 dark:bg-[#0f172a] p-3 rounded-xl mb-4">
                  <p className="text-[10px] text-gray-500 mb-0.5">Price Range</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{service.priceRange || 'N/A'}</p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-medium text-gray-400">{service.id}</span>
                  <div className="flex gap-1">
                    <Link href={`/admin/wedding/services/${service.id}`} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"><Edit className="w-4 h-4" /></Link>
                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
