import Link from 'next/link';

export default function AdminWeddingVenues() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Wedding Venues Management</h1>
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-200">All Venues</h2>
          <button className="bg-amber-500 text-black px-4 py-2 rounded-lg font-bold">Add New Venue</button>
        </div>
        <table className="w-full text-left text-gray-300">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3">Name</th>
              <th className="p-3">Type</th>
              <th className="p-3">Capacity</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700/50">
              <td className="p-3">Grand Banquet Hall</td>
              <td className="p-3">BANQUET</td>
              <td className="p-3">500</td>
              <td className="p-3"><button className="text-blue-400 hover:underline">Edit</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
