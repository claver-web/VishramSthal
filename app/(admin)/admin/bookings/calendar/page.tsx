'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  List, Printer, RefreshCw, CheckCircle, XCircle, Clock,
  Search, Filter, User, Hash, IndianRupee, Eye, Loader2, X, AlertCircle
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Booking {
  id: string;
  guest: string;
  phone: string;
  email: string;
  roomId: string;
  room: string;
  number: string;
  type: string;
  checkIn: string;
  checkOut: string;
  rawCheckIn: string;
  rawCheckOut: string;
  nights: number;
  guests: number;
  amount: number;
  paymentStatus: string;
  razorpayId: string;
  status: string;
  rawStatus: string;
}

interface Room {
  id: string;
  name: string | null;
  number: string;
  price: number;
  type: string;
}

export default function BookingsCalendarPage() {
  // Current view window start date (default: 2 days before today)
  const [startDate, setStartDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 2);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const [daysCount, setDaysCount] = useState<number>(14); // 7, 14, 21, or 30 days
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Load Real Data from Database
  const fetchData = async () => {
    setLoading(true);
    try {
      const { getBookings, getRoomsList } = await import('../actions');
      const [bookingsData, roomsData] = await Promise.all([
        getBookings(),
        getRoomsList()
      ]);

      setBookings(bookingsData as Booking[]);
      
      // Fallback default rooms if DB is empty
      if (roomsData && roomsData.length > 0) {
        setRooms(roomsData as Room[]);
      } else {
        setRooms([
          { id: '101', name: 'Deluxe Temple View', number: '101', type: 'DELUXE', price: 3500 },
          { id: '102', name: 'Deluxe Temple View', number: '102', type: 'DELUXE', price: 3500 },
          { id: '105', name: 'Standard Comfort', number: '105', type: 'STANDARD', price: 2200 },
          { id: '106', name: 'Standard Comfort', number: '106', type: 'STANDARD', price: 2200 },
          { id: '201', name: 'Premium Heritage Suite', number: '201', type: 'SUITE', price: 5500 },
          { id: '205', name: 'Executive Family Suite', number: '205', type: 'PREMIUM', price: 4800 },
        ]);
      }
    } catch (err) {
      console.error("Failed to load calendar data:", err);
      toast.error("Failed to load room schedule data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Generate array of visible dates
  const visibleDays = useMemo(() => {
    const days: Date[] = [];
    for (let i = 0; i < daysCount; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      d.setHours(0, 0, 0, 0);
      days.push(d);
    }
    return days;
  }, [startDate, daysCount]);

  // Compute month title (e.g. "August 2026" or "Aug - Sep 2026")
  const monthTitle = useMemo(() => {
    if (visibleDays.length === 0) return '';
    const first = visibleDays[0];
    const last = visibleDays[visibleDays.length - 1];

    const firstMonth = first.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const lastMonth = last.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    if (firstMonth === lastMonth) {
      return firstMonth;
    }
    const m1 = first.toLocaleDateString('en-US', { month: 'short' });
    const m2 = last.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return `${m1} - ${m2}`;
  }, [visibleDays]);

  // Navigation handlers
  const handleToday = () => {
    const today = new Date();
    today.setDate(today.getDate() - 2);
    today.setHours(0, 0, 0, 0);
    setStartDate(today);
  };

  const handlePrev = () => {
    const d = new Date(startDate);
    d.setDate(d.getDate() - 7);
    setStartDate(d);
  };

  const handleNext = () => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + 7);
    setStartDate(d);
  };

  // Status Badge Colors
  const getStatusBadgeColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': 
        return 'bg-gradient-to-r from-blue-600 to-blue-500 text-white border-blue-700 shadow-blue-500/20';
      case 'pending': 
        return 'bg-gradient-to-r from-amber-500 to-amber-400 text-white border-amber-600 shadow-amber-500/20';
      case 'completed': 
        return 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white border-emerald-700 shadow-emerald-500/20';
      case 'cancelled': 
        return 'bg-gradient-to-r from-rose-500 to-rose-400 text-white border-rose-600 shadow-rose-500/20';
      default: 
        return 'bg-gray-500 text-white border-gray-600';
    }
  };

  // Helper to find booking for a room on a specific day
  const getBookingForCell = (roomId: string, roomNumber: string, day: Date) => {
    const dayTime = day.getTime();

    return bookings.find(b => {
      // Match by roomId or room number
      const matchesRoom = b.roomId === roomId || b.number === roomNumber || b.room.includes(roomNumber);
      if (!matchesRoom) return false;

      // Filter by status if selected
      if (statusFilter !== 'All' && b.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }

      // Check dates
      const start = new Date(b.rawCheckIn); start.setHours(0, 0, 0, 0);
      const end = new Date(b.rawCheckOut); end.setHours(0, 0, 0, 0);
      
      const startTime = start.getTime();
      const endTime = end.getTime();

      return dayTime >= startTime && dayTime < endTime;
    });
  };

  // Filtered rooms search
  const filteredRooms = useMemo(() => {
    return rooms.filter(r => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        r.number.toLowerCase().includes(term) ||
        (r.name && r.name.toLowerCase().includes(term)) ||
        r.type.toLowerCase().includes(term)
      );
    });
  }, [rooms, searchTerm]);

  // Handle Quick Status Update from Modal
  const handleQuickStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const { updateBookingStatus } = await import('../actions');
      const res = await updateBookingStatus(id, newStatus);
      if (res.success) {
        toast.success(`Booking status updated to ${newStatus}`);
        fetchData();
        if (activeBooking && activeBooking.id === id) {
          setActiveBooking({
            ...activeBooking,
            status: newStatus.charAt(0) + newStatus.slice(1).toLowerCase(),
            rawStatus: newStatus.toUpperCase()
          });
        }
      } else {
        toast.error(res.error || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating status");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Room Schedule & Calendar</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Live timeline view of real room reservations and availability.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/bookings" className="p-2.5 bg-gray-100 dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors flex items-center gap-2 font-bold text-sm">
            <List className="w-4 h-4" />
            List View
          </Link>
          <button 
            onClick={fetchData} 
            className="flex items-center gap-2 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white px-4 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 transition-all text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Sync Schedule
          </button>
        </div>
      </div>

      {/* Main Calendar Card */}
      <div className="bg-white dark:bg-[#1e293b] rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-wrap justify-between items-center gap-4 bg-gray-50/80 dark:bg-[#0f172a]">
          
          {/* Date Range Navigation */}
          <div className="flex items-center gap-3">
            <button 
              onClick={handleToday}
              className="px-4 py-2 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-900 dark:text-white shadow-sm hover:border-[#ea580c] hover:text-[#ea580c] transition-all"
            >
              Today
            </button>
            <div className="flex items-center bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl p-1 shadow-sm">
              <button 
                onClick={handlePrev}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-600 dark:text-gray-300"
                title="Previous Week"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-black px-4 text-gray-900 dark:text-white font-mono">
                {monthTitle}
              </span>
              <button 
                onClick={handleNext}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-600 dark:text-gray-300"
                title="Next Week"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Room..."
                className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium focus:border-[#ea580c] outline-none dark:text-white"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            {/* Days Range Toggle */}
            <div className="flex bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl p-1 text-xs font-bold">
              {[7, 14, 21].map((count) => (
                <button
                  key={count}
                  onClick={() => setDaysCount(count)}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${daysCount === count ? 'bg-[#ea580c] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                >
                  {count}D
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-bold text-gray-600 dark:text-gray-300 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 px-4 py-1.5 rounded-xl">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Confirmed</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Pending</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Completed</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Cancelled</span>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="overflow-x-auto custom-scrollbar">
          <div className="min-w-[1100px]">
            {/* Days Header */}
            <div className="flex border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0f172a]/50">
              <div className="w-56 flex-shrink-0 p-4 font-black text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r border-gray-100 dark:border-gray-800 flex items-center justify-between sticky left-0 bg-white dark:bg-[#1e293b] z-20">
                <span>Rooms ({filteredRooms.length})</span>
                <span className="text-[10px] font-normal text-gray-400">Type</span>
              </div>

              <div className="flex-1 flex">
                {visibleDays.map((day, i) => {
                  const todayStr = new Date().toDateString();
                  const isToday = day.toDateString() === todayStr;
                  const isWeekend = day.getDay() === 0 || day.getDay() === 6;

                  return (
                    <div 
                      key={i} 
                      className={`flex-1 min-w-[75px] p-2 text-center border-r border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center transition-colors
                        ${isToday ? 'bg-orange-50/80 dark:bg-orange-500/10' : isWeekend ? 'bg-gray-50/50 dark:bg-gray-800/20' : ''}`}
                    >
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isToday ? 'text-[#ea580c]' : 'text-gray-400 dark:text-gray-500'}`}>
                        {day.toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                      <span className={`text-base font-black mt-0.5 ${
                        isToday 
                          ? 'bg-[#ea580c] text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md shadow-orange-500/30' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {day.getDate()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Room Rows */}
            {loading ? (
              <div className="py-20 text-center text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-[#ea580c]" /> Loading schedule...
              </div>
            ) : filteredRooms.length === 0 ? (
              <div className="py-16 text-center text-gray-500 dark:text-gray-400">
                No rooms match your filter.
              </div>
            ) : (
              filteredRooms.map((room) => (
                <div key={room.id} className="flex border-b border-gray-100 dark:border-gray-800 group hover:bg-gray-50/60 dark:hover:bg-[#0f172a]/30 transition-colors">
                  
                  {/* Sticky Room Info Column */}
                  <div className="w-56 flex-shrink-0 p-3.5 border-r border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-[#1e293b] group-hover:bg-gray-50 dark:group-hover:bg-[#0f172a]/50 transition-colors sticky left-0 z-20 shadow-sm">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-gray-900 dark:text-white text-sm">Room {room.number}</span>
                        {room.name && <span className="text-xs text-gray-500 truncate max-w-[90px]">({room.name})</span>}
                      </div>
                      <p className="text-[11px] font-bold text-gray-400 mt-0.5 uppercase tracking-wider">{room.type}</p>
                    </div>
                    <span className="text-xs font-black text-[#ea580c] font-mono">₹{room.price}</span>
                  </div>

                  {/* Date Grid Cells */}
                  <div className="flex-1 flex relative">
                    {visibleDays.map((day, i) => {
                      const booking = getBookingForCell(room.id, room.number, day);
                      const isToday = day.toDateString() === new Date().toDateString();
                      const isWeekend = day.getDay() === 0 || day.getDay() === 6;

                      const startMs = booking ? new Date(booking.rawCheckIn).setHours(0, 0, 0, 0) : 0;
                      const endMs = booking ? new Date(booking.rawCheckOut).setHours(0, 0, 0, 0) : 0;
                      const dayMs = day.getTime();

                      const isStartDay = booking && dayMs === startMs;
                      const lastNightMs = endMs - (24 * 60 * 60 * 1000);
                      const isEndDay = booking && (dayMs === lastNightMs || (endMs - startMs <= 24*60*60*1000 && isStartDay));

                      return (
                        <div 
                          key={i} 
                          className={`flex-1 min-w-[75px] border-r border-gray-100 dark:border-gray-800 relative py-2 px-0.5 ${
                            isToday ? 'bg-orange-50/40 dark:bg-orange-500/5' : isWeekend ? 'bg-gray-50/30 dark:bg-gray-800/10' : ''
                          }`}
                        >
                          {booking ? (
                            <div 
                              onClick={() => setActiveBooking(booking)}
                              className={`h-full w-full py-1 cursor-pointer transition-transform hover:scale-[1.02] z-10 relative`}
                              title={`${booking.guest} (${booking.status}) - ${booking.checkIn} to ${booking.checkOut}`}
                            >
                              <div className={`h-full w-full flex items-center px-2 border text-xs font-bold shadow-sm rounded-lg transition-all ${getStatusBadgeColor(booking.status)}`}>
                                <div className="truncate w-full text-[11px] leading-tight">
                                  {isStartDay ? (
                                    <>
                                      <span className="font-extrabold block truncate">{booking.guest}</span>
                                      <span className="text-[9px] opacity-90 font-mono">₹{booking.amount}</span>
                                    </>
                                  ) : (
                                    <span className="opacity-75">•</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full min-h-[44px] opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                              <span className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-500/20 text-[#ea580c] flex items-center justify-center text-xs font-bold">
                                +
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Booking Details Dialog / Modal */}
      {activeBooking && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#1e293b] rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0f172a] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-orange-100 dark:bg-orange-500/10 rounded-2xl text-[#ea580c]">
                  <Hash className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">Booking Details</h3>
                  <p className="text-xs font-mono text-gray-500">{activeBooking.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveBooking(null)}
                className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              
              {/* Guest & Room Summary */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-[#0f172a] p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Guest</p>
                  <p className="font-bold text-gray-900 dark:text-white mt-1">{activeBooking.guest}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{activeBooking.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Room</p>
                  <p className="font-bold text-gray-900 dark:text-white mt-1">{activeBooking.room}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{activeBooking.type}</p>
                </div>
              </div>

              {/* Schedule Dates */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-gray-800">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Check-In</p>
                  <p className="font-extrabold text-sm text-gray-900 dark:text-white mt-1">{activeBooking.checkIn}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="px-2 py-1 bg-orange-100 dark:bg-orange-500/10 text-[#ea580c] font-black text-xs rounded-full">
                    {activeBooking.nights} Nights
                  </span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-gray-800">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Check-Out</p>
                  <p className="font-extrabold text-sm text-gray-900 dark:text-white mt-1">{activeBooking.checkOut}</p>
                </div>
              </div>

              {/* Financials & Status */}
              <div className="flex justify-between items-center p-4 bg-orange-50/50 dark:bg-orange-500/5 rounded-2xl border border-orange-200 dark:border-orange-900/30">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Amount</p>
                  <p className="text-xl font-black text-[#ea580c] mt-0.5">₹{activeBooking.amount}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    activeBooking.status.toLowerCase() === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                    activeBooking.status.toLowerCase() === 'completed' ? 'bg-green-100 text-green-700' :
                    activeBooking.status.toLowerCase() === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {activeBooking.status}
                  </span>
                </div>
              </div>

              {/* Status Update Quick Buttons */}
              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Quick Status Update</p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleQuickStatusUpdate(activeBooking.id, 'CONFIRMED')}
                    className="py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleQuickStatusUpdate(activeBooking.id, 'COMPLETED')}
                    className="py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleQuickStatusUpdate(activeBooking.id, 'CANCELLED')}
                    className="py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0f172a] flex justify-between items-center">
              <Link 
                href="/admin/bookings" 
                className="text-xs font-bold text-[#ea580c] hover:underline flex items-center gap-1"
              >
                Go to All Bookings List →
              </Link>
              <button 
                onClick={() => setActiveBooking(null)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
