'use client';

import { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function WeddingMediaPage() {
  const [venues, setVenues] = useState<any[]>([]);
  const [selectedVenueId, setSelectedVenueId] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const res = await fetch('/api/wedding/venues');
      if (res.ok) {
        const data = await res.json();
        setVenues(data);
        if (data.length > 0 && !selectedVenueId) setSelectedVenueId(data[0].id);
      }
    } catch (e) {
      toast.error('Failed to load venues');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedVenueId) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('venueId', selectedVenueId);

    setUploading(true);
    try {
      const res = await fetch('/api/wedding/media', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error();
      
      toast.success('Image uploaded successfully!');
      fetchVenues();
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (imageUrl: string) => {
    // In a real app we'd also delete from ImageKit or pass the ID instead
    // Here we'll just mock it or handle client-side as it requires a specific DELETE endpoint
    toast.error('Delete functionality requires further ImageKit API integration');
  };

  const selectedVenue = venues.find(v => v.id === selectedVenueId);

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <ImageIcon className="w-6 h-6 text-rose-500" /> Event Photos & Videos
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Upload and manage media for your wedding venues</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Select Venue to Manage</label>
        <select 
          value={selectedVenueId} 
          onChange={(e) => setSelectedVenueId(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold focus:border-rose-500 outline-none"
        >
          {venues.map(v => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
      </div>

      {selectedVenue && (
        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-10 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-[#0f172a] transition-colors relative group">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleUpload}
              disabled={uploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
            />
            <Upload className={`w-10 h-10 mb-4 transition-transform group-hover:scale-110 ${uploading ? 'text-rose-500 animate-bounce' : 'text-gray-400 group-hover:text-rose-500'}`} />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {uploading ? 'Uploading Image...' : 'Upload New Image'}
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-sm">
              Click or drag and drop an image here. It will be uploaded securely via ImageKit and added to {selectedVenue.name}&apos;s gallery.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Venue Gallery ({selectedVenue.images?.length || 0})</h3>
            {selectedVenue.images?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedVenue.images.map((img: string, idx: number) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden group border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <Image src={img} alt={`Venue image ${idx}`} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <button onClick={() => handleDelete(img)} className="p-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 hover:scale-110 transition-all shadow-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-gray-800">
                <ImageIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="font-medium text-gray-500 dark:text-gray-400">No images uploaded for this venue yet.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
