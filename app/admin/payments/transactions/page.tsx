'use client';

import { useState } from 'react';
import { 
  Search, Filter, Download, Eye, FileText, ArrowUpRight, 
  IndianRupee, CreditCard, CheckCircle, XCircle, X
} from 'lucide-react';

const mockTransactions: any[] = [];

export default function TransactionsPage() {
  const [activeTxn, setActiveTxn] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
      case 'Failed': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
      case 'Refunded': return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400';
      default: return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400';
    }
  };

  const getMethodIcon = (method: string) => {
    if (method === 'UPI') return <ArrowUpRight className="w-4 h-4 text-[#ea580c]" />;
    return <CreditCard className="w-4 h-4 text-blue-500" />;
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Transactions</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Monitor all incoming and outgoing payments.</p>
        </div>
        <button className="flex items-center gap-2 bg-white dark:bg-[#1e293b] text-gray-700 dark:text-white px-5 py-2.5 rounded-xl font-bold border border-gray-200 dark:border-gray-700 shadow-sm hover:text-[#ea580c] transition-colors">
          <Download className="w-5 h-5" /> Export CSV
        </button>
      </div>

      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 md:max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search TXN ID, Booking ID, or Guest..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-[#ea580c] outline-none dark:text-white" />
          </div>
          <select className="bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 outline-none">
            <option>All Methods</option>
            <option>UPI</option>
            <option>Credit Card</option>
            <option>Net Banking</option>
          </select>
          <select className="bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 outline-none">
            <option>Any Status</option>
            <option>Success</option>
            <option>Failed</option>
            <option>Refunded</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-[#0f172a] text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Guest</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {mockTransactions.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                      <CreditCard className="w-12 h-12 mb-3 text-gray-300 dark:text-gray-600" />
                      <p className="font-medium">No transactions found.</p>
                      <p className="text-sm mt-1">Payment records will appear here.</p>
                    </div>
                  </td>
                </tr>
              )}
              {mockTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-orange-50/30 dark:hover:bg-[#0f172a]/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-gray-900 dark:text-white">{txn.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{txn.date}</td>
                  <td className="px-6 py-4 font-mono text-[#ea580c] hover:underline cursor-pointer">{txn.bookingId}</td>
                  <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">{txn.guest}</td>
                  <td className="px-6 py-4 font-black text-gray-900 dark:text-white">₹{txn.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getMethodIcon(txn.method)}
                      <span className="text-sm font-medium dark:text-gray-300">{txn.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${getStatusColor(txn.status)}`}>{txn.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => setActiveTxn(txn)} className="p-2 text-gray-500 hover:text-[#ea580c] transition-colors"><Eye className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {activeTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in">
          <div className="bg-white dark:bg-[#1e293b] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 animate-slide-up">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-[#0f172a]">
              <h3 className="font-black text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-[#ea580c]" /> Transaction Details
              </h3>
              <button onClick={() => setActiveTxn(null)} className="p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="text-center pb-6 border-b border-gray-100 dark:border-gray-800">
                <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Total Amount</p>
                <p className="text-4xl font-black text-[#ea580c]">₹{activeTxn.amount}</p>
                <div className="mt-4 flex justify-center">
                  <span className={`px-3 py-1 text-sm font-bold rounded-full flex items-center gap-1.5 ${getStatusColor(activeTxn.status)}`}>
                    {activeTxn.status === 'Success' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    {activeTxn.status}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Date & Time</span>
                  <span className="font-bold text-gray-900 dark:text-white">{activeTxn.date}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Razorpay ID</span>
                  <span className="font-mono text-gray-900 dark:text-white">{activeTxn.rzpId}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Bank Reference</span>
                  <span className="font-mono text-gray-900 dark:text-white">{activeTxn.bankRef}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Payment Method</span>
                  <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    {getMethodIcon(activeTxn.method)} {activeTxn.method}
                  </span>
                </div>
              </div>

              {activeTxn.status === 'Success' && (
                <div className="bg-orange-50 dark:bg-orange-500/10 p-4 rounded-xl border border-orange-100 dark:border-orange-900/30">
                  <h4 className="text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-3">Initiate Refund</h4>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Amount (₹)" defaultValue={activeTxn.amount} className="w-full px-3 py-2 bg-white dark:bg-[#0f172a] border border-orange-200 dark:border-orange-900/50 rounded-lg text-sm font-bold outline-none dark:text-white" />
                    <button className="px-4 bg-[#ea580c] hover:bg-[#c2410c] text-white text-sm font-bold rounded-lg transition-colors">Refund</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
