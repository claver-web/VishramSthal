'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, Upload, GripVertical, X, Settings, 
  MapPin, CheckSquare, IndianRupee, Save, Eye, Video
} from 'lucide-react';

export default function AddRoomPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    number: '', type: 'STANDARD', name: '', theme: '', capacity: '2', size: '',
    description: '', videoTour: '', amenities: [] as string[], price: '', weekendPrice: '',
    taxIncluded: false, metaTitle: '', metaDescription: ''
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const toggleAmenity = (item: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(item) 
        ? prev.amenities.filter(a => a !== item)
        : [...prev.amenities, item]
    }));
  };

  const handleSave = async (isDraft: boolean) => {
    if (!formData.number || !formData.price) {
      alert("Room Number and Price are required.");
      return;
    }
    setIsSaving(true);
    try {
      const { saveRoom } = await import('./actions');
      const res = await saveRoom({
        ...formData,
        images,
        isAvailable: !isDraft
      });
      if (res.success) {
        alert(isDraft ? 'Draft saved successfully!' : 'Room published successfully!');
        window.location.href = '/admin/rooms';
      } else {
        alert('Error: ' + res.error);
      }
    } catch (err) {
      alert('Failed to save room.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      
      const { uploadRoomImage } = await import('./actions');
      const res: any = await uploadRoomImage(formData);
      
      if (res.success) {
        setImages(prev => [...prev, res.url]);
      } else {
        alert("Upload failed: " + res.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setUploading(false);
    }
  };
  
  const steps = [
    { id: 1, title: 'Basic Info' },
    { id: 2, title: 'Media' },
    { id: 3, title: 'Amenities' },
    { id: 4, title: 'Pricing' },
    { id: 5, title: 'SEO' }
  ];

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Room Number <span className="text-red-500">*</span></label>
                <input name="number" value={formData.number} onChange={handleChange} type="text" placeholder="e.g. 101" className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] rounded-xl focus:border-[#ea580c] outline-none font-medium dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Room Type <span className="text-red-500">*</span></label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] rounded-xl focus:border-[#ea580c] outline-none font-medium dark:text-white">
                  <option value="STANDARD">Standard</option>
                  <option value="DELUXE">Deluxe</option>
                  <option value="SUITE">Suite</option>
                  <option value="PREMIUM">Premium</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Room Name</label>
                <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="e.g. Deluxe Room" className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] rounded-xl focus:border-[#ea580c] outline-none font-medium dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Spiritual Name (Theme)</label>
                <input name="theme" value={formData.theme} onChange={handleChange} type="text" placeholder="e.g. Kunj Kutir" className="w-full p-3 border-2 border-orange-100 dark:border-orange-900/30 bg-orange-50/50 dark:bg-orange-900/10 rounded-xl focus:border-[#ea580c] outline-none font-medium dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Capacity (Guests)</label>
                <input name="capacity" value={formData.capacity} onChange={handleChange} type="number" className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] rounded-xl focus:border-[#ea580c] outline-none font-medium dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Room Size (sq. ft.)</label>
                <input name="size" value={formData.size} onChange={handleChange} type="number" placeholder="e.g. 250" className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] rounded-xl focus:border-[#ea580c] outline-none font-medium dark:text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={5} placeholder="Describe the room..." className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] rounded-xl focus:border-[#ea580c] outline-none font-medium dark:text-white"></textarea>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">Media Upload</h3>
            
            <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-10 text-center hover:bg-gray-50 dark:hover:bg-[#0f172a] transition-colors cursor-pointer group">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Upload className={`w-8 h-8 text-[#ea580c] ${uploading ? 'animate-bounce' : ''}`} />
              </div>
              <p className="font-bold text-gray-900 dark:text-white">
                {uploading ? 'Uploading...' : 'Drag & drop images here'}
              </p>
              <p className="text-sm text-gray-500 mt-1">or click to browse (Max 5MB each, min 1200x800px)</p>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {images.map((url, idx) => (
                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img src={url} alt={`Room ${idx + 1}`} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setImages(images.filter((_, i) => i !== idx))}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Video Tour URL</label>
              <div className="flex relative">
                <Video className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="videoTour" value={formData.videoTour} onChange={handleChange} type="text" placeholder="YouTube or Vimeo URL" className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] rounded-xl focus:border-[#ea580c] outline-none font-medium dark:text-white" />
              </div>
            </div>
          </div>
        );
      case 3:
        const amenities = [
          'AC / Non-AC', 'WiFi', 'TV', 'Private Bathroom', 'Hot Water', 
          'Balcony', 'Room Service', 'Mini Fridge', 'Work Desk', 'Wardrobe',
          'Air Purifier', 'Tea/Coffee Maker', 'Safe Locker', 'Temple View'
        ];
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">Amenities & Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {amenities.map(item => (
                <label key={item} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors">
                  <input type="checkbox" checked={formData.amenities.includes(item)} onChange={() => toggleAmenity(item)} className="w-5 h-5 rounded border-gray-300 text-[#ea580c] focus:ring-[#ea580c]" />
                  <span className="text-sm font-medium dark:text-gray-200">{item}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">Pricing & Availability</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Base Price (per night) <span className="text-red-500">*</span></label>
                <div className="flex relative">
                  <IndianRupee className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="0.00" className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] rounded-xl focus:border-[#ea580c] outline-none font-black dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Weekend Pricing</label>
                <div className="flex relative">
                  <IndianRupee className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="weekendPrice" value={formData.weekendPrice} onChange={handleChange} type="number" placeholder="0.00" className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] rounded-xl focus:border-[#ea580c] outline-none font-bold dark:text-white" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-200 dark:border-gray-700">
              <input type="checkbox" id="tax" name="taxIncluded" checked={formData.taxIncluded} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-[#ea580c] focus:ring-[#ea580c]" />
              <label htmlFor="tax" className="font-medium dark:text-white">Price includes taxes</label>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">SEO & Metadata</h3>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Meta Title</label>
              <input name="metaTitle" value={formData.metaTitle} onChange={handleChange} type="text" placeholder="Deluxe Room - Vishram Sthal" className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] rounded-xl focus:border-[#ea580c] outline-none font-medium dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Meta Description</label>
              <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows={3} placeholder="Experience divine peace..." className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] rounded-xl focus:border-[#ea580c] outline-none font-medium dark:text-white"></textarea>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/rooms" className="p-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1e293b] transition-colors dark:text-white">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Add New Room</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Fill in the details to list a new room.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button disabled={isSaving} onClick={() => handleSave(true)} className="flex-1 md:flex-none px-5 py-2.5 bg-gray-100 dark:bg-[#1e293b] hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-white rounded-xl font-bold transition-colors disabled:opacity-50">
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          <button disabled={isSaving} onClick={() => handleSave(false)} className="flex-1 md:flex-none bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-50">
            Publish Room
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Stepper Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">
            <nav className="flex flex-col gap-2">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                    activeStep === step.id 
                      ? 'bg-orange-50 dark:bg-orange-500/10 text-[#ea580c] font-bold border border-orange-100 dark:border-orange-500/20' 
                      : 'text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-[#0f172a]'
                  }`}
                >
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${
                    activeStep === step.id ? 'bg-[#ea580c] text-white' : 'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    {step.id}
                  </span>
                  {step.title}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 bg-white dark:bg-[#1e293b] rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 min-h-[500px]">
          {renderStep()}
          
          <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between">
            <button 
              onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
              disabled={activeStep === 1}
              className="px-6 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-bold text-gray-600 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-[#0f172a] transition-colors"
            >
              Back
            </button>
            <button 
              onClick={() => setActiveStep(prev => Math.min(5, prev + 1))}
              disabled={activeStep === 5}
              className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold disabled:opacity-50 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              {activeStep === 5 ? 'Finish' : 'Next Step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
