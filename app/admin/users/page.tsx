'use client';

import { useState, useEffect } from 'react';
import { 
  Search, Filter, Download, MoreVertical, Eye, Edit, Trash2, 
  Mail, Ban, CheckCircle, XCircle, User, Star, IndianRupee,
  Clock, Calendar, MessageSquare, ShieldAlert, X
} from 'lucide-react';

export default function UsersPage() {
  const [activeUser, setActiveUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('./actions').then(({ getUsers }) => {
      getUsers().then(data => {
        setUsers(data);
        setLoading(false);
      });
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
      case 'Inactive': return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400';
      case 'Banned': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderUserModal = () => {
    if (!activeUser) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in">
        <div className="bg-white dark:bg-[#1e293b] rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 animate-slide-up">
          {/* Modal Header */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-start bg-gray-50 dark:bg-[#0f172a]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ea580c] to-[#c2410c] text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-orange-500/20">
                {activeUser.photo}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">{activeUser.name}</h2>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusColor(activeUser.status)}`}>{activeUser.status}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{activeUser.email} • {activeUser.phone}</p>
                <p className="text-xs text-gray-400 mt-1">Registered: {activeUser.joined}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:text-blue-500 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl transition-colors tooltip-trigger" title="Send Email"><Mail className="w-5 h-5" /></button>
              <button className="p-2 text-gray-500 hover:text-red-500 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl transition-colors tooltip-trigger" title={activeUser.status === 'Banned' ? 'Unban User' : 'Ban User'}><Ban className="w-5 h-5" /></button>
              <button onClick={() => setActiveUser(null)} className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 bg-gray-100 dark:bg-gray-800 rounded-xl transition-colors ml-2"><X className="w-5 h-5" /></button>
            </div>
          </div>
          
          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 custom-scrollbar bg-white dark:bg-[#1e293b]">
            
            {/* Left Col - Stats & Notes */}
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-[#0f172a] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-4">
                <h3 className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">Guest Analytics</h3>
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400"><Calendar className="w-4 h-4" /> Total Bookings</div>
                  <span className="font-black text-gray-900 dark:text-white">{activeUser.bookings}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400"><IndianRupee className="w-4 h-4" /> Total Spent</div>
                  <span className="font-black text-[#ea580c]">₹{activeUser.spent}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400"><Clock className="w-4 h-4" /> Avg. Stay</div>
                  <span className="font-bold text-gray-900 dark:text-white">2.5 Nights</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400"><Star className="w-4 h-4" /> Preferred Room</div>
                  <span className="font-bold text-gray-900 dark:text-white">Deluxe</span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-[#0f172a] p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Internal Notes</h3>
                <textarea rows={4} placeholder="Add notes about guest preferences, behavior..." className="w-full p-3 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white">Guest prefers rooms on the upper floors with a view of the temple.</textarea>
                <button className="w-full mt-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-2 rounded-xl text-sm">Save Note</button>
              </div>
            </div>

            {/* Right Col - History & Activity */}
            <div className="md:col-span-2 space-y-6">
              <div className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-4 bg-gray-50 dark:bg-[#0f172a] border-b border-gray-100 dark:border-gray-800">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Recent Bookings</h3>
                </div>
                <div className="p-4 space-y-4 bg-white dark:bg-[#1e293b]">
                  {activeUser.bookings > 0 ? (
                    <>
                      <div className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-[#0f172a] rounded-xl transition-colors border border-gray-100 dark:border-gray-800">
                        <div>
                          <p className="font-bold text-[#ea580c]">BKG-1001</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white mt-0.5">Deluxe Temple View</p>
                          <p className="text-xs text-gray-500 mt-1">25 Oct - 28 Oct 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-gray-900 dark:text-white">₹13,500</p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">Completed</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-[#0f172a] rounded-xl transition-colors border border-gray-100 dark:border-gray-800">
                        <div>
                          <p className="font-bold text-[#ea580c]">BKG-0842</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Standard Room</p>
                          <p className="text-xs text-gray-500 mt-1">12 Aug - 14 Aug 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-gray-900 dark:text-white">₹5,000</p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">Completed</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">No bookings found for this user.</div>
                  )}
                </div>
              </div>

              <div className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-4 bg-gray-50 dark:bg-[#0f172a] border-b border-gray-100 dark:border-gray-800">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Recent Activity</h3>
                </div>
                <div className="p-4 space-y-4 bg-white dark:bg-[#1e293b]">
                  <div className="flex gap-4 relative">
                    <div className="w-px h-full bg-gray-200 dark:bg-gray-700 absolute left-4 top-4"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 flex items-center justify-center flex-shrink-0 relative z-10"><MessageSquare className="w-4 h-4" /></div>
                    <div className="pb-4">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Submitted a 5-star review</p>
                      <p className="text-xs text-gray-500 mt-1">"Beautiful experience, loved the temple view."</p>
                      <p className="text-xs text-gray-400 mt-1">28 Oct 2023, 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-4 relative">
                    <div className="w-px h-full bg-gray-200 dark:bg-gray-700 absolute left-4 top-4"></div>
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400 flex items-center justify-center flex-shrink-0 relative z-10"><CheckCircle className="w-4 h-4" /></div>
                    <div className="pb-4">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Checked out</p>
                      <p className="text-xs text-gray-400 mt-1">28 Oct 2023, 09:30 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-4 relative">
                    <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 flex items-center justify-center flex-shrink-0 relative z-10"><User className="w-4 h-4" /></div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Logged in</p>
                      <p className="text-xs text-gray-400 mt-1">IP: 192.168.1.45 • Safari (iOS)</p>
                      <p className="text-xs text-gray-400 mt-1">25 Oct 2023, 11:15 AM</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Registered Users</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage user accounts and view guest profiles.</p>
        </div>
        <button className="flex items-center gap-2 bg-white dark:bg-[#1e293b] text-gray-700 dark:text-white px-5 py-2.5 rounded-xl font-bold border border-gray-200 dark:border-gray-700 shadow-sm hover:text-[#ea580c] transition-colors">
          <Download className="w-5 h-5" /> Export Users
        </button>
      </div>

      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 md:max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search by name, email, phone..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-[#ea580c] outline-none dark:text-white" />
          </div>
          <select className="bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 outline-none">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Banned</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Filter className="w-4 h-4" /> More Filters
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-[#0f172a] text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Guest</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Registered Date</th>
                <th className="px-6 py-4">Bookings</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-gray-500 dark:text-gray-400">Loading users...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                      <User className="w-12 h-12 mb-3 text-gray-300 dark:text-gray-600" />
                      <p className="font-medium">No registered users yet.</p>
                      <p className="text-sm mt-1">Users will appear here once they register or make a booking.</p>
                    </div>
                  </td>
                </tr>
              ) : users.map((user) => (
                <tr key={user.id} className="hover:bg-orange-50/30 dark:hover:bg-[#0f172a]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-[#ea580c] flex items-center justify-center font-bold text-sm">
                        {user.photo}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{user.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{user.joined}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-bold text-gray-700 dark:text-gray-300">{user.bookings}</span>
                  </td>
                  <td className="px-6 py-4 font-black text-[#ea580c]">
                    ₹{user.spent}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${getStatusColor(user.status)}`}>{user.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => setActiveUser(user)} className="p-2 text-gray-500 hover:text-[#ea580c] transition-colors"><Eye className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {renderUserModal()}
    </div>
  );
}
