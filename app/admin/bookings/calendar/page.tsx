'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  List, Printer, RefreshCw, CheckCircle, XCircle, Clock
} from 'lucide-react';

// Generate days for current view
const days = Array.from({ length: 14 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i - 2); // Start 2 days ago
  return d;
});

const rooms = [
  { id: '101', name: 'Deluxe Temple View', type: 'Deluxe' },
  { id: '102', name: 'Deluxe Temple View', type: 'Deluxe' },
  { id: '105', name: 'Standard Room', type: 'Standard' },
  { id: '106', name: 'Standard Room', type: 'Standard' },
  { id: '201', name: 'Premium Suite', type: 'Suite' },
  { id: '205', name: 'Family Room', type: 'Premium' },
];

// Mock bookings with simple date matching logic for visual layout
const getBookingForCell = (roomId: string, dateStr: string) => {
  const b1 = { id: 'BKG-01', name: 'Rahul K.', status: 'Confirmed', start: -1, length: 3, room: '101' };
  const b2 = { id: 'BKG-02', name: 'Priya S.', status: 'Pending', start: 1, length: 1, room: '105' };
  const b3 = { id: 'BKG-03', name: 'Amit S.', status: 'Completed', start: -2, length: 2, room: '201' };
  const b4 = { id: 'BKG-04', name: 'Sneha P.', status: 'Confirmed', start: 3, length: 2, room: '205' };
  
  const today = new Date().toDateString();
  const dStr = new Date(dateStr).toDateString();
  
  // Very rough mock rendering logic
  const all = [b1, b2, b3, b4];
  for (let b of all) {
    if (b.room === roomId) {
      const bStart = new Date(); bStart.setDate(bStart.getDate() + b.start);
      const bEnd = new Date(bStart); bEnd.setDate(bEnd.getDate() + b.length - 1);
      const curr = new Date(dateStr);
      
      if (curr >= bStart && curr <= bEnd) {
        return {
          ...b,
          isStart: curr.toDateString() === bStart.toDateString(),
          isEnd: curr.toDateString() === bEnd.toDateString()
        };
      }
    }
  }
  return null;
};

export default function BookingsCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-blue-500 border-blue-600 text-white shadow-blue-500/30';
      case 'Pending': return 'bg-yellow-400 border-yellow-500 text-yellow-900 shadow-yellow-500/30';
      case 'Completed': return 'bg-green-500 border-green-600 text-white shadow-green-500/30';
      default: return 'bg-gray-400 border-gray-500 text-white shadow-gray-500/30';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Booking Calendar</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Visual timeline of room occupancy.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/bookings" className="p-2.5 bg-gray-100 dark:bg-[#1e293b] text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors tooltip-trigger" title="List View">
            <List className="w-5 h-5" />
          </Link>
          <button className="p-2.5 bg-gray-100 dark:bg-[#1e293b] text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors tooltip-trigger" title="Print Calendar">
            <Printer className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all">
            <RefreshCw className="w-4 h-4" /> Sync iCal
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-[#0f172a]">
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold shadow-sm hover:text-[#ea580c] transition-colors">Today</button>
            <div className="flex items-center gap-2 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl p-1">
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"><ChevronLeft className="w-5 h-5 text-gray-500" /></button>
              <span className="text-sm font-bold px-2 text-gray-900 dark:text-white">October 2023</span>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"><ChevronRight className="w-5 h-5 text-gray-500" /></button>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-4 text-xs font-bold text-gray-600 dark:text-gray-300 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-xl">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Confirmed</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-yellow-400"></span> Pending</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500"></span> Completed</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto custom-scrollbar">
          <div className="min-w-[1000px]">
            {/* Days Header */}
            <div className="flex border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0f172a]/50">
              <div className="w-48 flex-shrink-0 p-4 font-black text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r border-gray-100 dark:border-gray-800 flex items-center">
                Rooms
              </div>
              <div className="flex-1 flex">
                {days.map((day, i) => {
                  const isToday = day.toDateString() === new Date().toDateString();
                  return (
                    <div key={i} className={`flex-1 min-w-[80px] p-2 text-center border-r border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center ${isToday ? 'bg-orange-50 dark:bg-orange-500/10' : ''}`}>
                      <span className={`text-[10px] font-bold uppercase ${isToday ? 'text-[#ea580c]' : 'text-gray-500 dark:text-gray-400'}`}>
                        {day.toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                      <span className={`text-lg font-black mt-1 ${isToday ? 'bg-[#ea580c] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md shadow-orange-500/30' : 'text-gray-900 dark:text-white'}`}>
                        {day.getDate()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Room Rows */}
            {rooms.map((room) => (
              <div key={room.id} className="flex border-b border-gray-100 dark:border-gray-800 group hover:bg-gray-50 dark:hover:bg-[#0f172a]/50 transition-colors">
                <div className="w-48 flex-shrink-0 p-4 border-r border-gray-100 dark:border-gray-800 flex flex-col justify-center bg-white dark:bg-[#1e293b] group-hover:bg-gray-50 dark:group-hover:bg-[#0f172a]/50 transition-colors">
                  <span className="font-bold text-gray-900 dark:text-white text-sm">Room {room.id}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{room.type}</span>
                </div>
                <div className="flex-1 flex relative">
                  {days.map((day, i) => {
                    const booking = getBookingForCell(room.id, day.toISOString());
                    const isToday = day.toDateString() === new Date().toDateString();
                    
                    return (
                      <div key={i} className={`flex-1 min-w-[80px] border-r border-gray-100 dark:border-gray-800 relative py-2 px-1 ${isToday ? 'bg-orange-50/30 dark:bg-orange-500/5' : ''}`}>
                        {booking && (
                          <div 
                            className={`h-full w-full absolute top-0 z-10 py-2 transition-transform hover:-translate-y-0.5 cursor-pointer
                              ${booking.isStart ? 'left-2 pr-2' : ''} 
                              ${booking.isEnd ? 'right-2 pl-2' : ''}
                              ${!booking.isStart && !booking.isEnd ? '-mx-px px-px w-[calc(100%+2px)]' : ''}
                            `}
                          >
                            <div className={`h-full w-full flex items-center px-3 border shadow-sm ${getStatusColor(booking.status)} 
                              ${booking.isStart ? 'rounded-l-lg' : ''} 
                              ${booking.isEnd ? 'rounded-r-lg' : ''}
                              ${!booking.isStart && !booking.isEnd ? 'border-l-0 border-r-0' : ''}
                            `}>
                              {booking.isStart && (
                                <div className="truncate text-xs font-bold leading-tight">
                                  {booking.name} <br/> <span className="opacity-80 font-medium text-[10px]">{booking.id}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        {!booking && (
                          <div className="w-full h-full min-h-[48px] opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                            <span className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg font-bold">+</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
