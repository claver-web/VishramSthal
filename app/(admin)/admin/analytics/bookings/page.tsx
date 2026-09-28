'use client';

import { 
  CalendarCheck, Clock, CheckCircle, XCircle, TrendingUp
} from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const bookingsByDay = [
  { name: 'Mon', bookings: 0 }, { name: 'Tue', bookings: 0 },
  { name: 'Wed', bookings: 0 }, { name: 'Thu', bookings: 0 },
  { name: 'Fri', bookings: 0 }, { name: 'Sat', bookings: 0 },
  { name: 'Sun', bookings: 0 },
];

export default function BookingAnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Booking Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Reservation trends and patterns.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600"><CalendarCheck className="w-5 h-5" /></div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Total Bookings</p>
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white">0</h3>
          <p className="text-xs font-bold text-gray-500 mt-2 flex items-center gap-1">No data available</p>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg text-[#ea580c]"><Clock className="w-5 h-5" /></div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Avg Stay Duration</p>
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white">0 Nights</h3>
          <p className="text-xs font-bold text-gray-500 mt-2">No data available</p>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 dark:bg-green-500/10 rounded-lg text-green-600"><CheckCircle className="w-5 h-5" /></div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Occupancy Rate</p>
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white">0%</h3>
          <p className="text-xs font-bold text-gray-500 mt-2 flex items-center gap-1">No data available</p>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg text-red-600"><XCircle className="w-5 h-5" /></div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Cancellation Rate</p>
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white">0%</h3>
          <p className="text-xs font-bold text-gray-500 mt-2 flex items-center gap-1">No data available</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Bookings by Day of Week</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingsByDay}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: 'rgba(234, 88, 12, 0.05)'}} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="bookings" fill="#ea580c" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">No booking data to analyze trends.</p>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Lead Time Analysis</h3>
          <div className="space-y-6 mt-10">
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-gray-700 dark:text-gray-300">0-3 Days (Last Minute)</span>
                <span className="text-gray-900 dark:text-white">0%</span>
              </div>
              <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-gray-700 dark:text-gray-300">4-14 Days</span>
                <span className="text-gray-900 dark:text-white">0%</span>
              </div>
              <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-gray-700 dark:text-gray-300">15-30 Days</span>
                <span className="text-gray-900 dark:text-white">0%</span>
              </div>
              <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-gray-700 dark:text-gray-300">30+ Days (Advanced Planners)</span>
                <span className="text-gray-900 dark:text-white">0%</span>
              </div>
              <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
