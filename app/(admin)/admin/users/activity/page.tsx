'use client';

import { 
  Search, Filter, LogIn, CalendarCheck, XCircle, 
  MessageSquare, UserCog, MonitorSmartphone, MapPin 
} from 'lucide-react';

const mockLogs: any[] = [];

export default function UserActivityLogPage() {
  const getActionIcon = (type: string) => {
    switch (type) {
      case 'Login': return <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 flex items-center justify-center"><LogIn className="w-5 h-5" /></div>;
      case 'Booking': return <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400 flex items-center justify-center"><CalendarCheck className="w-5 h-5" /></div>;
      case 'Cancel': return <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 flex items-center justify-center"><XCircle className="w-5 h-5" /></div>;
      case 'Review': return <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400 flex items-center justify-center"><MessageSquare className="w-5 h-5" /></div>;
      default: return <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 flex items-center justify-center"><UserCog className="w-5 h-5" /></div>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">User Activity Log</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Chronological record of all user and guest actions.</p>
      </div>

      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-wrap gap-4">
        <div className="relative flex-1 md:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search user, action, or IP address..." className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-[#ea580c] outline-none dark:text-white" />
        </div>
        <select className="bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 outline-none">
          <option>All Action Types</option>
          <option>Logins</option>
          <option>Bookings</option>
          <option>Cancellations</option>
          <option>Reviews</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Filter className="w-4 h-4" /> Date Range
        </button>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
        {mockLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500 dark:text-gray-400">
            <UserCog className="w-12 h-12 mb-3 text-gray-300 dark:text-gray-600" />
            <p className="font-medium text-lg">No activity recorded yet.</p>
            <p className="text-sm mt-1">User actions, bookings, and logins will appear here.</p>
          </div>
        ) : (
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[35px] md:before:ml-[220px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-200 before:via-gray-200 before:to-transparent dark:before:from-gray-700 dark:before:via-gray-700">
            {mockLogs.map((log) => (
              <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon marker */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#1e293b] bg-white dark:bg-[#1e293b] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 z-10">
                  {getActionIcon(log.type)}
                </div>
                
                {/* Content card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0f172a] shadow-sm hover:shadow-md hover:border-[#ea580c]/30 transition-all ml-16 md:ml-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base">{log.action}</h3>
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded-full">{log.type}</span>
                  </div>
                  
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{log.detail}</p>
                  
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-1.5">
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5"><strong className="text-gray-700 dark:text-gray-300">{log.user}</strong> ({log.email})</p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-400 dark:text-gray-500 font-mono">
                      <span className="flex items-center gap-1"><MonitorSmartphone className="w-3 h-3" /> {log.device}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {log.ip}</span>
                    </div>
                  </div>
                  
                  {/* Date float (desktop) */}
                  <div className="md:absolute md:top-5 md:w-32 md:-ml-[12rem] md:group-odd:left-0 md:group-odd:ml-0 md:group-odd:pl-0 md:group-odd:translate-x-full md:group-even:right-0 md:group-even:mr-0 md:group-even:pr-0 md:group-even:-translate-x-full text-xs font-bold text-gray-400 mt-2 md:mt-0 md:text-center">
                    {log.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
