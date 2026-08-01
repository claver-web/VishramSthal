'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  CalendarCheck, 
  CalendarClock, 
  IndianRupee, 
  TrendingUp, 
  Star,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  MessageSquare,
  AlertCircle,
  Eye,
  Globe,
  Bell
} from 'lucide-react';
import { 
  LineChart, Line, 
  BarChart, Bar, 
  PieChart, Pie, Cell, 
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const COLORS = ['#ea580c', '#f97316', '#fdba74', '#fed7aa'];
const OCCUPANCY_COLORS = ['#ea580c', '#22c55e', '#ef4444'];

export default function AdminDashboard() {
  const [date, setDate] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const today = new Date();
    setDate(today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    
    import('./actions').then(({ getDashboardData }) => {
      getDashboardData().then(res => {
        setData(res);
        setLoading(false);
      });
    });
  }, []);

  const stats = [
    { title: "Visitors Today", value: data?.stats?.dailyVisitorsToday || '0', subtitle: 'Unique users visit per day', icon: Eye, change: '+12%', isUp: true },
    { title: 'Page Views Today', value: data?.stats?.dailyPageViewsToday || '0', subtitle: 'Total traffic today', icon: Globe, change: '+18%', isUp: true },
    { title: "Active Bookings", value: data?.stats?.activeBookings || '0', subtitle: 'Confirmed reservations', icon: Activity, change: '0%', isUp: true },
    { title: "Pending Bookings", value: data?.stats?.pendingBookings || '0', subtitle: 'Awaiting confirmation', icon: CalendarClock, change: '0%', isUp: false },
    { title: 'Revenue Today', value: `₹${data?.stats?.revenueToday || '0'}`, subtitle: 'Across all bookings', icon: IndianRupee, change: '0%', isUp: true },
    { title: 'Total Revenue', value: `₹${data?.stats?.totalRevenue || '0'}`, subtitle: 'This month', icon: TrendingUp, change: '0%', isUp: true },
    { title: 'Total Rooms', value: data?.stats?.totalRooms || '0', subtitle: 'Registered in DB', icon: Building2, change: '0%', isUp: true },
    { title: 'Average Rating', value: `${data?.stats?.avgRating || '0.0'}/5`, subtitle: `Based on ${data?.stats?.totalReviews || '0'} reviews`, icon: Star, change: '0', isUp: true },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-orange-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-orange-50/50 to-transparent dark:from-orange-900/10">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] to-[#f97316]">Vishram Sthal</span> Admin Portal
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm font-medium">{date}</p>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto mt-4 md:mt-0">
          <Link href="/admin/analytics" className="flex-1 sm:flex-none whitespace-nowrap bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:border-[#ea580c] hover:text-[#ea580c] transition-all flex items-center justify-center gap-2">
            <Eye className="w-4 h-4 text-[#ea580c]" /> Visitor Analytics
          </Link>
          <Link href="/admin/bookings" className="flex-1 sm:flex-none whitespace-nowrap bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
            <CalendarCheck className="w-4 h-4" /> Manage Bookings
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-[#1e293b] p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            
            <div className="flex justify-between items-start mb-3 relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-[#ea580c]">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.isUp ? 'text-green-600 bg-green-50 dark:bg-green-500/10' : 'text-red-600 bg-red-50 dark:bg-red-500/10'}`}>
                {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            
            <div className="relative z-10">
              <p className="text-gray-500 dark:text-gray-400 font-medium text-xs truncate">{stat.title}</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1 mb-1 truncate">{stat.value}</h3>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium truncate">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts - Daily Visitor Traffic & Booking Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Daily Visitor Traffic Chart */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 min-w-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#ea580c]" /> Daily Visitors (User Visits Per Day)
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Unique visitor sessions tracked over last 7 days</p>
            </div>
            <Link href="/admin/analytics" className="text-xs font-bold text-[#ea580c] hover:underline">
              Full Analytics →
            </Link>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.charts?.dailyVisitorsData || []}>
                <defs>
                  <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="visitors" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#visitorGradient)" name="Unique Visitors" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Trend */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-orange-500" /> Room Booking Trend
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Reservations created per day over last 7 days</p>
            </div>
            <Link href="/admin/bookings" className="text-xs font-bold text-[#ea580c] hover:underline">
              All Bookings →
            </Link>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.charts?.bookingTrendData || []}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(234, 88, 12, 0.05)'}}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="bookings" fill="#f97316" radius={[8, 8, 0, 0]} barSize={32} name="Bookings Created" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Room Occupancy</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data?.charts?.occupancyData || []} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {(data?.charts?.occupancyData || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={OCCUPANCY_COLORS[index % OCCUPANCY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Room Types</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data?.charts?.roomTypeData || []} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {(data?.charts?.roomTypeData || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Payment Methods</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data?.charts?.paymentMethodData || []} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {(data?.charts?.paymentMethodData || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Room Booking Activity */}
        <div className="xl:col-span-2 bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 min-w-0">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#ea580c]" /> Live Booking Notifications & Activity
            </h3>
            <Link href="/admin/bookings" className="text-sm font-bold text-[#ea580c] hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-[#0f172a] text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider rounded-l-xl">Activity</th>
                  <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Guest</th>
                  <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Time</th>
                  <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">Loading activity...</td>
                  </tr>
                ) : data?.recentActivity?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No recent room bookings</td>
                  </tr>
                ) : (
                  data?.recentActivity?.map((act: any) => (
                    <tr key={act.id} className="hover:bg-gray-50 dark:hover:bg-[#0f172a]/50 transition-colors">
                      <td className="px-4 py-4 text-sm font-bold text-gray-900 dark:text-gray-200">{act.activity}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300 font-medium">{act.user}</td>
                      <td className="px-4 py-4 text-sm font-bold text-[#ea580c]">₹{act.amount}</td>
                      <td className="px-4 py-4 text-xs text-gray-500 dark:text-gray-400">{act.time}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          act.status === 'Success' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                          act.status === 'Warning' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400' :
                          'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                        }`}>
                          {act.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Upcoming Check-ins & Actions */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-[#ea580c]" />
                Upcoming Check-ins
              </h3>
            </div>
            <div className="space-y-4">
              {loading ? (
                <div className="text-center text-gray-500 py-4">Loading...</div>
              ) : data?.upcomingCheckIns?.length === 0 ? (
                <div className="text-center text-gray-500 py-4">No upcoming check-ins today</div>
              ) : (
                data?.upcomingCheckIns?.map((booking: any) => (
                  <div key={booking.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0f172a] border border-gray-100 dark:border-gray-800 flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white truncate">{booking.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">ID: {booking.id} • Room: {booking.room}</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 rounded-full whitespace-nowrap self-start">
                        {booking.time}
                      </span>
                    </div>
                    <Link href="/admin/bookings" className="w-full py-2 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-center">
                      View Booking
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
