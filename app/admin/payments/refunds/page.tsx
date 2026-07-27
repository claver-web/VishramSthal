'use client';

import { useState } from 'react';
import { 
  Undo2, CheckCircle, XCircle, Search, Clock, ShieldAlert 
} from 'lucide-react';

const mockRefunds: any[] = [];

export default function RefundsPage() {
  const [activeRefund, setActiveRefund] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
      case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
      default: return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Refund Management</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Review and process guest refund requests.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center text-yellow-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500">Pending Requests</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white">0</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500">Approved (30 Days)</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white">0</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-600">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500">Rejected (30 Days)</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white">0</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* List */}
        <div className="flex-1 bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0f172a]">
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search Refund ID, Booking ID..." className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-[#ea580c] outline-none dark:text-white" />
            </div>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {mockRefunds.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500 dark:text-gray-400">
                <Undo2 className="w-12 h-12 mb-3 text-gray-300 dark:text-gray-600" />
                <p className="font-medium text-lg">No refund requests found.</p>
                <p className="text-sm mt-1">Pending and processed refunds will appear here.</p>
              </div>
            )}
            {mockRefunds.map((ref) => (
              <div 
                key={ref.id} 
                onClick={() => setActiveRefund(ref)}
                className={`p-4 hover:bg-orange-50/30 dark:hover:bg-[#0f172a]/50 transition-colors cursor-pointer flex justify-between items-center ${activeRefund?.id === ref.id ? 'bg-orange-50/50 dark:bg-[#0f172a]/80 border-l-4 border-[#ea580c]' : 'border-l-4 border-transparent'}`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900 dark:text-white">{ref.id}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${getStatusColor(ref.status)}`}>{ref.status}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20">{ref.type}</span>
                  </div>
                  <p className="text-sm font-medium text-[#ea580c]">{ref.bookingId} • {ref.guest}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate max-w-sm">{ref.reason}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-lg text-gray-900 dark:text-white">₹{ref.amount}</p>
                  <p className="text-xs text-gray-500 mt-1">{ref.requestedOn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Panel */}
        {activeRefund && (
          <div className="w-full lg:w-[400px] flex-shrink-0 bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex flex-col animate-slide-up">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <Undo2 className="w-5 h-5 text-[#ea580c]" /> Process Refund
            </h3>
            
            <div className="space-y-4 flex-1">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Guest Info</p>
                <p className="font-bold text-gray-900 dark:text-white">{activeRefund.guest}</p>
                <p className="text-sm font-mono text-[#ea580c] mt-0.5">{activeRefund.bookingId}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-[#0f172a] p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Guest Reason</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">"{activeRefund.reason}"</p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Refund Amount</p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                  <input type="number" defaultValue={activeRefund.amount} disabled={activeRefund.status !== 'Pending'} className="w-full pl-8 pr-4 py-3 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl font-black text-xl outline-none focus:border-[#ea580c] disabled:opacity-50 dark:text-white" />
                </div>
                {activeRefund.type === 'Partial' && <p className="text-xs text-orange-500 mt-1 font-bold">Guest requested partial refund</p>}
              </div>

              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Admin Notes (Internal)</p>
                <textarea rows={3} disabled={activeRefund.status !== 'Pending'} className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] disabled:opacity-50 dark:text-white" placeholder="Reason for approval/rejection..."></textarea>
              </div>
            </div>

            {activeRefund.status === 'Pending' ? (
              <div className="mt-6 flex gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                <button className="flex-1 bg-red-100 text-red-600 hover:bg-red-200 font-bold py-3 rounded-xl transition-colors dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40">Reject</button>
                <button className="flex-[2] bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5">Approve & Refund</button>
              </div>
            ) : (
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(activeRefund.status)}`}>
                  {activeRefund.status === 'Approved' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  Refund {activeRefund.status}
                </div>
                <p className="text-xs text-gray-500 mt-3 flex items-center justify-center gap-1"><ShieldAlert className="w-3 h-3" /> Processed via Razorpay API automatically</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
