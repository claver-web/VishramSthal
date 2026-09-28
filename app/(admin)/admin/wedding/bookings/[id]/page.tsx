'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Calendar as CalendarIcon, MapPin, Users, CheckCircle2, AlertCircle, 
  IndianRupee, Download, FileText, Clock, Mail, Phone, Upload, Check, ChevronDown, MessageSquare
} from 'lucide-react';
import Image from 'next/image';

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <Link href="/admin/wedding/bookings" className="p-2 bg-gray-50 dark:bg-[#0f172a] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">{params.id}</h1>
              <span className="bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 px-2.5 py-1 rounded-full text-[10px] font-bold">Confirmed</span>
              <span className="bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 px-2.5 py-1 rounded-full text-[10px] font-bold">Partial Payment</span>
            </div>
            <p className="text-xs text-gray-500">Created: 05 Aug 2026 • Last updated: 10 Aug 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 py-2 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" /> Invoice
          </button>
          <div className="relative group">
            <button className="flex-1 md:flex-none px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-bold shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-2">
              Actions <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1e293b] rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="p-1 flex flex-col">
                <button className="px-3 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0f172a] rounded-lg">Send Payment Link</button>
                <button className="px-3 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0f172a] rounded-lg">Send Confirmation</button>
                <button className="px-3 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0f172a] rounded-lg">Mark as Completed</button>
                <div className="h-px bg-gray-100 dark:bg-gray-700 my-1"></div>
                <button className="px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg">Cancel Booking</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column - Main Details */}
        <div className="w-full lg:w-2/3 space-y-6">
          
          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center shrink-0">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Event Date</p>
                <p className="text-sm font-black text-gray-900 dark:text-white">15 Nov 2026</p>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Venue</p>
                <p className="text-sm font-black text-gray-900 dark:text-white truncate">Grand Banquet Hall</p>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Guests</p>
                <p className="text-sm font-black text-gray-900 dark:text-white">500 Guaranteed</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="flex border-b border-gray-100 dark:border-gray-800">
              {['details', 'services', 'timeline', 'documents'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 text-sm font-bold text-center capitalize transition-colors ${
                    activeTab === tab 
                      ? 'text-rose-600 border-b-2 border-rose-500 bg-rose-50/50 dark:bg-rose-500/5' 
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#0f172a]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'details' && (
                <div className="space-y-8 animate-in fade-in">
                  {/* Couple Information */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Users className="w-4 h-4 text-rose-500" /> Couple Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 dark:bg-[#0f172a] p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-black text-lg">P</div>
                          <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Bride</p>
                            <p className="font-bold text-gray-900 dark:text-white">Priya Sharma</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm flex items-center gap-2 text-gray-600 dark:text-gray-300"><Phone className="w-3 h-3"/> +91 9876543210</p>
                          <p className="text-sm flex items-center gap-2 text-gray-600 dark:text-gray-300"><Mail className="w-3 h-3"/> priya.s@example.com</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-[#0f172a] p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-black text-lg">R</div>
                          <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Groom</p>
                            <p className="font-bold text-gray-900 dark:text-white">Rahul Verma</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm flex items-center gap-2 text-gray-600 dark:text-gray-300"><Phone className="w-3 h-3"/> +91 9988776655</p>
                          <p className="text-sm flex items-center gap-2 text-gray-600 dark:text-gray-300"><Mail className="w-3 h-3"/> rahul.v@example.com</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Event Specifics */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-rose-500" /> Event Specifics
                    </h3>
                    <div className="bg-gray-50 dark:bg-[#0f172a] p-4 rounded-xl border border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] text-gray-500">Event Type</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Wedding & Reception</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500">Timings</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">10:00 AM - 11:00 PM</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[10px] text-gray-500">Special Notes</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Requires 2 extra green rooms for bride's family. Jain food counter strictly separated.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'services' && (
                <div className="space-y-6 animate-in fade-in">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Booked Services & Packages</h3>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 dark:bg-[#0f172a] text-gray-500 border-b border-gray-200 dark:border-gray-700">
                        <tr>
                          <th className="px-4 py-3 font-bold">Service / Item</th>
                          <th className="px-4 py-3 font-bold">Details</th>
                          <th className="px-4 py-3 font-bold text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        <tr>
                          <td className="px-4 py-4 font-bold text-gray-900 dark:text-white">Venue Rental</td>
                          <td className="px-4 py-4 text-gray-600 dark:text-gray-400">Grand Banquet Hall (Full Day)</td>
                          <td className="px-4 py-4 font-medium text-right text-gray-900 dark:text-white">₹1,50,000</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-4 font-bold text-gray-900 dark:text-white">Catering (Veg)</td>
                          <td className="px-4 py-4 text-gray-600 dark:text-gray-400">500 plates @ ₹400/plate</td>
                          <td className="px-4 py-4 font-medium text-right text-gray-900 dark:text-white">₹2,00,000</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-4 font-bold text-gray-900 dark:text-white">Decoration</td>
                          <td className="px-4 py-4 text-gray-600 dark:text-gray-400">Premium Floral Package</td>
                          <td className="px-4 py-4 font-medium text-right text-gray-900 dark:text-white">₹85,000</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-4 font-bold text-gray-900 dark:text-white">Photography</td>
                          <td className="px-4 py-4 text-gray-600 dark:text-gray-400">Not booked through venue</td>
                          <td className="px-4 py-4 font-medium text-right text-gray-400">-</td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-[#0f172a]">
                          <td colSpan={2} className="px-4 py-4 font-black text-right text-gray-900 dark:text-white">Total Package Amount</td>
                          <td className="px-4 py-4 font-black text-right text-rose-500 text-lg">₹4,35,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {['timeline', 'documents'].includes(activeTab) && (
                <div className="h-64 flex flex-col items-center justify-center text-center animate-in fade-in">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-[#0f172a] rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section</h3>
                  <p className="text-sm text-gray-500 max-w-md">The {activeTab} mock integration goes here based on requirements.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Payment & Billing */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="bg-gray-50 dark:bg-[#0f172a] p-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-rose-500" /> Payment Details
              </h3>
            </div>
            <div className="p-6 space-y-6">
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Total Amount</span>
                  <span className="font-bold text-gray-900 dark:text-white">₹4,50,000</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Advance Paid</span>
                  <span className="font-bold text-green-600">- ₹1,00,000</span>
                </div>
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900 dark:text-white">Balance Due</span>
                  <span className="font-black text-rose-500 text-xl">₹3,50,000</span>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 p-3 rounded-xl flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-500">Next Installment Due</p>
                  <p className="text-[10px] text-amber-600 mt-0.5">₹1,50,000 due by 01 Oct 2026 (45 days before event)</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Payment History</h4>
                <div className="p-3 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-green-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Paid</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">₹1,00,000</span>
                  </div>
                  <p className="text-[10px] text-gray-500">05 Aug 2026 • ID: pay_L1234567890</p>
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-sm font-bold transition-colors">
                Send Payment Reminder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
