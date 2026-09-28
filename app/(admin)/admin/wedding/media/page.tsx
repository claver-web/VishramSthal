'use client';

import { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, Trash2, Video, FolderPlus } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function WeddingMediaPage() {
  const [activeTab, setActiveTab] = useState<'venues' | 'categories' | 'cinematic'>('venues');
  
  // Venue State
  const [venues, setVenues] = useState<any[]>([]);
  const [selectedVenueId, setSelectedVenueId] = useState('');
  
  // Categories State
  const [newCategory, setNewCategory] = useState('');
  
  // Cinematic State
  const [videoLink, setVideoLink] = useState('');
  
  // All Media State
  const [allMedia, setAllMedia] = useState<any[]>([]);
  
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchVenues();
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/media');
      const data = await res.json();
      setAllMedia(data);
      
      const cinematic = data.find((m: any) => m.folder === 'wedding_cinematic');
      if (cinematic) setVideoLink(cinematic.url);
    } catch(e) {}
  };

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
    }
  };

  const handleVenueUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedVenueId) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('venueId', selectedVenueId);

    setUploading(true);
    try {
      const res = await fetch('/api/wedding/media', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Failed to upload image');
      toast.success('Venue image uploaded successfully!');
      fetchVenues();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleCategoryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!newCategory.trim()) {
      toast.error('Please enter a category name first');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', `wedding_${newCategory.trim().toLowerCase()}`);
      
      const uploadRes = await fetch('/api/wedding/media', { method: 'POST', body: formData });
      const uploadData = await uploadRes.json();
      
      if (!uploadRes.ok || !uploadData.url) throw new Error(uploadData.error || 'Upload failed');
      
      toast.success(`Image added to category: ${newCategory}`);
      fetchMedia();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
      e.target.value = '';
      setNewCategory('');
    }
  };

  const saveCinematicVideo = async () => {
    if (!videoLink.trim()) return;
    setUploading(true);
    try {
      await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: videoLink,
          filename: 'Cinematic Tour',
          type: 'video',
          size: 0,
          folder: 'wedding_cinematic'
        })
      });
      toast.success('Cinematic Tour updated successfully!');
    } catch(e) {
      toast.error('Failed to update cinematic tour');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteVenueImage = async (imageUrl: string) => {
    if (!selectedVenueId) return;
    try {
      const res = await fetch(`/api/wedding/media?venueId=${selectedVenueId}&imageUrl=${encodeURIComponent(imageUrl)}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Image removed from venue gallery');
      fetchVenues();
    } catch (err: any) {
      toast.error('Failed to delete image');
    }
  };

  const handleDeleteCategoryMedia = async (id: string) => {
    try {
      await fetch(`/api/media?id=${id}`, { method: 'DELETE' });
      toast.success('Image removed from category');
      fetchMedia();
    } catch (err) {
      toast.error('Failed to delete image');
    }
  };

  const selectedVenue = venues.find(v => v.id === selectedVenueId);

  // Derive categories from allMedia
  const categoryMedia = allMedia.filter(m => m.folder?.startsWith('wedding_') && m.folder !== 'wedding_cinematic' && m.folder !== 'wedding_venue');
  const categories = Array.from(new Set(categoryMedia.map(m => m.folder.replace('wedding_', ''))));

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <ImageIcon className="w-6 h-6 text-rose-500" /> Event Photos & Videos
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Upload and manage media for your wedding venues and galleries</p>
        </div>
      </div>

      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
        <button onClick={() => setActiveTab('venues')} className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'venues' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>Venue Galleries</button>
        <button onClick={() => setActiveTab('categories')} className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'categories' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>Event Categories</button>
        <button onClick={() => setActiveTab('cinematic')} className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'cinematic' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>Cinematic Tour</button>
      </div>

      {activeTab === 'venues' && (
        <>
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Select Venue to Manage</label>
            <select 
              value={selectedVenueId} 
              onChange={(e) => setSelectedVenueId(e.target.value)}
              className="w-full max-w-md px-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold focus:border-rose-500 outline-none"
            >
              {venues.map(v => (
                <option key={v.id} value={v.id}>{v.type.replace('_', ' ')} - {v.name}</option>
              ))}
            </select>
          </div>

          {selectedVenue && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-10 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-[#0f172a] transition-colors relative group bg-white dark:bg-transparent">
                <input type="file" accept="image/*" onChange={handleVenueUpload} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10" />
                <Upload className={`w-10 h-10 mb-4 transition-transform group-hover:scale-110 ${uploading ? 'text-rose-500 animate-bounce' : 'text-gray-400 group-hover:text-rose-500'}`} />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{uploading ? 'Uploading Image...' : 'Upload Venue Image'}</h3>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Venue Gallery ({selectedVenue.images?.length || 0})</h3>
                {selectedVenue.images?.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedVenue.images.map((img: string, idx: number) => (
                      <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden group border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                        <Image src={img} alt={`Venue ${idx}`} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                          <button onClick={() => handleDeleteVenueImage(img)} className="p-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 hover:scale-110 transition-all shadow-lg"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No images uploaded for this venue yet.</p>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1e293b] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="max-w-xl mx-auto space-y-6">
              <div className="text-center">
                <FolderPlus className="w-16 h-16 text-rose-500 mx-auto opacity-20" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 mt-4">Upload to a Category</h2>
                <p className="text-gray-500 text-sm">Photos uploaded here will automatically create a new filter category on the public Wedding Gallery page (e.g., "Mehendi", "Sangeet").</p>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Category Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Haldi, Mehendi, Sangeet" 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl font-bold focus:border-rose-500 outline-none"
                />
              </div>

              <div className={`border-2 border-dashed ${newCategory ? 'border-rose-300 dark:border-rose-700/50 hover:bg-rose-50 dark:hover:bg-rose-950/20' : 'border-gray-200 dark:border-gray-700 opacity-50'} rounded-2xl p-8 flex flex-col items-center justify-center transition-colors relative`}>
                <input type="file" accept="image/*" onChange={handleCategoryUpload} disabled={uploading || !newCategory} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10" />
                <Upload className={`w-8 h-8 mb-3 ${uploading ? 'text-rose-500 animate-bounce' : 'text-gray-400'}`} />
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{!newCategory ? 'Type a category name first' : uploading ? 'Uploading...' : 'Click or Drop Photo to Upload'}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Existing Categories</h2>
            {categories.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No categories created yet. Upload a photo above to start.</p>
            ) : (
              <div className="space-y-8">
                {categories.map(category => (
                  <div key={category} className="space-y-4 border-b border-gray-100 dark:border-gray-800 pb-8 last:border-0 last:pb-0">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      {category}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {categoryMedia.filter(m => m.folder === `wedding_${category}`).map((img: any) => (
                        <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-200 dark:border-gray-700 shadow-sm">
                          <Image src={img.url} alt={img.filename} fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                            <button onClick={() => handleDeleteCategoryMedia(img.id)} className="p-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 hover:scale-110 transition-all shadow-lg">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'cinematic' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1e293b] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="max-w-xl mx-auto space-y-6">
              <div className="text-center">
                <Video className="w-16 h-16 text-rose-500 mx-auto opacity-20 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Cinematic Tour Video</h2>
                <p className="text-gray-500 text-sm">Provide a direct link to a video file (.mp4, .webm) or YouTube link. This will be featured prominently on the Gallery page.</p>
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Video URL</label>
                <input 
                  type="text" 
                  placeholder="https://example.com/video.mp4" 
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-rose-500 outline-none"
                />
                <button 
                  onClick={saveCinematicVideo}
                  disabled={uploading}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold transition-colors disabled:opacity-50"
                >
                  {uploading ? 'Saving...' : 'Save Cinematic Video'}
                </button>
              </div>

              {videoLink && (
                <div className="mt-8 rounded-xl overflow-hidden aspect-video bg-black border border-gray-800">
                  {videoLink.match(/\.(mp4|webm|ogg)$/i) ? (
                    <video src={videoLink} className="w-full h-full object-cover" controls />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      Preview not available for this URL format. Link saved.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
