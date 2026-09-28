"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

interface GuestDetails {
  fullName: string;
  email: string;
  phone: string;
  guests: number;
  specialRequests: string;
  arrivalTime: string;
  purpose: string;
}

interface GuestFormProps {
  onSubmit: (details: GuestDetails) => void;
  defaultValues?: Partial<GuestDetails>;
}

export default function GuestForm({ onSubmit, defaultValues }: GuestFormProps) {
  const { user, isLoaded } = useUser();
  const [formData, setFormData] = useState<GuestDetails>({
    fullName: defaultValues?.fullName || "",
    email: defaultValues?.email || "",
    phone: defaultValues?.phone || "",
    guests: defaultValues?.guests || 1,
    specialRequests: defaultValues?.specialRequests || "",
    arrivalTime: defaultValues?.arrivalTime || "",
    purpose: defaultValues?.purpose || "",
  });

  useEffect(() => {
    if (isLoaded && user && !defaultValues?.fullName && !defaultValues?.email) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [user, isLoaded, defaultValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl w-full max-w-2xl text-neutral-200">
      <h2 className="text-2xl font-serif text-amber-500 mb-6">Guest Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-400">Full Name</label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-400">Email Address</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-400">Phone Number</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors"
            placeholder="+91 98765 43210"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-400">Number of Guests</label>
          <select
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors appearance-none"
          >
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-400">Estimated Arrival Time</label>
          <input
            type="time"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-400">Purpose of Visit</label>
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors appearance-none"
          >
            <option value="">Select Purpose (Optional)</option>
            <option value="spiritual">Spiritual Retreat</option>
            <option value="leisure">Leisure / Vacation</option>
            <option value="business">Business</option>
            <option value="event">Event / Ceremony</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2 text-neutral-400">Special Requests</label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          rows={3}
          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors resize-none"
          placeholder="Any dietary requirements, room preferences, or accessibility needs?"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-amber-900/20"
      >
        Continue to Payment
      </button>
    </form>
  );
}
