'use client';

import { useState } from 'react';
import { 
  Upload, Search, Filter, LayoutGrid, List as ListIcon, Folder,
  Image as ImageIcon, Video, FileText, MoreVertical, CheckSquare, 
  Trash2, Download, Move, Edit, Copy, ChevronRight, Check, X,
  Crop, RotateCw, Settings2, SlidersHorizontal, ArrowLeft
} from 'lucide-react';

// Mock Data
const mockFolders: any[] = [];
const mockMedia: any[] = [];

export default function MediaLibraryPage() {
  const [activeTab, setActiveTab] = useState('Images');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<any>(null); // For sidebar details
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const toggleSelect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (selectedMedia.includes(id)) {
      setSelectedMedia(selectedMedia.filter(m => m !== id));
      if (activeItem?.id === id) setActiveItem(null);
    } else {
      setSelectedMedia([...selectedMedia, id]);
    }
  };

  const selectItem = (item: any) => {
    setActiveItem(item);
    if (!selectedMedia.includes(item.id)) {
      setSelectedMedia([item.id]); // Single selection for sidebar
    }
  };

  // --- Render Image Editor Modal ---
  const renderEditor = () => {
    if (!activeItem || !isEditorOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/90 z-[100] flex flex-col animate-fade-in">
        {/* Editor Header */}
        <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800 text-white">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsEditorOpen(false)} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h3 className="font-bold">Edit Image</h3>
              <p className="text-xs text-gray-400">{activeItem.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-bold bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">Save as New</button>
            <button className="px-6 py-2 text-sm font-bold bg-gradient-to-r from-[#ea580c] to-[#c2410c] rounded-xl transition-all shadow-lg shadow-orange-500/20">Overwrite</button>
          </div>
        </div>
        
        {/* Editor Workspace */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Image Area */}
          <div className="flex-1 p-8 flex items-center justify-center bg-gray-950">
            <img src={activeItem.url} alt={activeItem.name} className="max-w-full max-h-full object-contain shadow-2xl" />
          </div>
          
          {/* Editor Tools Sidebar */}
          <div className="w-80 bg-gray-900 border-l border-gray-800 p-6 overflow-y-auto">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Tools</h4>
            
            <div className="space-y-6">
              <div>
                <button className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors text-white text-sm font-medium">
                  <span className="flex items-center gap-3"><Crop className="w-4 h-4 text-[#ea580c]" /> Crop & Resize</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div>
                <button className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors text-white text-sm font-medium">
                  <span className="flex items-center gap-3"><RotateCw className="w-4 h-4 text-[#ea580c]" /> Rotate & Flip</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="pt-4 border-t border-gray-800">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Adjustments</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-300 font-medium flex justify-between">Brightness <span>0</span></label>
                    <input type="range" className="w-full mt-2 accent-[#ea580c]" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 font-medium flex justify-between">Contrast <span>0</span></label>
                    <input type="range" className="w-full mt-2 accent-[#ea580c]" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 font-medium flex justify-between">Saturation <span>0</span></label>
                    <input type="range" className="w-full mt-2 accent-[#ea580c]" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Filters</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button className="p-2 text-xs font-bold text-white bg-gray-800 rounded-lg hover:bg-[#ea580c] transition-colors">None</button>
                  <button className="p-2 text-xs font-bold text-white bg-gray-800 rounded-lg hover:bg-[#ea580c] transition-colors">Sepia</button>
                  <button className="p-2 text-xs font-bold text-white bg-gray-800 rounded-lg hover:bg-[#ea580c] transition-colors">Warm</button>
                  <button className="p-2 text-xs font-bold text-white bg-gray-800 rounded-lg hover:bg-[#ea580c] transition-colors">B&W</button>
                  <button className="p-2 text-xs font-bold text-white bg-gray-800 rounded-lg hover:bg-[#ea580c] transition-colors">Cool</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] -m-4 lg:-m-8 animate-fade-in bg-gray-50 dark:bg-[#0f172a]">
      {/* LEFT FOLDER SIDEBAR */}
      <div className="w-64 bg-white dark:bg-[#1e293b] border-r border-gray-100 dark:border-gray-800 flex flex-col hidden lg:flex">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <button 
            onClick={() => setIsUploading(true)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white py-3 rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all"
          >
            <Upload className="w-5 h-5" />
            Upload Media
          </button>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
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
              </button>
            </li>
            {mockFolders.map(folder => (
              <li key={folder.id}>
                <button 
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${selectedFolder === folder.id ? 'bg-orange-50 dark:bg-orange-500/10 text-[#ea580c]' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0f172a]'}`}
                >
                  <div className="flex items-center gap-3">
                    <Folder className={`w-4 h-4 ${folder.color}`} />
                    {folder.name}
                  </div>
                  <span className="text-xs bg-gray-100 dark:bg-[#0f172a] px-2 py-0.5 rounded-full">{folder.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50 dark:bg-[#0f172a]">
        
        {/* Upload Zone (conditional) */}
        {isUploading && (
          <div className="p-6 bg-orange-50 dark:bg-orange-900/10 border-b border-orange-100 dark:border-orange-900/30">
            <div className="border-2 border-dashed border-[#ea580c] rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-white/50 dark:bg-[#0f172a]/50">
              <Upload className="w-10 h-10 text-[#ea580c] mb-3" />
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">Drag & Drop files here</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">or click to select files from your computer</p>
              <div className="mt-4 flex gap-4">
                <button className="px-6 py-2 bg-[#ea580c] text-white font-bold rounded-xl shadow-md">Select Files</button>
                <button onClick={() => setIsUploading(false)} className="px-6 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1e293b] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
            {['All Media', 'Images', 'Videos', 'Documents'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#0f172a]'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search files..." className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-[#ea580c] outline-none dark:text-white" />
            </div>
            <div className="flex items-center bg-gray-50 dark:bg-[#0f172a] rounded-xl p-1 border border-gray-200 dark:border-gray-700 flex-shrink-0">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-[#1e293b] shadow-sm text-[#ea580c]' : 'text-gray-500 hover:text-gray-300'}`}><LayoutGrid className="w-4 h-4" /></button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-[#1e293b] shadow-sm text-[#ea580c]' : 'text-gray-500 hover:text-gray-300'}`}><ListIcon className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Bulk Actions Bar (Sticky) */}
          {selectedMedia.length > 0 && (
            <div className="sticky top-0 z-10 bg-[#ea580c] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between mb-6 animate-fade-in">
              <div className="flex items-center gap-3 font-bold text-sm">
                <CheckSquare className="w-5 h-5" />
                {selectedMedia.length} items selected
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-black/20 rounded-lg transition-colors tooltip-trigger" title="Download"><Download className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-black/20 rounded-lg transition-colors tooltip-trigger" title="Move to Folder"><Move className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-black/20 rounded-lg transition-colors tooltip-trigger" title="Delete"><Trash2 className="w-4 h-4" /></button>
                <button onClick={() => setSelectedMedia([])} className="p-2 hover:bg-black/20 rounded-lg transition-colors ml-2"><X className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {mockMedia.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <ImageIcon className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Media Library is Empty</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Upload images, videos, and documents to get started.</p>
              <button onClick={() => setIsUploading(true)} className="mt-6 px-6 py-2 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white font-bold rounded-xl shadow-md">
                Upload Media
              </button>
            </div>
          )}

          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' : 'grid-cols-1'}`}>
            {mockMedia.map((item) => (
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

                {/* Type Icon (Video/Image) */}
                {item.type.includes('video') && (
                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center">
                    <Video className="w-4 h-4" />
                  </div>
                )}

                {/* Image */}
                <div className={`${viewMode === 'list' ? 'w-24 h-full flex-shrink-0' : 'w-full h-full'}`}>
                  <img src={item.url} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>

                {/* Grid Overlay / List Details */}
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
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-[#ea580c] transition-colors"><Download className="w-4 h-4" /></button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
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
              <img src={activeItem.url} alt={activeItem.name} className="w-full h-auto" />
              {activeItem.type.includes('image') && (
                <button 
                  onClick={() => setIsEditorOpen(true)}
                  className="absolute bottom-3 right-3 bg-black/60 hover:bg-[#ea580c] backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-lg"
                >
                  <Edit className="w-3 h-3" /> Edit Image
                </button>
              )}
            </div>

            {/* Info */}
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm break-all">{activeItem.name}</p>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 space-y-1">
                <p>Uploaded on: <span className="text-gray-700 dark:text-gray-300 font-medium">{activeItem.date}</span></p>
                <p>File size: <span className="text-gray-700 dark:text-gray-300 font-medium">{activeItem.size}</span></p>
                <p>Dimensions: <span className="text-gray-700 dark:text-gray-300 font-medium">{activeItem.dimensions}</span></p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Alt Text <span className="text-gray-400 font-normal">(for SEO)</span></label>
                <input type="text" placeholder="Describe the image" className="w-full p-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-[#ea580c] outline-none dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Title</label>
                <input type="text" defaultValue={activeItem.name.split('.')[0]} className="w-full p-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-[#ea580c] outline-none dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">File URL</label>
                <div className="flex relative">
                  <input type="text" readOnly value={`https://vishramsthal.com/media/${activeItem.name}`} className="w-full pl-3 pr-10 py-2.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-500 outline-none" />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-[#ea580c]"><Copy className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>

            {/* Used In */}
            <div className="bg-orange-50 dark:bg-orange-500/10 rounded-xl p-4 border border-orange-100 dark:border-orange-500/20">
              <h4 className="text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-2">Used In</h4>
              <ul className="space-y-1">
                {activeItem.usedIn.map((place: string, idx: number) => (
                  <li key={idx} className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-[#ea580c] before:rounded-full">{place}</li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <button className="flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 transition-colors">
                <Trash2 className="w-4 h-4" />
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render Editor if open */}
      {renderEditor()}
    </div>
  );
}
