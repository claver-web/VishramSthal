'use client';

import { 
  AlertOctagon, Star, BedDouble
} from 'lucide-react';

const roomPerformance: any[] = [];

export default function RoomPerformancePage() {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Room Performance</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Track utilization and identify underperforming inventory.</p>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        {roomPerformance.length === 0 ? (
          <div className="p-16 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
            <BedDouble className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No room performance data</h3>
            <p className="text-sm max-w-sm">Performance metrics will populate here once rooms are booked.</p>
          </div>
        ) : (
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-[#0f172a] text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Room</th>
                <th className="px-6 py-4">Occupancy %</th>
                <th className="px-6 py-4">Total Bookings</th>
                <th className="px-6 py-4">Revenue Gen.</th>
                <th className="px-6 py-4">Avg Rating</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {roomPerformance.map((room) => (
                <tr key={room.id} className="hover:bg-orange-50/30 dark:hover:bg-[#0f172a]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 text-[#ea580c] dark:bg-orange-900/30 rounded-lg"><BedDouble className="w-4 h-4" /></div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">Room {room.id}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{room.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 dark:text-white w-10">{room.occ}</span>
                      <div className="w-24 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${parseInt(room.occ) > 80 ? 'bg-green-500' : parseInt(room.occ) > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: room.occ }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">{room.bookings}</td>
                  <td className="px-6 py-4 font-black text-[#ea580c]">{room.rev}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 font-bold text-gray-900 dark:text-white">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {room.rating}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                      room.status === 'Excellent' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 
                      room.status === 'Good' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                      room.status === 'Underperforming' ? 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400' :
                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'
                    }`}>
                      {room.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
