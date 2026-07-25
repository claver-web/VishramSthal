'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Reveal from '@/components/Reveal';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function MyBookingsPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.id) return;
      try {
        const res = await fetch(`/api/bookings?userId=${user.id}`);
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    if (isLoaded && isSignedIn) fetchBookings();
  }, [user?.id, isLoaded, isSignedIn]);

  const handleCancel = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    try {
      const res = await fetch(`/api/bookings/${bookingId}/cancel`, { method: 'POST' });
      if (res.ok) {
        toast.success('Booking cancelled successfully');
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'CANCELLED' } : b));
      } else {
        toast.error('Failed to cancel booking');
      }
    } catch (err) {
      toast.error('An error occurred');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING': return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-yellow-200">PENDING</span>;
      case 'CONFIRMED': return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-green-200">CONFIRMED</span>;
      case 'CANCELLED': return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-red-200">CANCELLED</span>;
      case 'COMPLETED': return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-blue-200">COMPLETED</span>;
      default: return null;
    }
  };

  if (!isLoaded || !isSignedIn) return <div className="min-h-screen flex items-center justify-center text-xl font-bold dark:text-white">Loading...</div>;

  return (
    <div className="min-h-screen py-32 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 max-w-5xl">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900 dark:text-white">My Bookings</h1>
        </Reveal>

        {loading ? (
          <div className="space-y-6">
            {[1, 2].map(i => <div key={i} className="h-48 bg-white dark:bg-gray-800 animate-pulse rounded-3xl shadow-xl"></div>)}
          </div>
        ) : bookings.length === 0 ? (
          <Reveal delay={100}>
            <div className="bg-white dark:bg-gray-800 p-16 text-center rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
              <div className="text-6xl mb-6">🏨</div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No bookings found</h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">You haven't made any bookings with us yet.</p>
              <Link href="/rooms" className="px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-xl inline-block">
                Browse Rooms
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking, i) => (
              <Reveal key={booking.id} delay={i * 100}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-8 hover:-translate-y-1 transition-transform">
                  <div className="w-full md:w-auto flex-grow">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{booking.room?.type} Room</h3>
                      {getStatusBadge(booking.status)}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-4">Room No: {booking.room?.number}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl">
                      <div><strong className="block text-gray-400">Check-in</strong> {new Date(booking.checkIn).toLocaleDateString()}</div>
                      <div><strong className="block text-gray-400">Check-out</strong> {new Date(booking.checkOut).toLocaleDateString()}</div>
                      <div><strong className="block text-gray-400">Guests</strong> {booking.guests} Guests</div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-auto text-left md:text-right border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 pt-6 md:pt-0 md:pl-8 flex flex-col justify-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">Total Amount</p>
                    <p className="text-4xl font-black text-orange-500 mb-6">₹{booking.totalPrice}</p>
                    {(booking.status === 'PENDING' || booking.status === 'CONFIRMED') && (
                      <button 
                        onClick={() => handleCancel(booking.id)}
                        className="w-full md:w-auto px-8 py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-full font-bold transition-colors text-sm border border-red-200"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
