'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Upload, Search, LayoutGrid, List as ListIcon, Folder,
  Image as ImageIcon, Video, CheckSquare, 
  Trash2, Download, Move, Edit, Copy, ChevronRight, Check, X,
  Crop, RotateCw, ArrowLeft, Loader2
} from 'lucide-react';
import { uploadRoomImage } from '../rooms/add/actions';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  dimensions: string;
  date: string;
  type: string;
  usedIn: string[];
}

export default function MediaLibraryPage() {
  const [activeTab, setActiveTab] = useState('All Media');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'wedding': true
  });
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);
  const [isUploadingZoneOpen, setIsUploadingZoneOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load media items from Database API (/api/media)
  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/media');
      if (res.ok) {
        const data = await res.json();
        const items: MediaItem[] = data.map((m: any) => ({
          id: m.id,
          name: m.filename || 'Uploaded Image',
          url: m.url,
          size: m.size ? `${(m.size / 1024).toFixed(1)} KB` : 'Unknown',
          dimensions: 'Original',
          date: new Date(m.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          type: m.type || 'image/jpeg',
          usedIn: ['Gallery']
        }));
        setMediaList(items);
      }
    } catch (err) {
      console.error('Failed to fetch media from DB:', err);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setIsUploading(true);
    const files = Array.from(e.target.files);

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);

        const res: any = await uploadRoomImage(formData);
        if (res.success && res.url) {
          // Save to Database via API
          await fetch('/api/media', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              url: res.url,
              filename: file.name,
              type: file.type || 'image/jpeg',
              size: file.size || 0,
            }),
          });
        } else {
          alert(`Failed to upload ${file.name}: ${res.error || 'Unknown error'}`);
        }
      }

      await fetchMedia();
    } catch (err) {
      console.error(err);
      alert('Error uploading file(s).');
    } finally {
      setIsUploading(false);
      setIsUploadingZoneOpen(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const toggleSelect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (selectedMedia.includes(id)) {
      setSelectedMedia(selectedMedia.filter(m => m !== id));
      if (activeItem?.id === id) setActiveItem(null);
    } else {
      setSelectedMedia([...selectedMedia, id]);
    }
  };

  const selectItem = (item: MediaItem) => {
    setActiveItem(item);
    if (!selectedMedia.includes(item.id)) {
      setSelectedMedia([item.id]);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await fetch(`/api/media?id=${id}`, { method: 'DELETE' });
      setMediaList(prev => prev.filter(m => m.id !== id));
      if (activeItem?.id === id) setActiveItem(null);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedMedia.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedMedia.length} item(s)?`)) {
      for (const id of selectedMedia) {
        await handleDeleteItem(id);
      }
      setSelectedMedia([]);
      setActiveItem(null);
    }
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({ ...prev, [folderId]: !prev[folderId] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const filteredMedia = mediaList.filter(item => {
    const matchesTab = activeTab === 'All Media' || (activeTab === 'Images' && item.type.startsWith('image'));
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex h-[calc(100vh-6rem)] -m-4 lg:-m-8 animate-fade-in bg-gray-50 dark:bg-[#0f172a]">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        multiple 
        accept="image/*" 
        className="hidden" 
      />

      {/* LEFT FOLDER SIDEBAR */}
      <div className="w-64 bg-white dark:bg-[#1e293b] border-r border-gray-100 dark:border-gray-800 flex flex-col hidden lg:flex">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white py-3 rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50"
          >
            {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
            {isUploading ? 'Uploading...' : 'Upload Media'}
          </button>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-2">Folders</h3>
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => setSelectedFolder(null)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${selectedFolder === null ? 'bg-orange-50 dark:bg-orange-500/10 text-[#ea580c]' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0f172a]'}`}
              >
                <div className="flex items-center gap-3">
                  <Folder className="w-4 h-4 text-gray-400" />
                  All Media
                </div>
                <span className="text-xs bg-gray-100 dark:bg-[#0f172a] px-2 py-0.5 rounded-full">{mediaList.length}</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setSelectedFolder('hotel')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${selectedFolder === 'hotel' ? 'bg-orange-50 dark:bg-orange-500/10 text-[#ea580c]' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0f172a]'}`}
              >
                <div className="flex items-center gap-3">
                  <Folder className="w-4 h-4 text-gray-400" />
                  Hotel Media
                </div>
              </button>
            </li>
            <li>
              <div className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0f172a] cursor-pointer" onClick={() => toggleFolder('wedding')}>
                <div className="flex items-center gap-3">
                  <Folder className="w-4 h-4 text-rose-500" />
                  Wedding Media
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${expandedFolders['wedding'] ? 'rotate-90' : ''}`} />
              </div>
              {expandedFolders['wedding'] && (
                <ul className="mt-1 pl-10 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 ml-5">
                  {['Venue Photos', 'Event Photos', 'Decoration Samples', 'Catering Photos', 'Behind the Scenes', 'Client Events'].map(sub => {
                    const fid = `wedding_${sub.toLowerCase().replace(/ /g, '_')}`;
                    return (
                      <li key={fid}>
                        <button 
                          onClick={() => setSelectedFolder(fid)}
                          className={`w-full flex items-center justify-start px-3 py-2 rounded-lg text-xs font-medium transition-colors ${selectedFolder === fid ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#0f172a]'}`}
                        >
                          {sub}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50 dark:bg-[#0f172a]">
        
        {/* Upload Zone (conditional) */}
        {isUploadingZoneOpen && (
          <div className="p-6 bg-orange-50 dark:bg-orange-900/10 border-b border-orange-100 dark:border-orange-900/30">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#ea580c] rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-white/50 dark:bg-[#0f172a]/50 cursor-pointer hover:bg-orange-50/50 transition-colors"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-10 h-10 text-[#ea580c] mb-3 animate-spin" />
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">Uploading files...</h3>
                </>
              ) : (
                <>
                  <Upload className="w-10 h-10 text-[#ea580c] mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">Click to select files</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Supports JPG, PNG, WEBP images. Bulk upload from events supported.</p>
                  
                  <div className="mt-4 flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <input type="checkbox" className="rounded border-gray-300 text-[#ea580c] focus:ring-[#ea580c]" />
                      Automatically add watermark to uploaded wedding photos
                    </label>
                  </div>
                  
                  <div className="mt-4 flex gap-4" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => fileInputRef.current?.click()} className="px-6 py-2 bg-[#ea580c] text-white font-bold rounded-xl shadow-md">Browse Files</button>
                    <button onClick={() => setIsUploadingZoneOpen(false)} className="px-6 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1e293b] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
            {['All Media', 'Images'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#0f172a]'}`}
              >
                {tab}
              </button>
            ))}

            <button
              onClick={() => setIsUploadingZoneOpen(!isUploadingZoneOpen)}
              className="px-4 py-2 bg-[#ea580c] text-white rounded-xl text-sm font-bold flex items-center gap-2 lg:hidden"
            >
              <Upload className="w-4 h-4" /> Upload
            </button>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-[#ea580c] outline-none dark:text-white" 
              />
            </div>
            <div className="flex items-center bg-gray-50 dark:bg-[#0f172a] rounded-xl p-1 border border-gray-200 dark:border-gray-700 flex-shrink-0">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-[#1e293b] shadow-sm text-[#ea580c]' : 'text-gray-500 hover:text-gray-300'}`}><LayoutGrid className="w-4 h-4" /></button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-[#1e293b] shadow-sm text-[#ea580c]' : 'text-gray-500 hover:text-gray-300'}`}><ListIcon className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Bulk Actions Bar */}
          {selectedMedia.length > 0 && (
            <div className="sticky top-0 z-10 bg-[#ea580c] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between mb-6 animate-fade-in">
              <div className="flex items-center gap-3 font-bold text-sm">
                <CheckSquare className="w-5 h-5" />
                {selectedMedia.length} item(s) selected
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleDeleteSelected} className="p-2 hover:bg-black/20 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                <button onClick={() => setSelectedMedia([])} className="p-2 hover:bg-black/20 rounded-lg transition-colors ml-2"><X className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {filteredMedia.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <ImageIcon className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">No Media Found</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Upload images to populate the admin media library.</p>
              <button 
                onClick={() => fileInputRef.current?.click()} 
                className="mt-6 px-6 py-2.5 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white font-bold rounded-xl shadow-md flex items-center gap-2"
              >
                <Upload className="w-4 h-4" /> Upload Media
              </button>
            </div>
          ) : (
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' : 'grid-cols-1'}`}>
              {filteredMedia.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => selectItem(item)}
                  className={`relative group rounded-2xl border-2 transition-all cursor-pointer overflow-hidden bg-white dark:bg-[#1e293b]
                    ${activeItem?.id === item.id ? 'border-[#ea580c] ring-4 ring-orange-500/20' : 'border-gray-100 dark:border-gray-800 hover:border-[#ea580c]/50'}
                    ${viewMode === 'list' ? 'flex items-center h-20' : 'aspect-square'}
                  `}
                >
                  {/* Selection Checkbox */}
                  <button 
                    onClick={(e) => toggleSelect(e, item.id)}
                    className={`absolute top-3 left-3 z-10 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors
                      ${selectedMedia.includes(item.id) ? 'bg-[#ea580c] border-[#ea580c] text-white' : 'border-white/50 bg-black/20 text-transparent opacity-0 group-hover:opacity-100 hover:border-white'}
                    `}
                  >
                    <Check className="w-4 h-4" />
                  </button>

                  {/* Image Container */}
                  <div className={`${viewMode === 'list' ? 'w-24 h-full flex-shrink-0' : 'w-full h-full'}`}>
                    <img src={item.url} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  {/* Overlay */}
                  {viewMode === 'grid' ? (
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-white text-xs font-bold truncate">{item.name}</p>
                      <p className="text-gray-300 text-[10px]">{item.size}</p>
                    </div>
                  ) : (
                    <div className="flex-1 px-4 flex justify-between items-center min-w-0">
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 dark:text-white truncate">{item.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.dimensions} • {item.size} • {item.date}</p>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); copyToClipboard(item.url); }} className="p-2 text-gray-400 hover:text-[#ea580c] transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDEBAR - MEDIA DETAILS */}
      {activeItem && (
        <div className="w-80 bg-white dark:bg-[#1e293b] border-l border-gray-100 dark:border-gray-800 flex flex-col shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)] z-20 animate-fade-in hidden md:flex flex-shrink-0">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-[#0f172a]">
            <h3 className="font-bold text-gray-900 dark:text-white">Media Details</h3>
            <button onClick={() => setActiveItem(null)} className="p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Preview */}
            <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 relative">
              <img src={activeItem.url} alt={activeItem.name} className="w-full h-auto max-h-56 object-cover" />
            </div>

            {/* Info */}
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm break-all">{activeItem.name}</p>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 space-y-1">
                <p>Uploaded on: <span className="text-gray-700 dark:text-gray-300 font-medium">{activeItem.date}</span></p>
                <p>File size: <span className="text-gray-700 dark:text-gray-300 font-medium">{activeItem.size}</span></p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">File URL</label>
                <div className="flex relative">
                  <input type="text" readOnly value={activeItem.url} className="w-full pl-3 pr-10 py-2.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-500 outline-none truncate" />
                  <button 
                    onClick={() => copyToClipboard(activeItem.url)} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-[#ea580c] transition-colors"
                  >
                    {copiedUrl === activeItem.url ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              
              {selectedFolder?.startsWith('wedding') && (
                <div className="bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 p-4 rounded-xl space-y-4">
                  <h4 className="text-xs font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
                    Wedding Metadata
                  </h4>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Tags (Event, Couple, Date)</label>
                    <input type="text" placeholder="e.g. Sangeet, Rahul & Priya, 15 Nov" className="w-full px-3 py-2 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-lg text-xs outline-none focus:border-rose-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300">Show in Gallery</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-7 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-500 peer-checked:bg-rose-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300">Client Permission</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-7 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-500 peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={() => handleDeleteItem(activeItem.id)} 
                className="flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
