'use client';

import { useState } from 'react';
import Reveal from '@/components/Reveal';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error('Failed to send message.');
      }
    } catch (err) {
      toast.error('An error occurred.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-32 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal>
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">We'd love to hear from you. Get in touch with us.</p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16">
          <Reveal delay={100}>
            <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 h-full">
              <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-xl focus:border-orange-500 outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-xl focus:border-orange-500 outline-none transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-xl focus:border-orange-500 outline-none transition-colors" placeholder="+91 9999999999" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Your Message</label>
                  <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-xl focus:border-orange-500 outline-none transition-colors resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button disabled={loading} type="submit" className="w-full py-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-bold rounded-xl transition-transform transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:transform-none">
                  {loading ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="space-y-8 h-full flex flex-col">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-10 rounded-3xl shadow-2xl flex-1">
                <h3 className="text-3xl font-bold mb-8">Hotel Details</h3>
                <div className="space-y-8 text-lg">
                  <div className="flex items-start gap-6">
                    <span className="text-4xl">📍</span>
                    <div>
                      <p className="font-extrabold mb-1">Location</p>
                      <p className="opacity-90">Word No. 6, Dehra Gopipur<br/>Himachal Pradesh, India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <span className="text-4xl">📞</span>
                    <div>
                      <p className="font-extrabold mb-1">Phone</p>
                      <p className="opacity-90">+91 9815271636</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <span className="text-4xl">💬</span>
                    <div>
                      <p className="font-extrabold mb-1">WhatsApp</p>
                      <p className="opacity-90"><a href="https://wa.me/918988478367" target="_blank" rel="noopener noreferrer" className="hover:underline">+91 8988478367</a></p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <span className="text-4xl">✉️</span>
                    <div>
                      <p className="font-extrabold mb-1">Email</p>
                      <p className="opacity-90">info@vishramsthal.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Operating Hours</h3>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 font-medium text-lg">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-4">
                    <span>Check-in Time</span> 
                    <span className="bg-gray-100 dark:bg-gray-700 px-4 py-1 rounded-full">12:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-4">
                    <span>Check-out Time</span> 
                    <span className="bg-gray-100 dark:bg-gray-700 px-4 py-1 rounded-full">11:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Reception</span> 
                    <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-4 py-1 rounded-full font-bold">24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
