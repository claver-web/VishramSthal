export default function AdminWeddingEnquiries() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Wedding Enquiries</h1>
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <table className="w-full text-left text-gray-300">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3">Name</th>
              <th className="p-3">Event Date</th>
              <th className="p-3">Guests</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700/50">
              <td className="p-3">Rahul & Priya</td>
              <td className="p-3">2026-10-15</td>
              <td className="p-3">500</td>
              <td className="p-3"><span className="px-2 py-1 bg-yellow-900/50 text-yellow-500 rounded text-xs font-bold">PENDING</span></td>
              <td className="p-3"><button className="text-blue-400 hover:underline">View</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
