'use client';

import { useState } from 'react';
import { Plus, GripVertical, Edit2, Trash2, Check, X, Shield, Star, Heart } from 'lucide-react';

const initialCategories = [
  { id: 1, name: 'Standard', basePrice: '2500 - 4000', icon: 'Heart', active: true, count: 12 },
  { id: 2, name: 'Deluxe', basePrice: '4000 - 6500', icon: 'Star', active: true, count: 8 },
  { id: 3, name: 'Suite', basePrice: '7000 - 12000', icon: 'Shield', active: true, count: 4 },
  { id: 4, name: 'Premium', basePrice: '12000+', icon: 'Star', active: false, count: 2 },
];

export default function RoomCategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Room Categories</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage room types and default templates.</p>
        </div>
        <button className="bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0f172a] font-bold text-gray-500 dark:text-gray-400 grid grid-cols-12 gap-4">
          <div className="col-span-1"></div>
          <div className="col-span-4 lg:col-span-3">Category Name</div>
          <div className="col-span-3 hidden lg:block">Base Price Range</div>
          <div className="col-span-2 hidden md:block">Total Rooms</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3 md:col-span-2 text-right">Actions</div>
        </div>
        
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {categories.map((cat) => (
            <div key={cat.id} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-orange-50/30 dark:hover:bg-[#0f172a]/50 transition-colors group cursor-move">
              <div className="col-span-1 flex justify-center text-gray-400 group-hover:text-[#ea580c]">
                <GripVertical className="w-5 h-5" />
              </div>
              <div className="col-span-4 lg:col-span-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/10 text-[#ea580c] flex items-center justify-center">
                    {cat.icon === 'Star' ? <Star className="w-5 h-5" /> : cat.icon === 'Heart' ? <Heart className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white text-lg">{cat.name}</span>
                </div>
              </div>
              <div className="col-span-3 hidden lg:flex font-mono text-sm text-gray-500 dark:text-gray-400">
                ₹{cat.basePrice}
              </div>
              <div className="col-span-2 hidden md:flex font-bold text-gray-700 dark:text-gray-300">
                {cat.count} Rooms
              </div>
              <div className="col-span-2">
                <button className={`w-12 h-6 rounded-full relative transition-colors ${cat.active ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${cat.active ? 'left-7' : 'left-1'}`}></span>
                </button>
              </div>
              <div className="col-span-3 md:col-span-2 flex justify-end gap-2">
                <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors bg-gray-50 dark:bg-[#0f172a] rounded-lg">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-500 transition-colors bg-gray-50 dark:bg-[#0f172a] rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
