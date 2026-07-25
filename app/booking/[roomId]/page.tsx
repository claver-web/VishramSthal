'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Reveal from '@/components/Reveal';
import toast from 'react-hot-toast';
import { use } from 'react';
import PaymentButton from '@/components/PaymentButton';

export default function BookingPage({ params }: { params: Promise<{ roomId: string }> | { roomId: string } }) {
  // Handle Next.js 14 vs 15 params type change
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const roomId = resolvedParams.roomId;
  
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [room, setRoom] = useState<any>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
      toast.error('Please sign in to book a room.');
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${roomId}`);
        if (res.ok) {
          const data = await res.json();
          setRoom(data);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    if (roomId) fetchRoom();
  }, [roomId]);

  if (!isLoaded || !isSignedIn) return <div className="min-h-screen flex items-center justify-center text-2xl font-bold dark:text-white">Loading...</div>;

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays > 0 ? diffDays : 0;
  };

  const nights = calculateNights();
  const totalPrice = room ? nights * room.price : 0;

  const handlePayment = async () => {
    if (!checkIn || !checkOut) return toast.error('Please select check-in and check-out dates.');
    if (new Date(checkIn) >= new Date(checkOut)) return toast.error('Check-out must be after check-in.');
    
    toast.success('Proceeding to Razorpay checkout...');
    // We will implement Razorpay in the next steps
  };

  return (
    <div className="min-h-screen py-32 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 max-w-5xl">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900 dark:text-white">Complete Your Booking</h1>
        </Reveal>

        {loading ? (
          <div className="animate-pulse bg-white dark:bg-gray-800 h-[600px] rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700"></div>
        ) : room ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <Reveal delay={100}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-4 dark:border-gray-700">Guest Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                      <input type="text" disabled value={user?.fullName || ''} className="w-full p-4 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl font-medium text-gray-600 dark:text-gray-400 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                      <input type="email" disabled value={user?.primaryEmailAddress?.emailAddress || ''} className="w-full p-4 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl font-medium text-gray-600 dark:text-gray-400 cursor-not-allowed" />
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-4 dark:border-gray-700">Stay Details</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Check-in Date</label>
                      <input type="date" min={new Date().toISOString().split('T')[0]} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Check-out Date</label>
                      <input type="date" min={checkIn || new Date().toISOString().split('T')[0]} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors font-medium" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Number of Guests</label>
                      <input type="number" min="1" max={room.capacity} value={guests} onChange={(e) => setGuests(parseInt(e.target.value))} className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors font-medium" />
                      <p className="text-sm font-medium text-orange-500 mt-2">Maximum capacity: {room.capacity} guests</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-1 space-y-6">
              <Reveal delay={300}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 sticky top-32">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{room.type} Room</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium mb-6">Room Number: {room.number}</p>
                  
                  <div className="space-y-4 mb-8 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Included Amenities</h4>
                    {room.amenities.map((a: string) => (
                      <div key={a} className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <span className="mr-3 text-orange-500 text-lg">✓</span> {a}
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t-2 border-gray-100 dark:border-gray-700 pt-6 mb-8">
                    <div className="flex justify-between mb-3 text-lg">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">₹{room.price} x {nights} nights</span>
                      <span className="font-bold text-gray-900 dark:text-white">₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between font-black text-2xl mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-orange-500">₹{totalPrice}</span>
                    </div>
                  </div>

                  <PaymentButton 
                    roomId={roomId}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    guests={guests}
                    totalPrice={totalPrice}
                    userId={user?.id || ''}
                    disabled={totalPrice === 0}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="text-2xl text-gray-500 dark:text-gray-400 font-medium">Room not found or API not connected.</p>
          </div>
        )}
      </div>
    </div>
  );
}
