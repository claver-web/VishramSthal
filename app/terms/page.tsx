'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Printer, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUp
} from 'lucide-react';

export default function TermsPage() {
  const lastUpdated = "August 2, 2026";

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const tableOfContents = [
    { id: 'definitions', label: '1. Definitions' },
    { id: 'booking', label: '2. Booking & Reservations' },
    { id: 'checkin', label: '3. Check-In & Check-Out' },
    { id: 'payment', label: '4. Payment Terms' },
    { id: 'cancellation', label: '5. Cancellation & Refund Policy' },
    { id: 'conduct', label: '6. Guest Conduct & Responsibilities' },
    { id: 'pets', label: '7. Pet Policy' },
    { id: 'parking', label: '8. Parking' },
    { id: 'privacy', label: '9. Privacy & Data Protection' },
    { id: 'liability', label: '10. Liability & Disclaimers' },
    { id: 'photography', label: '11. Photography & Marketing' },
    { id: 'disputes', label: '12. Complaints & Disputes' },
    { id: 'amendments', label: '13. Amendments' },
    { id: 'contact', label: '14. Contact Information' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 pt-28 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-amber-500/30 selection:text-amber-200">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8 font-medium print:hidden">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-neutral-600" />
          <span className="text-amber-400 font-semibold">Terms & Conditions</span>
        </nav>

        {/* Page Header */}
        <div className="relative border-b border-amber-500/20 pb-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> Legal Agreement
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500">
                Terms & Conditions
              </h1>
              <p className="text-neutral-400 text-sm mt-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400/70" />
                <span>Last Updated: <strong className="text-neutral-200">{lastUpdated}</strong></span>
              </p>
            </div>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="print:hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-amber-300 transition-all shadow-lg text-sm font-medium self-start md:self-auto cursor-pointer"
              title="Print Terms & Conditions"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print Terms</span>
            </button>
          </div>

          <p className="text-neutral-300 text-base md:text-lg leading-relaxed mt-6 bg-neutral-900/60 border border-neutral-800 p-5 rounded-2xl">
            Welcome to <strong className="text-amber-300 font-semibold">Vishram Sthal</strong>. By accessing our website, making a booking, or staying at our property, you agree to these Terms & Conditions. Please read them carefully.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-neutral-900/80 border border-amber-500/25 rounded-2xl p-6 mb-12 shadow-xl backdrop-blur-sm print:hidden">
          <h2 className="text-lg font-serif font-semibold text-amber-400 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            Table of Contents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-sm">
            {tableOfContents.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-neutral-300 hover:text-amber-300 hover:bg-amber-500/10 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 truncate"
              >
                <span className="text-amber-400 font-bold">•</span>
                <span className="truncate">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 text-neutral-300 leading-relaxed text-sm sm:text-base font-sans">
          
          {/* Section 1 */}
          <section id="definitions" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-4 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">1</span>
              DEFINITIONS
            </h2>
            <div className="space-y-3">
              <p><strong className="text-white">"Hotel", "We", "Us", "Our"</strong> refers to Vishram Sthal.</p>
              <p><strong className="text-white">"Guest", "You", "Your"</strong> refers to the person making the booking or staying at the hotel.</p>
              <p><strong className="text-white">"Booking"</strong> means a reservation for accommodation at Vishram Sthal.</p>
              <p><strong className="text-white">"Property"</strong> means Vishram Sthal located at Word No. 6, Dehra Gopipur, Himachal Pradesh.</p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="booking" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-6 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">2</span>
              BOOKING & RESERVATIONS
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">2.1 Booking Confirmation</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>All bookings are subject to availability and confirmation by Vishram Sthal.</li>
                  <li>A booking is considered confirmed only after you receive a confirmation email or SMS from us.</li>
                  <li>For online payments, booking is confirmed after successful payment verification.</li>
                  <li>For cash on arrival bookings, the room is held provisionally until 1:00 PM on the check-in date.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">2.2 Identification Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>All guests must present valid government-issued photo identification at check-in.</li>
                  <li><strong className="text-white">Acceptable IDs:</strong> Aadhaar Card, Passport, Voter ID, Driving License.</li>
                  <li><strong className="text-amber-400">PAN Card is NOT accepted</strong> as ID proof for hotel stays as per regulations.</li>
                  <li>Foreign nationals must present a valid passport and visa.</li>
                  <li>Guests without valid ID will not be allowed to check in, and the booking may be cancelled without refund.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">2.3 Age Restriction</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>The primary guest making the reservation must be at least 18 years of age.</li>
                  <li>Guests under 18 must be accompanied by a parent or legal guardian.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">2.4 Group Bookings</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>Bookings of 3 or more rooms are considered group bookings.</li>
                  <li>Group bookings may have different cancellation policies and payment terms.</li>
                  <li>Please contact us directly for group booking inquiries and custom arrangements.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="checkin" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-6 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">3</span>
              CHECK-IN & CHECK-OUT
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">3.1 Check-in Time</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>Standard check-in time: <strong className="text-white">2:00 PM</strong>.</li>
                  <li>Early check-in is subject to room availability and may incur additional charges:</li>
                  <li className="pl-6 text-neutral-400">Early check-in before 8:00 AM: 50% of full room rate.</li>
                  <li className="pl-6 text-neutral-400">Early check-in between 8:00 AM and 12:00 PM: 25% of room rate.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">3.2 Check-out Time</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>Standard check-out time: <strong className="text-white">11:00 AM</strong>.</li>
                  <li>Late check-out is subject to availability and may incur additional charges:</li>
                  <li className="pl-6 text-neutral-400">Late check-out until 2:00 PM: 25% of room rate.</li>
                  <li className="pl-6 text-neutral-400">Late check-out after 2:00 PM: 50% of room rate.</li>
                  <li className="pl-6 text-neutral-400">Late check-out after 6:00 PM: Full night charge applies.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">3.3 Late Arrival</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>If you expect to arrive after 8:00 PM, please inform our front desk in advance.</li>
                  <li>For cash on arrival bookings, failure to arrive by 1:00 PM on the check-in date without prior notification will result in automatic cancellation.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="payment" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-6 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">4</span>
              PAYMENT TERMS
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">4.1 Online Payments</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>Full payment is required at the time of booking for online reservations.</li>
                  <li>We accept payments via UPI, Credit Cards, Debit Cards, Net Banking, and Mobile Wallets processed securely through Razorpay.</li>
                  <li>All online payment transactions are encrypted using SSL security.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">4.2 Cash on Arrival</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>Cash payment option is available for select provisional bookings.</li>
                  <li>Room is held provisionally until 1:00 PM on the check-in date.</li>
                  <li>You must call us at <strong className="text-amber-400">+91 9815271636 / +91 8988478367</strong> at least 2 hours before arrival to confirm.</li>
                  <li>If you fail to arrive by 1:00 PM, your booking will be automatically cancelled.</li>
                  <li>Full payment in cash must be made at the reception during check-in.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">4.3 Taxes</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>All prices displayed include applicable GST (Goods and Services Tax).</li>
                  <li>Any changes in government tax rates will be applied accordingly.</li>
                  <li>A GST tax invoice will be issued for all bookings upon request.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">4.4 Additional Charges</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li><strong className="text-white">Extra Guests:</strong> ₹500 per person per night beyond standard room capacity.</li>
                  <li><strong className="text-white">Extra Bed/Mattress:</strong> ₹500 per night (subject to availability).</li>
                  <li><strong className="text-white">Property Damage:</strong> Charged at actual repair or replacement cost.</li>
                  <li><strong className="text-white">Lost Keys:</strong> ₹500 key replacement fee.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="cancellation" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 border-l-4 border-l-amber-500">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-6 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">5</span>
              CANCELLATION & REFUND POLICY
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">5.1 Online Payment Bookings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
                  <div className="bg-neutral-900 p-4 rounded-xl border border-emerald-500/30 text-center">
                    <p className="text-emerald-400 font-bold text-sm">Free Cancellation</p>
                    <p className="text-xs text-neutral-400 mt-1">Up to 48 hours before check-in date (100% refund)</p>
                  </div>
                  <div className="bg-neutral-900 p-4 rounded-xl border border-amber-500/30 text-center">
                    <p className="text-amber-400 font-bold text-sm">50% Refund</p>
                    <p className="text-xs text-neutral-400 mt-1">Between 24-48 hours before check-in</p>
                  </div>
                  <div className="bg-neutral-900 p-4 rounded-xl border border-red-500/30 text-center">
                    <p className="text-red-400 font-bold text-sm">No Refund</p>
                    <p className="text-xs text-neutral-400 mt-1">Less than 24 hours before check-in or No-Show</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">5.2 Cash on Arrival Bookings</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>Free cancellation at any time prior to the check-in date.</li>
                  <li>No cancellation fee for no-shows (provisional booking auto-cancels at 1:00 PM).</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">5.3 Refund Processing</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>Approved refunds for online payments will be processed within 7 to 10 business days.</li>
                  <li>Refunds will be credited to the original payment source method.</li>
                  <li>Third-party payment processor transaction fees (if applicable) are non-refundable.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">5.4 Cancellation by Hotel</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>Vishram Sthal reserves the right to cancel any booking under exceptional unforeseen circumstances.</li>
                  <li>In such cases, a 100% full refund will be provided immediately.</li>
                  <li>We will notify you at the earliest via email, SMS, and telephone.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">5.5 Date Modification</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>Date change requests are subject to room availability and potential rate differences.</li>
                  <li>No modification fee is charged, but any room rate difference must be settled.</li>
                  <li>Modification requests must be submitted at least 48 hours before original check-in time.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="conduct" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-6 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">6</span>
              GUEST CONDUCT & RESPONSIBILITIES
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">6.1 Behavior</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>Guests are expected to maintain decorum and respect other guests and staff.</li>
                  <li>Loud music, parties, or disruptive behavior is strictly prohibited after 10:00 PM.</li>
                  <li>Any illegal activity will result in immediate eviction and law enforcement reporting without refund.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">6.2 Property Damage</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>Guests are liable for any loss or damage caused to the room, furniture, or hotel fixtures.</li>
                  <li>Charges will be assessed based on actual repair or replacement costs.</li>
                  <li>Hotel management reserves the right to charge the guest directly for damages.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">6.3 Smoking & Alcohol</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>All guest rooms at Vishram Sthal are <strong className="text-white uppercase font-bold">100% Non-Smoking</strong>.</li>
                  <li>Smoking is permitted only in designated outdoor areas.</li>
                  <li>A deep-cleaning restoration fee of <strong className="text-amber-400">₹2,000</strong> will be charged for smoking inside guest rooms.</li>
                  <li>Alcohol consumption is permitted only inside private guest rooms.</li>
                  <li>Disorderly or intoxicated behavior in public hotel areas will not be tolerated.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">6.4 Visitors</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>Visitors are permitted only in the lobby area.</li>
                  <li>Visitors are strictly not allowed inside guest rooms for security reasons.</li>
                  <li>All visitors must present valid ID and register at the reception desk.</li>
                  <li>Visitor hours: <strong className="text-white">8:00 AM to 8:00 PM</strong>.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">6.5 Valuables</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>An electronic digital safe is provided in guest rooms for securing personal valuables.</li>
                  <li>The hotel management accepts no liability for loss of cash or valuables left unattended.</li>
                  <li>Please report any misplaced items immediately to the front desk.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section id="pets" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-4 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">7</span>
              PET POLICY
            </h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 pl-2">
              <li>Pets are <strong className="text-white font-semibold">NOT allowed</strong> inside Vishram Sthal hotel premises.</li>
              <li>Service animals (guide dogs) are permitted with prior notice and proper legal certification documents.</li>
              <li>Please notify front desk in advance if you require accommodation for a certified service animal.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section id="parking" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-4 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">8</span>
              PARKING
            </h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 pl-2">
              <li>On-site parking is available for staying guests at no extra charge.</li>
              <li>Parking facilities are provided at the vehicle owner's sole risk.</li>
              <li>Vishram Sthal assumes no responsibility for damage, loss, or theft of vehicles or belongings.</li>
              <li>Parking spaces are allocated on a first-come, first-served basis.</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section id="privacy" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-4 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">9</span>
              PRIVACY & DATA PROTECTION
            </h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 pl-2">
              <li>We collect personal data solely for reservation processing and statutory legal compliance.</li>
              <li>Your personal data is encrypted and not shared with unauthorized third parties.</li>
              <li>Government ID copies are securely retained strictly as mandated by local law.</li>
              <li>For complete information, please refer to our official Privacy Policy.</li>
            </ul>
          </section>

          {/* Section 10 */}
          <section id="liability" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-6 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">10</span>
              LIABILITY & DISCLAIMERS
            </h2>
            <div className="space-y-4">
              <p className="font-semibold text-amber-200">10.1 Limitations of Liability</p>
              <p className="text-neutral-300">Vishram Sthal is not liable for:</p>
              <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-4">
                <li>Loss or damage to personal belongings or cash.</li>
                <li>Injury or illness during your stay (unless directly due to hotel negligence).</li>
                <li>Disruptions caused by force majeure events (natural disasters, power outages, extreme weather).</li>
                <li>Third-party services (taxis, tours, external vendors) arranged through or outside the hotel.</li>
              </ul>

              <p className="font-semibold text-amber-200 pt-2">10.2 Force Majeure</p>
              <p className="text-neutral-300">
                The hotel is not liable for failure to perform obligations due to events beyond reasonable control including natural disasters, strikes, government actions, civil emergencies, or pandemics.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section id="photography" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-4 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">11</span>
              PHOTOGRAPHY & MARKETING
            </h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 pl-2">
              <li>Guests may take photographs and videos for personal, non-commercial use.</li>
              <li>Commercial photography requires prior written permission from hotel management.</li>
              <li>By staying at Vishram Sthal, you consent to being included in CCTV security footage monitored for guest safety.</li>
            </ul>
          </section>

          {/* Section 12 */}
          <section id="disputes" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-4 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">12</span>
              COMPLAINTS & DISPUTES
            </h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 pl-2">
              <li>Any complaints should be reported immediately to the front desk for prompt resolution.</li>
              <li>We will make every effort to resolve issues promptly and satisfactorily.</li>
              <li>Unresolved disputes are subject to the jurisdiction of courts in <strong className="text-white">Dehra Gopipur / Kangra District, Himachal Pradesh</strong>.</li>
              <li>Disputes will be governed by and construed in accordance with the laws of India.</li>
            </ul>
          </section>

          {/* Section 13 */}
          <section id="amendments" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-4 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">13</span>
              AMENDMENTS
            </h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 pl-2">
              <li>Vishram Sthal reserves the right to modify these Terms & Conditions at any time.</li>
              <li>Updated terms will be posted on our official website with the updated effective date.</li>
              <li>Continued use of our services constitutes full acceptance of updated terms.</li>
            </ul>
          </section>

          {/* Section 14 */}
          <section id="contact" className="scroll-mt-28 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-6 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">14</span>
              CONTACT INFORMATION
            </h2>
            
            <p className="text-neutral-300 mb-6">
              For any questions or inquiries about these Terms & Conditions, please contact:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-xl flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase font-bold text-amber-200 tracking-wider">Address</h4>
                  <p className="text-sm text-neutral-300 mt-0.5">Vishram Sthal, Word No. 6, Dehra Gopipur, Himachal Pradesh</p>
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-xl flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase font-bold text-amber-200 tracking-wider">Phone</h4>
                  <p className="text-sm text-neutral-300 mt-0.5">+91 9815271636<br />+91 8988478367</p>
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-xl flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase font-bold text-amber-200 tracking-wider">Email</h4>
                  <p className="text-sm text-neutral-300 mt-0.5">info@vishramsthal.com<br />reservations@vishramsthal.com</p>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer Acknowledgement Banner */}
        <div className="mt-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 text-center text-sm text-amber-200 font-medium">
          By making a booking or staying at Vishram Sthal, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
        </div>

      </div>
    </div>
  );
}
