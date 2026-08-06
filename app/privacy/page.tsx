'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Lock, 
  Printer, 
  ChevronRight, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  FileText
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 2, 2026";

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const tableOfContents = [
    { id: 'collect', label: '1. Information We Collect' },
    { id: 'use', label: '2. How We Use Your Information' },
    { id: 'security', label: '3. Data Storage & Security' },
    { id: 'sharing', label: '4. Data Sharing' },
    { id: 'cookies', label: '5. Cookies' },
    { id: 'rights', label: '6. Your Rights' },
    { id: 'retention', label: '7. Data Retention' },
    { id: 'contact', label: '8. Contact Us' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 pt-28 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-amber-500/30 selection:text-amber-200">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8 font-medium print:hidden">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-neutral-600" />
          <span className="text-amber-400 font-semibold">Privacy Policy</span>
        </nav>

        {/* Page Header */}
        <div className="relative border-b border-amber-500/20 pb-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <Lock className="w-4 h-4 text-amber-400" /> Privacy & Data Protection
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500">
                Privacy Policy
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
              title="Print Privacy Policy"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print Policy</span>
            </button>
          </div>

          <p className="text-neutral-300 text-base md:text-lg leading-relaxed mt-6 bg-neutral-900/60 border border-neutral-800 p-5 rounded-2xl">
            At <strong className="text-amber-300 font-semibold">Vishram Sthal</strong>, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and safeguard your data when you visit our website or stay at our hotel.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-neutral-900/80 border border-amber-500/25 rounded-2xl p-6 mb-12 shadow-xl backdrop-blur-sm print:hidden">
          <h2 className="text-lg font-serif font-semibold text-amber-400 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            Table of Contents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-sm">
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
          <section id="collect" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-6 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">1</span>
              INFORMATION WE COLLECT
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">1.1 Personal Information</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Mailing address</li>
                  <li>Government ID details (as required by law)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">1.2 Booking Information</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>Room preferences</li>
                  <li>Stay dates</li>
                  <li>Payment information</li>
                  <li>Special requests</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">1.3 Technical Information</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-2">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Website usage data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="use" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-6 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">2</span>
              HOW WE USE YOUR INFORMATION
            </h2>
            <p className="text-neutral-300 mb-3">We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 pl-2">
              <li>Process and confirm your booking</li>
              <li>Communicate about your stay</li>
              <li>Send booking confirmations and reminders</li>
              <li>Improve our services</li>
              <li>Comply with legal requirements</li>
              <li>Send promotional offers <strong className="text-white">(only with your consent)</strong></li>
            </ul>
          </section>

          {/* Section 3 */}
          <section id="security" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-6 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">3</span>
              DATA STORAGE & SECURITY
            </h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 pl-2">
              <li>Your data is stored securely on encrypted servers.</li>
              <li>Payment information is processed through Razorpay's secure gateway.</li>
              <li>We do not store full credit/debit card details.</li>
              <li>We implement reasonable security measures to protect your data.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="sharing" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-6 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">4</span>
              DATA SHARING
            </h2>
            <div className="space-y-3">
              <p className="font-semibold text-amber-300">4.1 We do NOT sell your personal information.</p>
              <p className="text-neutral-300">4.2 We share data only:</p>
              <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-4">
                <li>With payment processors (Razorpay) for transactions</li>
                <li>With legal authorities when required by law</li>
                <li>With service providers who assist in our operations</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section id="cookies" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-4 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">5</span>
              COOKIES
            </h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 pl-2">
              <li>Our website uses cookies to improve user experience.</li>
              <li>Cookies help us remember your preferences.</li>
              <li>You can disable cookies in your browser settings.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section id="rights" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-6 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">6</span>
              YOUR RIGHTS
            </h2>
            <p className="text-neutral-300 mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 pl-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section id="retention" className="scroll-mt-28 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-4 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">7</span>
              DATA RETENTION
            </h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 pl-2">
              <li>We retain your data for as long as necessary for business and legal purposes.</li>
              <li>ID copies are retained as required by local regulations.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section id="contact" className="scroll-mt-28 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-400 mb-6 flex items-center gap-3 border-b border-amber-500/20 pb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 text-sm flex items-center justify-center font-sans font-bold">8</span>
              CONTACT US
            </h2>
            
            <p className="text-neutral-300 mb-6">
              For privacy-related inquiries:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-xl flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase font-bold text-amber-200 tracking-wider">Email</h4>
                  <p className="text-sm text-neutral-300 mt-0.5">privacy@vishramsthal.com<br />info@vishramsthal.com</p>
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-xl flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase font-bold text-amber-200 tracking-wider">Phone</h4>
                  <p className="text-sm text-neutral-300 mt-0.5">+91 9805271636<br />+91 8988478367</p>
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-xl flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase font-bold text-amber-200 tracking-wider">Address</h4>
                  <p className="text-sm text-neutral-300 mt-0.5">Vishram Sthal, Word No. 6, Dehra Gopipur, Himachal Pradesh</p>
                </div>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
