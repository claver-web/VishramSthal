'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, Filter, Plus, LayoutGrid, List, MoreVertical, 
  Edit, Copy, Eye, Trash2, ChevronLeft, ChevronRight,
  ArrowUpDown
} from 'lucide-react';

export default function RoomsPage() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('./actions').then(({ getRooms }) => {
      getRooms().then(data => {
        setRooms(data);
        setLoading(false);
      });
    });
  }, []);

  const toggleSelectAll = () => {
    if (selectedRooms.length === rooms.length && rooms.length > 0) {
      setSelectedRooms([]);
    } else {
      setSelectedRooms(rooms.map(r => r.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedRooms.includes(id)) {
      setSelectedRooms(selectedRooms.filter(r => r !== id));
    } else {
      setSelectedRooms([...selectedRooms, id]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-500';
      case 'Booked': return 'bg-red-500';
      case 'Maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">All Rooms</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and organize your property's rooms.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link href="/admin/rooms/add" className="w-full md:w-auto bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Room
          </Link>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search rooms..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-[#ea580c] focus:ring-0 outline-none transition-colors dark:text-white"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
        
        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
          {selectedRooms.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#ea580c]">{selectedRooms.length} selected</span>
              <select className="bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-1.5 text-sm font-medium outline-none">
                <option>Bulk Actions</option>
                <option>Delete Selected</option>
                <option>Mark Available</option>
              </select>
            </div>
          )}
          <div className="flex items-center bg-gray-50 dark:bg-[#0f172a] rounded-xl p-1 border border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white dark:bg-[#1e293b] shadow-sm text-[#ea580c]' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              <List className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-[#1e293b] shadow-sm text-[#ea580c]' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'table' ? (
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-[#0f172a] text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 w-12">
                    <input type="checkbox" checked={selectedRooms.length === rooms.length} onChange={toggleSelectAll} className="rounded border-gray-300 text-[#ea580c] focus:ring-[#ea580c]" />
                  </th>
                  <th className="px-6 py-4">Room Details</th>
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200">
                      Type <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200">
                      Price <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-4">Capacity</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {rooms.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      <div className="flex flex-col items-center justify-center">
                        <List className="w-12 h-12 mb-3 text-gray-300 dark:text-gray-600" />
                        <p className="font-medium">No rooms found in the database.</p>
                        <p className="text-sm mt-1">Click "Add New Room" to create one.</p>
                      </div>
                    </td>
                  </tr>
                )}
                {rooms.map((room) => (
                  <tr key={room.id} className={`hover:bg-orange-50/30 dark:hover:bg-[#0f172a]/50 transition-colors ${selectedRooms.includes(room.id) ? 'bg-orange-50/50 dark:bg-orange-500/5' : ''}`}>
                    <td className="px-6 py-4">
                      <input type="checkbox" checked={selectedRooms.includes(room.id)} onChange={() => toggleSelect(room.id)} className="rounded border-gray-300 text-[#ea580c] focus:ring-[#ea580c]" />
                    </td>
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg bg-gray-200 overflow-hidden">
                        <img src={room.images?.[0] || "/logoKrishna.png"} alt={room.name || room.number} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{room.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{room.spiritualName || room.theme || 'Standard'} • {room.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">{room.type}</td>
                    <td className="px-6 py-4 font-bold text-[#ea580c]">₹{room.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{room.capacity} Guests</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${getStatusColor(room.isAvailable ? 'Available' : 'Draft')}`}></span>
                        <span className="text-sm font-medium dark:text-gray-300">{room.isAvailable ? 'Available' : 'Draft'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-gray-500 hover:text-[#ea580c] transition-colors"><Eye className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-500 hover:text-blue-500 transition-colors"><Edit className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-500 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden group">
              <div className="relative h-48">
                <img src={room.images?.[0] || "/logoKrishna.png"} alt={room.name || room.number} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md">
                  {room.id}
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/90 dark:bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                  <span className={`w-2 h-2 rounded-full ${getStatusColor(room.isAvailable ? 'Available' : 'Draft')}`}></span>
                  <span className="text-xs font-bold dark:text-white">{room.isAvailable ? 'Available' : 'Draft'}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{room.name}</h3>
                    <p className="text-xs text-[#ea580c] font-medium">{room.spiritualName || room.theme || 'Standard'}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><MoreVertical className="w-5 h-5" /></button>
                </div>
                
                <div className="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-4">
                  <span>{room.type}</span>
                  <span>{room.capacity} Guests</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-black text-gray-900 dark:text-white">₹{room.price}<span className="text-xs text-gray-500 font-normal">/night</span></span>
                  <div className="flex gap-2">
                    <button className="p-2 bg-gray-50 dark:bg-[#0f172a] rounded-lg hover:text-[#ea580c] transition-colors"><Edit className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {loading ? 'Loading rooms...' : `Showing ${rooms.length} rooms`}
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-[#1e293b] disabled:opacity-50" disabled><ChevronLeft className="w-4 h-4" /></button>
          <button className="w-8 h-8 flex items-center justify-center bg-[#ea580c] text-white rounded-lg font-bold text-sm">1</button>
          <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-[#1e293b] disabled:opacity-50" disabled><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
}
