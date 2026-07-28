'use client';

import { useState, useEffect } from 'react';
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
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, Line, 
  BarChart, Bar, 
  PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// --- MOCK DATA FOR CHARTS & TABLES ---
const revenueData = [
  { name: '1', revenue: 0 }, { name: '5', revenue: 0 }, { name: '10', revenue: 0 },
  { name: '15', revenue: 0 }, { name: '20', revenue: 0 }, { name: '25', revenue: 0 },
  { name: '30', revenue: 0 },
];

const bookingTrendData = [
  { name: 'Mon', bookings: 0 }, { name: 'Tue', bookings: 0 }, { name: 'Wed', bookings: 0 },
  { name: 'Thu', bookings: 0 }, { name: 'Fri', bookings: 0 }, { name: 'Sat', bookings: 0 },
  { name: 'Sun', bookings: 0 },
];

const occupancyData = [
  { name: 'Occupied', value: 0 },
  { name: 'Available', value: 0 },
  { name: 'Maintenance', value: 0 },
];

const roomTypeData = [
  { name: 'Standard', value: 0 },
  { name: 'Deluxe', value: 0 },
  { name: 'Suite', value: 0 },
  { name: 'Premium', value: 0 },
];

const paymentMethodData = [
  { name: 'UPI', value: 0 },
  { name: 'Card', value: 0 },
  { name: 'Net Banking', value: 0 },
  { name: 'Wallet', value: 0 },
];

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
    { title: 'Total Rooms', value: data?.stats?.totalRooms || '0', subtitle: 'Registered in DB', icon: Building2, change: '0%', isUp: true },
    { title: "Active Bookings", value: data?.stats?.activeBookings || '0', subtitle: 'Confirmed reservations', icon: Activity, change: '0%', isUp: true },
    { title: "Pending Bookings", value: data?.stats?.pendingBookings || '0', subtitle: 'Awaiting confirmation', icon: CalendarClock, change: '0%', isUp: false },
    { title: 'Pending Reviews', value: data?.stats?.pendingReviews || '0', subtitle: 'Awaiting moderation', icon: MessageSquare, change: '0%', isUp: true },
    { title: 'Revenue Today', value: `₹${data?.stats?.revenueToday || '0'}`, subtitle: 'Across all bookings', icon: IndianRupee, change: '0%', isUp: true },
    { title: 'Total Revenue', value: `₹${data?.stats?.totalRevenue || '0'}`, subtitle: 'This month', icon: TrendingUp, change: '0%', isUp: true },
    { title: 'New Users', value: data?.stats?.newUsers || '0', subtitle: 'Registered this month', icon: Users, change: '0%', isUp: true },
    { title: 'Average Rating', value: `${data?.stats?.avgRating || '0.0'}/5`, subtitle: `Based on ${data?.stats?.totalReviews || '0'} reviews`, icon: Star, change: '0', isUp: true },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-orange-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-orange-50/50 to-transparent dark:from-orange-900/10">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] to-[#f97316]">Jai Shri Krishna,</span> Admin
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm font-medium">{date}</p>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto mt-4 md:mt-0">
          <select className="flex-1 sm:flex-none bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 outline-none focus:border-orange-500">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Custom Range</option>
          </select>
          <button className="flex-1 sm:flex-none whitespace-nowrap bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all">
            Download Report
          </button>
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

      {/* Charts - Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Revenue Trend (Last 30 Days)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#ea580c' }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#ea580c" strokeWidth={4} dot={{ fill: '#ea580c', strokeWidth: 2, r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Booking Trend</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingTrendData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(234, 88, 12, 0.05)'}}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="bookings" fill="#f97316" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts - Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Room Occupancy</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={occupancyData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {occupancyData.map((entry, index) => (
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
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Room Type Dist.</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={roomTypeData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {roomTypeData.map((entry, index) => (
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
                <Pie data={paymentMethodData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {paymentMethodData.map((entry, index) => (
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
        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 min-w-0">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h3>
            <a href="#" className="text-sm font-bold text-[#ea580c] hover:underline">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-[#0f172a] text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider rounded-l-xl">Activity</th>
                  <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider">Time</th>
                  <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">Loading...</td>
                  </tr>
                ) : data?.recentActivity?.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">No recent activity</td>
                  </tr>
                ) : (
                  data?.recentActivity?.map((act: any) => (
                    <tr key={act.id} className="hover:bg-gray-50 dark:hover:bg-[#0f172a]/50 transition-colors">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">{act.activity}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{act.user}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{act.time}</td>
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

        {/* Right Column: Upcoming & Tasks */}
        <div className="space-y-6">
          {/* Upcoming Check-ins */}
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
                    <button className="w-full py-2 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all">
                      View Booking
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
              <AlertCircle className="w-5 h-5 text-[#ea580c]" />
              Pending Actions
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#0f172a] cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-[#ea580c]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Booking Approvals</span>
                </div>
                <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">{data?.stats?.pendingBookings || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#0f172a] cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-[#ea580c]">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Pending Reviews</span>
                </div>
                <span className="w-6 h-6 rounded-full bg-[#ea580c] text-white text-xs font-bold flex items-center justify-center">{data?.stats?.pendingReviews || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#0f172a] cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-[#ea580c]">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Refund Requests</span>
                </div>
                <span className="w-6 h-6 rounded-full bg-[#ea580c] text-white text-xs font-bold flex items-center justify-center">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
