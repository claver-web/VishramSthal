'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, Plus, Filter, LayoutGrid, List, MoreVertical, 
  Edit, Trash2, Eye, Copy, Building2, ChevronDown, CheckCircle2
} from 'lucide-react';
import Image from 'next/image';

const MOCK_VENUES = [
  { id: 1, name: 'Grand Banquet Hall', type: 'Banquet Hall', capacity: 500, price: 150000, bookings: 45, status: 'Active', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=300' },
  { id: 2, name: 'Royal Garden Lawns', type: 'Lawn', capacity: 1000, price: 250000, bookings: 32, status: 'Active', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=300' },
  { id: 3, name: 'Skyview Terrace', type: 'Terrace', capacity: 200, price: 80000, bookings: 12, status: 'Maintenance', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=300' },
  { id: 4, name: 'Intimate Hall', type: 'Hall', capacity: 100, price: 40000, bookings: 65, status: 'Inactive', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=300' },
];

export default function VenuesPage() {
  const [view, setView] = useState<'table' | 'grid'>('table');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    if (selected.includes(id)) setSelected(selected.filter(i => i !== id));
    else setSelected([...selected, id]);
  };

  const toggleAll = () => {
    if (selected.length === MOCK_VENUES.length) setSelected([]);
    else setSelected(MOCK_VENUES.map(v => v.id));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
      case 'Booked': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400';
      case 'Inactive': return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <Building2 className="w-6 h-6 text-rose-500" /> Venue Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage wedding venues, spaces, and event areas</p>
        </div>
        <Link href="/admin/wedding/venues/add" className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-rose-500/20 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Venue
        </Link>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-1 gap-4 w-full md:w-auto">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search venues by name or type..." 
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
            onClick={() => setView('table')}
            className={`p-1.5 rounded-lg transition-colors ${view === 'table' ? 'bg-white dark:bg-[#1e293b] shadow-sm text-rose-500' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setView('grid')}
            className={`p-1.5 rounded-lg transition-colors ${view === 'grid' ? 'bg-white dark:bg-[#1e293b] shadow-sm text-rose-500' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {selected.length > 0 && (
        <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 px-4 py-3 rounded-xl flex items-center justify-between animate-fade-in">
          <span className="text-sm font-medium text-rose-700 dark:text-rose-400">{selected.length} venues selected</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-colors">Change Status</button>
            <button className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-bold shadow-sm shadow-red-500/20 hover:bg-red-600 transition-colors">Delete Selected</button>
          </div>
        </div>
      )}

      {/* Venues View */}
      {view === 'table' ? (
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-[#0f172a] text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="px-4 py-4 w-12"><input type="checkbox" onChange={toggleAll} checked={selected.length === MOCK_VENUES.length} className="rounded border-gray-300 text-rose-500 focus:ring-rose-500" /></th>
                  <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Venue</th>
                  <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Type</th>
                  <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Capacity</th>
                  <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Starting Price</th>
                  <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Bookings</th>
                  <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Status</th>
                  <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {MOCK_VENUES.map((venue) => (
                  <tr key={venue.id} className="hover:bg-gray-50/50 dark:hover:bg-[#0f172a]/50 transition-colors group">
                    <td className="px-4 py-4"><input type="checkbox" checked={selected.includes(venue.id)} onChange={() => toggleSelect(venue.id)} className="rounded border-gray-300 text-rose-500 focus:ring-rose-500" /></td>
                    <td className="px-4 py-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl relative overflow-hidden bg-gray-100 shrink-0">
                        <Image src={venue.image} alt={venue.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{venue.name}</p>
                        <Link href={`/admin/wedding/venues/${venue.id}`} className="text-[10px] text-rose-500 hover:underline">View details</Link>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300 font-medium">{venue.type}</td>
                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300 font-medium">{venue.capacity} guests</td>
                    <td className="px-4 py-4 text-sm font-bold text-gray-900 dark:text-white">₹{venue.price.toLocaleString()}</td>
                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300 font-medium">{venue.bookings}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusColor(venue.status)}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {venue.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors"><Eye className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"><Edit className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"><Copy className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-sm text-gray-500">
            <p>Showing 1 to {MOCK_VENUES.length} of {MOCK_VENUES.length} entries</p>
            <div className="flex gap-1">
              <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#0f172a] disabled:opacity-50" disabled>Prev</button>
              <button className="px-3 py-1 rounded-lg bg-rose-500 text-white font-medium">1</button>
              <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#0f172a] disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_VENUES.map((venue) => (
            <div key={venue.id} className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="h-48 relative bg-gray-100">
                <Image src={venue.image} alt={venue.name} fill className="object-cover" />
                <div className="absolute top-3 right-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm backdrop-blur-md ${getStatusColor(venue.status)} bg-white/90`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {venue.status}
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <input type="checkbox" checked={selected.includes(venue.id)} onChange={() => toggleSelect(venue.id)} className="rounded border-gray-300 text-rose-500 focus:ring-rose-500 w-5 h-5 shadow-sm" />
                </div>
              </div>
              <div className="p-5 relative">
                <div className="absolute right-4 -top-6 w-12 h-12 bg-white dark:bg-[#1e293b] rounded-full flex items-center justify-center shadow-lg border border-gray-100 dark:border-gray-800 text-rose-500">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{venue.type}</div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-3">{venue.name}</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 dark:bg-[#0f172a] p-2 rounded-xl text-center">
                    <p className="text-[10px] text-gray-500 mb-0.5">Capacity</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{venue.capacity}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#0f172a] p-2 rounded-xl text-center">
                    <p className="text-[10px] text-gray-500 mb-0.5">Bookings</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{venue.bookings}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="text-[10px] text-gray-500">Starting Price</p>
                    <p className="text-lg font-black text-rose-500">₹{venue.price.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
