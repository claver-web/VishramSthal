'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, Search, Bell, Moon, Sun, ExternalLink, ChevronDown, 
  User, Settings, LogOut, Clock, Eye, CalendarCheck, CheckCircle2, AlertCircle, RefreshCw 
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: string;
  status?: string;
  guest?: string;
  amount?: number;
}

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  // Real notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [todayVisitors, setTodayVisitors] = useState<number>(0);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  const fetchNotifications = async () => {
    setLoadingNotifications(true);
    try {
      const res = await fetch('/api/admin/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
        setTodayVisitors(data.todayVisitors || 0);
      }
    } catch (err) {
      console.error('Error fetching admin notifications:', err);
    } finally {
      setLoadingNotifications(false);
    }
  };

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Initial fetch of notifications & setup polling every 30s
    fetchNotifications();
    const notifInterval = setInterval(fetchNotifications, 30000);

    // Check initial dark theme
    if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
    
    return () => {
      clearInterval(timer);
      clearInterval(notifInterval);
    };
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  const clearNotifications = () => {
    setUnreadCount(0);
    toast.success('Notifications marked as read');
  };

  // Generate breadcrumbs from pathname
  const pathParts = pathname.split('/').filter(p => p !== '' && p !== 'admin');
  
  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-lg border-b border-gray-200 dark:border-[#1e293b] h-16 px-4 lg:px-8 flex items-center justify-between transition-colors">
      <Toaster position="top-right" />

      {/* Left section: Hamburger & Breadcrumbs */}
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

      {/* Right Section */}
      <div className="flex items-center gap-3 lg:gap-5">
        
        {/* Live Daily Visitors Badge */}
        <Link 
          href="/admin/analytics" 
          className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-500/10 dark:to-amber-500/10 text-[#ea580c] dark:text-orange-400 px-3 py-1 rounded-full text-xs font-black border border-orange-200 dark:border-orange-500/20 hover:scale-105 transition-all shadow-sm"
          title="Click to view full visitor analytics"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <Eye className="w-3.5 h-3.5" />
          <span>{todayVisitors} Visitors Today</span>
        </Link>

        {/* Live Clock */}
        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#1e293b] px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-800">
          <Clock className="w-3.5 h-3.5 text-[#ea580c]" />
          {currentTime ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1e293b] text-gray-600 dark:text-gray-300 transition-colors"
          title="Toggle Dark/Light Mode"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Visit Website Link */}
        <a 
          href="/" 
          target="_blank" 
          rel="noreferrer" 
          className="hidden sm:flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-[#ea580c] dark:hover:text-[#ea580c] transition-colors bg-gray-50 dark:bg-[#1e293b] px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-800"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Visit Site
        </a>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => {
              setIsNotificationOpen(!isNotificationOpen);
              fetchNotifications();
            }}
            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1e293b] text-gray-600 dark:text-gray-300 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
            )}
          </button>
          
          {isNotificationOpen && (
            <div className="absolute right-0 mt-3 w-88 max-w-sm bg-white dark:bg-[#1e293b] rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0f172a] font-bold text-gray-900 dark:text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#ea580c]" />
                  <span>Room & Booking Alerts</span>
                </div>
                {unreadCount > 0 && (
                  <button 
                    onClick={clearNotifications}
                    className="bg-[#ea580c] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full hover:bg-orange-700 transition-colors"
                  >
                    {unreadCount} New
                  </button>
                )}
              </div>

              <div className="max-h-88 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 custom-scrollbar">
                {loadingNotifications && notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-[#ea580c]" /> Loading alerts...
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-xs font-medium">
                    No recent booking notifications.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <Link
                      key={n.id}
                      href="/admin/bookings"
                      onClick={() => setIsNotificationOpen(false)}
                      className="p-4 hover:bg-orange-50/50 dark:hover:bg-[#0f172a]/80 transition-colors flex items-start gap-3 block"
                    >
                      <div className={`p-2 rounded-xl flex-shrink-0 mt-0.5 ${
                        n.type === 'analytics' 
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10' 
                          : n.status === 'CONFIRMED' 
                          ? 'bg-green-50 text-green-600 dark:bg-green-500/10'
                          : 'bg-orange-50 text-[#ea580c] dark:bg-orange-500/10'
                      }`}>
                        {n.type === 'analytics' ? <Eye className="w-4 h-4" /> : <CalendarCheck className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs font-black text-gray-900 dark:text-white truncate">{n.title}</p>
                          <span className="text-[10px] font-bold text-gray-400">{n.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 font-medium line-clamp-2">{n.message}</p>
                      </div>
                    </Link>
                  ))
                )}
              </div>

              <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0f172a] text-center">
                <Link 
                  href="/admin/bookings" 
                  onClick={() => setIsNotificationOpen(false)}
                  className="text-xs font-bold text-[#ea580c] hover:underline"
                >
                  View All Reservations →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1e293b] transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ea580c] to-[#c2410c] flex items-center justify-center text-white font-black text-sm shadow-md shadow-orange-500/20">
              A
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-black text-gray-900 dark:text-white leading-tight">Admin</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Super Admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1e293b] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4">
              <div className="p-2">
                <Link href="/admin/profile" className="flex items-center gap-2 w-full px-3 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0f172a] rounded-xl transition-colors">
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <Link href="/admin/settings" className="flex items-center gap-2 w-full px-3 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0f172a] rounded-xl transition-colors">
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <div className="h-px bg-gray-100 dark:bg-gray-800 my-2"></div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
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
