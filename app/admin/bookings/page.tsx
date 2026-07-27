'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, Filter, Download, Printer, MoreVertical, Eye, 
  Edit, Trash2, Mail, FileText, CheckCircle, XCircle, 
  Clock, Calendar as CalendarIcon, ChevronLeft, ChevronRight,
  ArrowUpDown, X, User, MapPin, IndianRupee, Hash
} from 'lucide-react';

const mockBookings: any[] = [];

export default function BookingsPage() {
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [activeBooking, setActiveBooking] = useState<any>(null);

  const toggleSelectAll = () => {
    if (selectedBookings.length === mockBookings.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(mockBookings.map(b => b.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedBookings.includes(id)) {
      setSelectedBookings(selectedBookings.filter(b => b !== id));
    } else {
      setSelectedBookings([...selectedBookings, id]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400';
      case 'Completed': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
      case 'Cancelled': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
      case 'No-show': return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'text-green-600 font-bold';
      case 'Pending': return 'text-yellow-600 font-bold';
      case 'Refunded': return 'text-gray-500 font-bold';
      default: return 'text-gray-500';
    }
  };

  // --- Render Detailed Slide-over Panel ---
  const renderDetailsPanel = () => {
    if (!activeBooking) return null;
    return (
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-fade-in">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50" onClick={() => setActiveBooking(null)}></div>
        
        {/* Panel */}
        <div className="relative w-full max-w-2xl bg-white dark:bg-[#0f172a] h-full shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0 border-l border-gray-100 dark:border-gray-800">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#1e293b] flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                  <Hash className="w-5 h-5 text-[#ea580c]" /> {activeBooking.id}
                </h2>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(activeBooking.status)}`}>
                  {activeBooking.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Created: {activeBooking.date} • Last updated: Just now</p>
            </div>
            <button onClick={() => setActiveBooking(null)} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            {/* Guest Info */}
            <section className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-sm font-bold text-[#ea580c] uppercase tracking-wider mb-4 flex items-center gap-2">
                <User className="w-4 h-4" /> Guest Information
              </h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Full Name</p>
                  <p className="font-bold text-gray-900 dark:text-white">{activeBooking.guest}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Contact</p>
                  <p className="font-bold text-gray-900 dark:text-white">{activeBooking.phone}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{activeBooking.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Loyalty Status</p>
                  <p className="font-bold text-gray-900 dark:text-white">{activeBooking.loyalty} previous stays</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Special Requests</p>
                  <p className="font-medium text-red-500 text-sm bg-red-50 dark:bg-red-500/10 p-2 rounded-lg mt-1">{activeBooking.requests}</p>
                </div>
              </div>
            </section>

            {/* Stay Details */}
            <section className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-sm font-bold text-[#ea580c] uppercase tracking-wider mb-4 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" /> Stay Details
              </h3>
              <div className="flex gap-4 items-start mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                <div className="w-24 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1590490359683-658d3d23f972" alt="Room" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-black text-lg text-gray-900 dark:text-white">{activeBooking.room}</p>
                  <p className="text-sm font-bold text-gray-500 dark:text-gray-400">{activeBooking.type} • Room {activeBooking.number}</p>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">{activeBooking.guests} Guests</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">Check-in</p>
                  <p className="font-bold text-gray-900 dark:text-white">{activeBooking.checkIn}</p>
                  <p className="text-xs text-gray-400 mt-0.5">12:00 PM</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="h-px w-full bg-gray-300 dark:bg-gray-700 relative">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#1e293b] px-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                      {activeBooking.nights} Nights
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">Check-out</p>
                  <p className="font-bold text-gray-900 dark:text-white">{activeBooking.checkOut}</p>
                  <p className="text-xs text-gray-400 mt-0.5">11:00 AM</p>
                </div>
              </div>
            </section>

            {/* Payment Details */}
            <section className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-sm font-bold text-[#ea580c] uppercase tracking-wider mb-4 flex items-center gap-2">
                <IndianRupee className="w-4 h-4" /> Payment Details
              </h3>
              <div className="bg-gray-50 dark:bg-[#0f172a] p-4 rounded-xl border border-gray-100 dark:border-gray-800 space-y-3 mb-4">
                <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400">
                  <span>Room Charges ({activeBooking.nights} nights)</span>
                  <span>₹{activeBooking.amount - 1500}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400">
                  <span>Taxes & Fees (12% GST)</span>
                  <span>₹1500</span>
                </div>
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
                <div className="flex justify-between font-black text-lg text-gray-900 dark:text-white">
                  <span>Total Amount</span>
                  <span className="text-[#ea580c]">₹{activeBooking.amount}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Payment Status: <span className={getPaymentStatusColor(activeBooking.paymentStatus)}>{activeBooking.paymentStatus}</span></p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Transaction ID: <span className="font-mono text-gray-900 dark:text-white">{activeBooking.razorpayId}</span></p>
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-[#ea580c] hover:bg-orange-50 dark:hover:bg-orange-900/20 px-4 py-2 rounded-lg transition-colors border border-orange-200 dark:border-orange-900/50">
                  <FileText className="w-4 h-4" /> Invoice
                </button>
              </div>
            </section>
          </div>

          {/* Action Footer */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#1e293b] flex justify-between gap-4">
            {activeBooking.status === 'Pending' && (
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-green-500/20">
                Confirm Booking
              </button>
            )}
            {activeBooking.status === 'Confirmed' && (
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/20">
                Mark Check-in
              </button>
            )}
            <button className="px-6 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-3 rounded-xl transition-colors">
              Edit Details
            </button>
            <button className="px-6 bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 font-bold py-3 rounded-xl transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">All Bookings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track reservations seamlessly.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/bookings/calendar" className="bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-5 py-2.5 rounded-xl font-bold shadow-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Calendar View
          </Link>
          <button className="bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all">
            + New Booking
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search ID, Name, Email, Phone..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-[#ea580c] outline-none transition-colors dark:text-white font-medium"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
            <select className="bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 outline-none">
              <option>Any Status</option>
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
            <select className="bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 outline-none">
              <option>Payment Status</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Refunded</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Filter className="w-4 h-4" /> More Filters
            </button>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedBookings.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-900/30 rounded-xl animate-fade-in">
            <span className="text-sm font-bold text-[#ea580c]">{selectedBookings.length} bookings selected</span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm font-bold bg-white dark:bg-[#0f172a] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#ea580c] transition-colors flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Mark Confirmed
              </button>
              <button className="px-3 py-1.5 text-sm font-bold bg-white dark:bg-[#0f172a] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#ea580c] transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" /> Send Email
              </button>
              <button className="px-3 py-1.5 text-sm font-bold bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg transition-colors flex items-center gap-2">
                <XCircle className="w-4 h-4" /> Cancel Selected
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Data Table */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-[#0f172a]/50">
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-bold bg-gray-200 dark:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200">All</button>
            <button className="px-3 py-1 text-xs font-bold bg-transparent rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">Today's Check-ins</button>
            <button className="px-3 py-1 text-xs font-bold bg-transparent rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">Check-outs</button>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-500 hover:text-[#ea580c] transition-colors tooltip-trigger" title="Export CSV"><Download className="w-4 h-4" /></button>
            <button className="p-2 text-gray-500 hover:text-[#ea580c] transition-colors tooltip-trigger" title="Print"><Printer className="w-4 h-4" /></button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-[#0f172a] text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 w-12">
                  <input type="checkbox" checked={selectedBookings.length === mockBookings.length} onChange={toggleSelectAll} className="rounded border-gray-300 text-[#ea580c] focus:ring-[#ea580c]" />
                </th>
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Guest</th>
                <th className="px-6 py-4">Room & Dates</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {mockBookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                      <CalendarIcon className="w-12 h-12 mb-3 text-gray-300 dark:text-gray-600" />
                      <p className="font-medium">No bookings found.</p>
                      <p className="text-sm mt-1">New reservations will appear here.</p>
                    </div>
                  </td>
                </tr>
              )}
              {mockBookings.map((b) => (
                <tr key={b.id} className={`hover:bg-orange-50/30 dark:hover:bg-[#0f172a]/50 transition-colors ${selectedBookings.includes(b.id) ? 'bg-orange-50/50 dark:bg-orange-500/5' : ''}`}>
                  <td className="px-6 py-4">
                    <input type="checkbox" checked={selectedBookings.includes(b.id)} onChange={() => toggleSelect(b.id)} className="rounded border-gray-300 text-[#ea580c] focus:ring-[#ea580c]" />
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => setActiveBooking(b)} className="font-mono font-bold text-[#ea580c] hover:underline">{b.id}</button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{b.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 dark:text-white">{b.guest}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{b.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-700 dark:text-gray-300">{b.room}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {b.checkIn} to {b.checkOut} ({b.nights}N)
                    </p>
                  </td>
                  <td className="px-6 py-4 font-black text-gray-900 dark:text-white">
                    ₹{b.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${getPaymentStatusColor(b.paymentStatus)}`}>{b.paymentStatus}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getStatusColor(b.status)}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setActiveBooking(b)} className="p-2 text-gray-500 hover:text-[#ea580c] transition-colors tooltip-trigger" title="View Details"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors tooltip-trigger" title="Edit"><Edit className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition-colors tooltip-trigger" title="More Actions"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-[#0f172a]/50">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>Rows per page:</span>
            <select className="bg-transparent font-bold text-gray-700 dark:text-gray-300 outline-none">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">0 of 0</span>
            <div className="flex gap-1">
              <button className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 disabled:opacity-50" disabled><ChevronLeft className="w-5 h-5" /></button>
              <button className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1e293b]"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>

      {renderDetailsPanel()}
    </div>
  );
}
