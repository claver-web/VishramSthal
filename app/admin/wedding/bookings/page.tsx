'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, Filter, List, Calendar as CalendarIcon, MoreVertical, 
  ChevronDown, ArrowUpRight, ArrowDownRight, IndianRupee, MapPin
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function BookingsPage() {
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');
  const [search, setSearch] = useState('');
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/wedding/bookings')
      .then(res => res.json())
      .then(data => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load bookings');
        setLoading(false);
      });
  }, []);

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
      case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
      case 'Cancelled': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
      case 'Completed': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPayStatusStyle = (status: string) => {
    switch(status) {
      case 'Paid': return 'text-green-600 bg-green-50 dark:bg-green-500/10';
      case 'Partial': return 'text-blue-600 bg-blue-50 dark:bg-blue-500/10';
      case 'Pending': return 'text-amber-600 bg-amber-50 dark:bg-amber-500/10';
      case 'Refunded': return 'text-gray-600 bg-gray-50 dark:bg-gray-500/10';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <CalendarIcon className="w-6 h-6 text-rose-500" /> Wedding Bookings
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage all confirmed and pending event reservations</p>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-1 gap-4 w-full md:w-auto">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by ID, couple names, phone..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>
          <button className="px-4 py-2 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Filter className="w-4 h-4" /> Filters <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#0f172a] p-1 rounded-xl border border-gray-200 dark:border-gray-700">
          <button 
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white dark:bg-[#1e293b] shadow-sm text-rose-500' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode('calendar')}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === 'calendar' ? 'bg-white dark:bg-[#1e293b] shadow-sm text-rose-500' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <CalendarIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'table' ? (
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-[#0f172a] text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Booking ID & Date</th>
                  <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Couple</th>
                  <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Event Details</th>
                  <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Payment Status</th>
                  <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Status</th>
                  <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">Loading bookings...</td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">No bookings found.</td>
                  </tr>
                ) : bookings.map((booking) => {
                  const couple = `${booking.brideName || 'Client'} & ${booking.groomName || 'Client'}`;
                  const balance = (booking.totalAmount || 0) - (booking.advancePaid || 0);
                  const payStatus = balance <= 0 ? 'Paid' : (booking.advancePaid > 0 ? 'Partial' : 'Pending');
                  const status = booking.status.charAt(0).toUpperCase() + booking.status.slice(1).toLowerCase();
                  
                  return (
                    <tr key={booking.id} className="hover:bg-gray-50/50 dark:hover:bg-[#0f172a]/50 transition-colors group">
                      <td className="px-4 py-4">
                        <Link href={`/admin/wedding/bookings/${booking.id}`} className="font-bold text-rose-600 dark:text-rose-400 text-sm hover:underline">{booking.id}</Link>
                        <p className="text-[10px] text-gray-500">Booked: {new Date(booking.createdAt).toLocaleDateString()}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{couple}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">{new Date(booking.eventDate).toLocaleDateString()} <span className="text-xs font-normal text-gray-500">({booking.guestCount} Guests)</span></p>
                        <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3"/> {booking.venue?.name || 'Venue'} - Wedding</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">₹{(booking.totalAmount || 0).toLocaleString()}</p>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${getPayStatusStyle(payStatus)}`}>
                            {payStatus}
                          </span>
                          {balance > 0 && <span className="text-[10px] text-red-500 font-bold">Due: ₹{balance.toLocaleString()}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusStyle(status)}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Link href={`/admin/wedding/bookings/${booking.id}`} className="px-3 py-1.5 bg-gray-100 dark:bg-[#0f172a] hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-bold transition-colors">Manage</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-sm text-gray-500">
            <p>Showing {bookings.length > 0 ? 1 : 0} to {bookings.length} of {bookings.length} entries</p>
            <div className="flex gap-1">
              <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#0f172a] disabled:opacity-50" disabled>Prev</button>
              <button className="px-3 py-1 rounded-lg bg-rose-500 text-white font-medium">1</button>
              <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#0f172a] disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 h-[600px] flex flex-col items-center justify-center text-center">
          <CalendarIcon className="w-16 h-16 text-gray-200 dark:text-gray-700 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Calendar View Mockup</h3>
          <p className="text-sm text-gray-500 max-w-md">This view would integrate a full monthly calendar (like FullCalendar) allowing drag-and-drop rescheduling of bookings across different venues.</p>
        </div>
      )}
    </div>
  );
}
