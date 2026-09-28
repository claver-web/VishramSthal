"use client";

import { CheckCircle2, CreditCard, Wallet } from "lucide-react";

export type PaymentMethodType = "ONLINE" | "CASH";

interface PaymentMethodProps {
  selectedMethod: PaymentMethodType;
  onMethodChange: (method: PaymentMethodType) => void;
}

export default function PaymentMethod({ selectedMethod, onMethodChange }: PaymentMethodProps) {
  return (
    <div className="w-full max-w-2xl mb-8">
      <h2 className="text-2xl font-serif text-amber-500 mb-6">Select Payment Method</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Online Payment Card */}
        <button
          onClick={() => onMethodChange("ONLINE")}
          className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 flex flex-col group ${
            selectedMethod === "ONLINE"
              ? "bg-amber-900/10 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
              : "bg-neutral-900 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/80"
          }`}
        >
          {selectedMethod === "ONLINE" && (
            <div className="absolute top-4 right-4 text-amber-500">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          )}
          <div className="mb-4 text-amber-400">
            <CreditCard className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-neutral-100 mb-1">Pay Online</h3>
          <p className="text-sm text-neutral-400 mb-4">Secure payment via Razorpay</p>
          
          <ul className="space-y-2 mt-auto">
            <li className="flex items-center text-sm text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 flex-shrink-0"></span>
              Instant confirmation
            </li>
            <li className="flex items-center text-sm text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 flex-shrink-0"></span>
              Faster check-in process
            </li>
          </ul>
        </button>

        {/* Cash Payment Card */}
        <button
          onClick={() => onMethodChange("CASH")}
          className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 flex flex-col group ${
            selectedMethod === "CASH"
              ? "bg-amber-900/10 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
              : "bg-neutral-900 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/80"
          }`}
        >
          {selectedMethod === "CASH" && (
            <div className="absolute top-4 right-4 text-amber-500">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          )}
          <div className="mb-4 text-emerald-400">
            <Wallet className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-neutral-100 mb-1">Cash on Arrival</h3>
          <p className="text-sm text-neutral-400 mb-4">Pay at the property</p>
          
          <ul className="space-y-2 mt-auto">
            <li className="flex items-center text-sm text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 flex-shrink-0"></span>
              Subject to rules & conditions
            </li>
            <li className="flex items-center text-sm text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 flex-shrink-0"></span>
              Requires confirmation call
            </li>
          </ul>
        </button>
      </div>
    </div>
  );
}
