"use client";

import { AlertTriangle, Clock, PhoneCall, Info } from "lucide-react";

interface CashRulesProps {
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
}

export default function CashRules({ isChecked, onCheckChange }: CashRulesProps) {
  return (
    <div className="w-full max-w-2xl bg-amber-950/30 border border-amber-900/50 rounded-2xl p-6 mb-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-amber-900/40 rounded-xl text-amber-500">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-amber-400 mb-2">Important Guidelines for Cash Bookings</h3>
          <p className="text-neutral-300 text-sm">
            To ensure a smooth experience for all our guests, please acknowledge the following conditions for cash-on-arrival bookings:
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
          <div className="flex items-center gap-3 mb-2 text-amber-200">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Strict Arrival Time</span>
          </div>
          <p className="text-sm text-neutral-400">
            You must arrive by 1:00 PM. Bookings without prior notice of delay may be automatically cancelled after 1:00 PM to accommodate others.
          </p>
        </div>

        <div className="bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
          <div className="flex items-center gap-3 mb-2 text-amber-200">
            <PhoneCall className="w-5 h-5" />
            <span className="font-medium">Confirmation Call</span>
          </div>
          <p className="text-sm text-neutral-400">
            Our team will call you 2 hours prior to your scheduled arrival. If unreachable, your reservation may be subject to cancellation.
          </p>
        </div>
      </div>

      <div className="bg-neutral-900/50 p-4 rounded-xl border border-neutral-800 mb-6 flex gap-3">
        <Info className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-neutral-400">
          Please carry a valid government-issued photo ID. The cash payment must be made in full during check-in before room keys are handed over.
        </p>
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative flex items-center justify-center mt-1">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onCheckChange(e.target.checked)}
            className="peer appearance-none w-5 h-5 border-2 border-neutral-600 rounded-md checked:border-amber-500 checked:bg-amber-500 transition-colors cursor-pointer"
          />
          <svg
            className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-sm text-neutral-300 group-hover:text-neutral-200 transition-colors">
          I have read and agree to the Cash on Arrival guidelines. I understand that my booking may be cancelled if these conditions are not met.
        </span>
      </label>
    </div>
  );
}
