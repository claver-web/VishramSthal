'use client';

import { useState, useEffect } from 'react';
import { 
  Tag, Plus, Calendar, Users, Edit, Trash2, Power, MoreVertical, X, Upload
} from 'lucide-react';

export default function OffersPage() {
  const [offers, setOffers] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [formType, setFormType] = useState('Both');

  const renderOfferForm = () => {
    if (!isFormOpen) return null;
    return (
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-fade-in">
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsFormOpen(false)}></div>
        
        <div className="relative w-full max-w-xl bg-white dark:bg-[#0f172a] h-full shadow-2xl flex flex-col transform transition-transform duration-300 border-l border-gray-100 dark:border-gray-800">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#1e293b] flex justify-between items-center">
            <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#ea580c]" /> Create New Offer
            </h2>
            <button onClick={() => setIsFormOpen(false)} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Offer Title</label>
                <input type="text" placeholder="e.g. Diwali Special" className="w-full p-3 bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white font-bold" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                <textarea rows={3} placeholder="Describe the offer..." className="w-full p-3 bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white"></textarea>
              </div>
            </div>

            {/* Discount Value */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Discount Type</label>
                <select className="w-full p-3 bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none dark:text-white">
                  <option>Percentage (%)</option>
                  <option>Fixed Amount (₹)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Value</label>
                <input type="number" placeholder="20" className="w-full p-3 bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white font-bold" />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Valid From</label>
                <input type="date" className="w-full p-3 bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Valid To</label>
                <input type="date" className="w-full p-3 bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white" />
              </div>
            </div>

            {/* Applicability */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Applicable To</label>
                <select 
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                  className="w-full p-3 bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none dark:text-white"
                >
                  <option value="Both">Both (Hotel & Wedding)</option>
                  <option value="Hotel">Hotel Only</option>
                  <option value="Wedding">Wedding Only</option>
                </select>
              </div>

              {(formType === 'Hotel' || formType === 'Both') && (
                <div>
                  <label className="block text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-2">Applicable Rooms</label>
                  <select className="w-full p-3 bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none dark:text-white" multiple size={3}>
                    <option>Standard Room</option>
                    <option>Deluxe Room</option>
                    <option>Premium Suite</option>
                  </select>
                  <p className="text-[10px] text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                </div>
              )}

              {(formType === 'Wedding' || formType === 'Both') && (
                <div>
                  <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-2">Applicable Venues & Services</label>
                  <select className="w-full p-3 bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none dark:text-white" multiple size={4}>
                    <option>Venue: Grand Banquet</option>
                    <option>Venue: Royal Lawns</option>
                    <option>Service: Premium Catering</option>
                    <option>Service: Floral Decor</option>
                  </select>
                  <p className="text-[10px] text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Usage Limit</label>
                  <input type="number" placeholder="Leave empty for unlimited" className="w-full p-3 bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Coupon Code (Optional)</label>
                  <input type="text" placeholder="e.g. DIWALI20" className="w-full p-3 bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white font-mono uppercase" />
                </div>
              </div>
            </div>

            {/* Banner Upload */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Offer Banner (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center hover:border-[#ea580c] hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Click to upload banner image</span>
              </div>
            </div>
            
            <label className="flex items-center gap-3 cursor-pointer mt-4">
              <input type="checkbox" className="w-5 h-5 rounded text-[#ea580c] focus:ring-[#ea580c]" />
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Feature this offer on Homepage</span>
            </label>
          </div>

          <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#1e293b] flex gap-4">
            <button className="flex-1 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white font-black py-3 rounded-xl shadow-lg shadow-orange-500/30">Publish Offer</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Active Offers</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage promotional campaigns and discounts.</p>
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 outline-none shadow-sm"
          >
            <option value="All">All Promos</option>
            <option value="Hotel">Hotel Only</option>
            <option value="Wedding">Wedding Only</option>
            <option value="Both">Universal (Both)</option>
          </select>
          <button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all">
            <Plus className="w-5 h-5" /> Create Offer
          </button>
        </div>
      </div>

      {offers.length === 0 ? (
        <div className="bg-white dark:bg-[#1e293b] p-16 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center mb-4">
            <Tag className="w-8 h-8 text-[#ea580c]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No active offers</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mb-6">Create promotional campaigns, discounts, and special offers to attract more bookings.</p>
          <button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-md">
            <Plus className="w-5 h-5" /> Create Your First Offer
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.filter(o => activeFilter === 'All' || o.type === activeFilter).map((offer) => {
            let colorClass = 'border-[#ea580c]/50 text-[#ea580c] bg-orange-100 dark:bg-orange-900/30';
            let labelColor = 'bg-[#ea580c] text-white';
            if (offer.type === 'Wedding') {
              colorClass = 'border-rose-500/50 text-rose-500 bg-rose-100 dark:bg-rose-900/30';
              labelColor = 'bg-rose-500 text-white';
            } else if (offer.type === 'Both') {
              colorClass = 'border-yellow-500/50 text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
              labelColor = 'bg-yellow-500 text-white';
            }
            
            return (
            <div key={offer.id} className={`bg-white dark:bg-[#1e293b] rounded-3xl p-6 shadow-sm border-2 ${offer.status === 'Active' ? colorClass.split(' ')[0] + ' relative overflow-hidden' : 'border-gray-100 dark:border-gray-800 opacity-70 relative overflow-hidden'}`}>
              {offer.featured && (
                <div className={`absolute -right-8 top-6 ${labelColor} text-[10px] font-black uppercase tracking-widest px-10 py-1 rotate-45 shadow-md`}>Featured</div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClass.split(' ').slice(1).join(' ')}`}>
                  <Tag className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${labelColor}`}>{offer.type}</span>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors"><Edit className="w-4 h-4" /></button>
                  <button className={`p-2 transition-colors ${offer.status === 'Active' ? 'text-green-500' : 'text-gray-400'}`}><Power className="w-4 h-4" /></button>
                  <button onClick={() => setOffers(offers.filter(o => o.id !== offer.id))} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              <h3 className="font-black text-xl text-gray-900 dark:text-white mb-1">{offer.title}</h3>
              <p className={`text-3xl font-black mb-6 ${colorClass.split(' ')[1]}`}>{offer.value} <span className="text-sm text-gray-500 font-medium">OFF</span></p>

              <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4 text-gray-400" /> <span className="font-medium">{offer.valid}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Tag className="w-4 h-4 text-gray-400 flex-shrink-0" /> <span className="font-medium truncate">{offer.target}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4 text-gray-400" /> <span className="font-medium">{offer.usage} redemptions</span>
                </div>
              </div>
              
              {offer.status === 'Inactive' && (
                <div className="mt-4 inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold px-3 py-1 rounded-full">Inactive</div>
              )}
            </div>
            );
          })}
        </div>
      )}

      {renderOfferForm()}
    </div>
  );
}
