export default function AdminWeddingBookings() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Wedding Bookings</h1>
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-200">Confirmed Events</h2>
        </div>
        <table className="w-full text-left text-gray-300">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3">Couple Name</th>
              <th className="p-3">Venue</th>
              <th className="p-3">Date</th>
              <th className="p-3">Total Amount</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700/50">
              <td className="p-3">Amit & Sneha</td>
              <td className="p-3">Grand Banquet Hall</td>
              <td className="p-3">2026-11-20</td>
              <td className="p-3">₹4,50,000</td>
              <td className="p-3"><button className="text-blue-400 hover:underline">Manage</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
