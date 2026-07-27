'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, Bell, Moon, Sun, ExternalLink, ChevronDown, User, Settings, LogOut, Clock } from 'lucide-react';

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Check initial theme
    if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
    
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  // Generate breadcrumbs from pathname
  const pathParts = pathname.split('/').filter(p => p !== '' && p !== 'admin');
  
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-lg border-b border-gray-200 dark:border-[#1e293b] h-16 px-4 lg:px-8 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 lg:hidden rounded-xl hover:bg-gray-100 dark:hover:bg-[#1e293b] text-gray-600 dark:text-gray-300 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden md:flex items-center gap-2 text-sm font-medium">
          <span className="text-gray-400">Admin</span>
          {pathParts.map((part, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-gray-300 dark:text-gray-600">/</span>
              <span className={index === pathParts.length - 1 ? 'text-[#ea580c] font-bold capitalize' : 'text-gray-600 dark:text-gray-300 capitalize'}>
                {part.replace(/-/g, ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <div className="hidden lg:flex items-center bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full text-xs font-bold border border-green-200 dark:border-green-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse"></span>
          65% Occupied
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#1e293b] px-2.5 py-1 rounded-lg">
          <Clock className="w-3 h-3 text-[#ea580c]" />
          {currentTime ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
        </div>

        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-48 lg:w-64 pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-[#1e293b] border-transparent focus:border-[#ea580c] focus:bg-white dark:focus:bg-[#0f172a] focus:ring-0 text-sm font-medium dark:text-white transition-all outline-none border-2"
          />
        </div>

        <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1e293b] text-gray-600 dark:text-gray-300 transition-colors">
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <a href="/" target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-[#ea580c] dark:hover:text-[#ea580c] transition-colors">
          <ExternalLink className="w-4 h-4" />
          Visit Website
        </a>

        <div className="relative">
          <button 
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1e293b] text-gray-600 dark:text-gray-300 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0f172a]"></span>
          </button>
          
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1e293b] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 font-bold dark:text-white flex justify-between items-center">
                Notifications
                <span className="bg-[#ea580c] text-white text-xs px-2 py-0.5 rounded-full">3 New</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="p-4 hover:bg-gray-50 dark:hover:bg-[#0f172a] cursor-pointer border-b border-gray-100 dark:border-gray-800 transition-colors">
                  <p className="text-sm font-medium dark:text-white">New Booking Request</p>
                  <p className="text-xs text-gray-500 mt-1">Room 101 - 2 Guests</p>
                </div>
                <div className="p-4 hover:bg-gray-50 dark:hover:bg-[#0f172a] cursor-pointer border-b border-gray-100 dark:border-gray-800 transition-colors">
                  <p className="text-sm font-medium dark:text-white">New User Registered</p>
                  <p className="text-xs text-gray-500 mt-1">john.doe@example.com</p>
                </div>
                <div className="p-4 hover:bg-gray-50 dark:hover:bg-[#0f172a] cursor-pointer transition-colors">
                  <p className="text-sm font-medium dark:text-white">5 Star Review Added</p>
                  <p className="text-xs text-gray-500 mt-1">"Amazing spiritual experience..."</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1e293b] transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ea580c] to-[#c2410c] flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">Admin</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1e293b] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4">
              <div className="p-2">
                <Link href="/admin/profile" className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0f172a] rounded-xl transition-colors">
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <Link href="/admin/settings" className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0f172a] rounded-xl transition-colors">
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <div className="h-px bg-gray-100 dark:bg-gray-800 my-2"></div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
