'use client';

import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Calendar, Download, Printer, TrendingUp, TrendingDown, IndianRupee } from 'lucide-react';

import { useState, useEffect } from 'react';

const COLORS = ['#ea580c', '#f97316', '#fdba74', '#fed7aa'];

export default function RevenueReportsPage() {
  const [dailyRev, setDailyRev] = useState<any[]>([]);
  const [weeklyRev, setWeeklyRev] = useState<any[]>([]);
  const [compareRev, setCompareRev] = useState<any[]>([]);
  const [venueRev, setVenueRev] = useState<any[]>([]);
  const [methodRev, setMethodRev] = useState<any[]>([]);
  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Revenue Reports</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Financial performance and projections.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 outline-none">
            <option>All Revenues (Combined)</option>
            <option>Hotel Revenue Only</option>
            <option>Wedding Revenue Only</option>
          </select>
          <div className="flex items-center gap-2 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 px-4 py-2.5 rounded-xl">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select className="bg-transparent text-sm font-bold text-gray-700 dark:text-gray-300 outline-none">
              <option>October 2026</option>
              <option>September 2026</option>
              <option>August 2026</option>
            </select>
          </div>
          <button className="p-2.5 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:text-[#ea580c] transition-colors"><Printer className="w-5 h-5" /></button>
          <button className="flex items-center gap-2 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-500/10 rounded-full blur-xl"></div>
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Total Combined Revenue</p>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-1">
            <IndianRupee className="w-6 h-6 text-[#ea580c]" /> 0
          </h3>
          <div className="mt-4 flex items-center gap-2 text-sm font-bold text-gray-600 bg-gray-50 dark:bg-gray-500/10 px-3 py-1 rounded-full w-fit">
            No data yet
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Hotel Revenue</p>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-1">
            <IndianRupee className="w-6 h-6 text-[#ea580c]" /> 0
          </h3>
          <div className="mt-4 flex items-center gap-2 text-sm font-bold text-gray-600 bg-gray-50 dark:bg-gray-500/10 px-3 py-1 rounded-full w-fit">
            No data yet
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Wedding Revenue</p>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-1">
            <IndianRupee className="w-6 h-6 text-rose-500" /> 0
          </h3>
          <div className="mt-4 flex items-center gap-2 text-sm font-bold text-gray-600 bg-gray-50 dark:bg-gray-500/10 px-3 py-1 rounded-full w-fit">
            No data yet
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Projected (Month End)</p>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-1">
            <IndianRupee className="w-6 h-6 text-purple-500" /> 0
          </h3>
          <div className="mt-4 flex items-center gap-2 text-sm font-bold text-gray-600 bg-gray-50 dark:bg-gray-500/10 px-3 py-1 rounded-full w-fit">
            No data yet
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Daily Revenue Progression</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyRev}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={val => `₹${val/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }} />
                <Line type="monotone" dataKey="hotel" stroke="#ea580c" strokeWidth={4} name="Hotel Revenue" />
                <Line type="monotone" dataKey="wedding" stroke="#f43f5e" strokeWidth={4} name="Wedding Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Weekly Performance (Stacked)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyRev}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={val => `₹${val/1000}k`} />
                <Tooltip cursor={{fill: 'rgba(234, 88, 12, 0.05)'}} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }} />
                <Legend />
                <Bar dataKey="hotel" stackId="a" fill="#ea580c" name="Hotel Revenue" />
                <Bar dataKey="wedding" stackId="a" fill="#f43f5e" name="Wedding Revenue" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center">
          <div className="w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Revenue Split (Hotel vs Wedding)</h3>
            <p className="text-sm text-gray-500 mb-6">Weddings account for a large portion of overall revenue.</p>
          </div>
          <div className="h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={compareRev} innerRadius={40} outerRadius={70} paddingAngle={5} dataKey="value">
                  <Cell fill="#ea580c" />
                  <Cell fill="#f43f5e" />
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px' }} formatter={(val: any) => `₹${Number(val).toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center">
          <div className="w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Wedding Revenue by Venue</h3>
            <p className="text-sm text-gray-500 mb-6">Grand Banquet is the highest earner this month.</p>
          </div>
          <div className="h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={venueRev} innerRadius={40} outerRadius={70} paddingAngle={5} dataKey="value">
                  {venueRev.map((entry, index) => <Cell key={`cell-${index}`} fill={['#f43f5e', '#fb7185', '#fda4af'][index % 3]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Payment Methods</h3>
            <p className="text-sm text-gray-500 mb-6">UPI dominates the transaction volume.</p>
          </div>
          <div className="h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={methodRev} innerRadius={40} outerRadius={70} paddingAngle={5} dataKey="value">
                  {methodRev.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
