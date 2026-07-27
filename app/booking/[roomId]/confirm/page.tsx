export default function ConfirmBookingPage({ params }: { params: { roomId: string } }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 flex items-center justify-center p-8">
      <div className="text-center max-w-2xl bg-neutral-900 p-12 rounded-3xl border border-neutral-800">
        <h1 className="text-4xl font-serif text-amber-500 mb-4">Confirm Your Booking</h1>
        <p className="text-neutral-400 mb-8">Please review your details before final confirmation.</p>
        <button className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-full font-medium transition-colors">
          Confirm & Pay
        </button>
      </div>
    </div>
  );
}
