'use client';

import { 
  Search, Globe, FileCode, LayoutTemplate, Link as LinkIcon, 
  Upload, Save, LayoutDashboard
} from 'lucide-react';

export default function SEOSettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">SEO Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Configure search engine optimization preferences.</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all">
          <Save className="w-5 h-5" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Global SEO */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
          <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
            <Globe className="w-5 h-5 text-[#ea580c]" /> Global Meta Configuration
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Global Meta Title Template</label>
              <div className="flex gap-2 mb-2">
                <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-400 font-mono cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">&#123;page_title&#125;</span>
                <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-400 font-mono cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">&#123;site_name&#125;</span>
              </div>
              <input type="text" defaultValue="{page_title} | {site_name}" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white font-mono" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Global Meta Description</label>
              <textarea rows={3} defaultValue="Vishram Sthal provides a spiritual retreat experience with premium rooms and divine views." className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white"></textarea>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Default Open Graph Image</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center hover:border-[#ea580c] hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Upload Default OG Image (1200x630px)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Homepage SEO */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
          <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
            <LayoutDashboard className="w-5 h-5 text-[#ea580c]" /> Homepage Override
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Homepage Meta Title</label>
              <input type="text" defaultValue="Vishram Sthal - Your Spiritual Retreat" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:border-[#ea580c] dark:text-white" />
              <p className="text-xs text-gray-500 mt-1">Leave empty to use global template</p>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Homepage Meta Description</label>
              <textarea rows={3} defaultValue="Book your stay at Vishram Sthal. Enjoy luxurious accommodations with breathtaking spiritual views." className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white"></textarea>
            </div>
          </div>
        </div>

        {/* Third Party Integrations */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
          <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
            <LinkIcon className="w-5 h-5 text-[#ea580c]" /> Search Engine Integrations
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Google Analytics ID</label>
              <input type="text" placeholder="G-XXXXXXXXXX" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white font-mono uppercase" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Google Search Console Verification Code</label>
              <input type="text" placeholder="<meta name='google-site-verification' content='...' />" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white font-mono" />
            </div>
          </div>
        </div>

        {/* Advanced SEO */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
          <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
            <FileCode className="w-5 h-5 text-[#ea580c]" /> Advanced Configuration
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">robots.txt Editor</label>
              <textarea rows={4} defaultValue="User-agent: *&#13;&#10;Allow: /&#13;&#10;&#13;&#10;Sitemap: https://vishramsthal.com/sitemap.xml" className="w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-[#ea580c] dark:text-white font-mono"></textarea>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Structured Data (Schema JSON-LD)</label>
              <div className="p-4 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl">
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2"><LayoutTemplate className="w-4 h-4" /> Hotel Schema generated automatically</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">The system automatically injects standard LocalBusiness and Hotel schema tags on relevant pages based on General Settings.</p>
              </div>
            </div>

            <button className="w-full bg-gray-100 dark:bg-[#0f172a] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold py-3 rounded-xl transition-colors">
              Generate Sitemap XML
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
