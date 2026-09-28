'use client';

import { 
  Search, Filter, ShieldCheck, Activity, Key, LogIn, Edit, Clock, MapPin
} from 'lucide-react';

const mockActivity: any[] = [];

export default function AdminActivityPage() {
  const getIcon = (type: string) => {
    switch(type) {
      case 'Edit': return <Edit className="w-4 h-4 text-blue-500" />;
      case 'Action': return <Activity className="w-4 h-4 text-orange-500" />;
      case 'Auth': return <LogIn className="w-4 h-4 text-green-500" />;
      case 'Security': return <Key className="w-4 h-4 text-red-500" />;
      default: return <ShieldCheck className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Admin Activity Log</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Audit trail of all actions performed by your account.</p>
      </div>

      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-wrap gap-4">
        <div className="relative flex-1 md:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search activities..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-[#ea580c] outline-none dark:text-white" />
        </div>
        <select className="bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 outline-none">
          <option>All Types</option>
          <option>Edits</option>
          <option>Actions</option>
          <option>Auth Events</option>
          <option>Security</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Filter className="w-4 h-4" /> Date Range
        </button>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-6">
        {mockActivity.length === 0 ? (
          <div className="py-12 text-center text-gray-500 dark:text-gray-400">
            <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p className="font-medium text-lg">No activity recorded</p>
            <p className="text-sm mt-1">Your recent actions and logins will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {mockActivity.map((act) => (
              <div key={act.id} className="flex gap-4 p-4 hover:bg-gray-50 dark:hover:bg-[#0f172a] rounded-2xl transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center flex-shrink-0">
                  {act.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-gray-900 dark:text-white">{act.action}</p>
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {act.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 font-mono flex items-center gap-1"><MapPin className="w-3 h-3" /> IP: {act.ip}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
