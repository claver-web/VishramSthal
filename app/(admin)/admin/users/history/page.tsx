'use client';

import { 
  Search, Calendar, Star, IndianRupee, MapPin, Download, History 
} from 'lucide-react';

const mockGuestHistory: any[] = [];

export default function GuestHistoryPage() {
  const getLoyaltyBadge = (level: string) => {
    switch (level) {
      case 'Platinum': return 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30';
      case 'Gold': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/30';
      case 'Silver': return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600';
      default: return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Guest History</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Review past stays and loyalty metrics.</p>
        </div>
        <button className="flex items-center gap-2 bg-white dark:bg-[#1e293b] text-gray-700 dark:text-white px-5 py-2.5 rounded-xl font-bold border border-gray-200 dark:border-gray-700 shadow-sm hover:text-[#ea580c] transition-colors">
          <Download className="w-5 h-5" /> Export Data
        </button>
      </div>

      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-wrap gap-4">
        <div className="relative flex-1 md:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search guests by name or email..." className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-[#ea580c] outline-none dark:text-white" />
        </div>
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          Stay Date Range: All Time
        </div>
      </div>

      {mockGuestHistory.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400">
          <History className="w-12 h-12 mb-3 text-gray-300 dark:text-gray-600" />
          <p className="font-medium text-lg">No guest history available.</p>
          <p className="text-sm mt-1">Past stays and guest loyalty metrics will appear here.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockGuestHistory.map((guest) => (
          <div key={guest.id} className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transition-transform group relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-orange-500/5 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <h3 className="font-black text-lg text-gray-900 dark:text-white">{guest.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{guest.email}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{guest.phone}</p>
              </div>
              <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${getLoyaltyBadge(guest.loyalty)} flex items-center gap-1`}>
                <Star className="w-3 h-3" /> {guest.loyalty}
              </span>
            </div>

            <div className="space-y-3 mt-6 border-t border-gray-100 dark:border-gray-800 pt-4 relative z-10">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5"><History className="w-4 h-4 text-[#ea580c]" /> Last Stay</span>
                <span className="font-bold text-gray-900 dark:text-white">{guest.lastStay.split(' - ')[0]}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#ea580c]" /> Room</span>
                <span className="font-medium text-gray-700 dark:text-gray-300 truncate max-w-[120px]">{guest.room}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">Total Visits</span>
                <span className="font-black bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md text-gray-900 dark:text-white">{guest.totalVisits}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5"><IndianRupee className="w-4 h-4 text-[#ea580c]" /> Revenue</span>
                <span className="font-black text-[#ea580c]">₹{guest.revenue}</span>
              </div>
            </div>
            
            <button className="w-full mt-6 py-2.5 bg-gray-50 dark:bg-[#0f172a] hover:bg-[#ea580c] hover:text-white text-gray-700 dark:text-gray-300 font-bold rounded-xl transition-colors border border-gray-200 dark:border-gray-700 hover:border-[#ea580c] relative z-10">
              View Full Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
