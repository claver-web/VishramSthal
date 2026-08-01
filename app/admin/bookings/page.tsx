'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, Filter, Download, Printer, MoreVertical, Eye, 
  Edit, Trash2, Mail, FileText, CheckCircle, XCircle, 
  Clock, Calendar as CalendarIcon, ChevronLeft, ChevronRight,
  ArrowUpDown, X, User, MapPin, IndianRupee, Hash, AlertTriangle, Save, Loader2
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function BookingsPage() {
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [activeBooking, setActiveBooking] = useState<any>(null);
  const [editingBooking, setEditingBooking] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Any Status');
  const [paymentFilter, setPaymentFilter] = useState('Payment Status');
  const [tabFilter, setTabFilter] = useState<'all' | 'todayCheckIn' | 'checkOut'>('all');

  // Confirmation Modals state
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    ids: string[];
    isBulk: boolean;
  }>({ open: false, ids: [], isBulk: false });

  // Edit Form State
  const [editForm, setEditForm] = useState({
    guestName: '',
    guestPhone: '',
    roomId: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    totalPrice: 0,
    status: 'PENDING'
  });

  const fetchBookings = async () => {
    try {
      const { getBookings } = await import('./actions');
      const data = await getBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const { getRoomsList } = await import('./actions');
      const roomData = await getRoomsList();
      setRooms(roomData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchRooms();
  }, []);

  // Filter logic
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      !searchTerm ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.number.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'Any Status' || statusFilter === 'All' ||
      b.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesPayment =
      paymentFilter === 'Payment Status' || paymentFilter === 'All' ||
      b.paymentStatus.toLowerCase() === paymentFilter.toLowerCase();

    const todayStr = new Date().toLocaleDateString();
    const matchesTab =
      tabFilter === 'all' ||
      (tabFilter === 'todayCheckIn' && b.checkIn === todayStr) ||
      (tabFilter === 'checkOut' && b.checkOut === todayStr);

    return matchesSearch && matchesStatus && matchesPayment && matchesTab;
  });

  // Single Status Update
  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const { updateBookingStatus } = await import('./actions');
      const res = await updateBookingStatus(id, status);
      if (res.success) {
        toast.success(`Booking status updated to ${status}`);
        fetchBookings();
        if (activeBooking && activeBooking.id === id) {
          setActiveBooking({ ...activeBooking, status: status.charAt(0) + status.slice(1).toLowerCase(), rawStatus: status.toUpperCase() });
        }
      } else {
        toast.error(res.error || 'Failed to update status');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while updating status');
    }
  };

  // Bulk Status Update
  const handleBulkStatusUpdate = async (status: string) => {
    if (selectedBookings.length === 0) return;
    try {
      setActionLoading(true);
      const { bulkUpdateBookingStatus } = await import('./actions');
      const res = await bulkUpdateBookingStatus(selectedBookings, status);
      if (res.success) {
        toast.success(`Updated ${res.count} booking(s) to ${status}`);
        setSelectedBookings([]);
        fetchBookings();
      } else {
        toast.error(res.error || 'Failed to bulk update bookings');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while updating selected bookings');
    } finally {
      setActionLoading(false);
    }
  };

  // Execute Deletion
  const confirmAndDelete = async () => {
    if (deleteConfirm.ids.length === 0) return;
    try {
      setActionLoading(true);
      const { deleteBookings } = await import('./actions');
      const res = await deleteBookings(deleteConfirm.ids);
      if (res.success) {
        toast.success(`Successfully deleted ${res.count} booking(s)`);
        setSelectedBookings(selectedBookings.filter(id => !deleteConfirm.ids.includes(id)));
        if (activeBooking && deleteConfirm.ids.includes(activeBooking.id)) {
          setActiveBooking(null);
        }
        if (editingBooking && deleteConfirm.ids.includes(editingBooking.id)) {
          setEditingBooking(null);
        }
        fetchBookings();
      } else {
        toast.error(res.error || 'Failed to delete bookings');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete selected bookings');
    } finally {
      setActionLoading(false);
      setDeleteConfirm({ open: false, ids: [], isBulk: false });
    }
  };

  // Open Edit Modal
  const openEditModal = (booking: any) => {
    setEditingBooking(booking);
    setEditForm({
      guestName: booking.guest !== 'Unknown' ? booking.guest : '',
      guestPhone: booking.phone !== 'No phone' ? booking.phone : '',
      roomId: booking.roomId || '',
      checkIn: booking.rawCheckIn || '',
      checkOut: booking.rawCheckOut || '',
      guests: booking.guests || 1,
      totalPrice: booking.amount || 0,
      status: booking.rawStatus || 'PENDING'
    });
  };

  // Save Edit Details
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;

    try {
      setActionLoading(true);
      const { updateBookingDetails } = await import('./actions');
      const res = await updateBookingDetails(editingBooking.id, editForm);
      if (res.success) {
        toast.success('Booking details updated successfully!');
        setEditingBooking(null);
        fetchBookings();
        if (activeBooking && activeBooking.id === editingBooking.id) {
          // Re-fetch active booking details or update activeBooking state
          fetchBookings();
        }
      } else {
        toast.error(res.error || 'Failed to update booking details');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error saving booking details');
    } finally {
      setActionLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedBookings.length === filteredBookings.length && filteredBookings.length > 0) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(filteredBookings.map(b => b.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedBookings.includes(id)) {
      setSelectedBookings(selectedBookings.filter(b => b !== id));
    } else {
      setSelectedBookings([...selectedBookings, id]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400';
      case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400';
      case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
      case 'no-show': return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'text-green-600 font-bold';
      case 'Pending': return 'text-yellow-600 font-bold';
      case 'Refunded': return 'text-gray-500 font-bold';
      default: return 'text-gray-500';
    }
  };

  // --- Render Edit Booking Modal ---
  const renderEditModal = () => {
    if (!editingBooking) return null;
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="relative w-full max-w-xl bg-white dark:bg-[#1e293b] rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0f172a] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-orange-100 dark:bg-orange-500/10 rounded-2xl text-[#ea580c]">
                <Edit className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white">Edit Booking</h2>
                <p className="text-xs text-gray-500 font-mono">ID: {editingBooking.id}</p>
              </div>
            </div>
            <button 
              onClick={() => setEditingBooking(null)}
              className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSaveEdit} className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  Guest Name
                </label>
                <input
                  type="text"
                  value={editForm.guestName}
                  onChange={(e) => setEditForm({ ...editForm, guestName: e.target.value })}
                  placeholder="Guest Full Name"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:border-[#ea580c] outline-none dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={editForm.guestPhone}
                  onChange={(e) => setEditForm({ ...editForm, guestPhone: e.target.value })}
                  placeholder="Phone Number"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:border-[#ea580c] outline-none dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Select Room
              </label>
              <select
                value={editForm.roomId}
                onChange={(e) => setEditForm({ ...editForm, roomId: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:border-[#ea580c] outline-none dark:text-white"
              >
                <option value="">-- Keep Current Room --</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name || `Room ${r.number}`} ({r.type} - ₹{r.price}/night)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  Check-In Date
                </label>
                <input
                  type="date"
                  value={editForm.checkIn}
                  onChange={(e) => setEditForm({ ...editForm, checkIn: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:border-[#ea580c] outline-none dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  Check-Out Date
                </label>
                <input
                  type="date"
                  value={editForm.checkOut}
                  onChange={(e) => setEditForm({ ...editForm, checkOut: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:border-[#ea580c] outline-none dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  Guests Count
                </label>
                <input
                  type="number"
                  min="1"
                  value={editForm.guests}
                  onChange={(e) => setEditForm({ ...editForm, guests: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:border-[#ea580c] outline-none dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  Total Price (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={editForm.totalPrice}
                  onChange={(e) => setEditForm({ ...editForm, totalPrice: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:border-[#ea580c] outline-none dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  Booking Status
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:border-[#ea580c] outline-none dark:text-white"
                >
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingBooking(null)}
                className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all flex items-center gap-2"
                disabled={actionLoading}
              >
                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // --- Render Delete Confirmation Modal ---
  const renderDeleteConfirmationModal = () => {
    if (!deleteConfirm.open) return null;
    const count = deleteConfirm.ids.length;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="relative w-full max-w-md bg-white dark:bg-[#1e293b] rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden p-6 text-center">
          <div className="w-14 h-14 bg-red-100 dark:bg-red-500/10 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
            Delete {deleteConfirm.isBulk ? `${count} Selected Bookings` : 'Booking'}?
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Are you sure you want to permanently delete {deleteConfirm.isBulk ? `these ${count} bookings` : 'this booking'}? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setDeleteConfirm({ open: false, ids: [], isBulk: false })}
              className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex-1"
              disabled={actionLoading}
            >
              Cancel
            </button>
            <button
              onClick={confirmAndDelete}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 transition-colors flex-1 flex items-center justify-center gap-2"
              disabled={actionLoading}
            >
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              Delete Permanently
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- Render Detailed Slide-over Panel ---
  const renderDetailsPanel = () => {
    if (!activeBooking) return null;
    return (
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-fade-in">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50" onClick={() => setActiveBooking(null)}></div>
        
        {/* Panel */}
        <div className="relative w-full max-w-2xl bg-white dark:bg-[#0f172a] h-full shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0 border-l border-gray-100 dark:border-gray-800">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#1e293b] flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                  <Hash className="w-5 h-5 text-[#ea580c]" /> {activeBooking.id}
                </h2>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(activeBooking.status)}`}>
                  {activeBooking.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Created: {activeBooking.date}</p>
            </div>
            <button onClick={() => setActiveBooking(null)} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            {/* Guest Info */}
            <section className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-sm font-bold text-[#ea580c] uppercase tracking-wider mb-4 flex items-center gap-2">
                <User className="w-4 h-4" /> Guest Information
              </h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Full Name</p>
                  <p className="font-bold text-gray-900 dark:text-white">{activeBooking.guest}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Contact</p>
                  <p className="font-bold text-gray-900 dark:text-white">{activeBooking.phone}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{activeBooking.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Loyalty Status</p>
                  <p className="font-bold text-gray-900 dark:text-white">{activeBooking.loyalty} previous stays</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Special Requests</p>
                  <p className="font-medium text-red-500 text-sm bg-red-50 dark:bg-red-500/10 p-2 rounded-lg mt-1">{activeBooking.requests}</p>
                </div>
              </div>
            </section>

            {/* Stay Details */}
            <section className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-sm font-bold text-[#ea580c] uppercase tracking-wider mb-4 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" /> Stay Details
              </h3>
              <div className="flex gap-4 items-start mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                <div className="w-24 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1590490359683-658d3d23f972" alt="Room" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-black text-lg text-gray-900 dark:text-white">{activeBooking.room}</p>
                  <p className="text-sm font-bold text-gray-500 dark:text-gray-400">{activeBooking.type} • Room {activeBooking.number}</p>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">{activeBooking.guests} Guests</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">Check-in</p>
                  <p className="font-bold text-gray-900 dark:text-white">{activeBooking.checkIn}</p>
                  <p className="text-xs text-gray-400 mt-0.5">12:00 PM</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="h-px w-full bg-gray-300 dark:bg-gray-700 relative">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#1e293b] px-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                      {activeBooking.nights} Nights
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">Check-out</p>
                  <p className="font-bold text-gray-900 dark:text-white">{activeBooking.checkOut}</p>
                  <p className="text-xs text-gray-400 mt-0.5">11:00 AM</p>
                </div>
              </div>
            </section>

            {/* Payment Details */}
            <section className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-sm font-bold text-[#ea580c] uppercase tracking-wider mb-4 flex items-center gap-2">
                <IndianRupee className="w-4 h-4" /> Payment Details
              </h3>
              <div className="bg-gray-50 dark:bg-[#0f172a] p-4 rounded-xl border border-gray-100 dark:border-gray-800 space-y-3 mb-4">
                <div className="flex justify-between font-black text-lg text-gray-900 dark:text-white">
                  <span>Total Amount</span>
                  <span className="text-[#ea580c]">₹{activeBooking.amount}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Payment Status: <span className={getPaymentStatusColor(activeBooking.paymentStatus)}>{activeBooking.paymentStatus}</span></p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Transaction ID: <span className="font-mono text-gray-900 dark:text-white">{activeBooking.razorpayId}</span></p>
                </div>
              </div>
            </section>
          </div>

          {/* Action Footer */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#1e293b] flex justify-between gap-3">
            {activeBooking.status === 'Pending' && (
              <button onClick={() => handleUpdateStatus(activeBooking.id, 'Confirmed')} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-xl transition-colors shadow-lg shadow-green-500/20 text-sm">
                Confirm
              </button>
            )}
            {activeBooking.status === 'Confirmed' && (
              <button onClick={() => handleUpdateStatus(activeBooking.id, 'Completed')} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl transition-colors shadow-lg shadow-blue-500/20 text-sm">
                Complete
              </button>
            )}
            <button 
              onClick={() => openEditModal(activeBooking)} 
              className="px-5 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-2.5 rounded-xl transition-colors text-sm flex items-center gap-1.5"
            >
              <Edit className="w-4 h-4" /> Edit
            </button>
            <button 
              onClick={() => setDeleteConfirm({ open: true, ids: [activeBooking.id], isBulk: false })}
              className="px-4 bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 font-bold py-2.5 rounded-xl transition-colors text-sm flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">All Bookings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage, update, edit, and track reservations seamlessly.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/bookings/calendar" className="bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-5 py-2.5 rounded-xl font-bold shadow-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Calendar View
          </Link>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ID, Name, Email, Phone..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-[#ea580c] outline-none transition-colors dark:text-white font-medium"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 outline-none"
            >
              <option value="Any Status">Any Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            
            <select 
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 outline-none"
            >
              <option value="Payment Status">Payment Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>

            {(searchTerm || statusFilter !== 'Any Status' || paymentFilter !== 'Payment Status') && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('Any Status');
                  setPaymentFilter('Payment Status');
                }}
                className="px-3 py-2 text-xs font-bold text-red-500 hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedBookings.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-900/30 rounded-xl animate-fade-in">
            <span className="text-sm font-bold text-[#ea580c]">{selectedBookings.length} booking(s) selected</span>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => handleBulkStatusUpdate('CONFIRMED')}
                disabled={actionLoading}
                className="px-3 py-1.5 text-sm font-bold bg-white dark:bg-[#0f172a] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#ea580c] transition-colors flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-green-500" /> Mark Confirmed
              </button>
              <button 
                onClick={() => handleBulkStatusUpdate('COMPLETED')}
                disabled={actionLoading}
                className="px-3 py-1.5 text-sm font-bold bg-white dark:bg-[#0f172a] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#ea580c] transition-colors flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-blue-500" /> Mark Completed
              </button>
              <button 
                onClick={() => handleBulkStatusUpdate('CANCELLED')}
                disabled={actionLoading}
                className="px-3 py-1.5 text-sm font-bold bg-white dark:bg-[#0f172a] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#ea580c] transition-colors flex items-center gap-2"
              >
                <XCircle className="w-4 h-4 text-yellow-500" /> Cancel Selected
              </button>
              <button 
                onClick={() => setDeleteConfirm({ open: true, ids: selectedBookings, isBulk: true })}
                disabled={actionLoading}
                className="px-3 py-1.5 text-sm font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <Trash2 className="w-4 h-4" /> Delete Selected ({selectedBookings.length})
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Data Table */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-[#0f172a]/50">
          <div className="flex gap-2">
            <button 
              onClick={() => setTabFilter('all')} 
              className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${tabFilter === 'all' ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              All
            </button>
            <button 
              onClick={() => setTabFilter('todayCheckIn')} 
              className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${tabFilter === 'todayCheckIn' ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              Today's Check-ins
            </button>
            <button 
              onClick={() => setTabFilter('checkOut')} 
              className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${tabFilter === 'checkOut' ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              Check-outs
            </button>
          </div>
          <div className="text-xs font-semibold text-gray-500">
            Total: {filteredBookings.length} bookings
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-[#0f172a] text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 w-12">
                  <input 
                    type="checkbox" 
                    checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0} 
                    onChange={toggleSelectAll} 
                    className="rounded border-gray-300 text-[#ea580c] focus:ring-[#ea580c]" 
                  />
                </th>
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Guest</th>
                <th className="px-6 py-4">Room & Dates</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center gap-2 font-medium">
                      <Loader2 className="w-5 h-5 animate-spin text-[#ea580c]" /> Loading bookings...
                    </div>
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                      <CalendarIcon className="w-12 h-12 mb-3 text-gray-300 dark:text-gray-600" />
                      <p className="font-medium">No bookings found.</p>
                      <p className="text-sm mt-1">Try resetting search filters or adding a new booking.</p>
                    </div>
                  </td>
                </tr>
              ) : filteredBookings.map((b) => (
                <tr key={b.id} className={`hover:bg-orange-50/30 dark:hover:bg-[#0f172a]/50 transition-colors ${selectedBookings.includes(b.id) ? 'bg-orange-50/50 dark:bg-orange-500/5' : ''}`}>
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedBookings.includes(b.id)} 
                      onChange={() => toggleSelect(b.id)} 
                      className="rounded border-gray-300 text-[#ea580c] focus:ring-[#ea580c]" 
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => setActiveBooking(b)} className="font-mono font-bold text-[#ea580c] hover:underline">{b.id}</button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{b.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 dark:text-white">{b.guest}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{b.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-700 dark:text-gray-300">{b.room}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {b.checkIn} to {b.checkOut} ({b.nights}N)
                    </p>
                  </td>
                  <td className="px-6 py-4 font-black text-gray-900 dark:text-white">
                    ₹{b.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${getPaymentStatusColor(b.paymentStatus)}`}>{b.paymentStatus}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getStatusColor(b.status)}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => setActiveBooking(b)} 
                        className="p-2 text-gray-500 hover:text-[#ea580c] transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" 
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openEditModal(b)} 
                        className="p-2 text-gray-500 hover:text-blue-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" 
                        title="Edit Booking"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setDeleteConfirm({ open: true, ids: [b.id], isBulk: false })} 
                        className="p-2 text-gray-500 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" 
                        title="Delete Booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {renderDetailsPanel()}
      {renderEditModal()}
      {renderDeleteConfirmationModal()}
    </div>
  );
}
