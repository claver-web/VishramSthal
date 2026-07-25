'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.status === 401) {
          localStorage.removeItem('adminToken');
          router.push('/admin/login');
          return;
        }
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        toast.error('Failed to load dashboard data');
      }
      setLoading(false);
    };
    fetchData();
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-2xl dark:text-white">Loading Dashboard...</div>;
  if (!data) return <div className="min-h-screen flex items-center justify-center font-bold text-xl text-red-500">Error loading data.</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-transform">
                <p className="text-gray-500 dark:text-gray-400 font-medium">Total Users</p>
                <p className="text-4xl font-extrabold dark:text-white mt-2">{data.stats.totalUsers}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-transform">
                <p className="text-gray-500 dark:text-gray-400 font-medium">Total Bookings</p>
                <p className="text-4xl font-extrabold dark:text-white mt-2">{data.stats.totalBookings}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-transform">
                <p className="text-gray-500 dark:text-gray-400 font-medium">Revenue</p>
                <p className="text-4xl font-black text-orange-500 mt-2">₹{data.stats.totalRevenue}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-transform">
                <p className="text-gray-500 dark:text-gray-400 font-medium">Occupancy Rate</p>
                <p className="text-4xl font-extrabold dark:text-white mt-2">{data.stats.occupancyRate}%</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 h-[450px]">
                <h3 className="font-bold text-xl mb-6 dark:text-white">Bookings by Room Type</h3>
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart data={data.charts.bookingsByType}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px'}} />
                    <Bar dataKey="value" fill="#f97316" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 h-[450px]">
                <h3 className="font-bold text-xl mb-6 dark:text-white">Booking Status Distribution</h3>
                <ResponsiveContainer width="100%" height="90%">
                  <PieChart>
                    <Pie data={data.charts.statusDist} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value" label>
                      {data.charts.statusDist.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={['#facc15', '#4ade80', '#f87171', '#60a5fa'][index % 4]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '12px'}} />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      case 'Users':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <input type="text" placeholder="Search users by name or email..." className="w-full md:w-1/2 p-3 border-2 border-gray-200 rounded-xl dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:border-orange-500 outline-none transition-colors font-medium" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-gray-50 dark:bg-gray-900/50 dark:text-gray-300 text-gray-500">
                  <tr>
                    <th className="p-5 font-bold uppercase text-xs tracking-wider">Name</th>
                    <th className="p-5 font-bold uppercase text-xs tracking-wider">Email</th>
                    <th className="p-5 font-bold uppercase text-xs tracking-wider">Join Date</th>
                    <th className="p-5 font-bold uppercase text-xs tracking-wider">Bookings</th>
                    <th className="p-5 font-bold uppercase text-xs tracking-wider">Total Spent</th>
                  </tr>
                </thead>
                <tbody className="dark:text-gray-300">
                  {data.users.map((user: any) => (
                    <tr key={user.id} className="border-t border-gray-100 dark:border-gray-700 hover:bg-orange-50/50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="p-5 font-medium">{user.name || 'Anonymous Guest'}</td>
                      <td className="p-5 text-gray-500 dark:text-gray-400">{user.email}</td>
                      <td className="p-5">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="p-5 font-bold">
                        <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">{user._count.bookings}</span>
                      </td>
                      <td className="p-5 font-black text-orange-500">₹{user.totalSpent || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Bookings':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex gap-4">
               <select className="p-3 border-2 border-gray-200 rounded-xl dark:bg-gray-900 dark:border-gray-700 dark:text-white font-medium outline-none focus:border-orange-500">
                 <option>All Statuses</option>
                 <option>PENDING</option>
                 <option>CONFIRMED</option>
                 <option>COMPLETED</option>
                 <option>CANCELLED</option>
               </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-gray-50 dark:bg-gray-900/50 dark:text-gray-300 text-gray-500">
                  <tr>
                    <th className="p-5 font-bold uppercase text-xs tracking-wider">Guest</th>
                    <th className="p-5 font-bold uppercase text-xs tracking-wider">Room</th>
                    <th className="p-5 font-bold uppercase text-xs tracking-wider">Dates</th>
                    <th className="p-5 font-bold uppercase text-xs tracking-wider">Amount</th>
                    <th className="p-5 font-bold uppercase text-xs tracking-wider">Status</th>
                    <th className="p-5 font-bold uppercase text-xs tracking-wider">Payment ID</th>
                  </tr>
                </thead>
                <tbody className="dark:text-gray-300">
                  {data.bookings.map((b: any) => (
                    <tr key={b.id} className="border-t border-gray-100 dark:border-gray-700 hover:bg-orange-50/50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="p-5 font-medium">{b.user?.name || b.user?.email || 'Unknown'}</td>
                      <td className="p-5 font-bold text-orange-500">{b.room?.type} ({b.room?.number})</td>
                      <td className="p-5 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(b.checkIn).toLocaleDateString()} - <br/>
                        {new Date(b.checkOut).toLocaleDateString()}
                      </td>
                      <td className="p-5 font-black">₹{b.totalPrice}</td>
                      <td className="p-5">
                        <select 
                          className="bg-gray-50 border-2 border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-lg p-2 text-sm font-bold outline-none focus:border-orange-500"
                          defaultValue={b.status}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td className="p-5 text-xs font-mono text-gray-400">{b.razorpayPaymentId || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Rooms':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-2xl dark:text-white">Manage Rooms</h3>
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-md transform hover:scale-105 transition-all">
                + Add New Room
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.rooms.map((room: any) => (
                <div key={room.id} className="border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-6 bg-gray-50 dark:bg-gray-900 hover:border-orange-200 dark:hover:border-orange-900 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-extrabold text-xl dark:text-white">{room.type} - {room.number}</h4>
                    <span className={`px-3 py-1.5 text-xs font-bold rounded-full shadow-sm ${room.isAvailable ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                      {room.isAvailable ? 'Available' : 'Booked'}
                    </span>
                  </div>
                  <p className="text-orange-500 font-black text-2xl mb-4">₹{room.price}<span className="text-sm font-medium text-gray-400">/night</span></p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed">{room.description}</p>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 text-gray-700 dark:text-white py-2.5 rounded-xl font-bold transition-colors">Edit</button>
                    <button className="flex-1 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 py-2.5 rounded-xl font-bold transition-colors">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Analytics':
        return (
          <div className="bg-white dark:bg-gray-800 p-16 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 text-center animate-fade-in">
            <h3 className="text-3xl font-extrabold dark:text-white mb-6">Advanced Analytics</h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">This section will contain historical date-range pickers, occupancy heatmaps, and detailed financial reports in the upcoming version.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors">
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-full md:w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 shadow-sm z-10">
          <div className="p-8 pb-4">
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Admin Panel</h2>
            <p className="text-sm text-gray-500 mt-1 font-medium">Vishram Sthal Management</p>
          </div>
          <nav className="flex flex-col gap-3 px-6 py-6">
            {['Overview', 'Users', 'Bookings', 'Rooms', 'Analytics'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-5 py-3.5 rounded-2xl font-bold transition-all ${activeTab === tab ? 'bg-orange-500 text-white shadow-md transform scale-105' : 'text-gray-600 dark:text-gray-400 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-gray-800'}`}
              >
                {tab}
              </button>
            ))}
            <div className="mt-auto pt-10 border-t border-gray-100 dark:border-gray-800 mx-6">
              <button 
                onClick={() => {
                  localStorage.removeItem('adminToken');
                  router.push('/admin/login');
                }}
                className="w-full text-center px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
              >
                Sign Out
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 md:p-12 overflow-x-hidden">
          <div className="mb-10 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{activeTab}</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Manage and view your {activeTab.toLowerCase()}</p>
            </div>
          </div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
