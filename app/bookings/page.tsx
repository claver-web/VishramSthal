import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar, Users, IndianRupee, Clock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const prisma = new PrismaClient();

export default async function UserBookingsPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in?redirect_url=/bookings');
  }

  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: { room: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-10 border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-100 tracking-tight">My Bookings</h1>
            <p className="text-neutral-400 mt-2">Manage and view your stay history.</p>
          </div>
          <Link href="/rooms">
            <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-500/50 text-amber-500 rounded-lg transition-colors font-medium">
              Book Another Stay <ArrowRight size={16} />
            </button>
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-12 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mb-6 text-neutral-600">
              <Calendar size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-neutral-200 mb-2">No bookings found</h3>
            <p className="text-neutral-500 max-w-md mb-8">You haven't made any reservations yet. Ready to experience luxury?</p>
            <Link href="/rooms">
              <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                Explore Rooms
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const statusConfig = {
                CONFIRMED: { color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: CheckCircle2 },
                PENDING: { color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: Clock },
                CANCELLED: { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: XCircle },
                COMPLETED: { color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: CheckCircle2 },
              };
              
              const currentStatus = statusConfig[booking.status] || statusConfig.PENDING;
              const StatusIcon = currentStatus.icon;

              return (
                <div key={booking.id} className="group flex flex-col md:flex-row bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden transition-all hover:bg-neutral-900/60 shadow-lg hover:shadow-xl">
                  {/* Room Image */}
                  <div className="w-full md:w-64 h-48 md:h-auto relative bg-neutral-800 shrink-0 overflow-hidden">
                    {booking.room.images?.[0] ? (
                      <Image 
                        src={booking.room.images[0]} 
                        alt={booking.room.name || 'Room'} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-600">
                        No Image
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${currentStatus.bg} ${currentStatus.color} ${currentStatus.border} backdrop-blur-md`}>
                        <StatusIcon size={14} />
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-neutral-100">{booking.room.name || `Room ${booking.room.number}`}</h3>
                        <p className="text-lg font-semibold text-amber-500 flex items-center">
                          <IndianRupee size={16} className="mr-0.5" />
                          {booking.totalPrice.toLocaleString('en-IN')}
                        </p>
                      </div>
                      <p className="text-sm text-neutral-500 mb-6">Booking ID: <span className="font-mono text-neutral-400">{booking.id}</span></p>

                      <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                        <div className="flex items-start gap-3">
                          <Calendar className="text-neutral-500 shrink-0 mt-0.5" size={18} />
                          <div>
                            <p className="text-xs text-neutral-500 mb-1">Check-in</p>
                            <p className="text-sm font-medium text-neutral-300">{format(new Date(booking.checkIn), 'MMM dd, yyyy')}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Calendar className="text-neutral-500 shrink-0 mt-0.5" size={18} />
                          <div>
                            <p className="text-xs text-neutral-500 mb-1">Check-out</p>
                            <p className="text-sm font-medium text-neutral-300">{format(new Date(booking.checkOut), 'MMM dd, yyyy')}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Users className="text-neutral-500 shrink-0 mt-0.5" size={18} />
                          <div>
                            <p className="text-xs text-neutral-500 mb-1">Guests</p>
                            <p className="text-sm font-medium text-neutral-300">{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <IndianRupee className="text-neutral-500 shrink-0 mt-0.5" size={18} />
                          <div>
                            <p className="text-xs text-neutral-500 mb-1">Payment</p>
                            <p className="text-sm font-medium text-neutral-300">Online</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
