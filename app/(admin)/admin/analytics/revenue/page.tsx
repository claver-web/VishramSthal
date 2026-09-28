'use client';

import { 
  IndianRupee, TrendingUp, AlertTriangle, Lightbulb
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const revData = [
  { name: 'May', currentYear: 0, lastYear: 0 }, 
  { name: 'Jun', currentYear: 0, lastYear: 0 },
  { name: 'Jul', currentYear: 0, lastYear: 0 }, 
  { name: 'Aug', currentYear: 0, lastYear: 0 },
  { name: 'Sep', currentYear: 0, lastYear: 0 }, 
  { name: 'Oct', currentYear: 0, lastYear: 0 },
];

export default function RevenueAnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Revenue Analytics & Forecasts</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Deep financial insights and predictive modeling.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Metric */}
        <div className="bg-gradient-to-br from-[#ea580c] to-[#c2410c] p-8 rounded-3xl shadow-lg shadow-orange-500/20 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <p className="text-orange-100 font-bold uppercase tracking-wider mb-2">Total Revenue YTD</p>
          <h3 className="text-5xl font-black flex items-center gap-2">
            <IndianRupee className="w-10 h-10" /> 0
          </h3>
          <div className="mt-8 flex gap-8">
            <div>
              <p className="text-orange-200 text-sm font-medium">Avg Rev per Booking</p>
              <p className="text-2xl font-bold mt-1 flex items-center">₹0</p>
            </div>
            <div>
              <p className="text-orange-200 text-sm font-medium">RevPAR</p>
              <p className="text-2xl font-bold mt-1 flex items-center">₹0</p>
            </div>
          </div>
        </div>

        {/* AI Forecast */}
        <div className="bg-white dark:bg-[#1e293b] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 rounded-xl"><Lightbulb className="w-6 h-6" /></div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white">AI Forecast (Next 30 Days)</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Projected Revenue</span>
              <span className="text-2xl font-black text-gray-400">₹0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Projected Occupancy</span>
              <span className="text-xl font-bold text-gray-400 dark:text-gray-500">0%</span>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 dark:bg-[#0f172a] border border-gray-100 dark:border-gray-800 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Not enough data to generate accurate forecasts.
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Year-over-Year Comparison (in thousands)</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={val => `₹${val}k`} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }} />
              <Line name="2023" type="monotone" dataKey="currentYear" stroke="#ea580c" strokeWidth={4} dot={{ fill: '#ea580c', r: 4 }} />
              <Line name="2022" type="monotone" dataKey="lastYear" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
