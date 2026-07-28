'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Building2, 
  Bed, 
  List, 
  Image as ImageIcon, 
  Video, 
  Box, 
  Calendar, 
  Clock, 
  XCircle, 
  CheckCircle, 
  IndianRupee, 
  CreditCard, 
  TrendingUp, 
  Undo2, 
  Users, 
  History, 
  Activity, 
  Star, 
  MessageSquare, 
  Reply, 
  Tag, 
  Gift, 
  Ticket, 
  BarChart3, 
  PieChart, 
  Settings, 
  Search, 
  Mail, 
  Bell, 
  Shield, 
  Key 
} from 'lucide-react';

const menuGroups = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard Overview', icon: Home, href: '/admin/dashboard' },
    ]
  },
  {
    title: 'Property',
    items: [
      { name: 'All Rooms', icon: Building2, href: '/admin/rooms' },
      { name: 'Add New Room', icon: Bed, href: '/admin/rooms/add' },
      { name: 'Room Categories', icon: List, href: '/admin/rooms/categories' },
    ]
  },
  {
    title: 'Media',
    items: [
      { name: 'Media Library', icon: ImageIcon, href: '/admin/media' },
    ]
  },
  {
    title: 'Reservations',
    items: [
      { name: 'All Bookings', icon: Calendar, href: '/admin/bookings' },
      { name: 'Calendar View', icon: Calendar, href: '/admin/bookings/calendar' },
    ]
  },
  {
    title: 'Finance',
    items: [
      { name: 'Transactions', icon: IndianRupee, href: '/admin/payments/transactions' },
      { name: 'Revenue Reports', icon: TrendingUp, href: '/admin/payments/revenue' },
      { name: 'Refunds', icon: Undo2, href: '/admin/payments/refunds' },
    ]
  },
  {
    title: 'Guests',
    items: [
      { name: 'Registered Users', icon: Users, href: '/admin/users' },
      { name: 'Guest History', icon: History, href: '/admin/users/history' },
      { name: 'User Activity Log', icon: Activity, href: '/admin/users/activity' },
    ]
  },
  {
    title: 'Feedback',
    items: [
      { name: 'All Reviews', icon: Star, href: '/admin/reviews' },
    ]
  },
  {
    title: 'Promotions',
    items: [
      { name: 'Active Offers', icon: Tag, href: '/admin/offers' },
      { name: 'Coupon Codes', icon: Ticket, href: '/admin/offers/coupons' },
    ]
  },
  {
    title: 'Reports',
    items: [
      { name: 'Visitor Analytics', icon: BarChart3, href: '/admin/analytics' },
      { name: 'Booking Analytics', icon: PieChart, href: '/admin/analytics/bookings' },
      { name: 'Revenue Analytics', icon: IndianRupee, href: '/admin/analytics/revenue' },
      { name: 'Room Performance', icon: TrendingUp, href: '/admin/analytics/rooms' },
    ]
  },
  {
    title: 'Configuration',
    items: [
      { name: 'General Settings', icon: Settings, href: '/admin/settings' },
      { name: 'SEO Settings', icon: Search, href: '/admin/settings/seo' },
      { name: 'Email Templates', icon: Mail, href: '/admin/settings/emails' },
      { name: 'Notification Settings', icon: Bell, href: '/admin/settings/notifications' },
    ]
  },
  {
    title: 'Account',
    items: [
      { name: 'Profile Settings', icon: Shield, href: '/admin/profile' },
      { name: 'Activity Log', icon: Activity, href: '/admin/profile/activity' },
    ]
  }
];

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static top-0 left-0 z-50
        w-64 h-screen overflow-y-auto
        bg-[#0f172a] text-slate-300
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        border-r border-[#1e293b]
        custom-scrollbar
      `}>
        <div className="p-4 sticky top-0 bg-[#0f172a] z-10 border-b border-[#1e293b]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative bg-transparent rounded-full overflow-hidden">
              <Image src="/logoKrishna.png" alt="Logo" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">Vishram Sthal</h2>
              <p className="text-[10px] text-[#ea580c] font-bold uppercase tracking-wider">Admin Portal</p>
            </div>
          </div>
        </div>

        <div className="p-3 space-y-6">
          {menuGroups.map((group, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                {group.title}
              </h3>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200
                        ${isActive 
                          ? 'bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white shadow-md shadow-orange-500/20' 
                          : 'hover:bg-[#1e293b] hover:text-white'}
                      `}
                    >
                      <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
