import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { format, differenceInDays, isToday, isTomorrow, isPast } from 'date-fns';
import { 
  Calendar, Users, IndianRupee, Clock, CheckCircle2, XCircle, 
  ArrowRight, MapPin, Phone, Download, Star, ChevronRight,
  AlertCircle, Bed, Timer, CalendarCheck, CalendarX
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const prisma = new PrismaClient();

export default async function UserBookingsPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in?redirect_url=/bookings');
  }

  const bookings = await prisma.booking.findMany({
    where: { user: { clerkId: userId } },
    include: { room: true },
    orderBy: { createdAt: 'desc' },
  });

  // Group bookings
  const upcomingBookings = bookings.filter(b => 
    (b.status === 'CONFIRMED' || b.status === 'PENDING') && new Date(b.checkOut) >= new Date()
  );
  const pastBookings = bookings.filter(b => 
    b.status === 'COMPLETED' || b.status === 'CANCELLED' || (b.status === 'CONFIRMED' && new Date(b.checkOut) < new Date())
  );

  // Stats
  const totalStays = bookings.filter(b => b.status === 'COMPLETED' || b.status === 'CONFIRMED').length;
  const totalSpent = bookings
    .filter(b => b.status === 'CONFIRMED' || b.status === 'COMPLETED')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-b from-neutral-900 to-neutral-950 border-b border-neutral-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.08),transparent_50%)]"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-amber-500 text-sm font-medium mb-3">
                <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
                <ChevronRight size={14} />
                <span className="text-white">My Bookings</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">My Bookings</h1>
              <p className="text-neutral-400 mt-2 text-sm sm:text-base">Manage your divine stays at Vishram Sthal</p>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                href="/rooms" 
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] text-sm"
              >
                Book New Stay <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {bookings.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-colors">
              <div className="flex items-center gap-2 text-amber-500 mb-2">
                <CalendarCheck size={18} />
                <span className="text-xs font-medium uppercase tracking-wider">Total Stays</span>
              </div>
              <p className="text-2xl font-bold text-white">{totalStays}</p>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-colors">
              <div className="flex items-center gap-2 text-amber-500 mb-2">
                <IndianRupee size={18} />
                <span className="text-xs font-medium uppercase tracking-wider">Total Spent</span>
              </div>
              <p className="text-2xl font-bold text-white">₹{totalSpent.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-colors">
              <div className="flex items-center gap-2 text-emerald-500 mb-2">
                <Calendar size={18} />
                <span className="text-xs font-medium uppercase tracking-wider">Upcoming</span>
              </div>
              <p className="text-2xl font-bold text-white">{upcomingBookings.length}</p>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-colors">
              <div className="flex items-center gap-2 text-neutral-500 mb-2">
                <Star size={18} />
                <span className="text-xs font-medium uppercase tracking-wider">Past</span>
              </div>
              <p className="text-2xl font-bold text-white">{pastBookings.length}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="bg-neutral-900/30 border border-neutral-800 rounded-3xl p-12 md:p-16 text-center">
            <div className="w-24 h-24 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-neutral-800">
              <Calendar size={40} className="text-neutral-600" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No Bookings Yet</h2>
            <p className="text-neutral-400 max-w-md mx-auto mb-8 text-sm sm:text-base">
              Your journey to a divine stay begins here. Explore our sanctuaries and book your perfect retreat at Vishram Sthal.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/rooms" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold rounded-xl transition-all text-sm"
              >
                Explore Rooms <ArrowRight size={16} />
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-xl transition-all text-sm border border-neutral-700"
              >
                Contact Us
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Upcoming Bookings */}
            {upcomingBookings.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <h2 className="text-xl font-bold text-white">Upcoming Stays</h2>
                  <span className="text-sm text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded-full">{upcomingBookings.length}</span>
                </div>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              </section>
            )}

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-neutral-600 rounded-full"></div>
                  <h2 className="text-xl font-bold text-white">Past Stays</h2>
                  <span className="text-sm text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded-full">{pastBookings.length}</span>
                </div>
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Booking Card Component
function BookingCard({ booking }: { booking: any }) {
  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  const nights = differenceInDays(checkOutDate, checkInDate);
  const isUpcoming = !isPast(checkOutDate) && booking.status !== 'CANCELLED';
  const isTodayCheckIn = isToday(checkInDate);
  const isTomorrowCheckIn = isTomorrow(checkInDate);

  const statusConfig: Record<string, { color: string; bg: string; border: string; icon: any; label: string }> = {
    CONFIRMED: { 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10', 
      border: 'border-emerald-500/20', 
      icon: CheckCircle2, 
      label: 'Confirmed' 
    },
    PENDING: { 
      color: 'text-amber-400', 
      bg: 'bg-amber-500/10', 
      border: 'border-amber-500/20', 
      icon: Clock, 
      label: 'Pending' 
    },
    CANCELLED: { 
      color: 'text-red-400', 
      bg: 'bg-red-500/10', 
      border: 'border-red-500/20', 
      icon: XCircle, 
      label: 'Cancelled' 
    },
    COMPLETED: { 
      color: 'text-blue-400', 
      bg: 'bg-blue-500/10', 
      border: 'border-blue-500/20', 
      icon: CheckCircle2, 
      label: 'Completed' 
    },
    PENDING_CASH: { 
      color: 'text-orange-400', 
      bg: 'bg-orange-500/10', 
      border: 'border-orange-500/20', 
      icon: AlertCircle, 
      label: 'Cash on Arrival' 
    },
  };

  const status = statusConfig[booking.status] || statusConfig.PENDING;
  const StatusIcon = status.icon;

  return (
    <div className="group bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-neutral-900/60 shadow-lg hover:shadow-xl">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="lg:w-72 h-52 lg:h-auto relative bg-neutral-800 shrink-0 overflow-hidden">
          {booking.room.images?.[0] ? (
            <Image 
              src={booking.room.images[0]} 
              alt={booking.room.name || 'Room'} 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Bed size={48} className="text-neutral-700" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent"></div>
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md ${status.bg} ${status.color} ${status.border}`}>
              <StatusIcon size={13} />
              {status.label}
            </span>
          </div>

          {/* Check-in Alert */}
          {isTodayCheckIn && isUpcoming && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-md animate-pulse">
                <Timer size={12} />
                Today!
              </span>
            </div>
          )}
          {isTomorrowCheckIn && isUpcoming && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-md">
                Tomorrow
              </span>
            </div>
          )}

          {/* Room Type Badge */}
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-black/50 text-white backdrop-blur-md border border-white/10">
              {booking.room.type} Room
            </span>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {booking.room.name || booking.room.spiritualName || `Room ${booking.room.number}`}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5 flex items-center gap-1">
                  <MapPin size={12} />
                  Vishram Sthal, Word No. 6, Dehra Gopipur
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-amber-500 flex items-center justify-end">
                  <IndianRupee size={18} className="mr-0.5" />
                  {booking.totalPrice.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-neutral-500">Total ({nights} night{nights > 1 ? 's' : ''})</p>
              </div>
            </div>

            {/* Booking ID */}
            <p className="text-xs text-neutral-600 mb-5 font-mono">
              Booking ID: {booking.id.slice(0, 12)}...
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-start gap-2.5">
                <div className="p-2 bg-neutral-800 rounded-lg shrink-0">
                  <Calendar size={16} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold mb-0.5">Check-in</p>
                  <p className="text-sm font-medium text-white">{format(checkInDate, 'MMM dd, yyyy')}</p>
                  <p className="text-[10px] text-neutral-500">2:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-2 bg-neutral-800 rounded-lg shrink-0">
                  <Calendar size={16} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold mb-0.5">Check-out</p>
                  <p className="text-sm font-medium text-white">{format(checkOutDate, 'MMM dd, yyyy')}</p>
                  <p className="text-[10px] text-neutral-500">11:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-2 bg-neutral-800 rounded-lg shrink-0">
                  <Users size={16} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold mb-0.5">Guests</p>
                  <p className="text-sm font-medium text-white">{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-2 bg-neutral-800 rounded-lg shrink-0">
                  <Clock size={16} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold mb-0.5">Duration</p>
                  <p className="text-sm font-medium text-white">{nights} Night{nights > 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Row */}
          <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-neutral-800">
            <Link 
              href={`/rooms/${booking.room.id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              View Room
            </Link>
            
            {booking.status === 'CONFIRMED' && isUpcoming && (
              <>
                <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium rounded-lg transition-colors">
                  <Download size={14} />
                  Invoice
                </button>
                <Link
                  href={`tel:+919805271636`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Phone size={14} />
                  Contact Hotel
                </Link>
              </>
            )}

            {booking.status === 'PENDING_CASH' && (
              <div className="flex items-center gap-2 text-amber-500 text-xs font-medium bg-amber-500/10 px-3 py-2 rounded-lg">
                <AlertCircle size={14} />
                Please arrive by 1:00 PM on check-in day
              </div>
            )}

            {booking.status === 'COMPLETED' && (
              <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-amber-500 text-sm font-medium rounded-lg transition-colors">
                <Star size={14} />
                Write a Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
