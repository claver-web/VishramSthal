'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, Filter, List, KanbanSquare, LayoutGrid, MoreVertical, X, Phone, Mail, MessageSquare, 
  Calendar as CalendarIcon, MapPin, Clock, CheckCircle2, AlertCircle, Send,
  ChevronDown, PhoneCall, Check, Briefcase, FileText
} from 'lucide-react';

const MOCK_ENQUIRIES = [
  { id: 'ENQ-001', couple: 'Rahul & Priya', phone: '+91 9876543210', email: 'rahul.p@example.com', date: '15 Nov 2026', guests: 500, venue: 'Grand Banquet Hall', event: 'Wedding', status: 'New', assigned: 'Unassigned', priority: 'high', enqDate: '01 Aug 2026' },
  { id: 'ENQ-002', couple: 'Amit & Neha', phone: '+91 9988776655', email: 'neha123@example.com', date: '22 Dec 2026', guests: 300, venue: 'Royal Garden Lawns', event: 'All Events', status: 'Contacted', assigned: 'Ramesh', priority: 'medium', enqDate: '02 Aug 2026' },
  { id: 'ENQ-003', couple: 'Vikram & Anjali', phone: '+91 9123456789', email: 'vik.anj@test.com', date: '10 Jan 2027', guests: 150, venue: 'Skyview Terrace', event: 'Engagement', status: 'Site Visit Scheduled', assigned: 'Suresh', priority: 'medium', enqDate: '05 Aug 2026' },
  { id: 'ENQ-004', couple: 'Karan & Pooja', phone: '+91 9998887776', email: 'pooja.k@example.com', date: '05 Feb 2027', guests: 800, venue: 'Grand Banquet Hall', event: 'Reception', status: 'Proposal Sent', assigned: 'Ramesh', priority: 'high', enqDate: '06 Aug 2026' },
  { id: 'ENQ-005', couple: 'Deepak & Sunita', phone: '+91 9879879870', email: 'deepak.s@test.com', date: '12 Mar 2027', guests: 100, venue: 'Intimate Hall', event: 'Mehendi', status: 'Lost', assigned: 'Suresh', priority: 'low', enqDate: '07 Aug 2026' },
];

const COLUMNS = [
  { id: 'New', label: 'New', color: 'bg-blue-500' },
  { id: 'Contacted', label: 'Contacted', color: 'bg-amber-500' },
  { id: 'Site Visit Scheduled', label: 'Site Visit Scheduled', color: 'bg-purple-500' },
  { id: 'Proposal Sent', label: 'Proposal Sent', color: 'bg-indigo-500' },
  { id: 'Booked', label: 'Booked', color: 'bg-green-500' },
  { id: 'Lost', label: 'Lost', color: 'bg-red-500' },
];

