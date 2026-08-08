'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AddBookingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [venues, setVenues] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    venueId: '',
    brideName: '',
    groomName: '',
    phone: '',
    email: '',
    eventDate: '',
    guestCount: '',
    totalAmount: '',
    advancePaid: '0',
    status: 'PENDING',
    paymentMethod: 'ONLINE',
    specialRequirements: ''
  });

  useEffect(() => {
    fetch('/api/wedding/venues')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setVenues(data);
      })
      .catch(() => toast.error('Failed to load venues'));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.venueId) {
      toast.error('Please select a venue');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch('/api/wedding/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          eventDate: new Date(formData.eventDate).toISOString(),
          guestCount: parseInt(formData.guestCount) || 0,
          totalAmount: parseFloat(formData.totalAmount) || 0,
          advancePaid: parseFloat(formData.advancePaid) || 0,
        })
      });
      
      if (!res.ok) throw new Error('Failed to create booking');
      
      toast.success('Booking created successfully!');
      router.push('/admin/wedding/bookings');
    } catch (error) {
      toast.error('Failed to create booking');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-16 bg-gray-50/80 dark:bg-[#0f172a]/80 backdrop-blur-md z-20 py-4 -mx-4 px-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <Link href="/admin/wedding/bookings" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Create Wedding Booking</h1>
            <p className="text-xs font-bold text-gray-500 mt-0.5">Manually enter a new booking</p>
          </div>
        </div>
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-bold shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save Booking'}
        </button>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Client Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Bride Name</label>
                <input name="brideName" value={formData.brideName} onChange={handleChange} type="text" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 outline-none" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Groom Name</label>
                <input name="groomName" value={formData.groomName} onChange={handleChange} type="text" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 outline-none" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Phone</label>
                <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 outline-none" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Email (Optional)</label>
                <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 outline-none" />
              </div>
            </div>
          </div>

          <hr className="border-gray-100 dark:border-gray-800" />

          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Event Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Venue</label>
                <select name="venueId" value={formData.venueId} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 outline-none" required>
                  <option value="">Select a Venue</option>
                  {venues.map(v => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Event Date</label>
                <input name="eventDate" value={formData.eventDate} onChange={handleChange} type="date" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 outline-none" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Guest Count</label>
                <input name="guestCount" value={formData.guestCount} onChange={handleChange} type="number" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 outline-none" required />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Special Requirements</label>
                <textarea name="specialRequirements" value={formData.specialRequirements} onChange={handleChange} rows={3} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 outline-none resize-none"></textarea>
              </div>
            </div>
          </div>

          <hr className="border-gray-100 dark:border-gray-800" />

          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Payment & Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Total Amount (₹)</label>
                <input name="totalAmount" value={formData.totalAmount} onChange={handleChange} type="number" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 outline-none" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Advance Paid (₹)</label>
                <input name="advancePaid" value={formData.advancePaid} onChange={handleChange} type="number" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Payment Method</label>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 outline-none">
                  <option value="ONLINE">Online / UPI</option>
                  <option value="CASH">Cash</option>
                  <option value="BANK_TRANSFER">Bank Transfer</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Booking Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 outline-none">
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
