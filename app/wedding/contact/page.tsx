import Image from 'next/image';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export const metadata = {
  title: "Book Your Wedding Venue - Enquire Now | Shani Marriage Palace",
  description: "Get in touch with our wedding coordinators to book your dream wedding venue at Shani Marriage Palace, Dehra Gopipur."
};

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a0a0a]">
      {/* Hero Banner */}
      <div className="relative pt-32 pb-20 flex items-center justify-center min-h-[40vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a] via-rose-950/50 to-[#1a0a0a] z-10" />
        <Image src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000" alt="Contact" fill className="object-cover opacity-20 z-0" />
        
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-serif text-amber-400 mb-4">Start Planning</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Get in touch with our wedding specialists to bring your vision to life.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          
          {/* Contact Information */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-3xl font-serif text-white mb-8">Contact Information</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-900/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Enquiries</h3>
                  <p className="text-xl text-white font-medium">+91 9805271636</p>
                  <p className="text-gray-400 text-sm mt-1">Ask for Priya (Wedding Coordinator)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center text-green-400 shrink-0">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">WhatsApp</h3>
                  <p className="text-xl text-white font-medium">+91 9805271636</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Email</h3>
                  <p className="text-lg text-white">weddings@vishramsthal.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-900/30 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Location</h3>
                  <p className="text-gray-300 leading-relaxed">Shani Marriage Palace, Word No. 6,<br />Dehra Gopipur, Himachal Pradesh<br />India - 177101</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-serif text-white mb-2">Want to see the venues?</h3>
              <p className="text-gray-400 text-sm mb-6">Experience the magic in person. We'd love to show you around.</p>
              <button className="w-full py-3 bg-amber-500 text-gray-900 font-bold rounded-lg hover:bg-amber-400 transition-colors">
                Schedule a Site Visit
              </button>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-gray-900 p-8 md:p-10 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              
              <h2 className="text-3xl font-serif text-rose-300 mb-2 relative z-10">Wedding Enquiry Form</h2>
              <p className="text-gray-400 mb-8 relative z-10">Fill out the details below and our team will get back to you with a customized proposal.</p>
              
              <form className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Names of Bride & Groom *</label>
                    <input type="text" className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white outline-none focus:border-rose-500 transition-colors" placeholder="e.g. Rahul & Priya" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Contact Number *</label>
                    <input type="tel" className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white outline-none focus:border-rose-500 transition-colors" placeholder="+91 98765 43210" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address *</label>
                    <input type="email" className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white outline-none focus:border-rose-500 transition-colors" placeholder="you@example.com" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Preferred Wedding Date</label>
                    <input type="date" className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white outline-none focus:border-rose-500 transition-colors [color-scheme:dark]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Guest Count</label>
                    <select className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white outline-none focus:border-rose-500 transition-colors appearance-none">
                      <option>Under 100</option>
                      <option>100 - 200</option>
                      <option>200 - 500</option>
                      <option>500 - 800</option>
                      <option>800+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Event Type</label>
                    <select className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white outline-none focus:border-rose-500 transition-colors appearance-none">
                      <option>Wedding Ceremony</option>
                      <option>Reception</option>
                      <option>Pre-wedding (Mehendi/Sangeet)</option>
                      <option>Complete Package</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Venue Preference</label>
                    <select className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white outline-none focus:border-rose-500 transition-colors appearance-none">
                      <option>Not Sure Yet</option>
                      <option>Indoor Banquet</option>
                      <option>Outdoor Lawn</option>
                      <option>Terrace View</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Additional Requirements / Messages</label>
                  <textarea rows={4} className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white outline-none focus:border-rose-500 transition-colors resize-none" placeholder="Tell us more about your dream wedding..."></textarea>
                </div>

                <button type="button" className="w-full py-5 bg-rose-600 text-white font-bold text-lg rounded-xl hover:bg-rose-500 transition-colors shadow-lg shadow-rose-600/30">
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