export default function EnquiriesPage() {
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [search, setSearch] = useState('');
  const [selectedEnq, setSelectedEnq] = useState<any>(null);

  const getStatusStyle = (status: string) => {
    const col = COLUMNS.find(c => c.id === status);
    if (!col) return 'bg-gray-100 text-gray-700';
    return `${col.color} text-white`;
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10 h-[calc(100vh-64px)] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 px-1 pt-2">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-rose-500" /> Wedding Enquiries
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage leads, track communications, and close bookings</p>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 justify-between items-center shrink-0">
        <div className="flex flex-1 gap-4 w-full md:w-auto">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by couple name, phone, email..." 
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
            onClick={() => setViewMode('kanban')}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === 'kanban' ? 'bg-white dark:bg-[#1e293b] shadow-sm text-rose-500' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-6 min-h-0 relative">
        
        {/* Table View */}
        {viewMode === 'table' && (
          <div className={`flex-1 bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col transition-all ${selectedEnq ? 'mr-96' : ''}`}>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-gray-50 dark:bg-[#0f172a] text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">ID & Date</th>
                    <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Couple</th>
                    <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Contact</th>
                    <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Event Details</th>
                    <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider">Status</th>
                    <th className="px-4 py-4 font-bold text-xs uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {MOCK_ENQUIRIES.map((enq) => (
                    <tr key={enq.id} className="hover:bg-gray-50/50 dark:hover:bg-[#0f172a]/50 transition-colors group cursor-pointer" onClick={() => setSelectedEnq(enq)}>
                      <td className="px-4 py-4">
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{enq.id}</p>
                        <p className="text-[10px] text-gray-500">{enq.enqDate}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-bold text-rose-600 dark:text-rose-400 text-sm">{enq.couple}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1.5 mb-1"><Phone className="w-3 h-3 text-gray-400" /> {enq.phone}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1.5"><Mail className="w-3 h-3 text-gray-400" /> {enq.email}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">{enq.date} <span className="text-xs font-normal text-gray-500">({enq.guests} Guests)</span></p>
                        <p className="text-xs text-gray-500">{enq.event} @ {enq.venue}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusStyle(enq.status)}`}>
                          {enq.status}
                        </span>
                        <p className="text-[10px] text-gray-400 mt-1">Assigned: {enq.assigned}</p>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors"><MoreVertical className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-sm text-gray-500 shrink-0">
              <p>Showing 1 to 5 of 5 entries</p>
              <div className="flex gap-1">
                <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#0f172a] disabled:opacity-50" disabled>Prev</button>
                <button className="px-3 py-1 rounded-lg bg-rose-500 text-white font-medium">1</button>
                <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#0f172a] disabled:opacity-50" disabled>Next</button>
              </div>
            </div>
          </div>
        )}

        {/* Kanban View */}
        {viewMode === 'kanban' && (
          <div className={`flex-1 flex gap-4 overflow-x-auto pb-4 custom-scrollbar transition-all ${selectedEnq ? 'mr-96' : ''}`}>
            {COLUMNS.map(col => {
              const columnEnqs = MOCK_ENQUIRIES.filter(e => e.status === col.id);
              return (
                <div key={col.id} className="w-72 shrink-0 bg-gray-50 dark:bg-[#0f172a] rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col max-h-full">
                  <div className="p-3 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center sticky top-0 bg-gray-50 dark:bg-[#0f172a] rounded-t-2xl z-10">
                    <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${col.color}`}></span>
                      {col.label}
                    </h3>
                    <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {columnEnqs.length}
                    </span>
                  </div>
                  
                  <div className="p-2 space-y-3 overflow-y-auto custom-scrollbar flex-1">
                    {columnEnqs.map(enq => (
                      <div 
                        key={enq.id} 
                        onClick={() => setSelectedEnq(enq)}
                        className="bg-white dark:bg-[#1e293b] p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:border-rose-500/50 hover:shadow-md transition-all group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-bold text-gray-400 bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 rounded">{enq.id}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            enq.priority === 'high' ? 'bg-red-50 text-red-600' : 
                            enq.priority === 'medium' ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-600'
                          }`}>
                            {enq.priority}
                          </span>
                        </div>
                        <h4 className="font-bold text-rose-600 dark:text-rose-400 text-sm mb-1">{enq.couple}</h4>
                        <div className="text-[10px] text-gray-500 space-y-1">
                          <p className="flex items-center gap-1.5"><CalendarIcon className="w-3 h-3" /> {enq.date} ({enq.guests} pax)</p>
                          <p className="flex items-center gap-1.5 truncate"><MapPin className="w-3 h-3" /> {enq.venue}</p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center">
                          <div className="flex -space-x-1">
                            <div className="w-5 h-5 rounded-full bg-blue-500 border border-white text-[8px] flex items-center justify-center text-white font-bold" title={enq.assigned}>
                              {enq.assigned.charAt(0)}
                            </div>
                          </div>
                          <span className="text-[10px] text-gray-400">{enq.enqDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Detail Side Panel */}
        {selectedEnq && (
          <div className="absolute top-0 right-0 bottom-0 w-96 bg-white dark:bg-[#1e293b] border-l border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 z-20">
            {/* Panel Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-[#0f172a]">
              <div>
                <h2 className="text-lg font-black text-rose-600 dark:text-rose-400">{selectedEnq.couple}</h2>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{selectedEnq.id}</p>
              </div>
              <button 
                onClick={() => setSelectedEnq(null)}
                className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-4 space-y-6">
                
                {/* Status Bar */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Current Status</label>
                  <select className={`w-full px-3 py-2 rounded-xl text-sm font-bold border-0 focus:ring-2 focus:ring-inset focus:ring-rose-500 ${getStatusStyle(selectedEnq.status)}`}>
                    {COLUMNS.map(col => (
                      <option key={col.id} value={col.id}>{col.label}</option>
                    ))}
                  </select>
                </div>

                {/* Event Details */}
                <div className="bg-gray-50 dark:bg-[#0f172a] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-4">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-rose-500" /> Event Details
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedEnq.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500">Guest Count</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedEnq.guests}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[10px] text-gray-500">Venue Preference</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedEnq.venue}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[10px] text-gray-500">Event Type</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedEnq.event}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 dark:bg-[#0f172a] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-4">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Phone className="w-4 h-4 text-rose-500" /> Contact Info
                  </h3>
                  
                  <div className="space-y-3">
                    <a href={`tel:${selectedEnq.phone}`} className="flex items-center justify-between group">
                      <div>
                        <p className="text-[10px] text-gray-500">Phone</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-rose-500 transition-colors">{selectedEnq.phone}</p>
                      </div>
                      <PhoneCall className="w-4 h-4 text-gray-300 group-hover:text-rose-500 transition-colors" />
                    </a>
                    <a href={`mailto:${selectedEnq.email}`} className="flex items-center justify-between group">
                      <div>
                        <p className="text-[10px] text-gray-500">Email</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-rose-500 transition-colors">{selectedEnq.email}</p>
                      </div>
                      <Send className="w-4 h-4 text-gray-300 group-hover:text-rose-500 transition-colors" />
                    </a>
                  </div>
                </div>

                {/* Communication Timeline */}
                <div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-4 px-1">
                    <Clock className="w-4 h-4 text-rose-500" /> Timeline
                  </h3>
                  
                  <div className="relative pl-3 border-l-2 border-gray-100 dark:border-gray-800 space-y-4 ml-2">
                    
                    <div className="relative">
                      <span className="absolute -left-4 top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-[#1e293b]"></span>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">Note Added</p>
                      <p className="text-xs text-gray-500 mt-1 bg-gray-50 dark:bg-[#0f172a] p-2 rounded-lg italic">"Client is highly interested but budget is slightly constrained. Scheduling a site visit."</p>
                      <p className="text-[10px] text-gray-400 mt-1">Today, 10:30 AM • by Ramesh</p>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-4 top-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-white dark:ring-[#1e293b]"></span>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">Phone Call</p>
                      <p className="text-xs text-gray-500 mt-1">Discussed available dates and initial pricing for Grand Banquet.</p>
                      <p className="text-[10px] text-gray-400 mt-1">Yesterday, 2:15 PM • by Ramesh</p>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-4 top-1 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-white dark:ring-[#1e293b]"></span>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">Enquiry Received</p>
                      <p className="text-xs text-gray-500 mt-1">Via Website Form</p>
                      <p className="text-[10px] text-gray-400 mt-1">{selectedEnq.enqDate} • System</p>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* Panel Footer Actions */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1e293b] space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5" /> Site Visit
                </button>
                <button className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Proposal
                </button>
              </div>
              <button className="w-full px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-bold shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-2">
                <Briefcase className="w-4 h-4" /> Convert to Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
