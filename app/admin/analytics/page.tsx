'use client';

import { useState, useEffect } from 'react';
import { 
  Users, Eye, Clock, TrendingUp, TrendingDown, 
  Smartphone, Monitor, Tablet, Globe, ArrowRight, MousePointerClick
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts';

export default function VisitorAnalyticsPage() {
  const [range, setRange] = useState('7');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/admin/analytics?range=${range}`)
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [range]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-[#ea580c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { metrics, visitorData, trafficSources, deviceBreakdown, funnel } = data;

  const roomViewDrop = funnel.websiteVisitors ? Math.round((1 - (funnel.roomViews / funnel.websiteVisitors)) * 100) : 0;
  const checkoutDrop = funnel.roomViews ? Math.round((1 - (funnel.checkoutsStarted / funnel.roomViews)) * 100) : 0;
  const conversionRate = funnel.websiteVisitors ? Math.round((funnel.completedBookings / funnel.websiteVisitors) * 100) : 0;

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Visitor Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Website traffic and user behavior insights.</p>
        </div>
        <select 
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 outline-none shadow-sm"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="365">This Year</option>
        </select>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600"><Users className="w-5 h-5" /></div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Total Visitors</p>
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white">{metrics.totalVisitors}</h3>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg text-[#ea580c]"><Eye className="w-5 h-5" /></div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Page Views</p>
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white">{metrics.pageViews}</h3>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded-lg text-purple-600"><Clock className="w-5 h-5" /></div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Avg Session</p>
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white">N/A</h3>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg text-red-600"><MousePointerClick className="w-5 h-5" /></div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Bounce Rate</p>
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white">N/A</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Daily Visitors</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorData}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="visitors" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources & Devices */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Traffic Sources</h3>
            <div className="space-y-4">
              {trafficSources.map((source: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-bold mb-1">
                    <span className="text-gray-700 dark:text-gray-300">{source.name}</span>
                    <span className="text-gray-900 dark:text-white">{source.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#ea580c] rounded-full" style={{ width: `${source.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Device Breakdown</h3>
            <div className="flex justify-around items-end h-24">
              <div className="flex flex-col items-center gap-2">
                <div className="h-1 w-8 bg-blue-500 rounded-t-lg relative group transition-all" style={{ height: Math.max(4, (deviceBreakdown.mobile / 100) * 80) }}>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity text-gray-900 dark:text-white">{deviceBreakdown.mobile}%</span>
                </div>
                <Smartphone className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-1 w-8 bg-green-500 rounded-t-lg relative group transition-all" style={{ height: Math.max(4, (deviceBreakdown.desktop / 100) * 80) }}>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity text-gray-900 dark:text-white">{deviceBreakdown.desktop}%</span>
                </div>
                <Monitor className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-1 w-8 bg-purple-500 rounded-t-lg relative group transition-all" style={{ height: Math.max(4, (deviceBreakdown.tablet / 100) * 80) }}>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity text-gray-900 dark:text-white">{deviceBreakdown.tablet}%</span>
                </div>
                <Tablet className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Funnel */}
      <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-8">Booking Funnel</h3>
        <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto gap-4">
          <div className="text-center w-full md:w-auto">
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 dark:bg-[#0f172a] border-4 border-gray-200 dark:border-gray-700 flex items-center justify-center mb-3">
              <span className="text-xl font-black text-gray-900 dark:text-white">{funnel.websiteVisitors}</span>
            </div>
            <p className="font-bold text-gray-700 dark:text-gray-300">Website Visitors</p>
          </div>
          <ArrowRight className="w-6 h-6 text-gray-300 dark:text-gray-700 hidden md:block rotate-90 md:rotate-0" />
          <div className="text-center w-full md:w-auto">
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 dark:bg-[#0f172a] border-4 border-gray-200 dark:border-gray-700 flex items-center justify-center mb-3">
              <span className="text-xl font-black text-gray-900 dark:text-white">{funnel.roomViews}</span>
            </div>
            <p className="font-bold text-gray-700 dark:text-gray-300">Room Views</p>
            <p className="text-xs text-gray-400 font-bold mt-1">{roomViewDrop}% Drop-off</p>
          </div>
          <ArrowRight className="w-6 h-6 text-gray-300 dark:text-gray-700 hidden md:block rotate-90 md:rotate-0" />
          <div className="text-center w-full md:w-auto">
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 dark:bg-[#0f172a] border-4 border-gray-200 dark:border-gray-700 flex items-center justify-center mb-3">
              <span className="text-xl font-black text-gray-900 dark:text-white">{funnel.checkoutsStarted}</span>
            </div>
            <p className="font-bold text-gray-700 dark:text-gray-300">Checkout Started</p>
            <p className="text-xs text-gray-400 font-bold mt-1">{checkoutDrop}% Drop-off</p>
          </div>
          <ArrowRight className="w-6 h-6 text-gray-300 dark:text-gray-700 hidden md:block rotate-90 md:rotate-0" />
          <div className="text-center w-full md:w-auto">
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 dark:bg-[#0f172a] border-4 border-gray-200 dark:border-gray-700 flex items-center justify-center mb-3">
              <span className="text-xl font-black text-gray-900 dark:text-white">{funnel.completedBookings}</span>
            </div>
            <p className="font-bold text-gray-900 dark:text-white">Bookings Completed</p>
            <p className="text-xs text-gray-400 font-bold mt-1">{conversionRate}% Conversion Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
