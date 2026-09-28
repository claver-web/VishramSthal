'use client';

import { useState, useEffect } from 'react';
import { 
  Star, Search, Filter, CheckCircle, XCircle, MessageSquare, 
  Trash2, Award, CornerDownRight, ThumbsUp, Send, MoreVertical,
  BarChart2, Smile, AlertCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const trendData = [
  { name: 'May', rating: 0 }, { name: 'Jun', rating: 0 },
  { name: 'Jul', rating: 0 }, { name: 'Aug', rating: 0 },
  { name: 'Sep', rating: 0 }, { name: 'Oct', rating: 0 },
];

const distData = [
  { name: '5 Stars', count: 0 }, { name: '4 Stars', count: 0 },
  { name: '3 Stars', count: 0 }, { name: '2 Stars', count: 0 },
  { name: '1 Star', count: 0 },
];

const mockReviews: any[] = [];

export default function ReviewsPage() {
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [activeType, setActiveType] = useState('All');

  const fetchReviews = async () => {
    try {
      const { getReviews } = await import('./actions');
      const data = await getReviews();
      setReviews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const { updateReviewStatus } = await import('./actions');
      const res = await updateReviewStatus(id, status);
      if (res.success) {
        fetchReviews();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitReply = async (id: string) => {
    if (!replyText.trim()) return;
    try {
      const { addReply } = await import('./actions');
      const res = await addReply(id, replyText);
      if (res.success) {
        setReplyText('');
        setActiveReply(null);
        fetchReviews();
      } else {
        alert('Failed to add reply');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1) : '0.0';

  const distribution = [5, 4, 3, 2, 1].map(stars => ({
    name: `${stars} Star${stars > 1 ? 's' : ''}`,
    count: reviews.filter(r => Math.round(r.rating) === stars).length
  }));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400';
      case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderStars = (rating: number, isWedding: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1,2,3,4,5].map(star => (
          <span key={star} className={`w-4 h-4 flex items-center justify-center ${star <= rating ? (isWedding ? 'text-rose-500' : 'text-yellow-400') : 'text-gray-200 dark:text-gray-700'}`}>
            {isWedding ? '💍' : '⭐'}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Reviews & Ratings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage guest feedback and monitor hotel reputation.</p>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Average Rating</p>
            <div className="flex items-end gap-3">
              <h3 className="text-5xl font-black text-gray-900 dark:text-white">{avgRating}</h3>
              <div className="flex pb-1.5"><Star className="w-5 h-5 fill-yellow-400 text-yellow-400" /></div>
            </div>
            <p className="text-sm text-gray-500 mt-2 font-bold">{totalReviews} {totalReviews === 1 ? 'Review' : 'Reviews'}</p>
          </div>
          <div className="mt-6 flex items-center gap-3 bg-gray-50 dark:bg-gray-900/20 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-bold text-gray-500">{totalReviews > 0 ? 'Showing live data' : 'No reviews yet'}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Rating Trend (6 Months)</h3>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Line type="monotone" dataKey="rating" stroke="#ea580c" strokeWidth={3} dot={{ fill: '#ea580c', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Most Reviewed</h3>
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">🏨 Top Room</span>
              <span className="text-sm font-black text-[#ea580c]">Deluxe Suite</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">💒 Top Venue</span>
              <span className="text-sm font-black text-rose-500">Grand Banquet</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-wrap gap-4">
        <div className="relative flex-1 md:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search reviews..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:border-[#ea580c] outline-none dark:text-white" />
        </div>
        <select 
          value={activeType}
          onChange={(e) => setActiveType(e.target.value)}
          className="bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 outline-none"
        >
          <option value="All">All Reviews</option>
          <option value="Hotel Review">Hotel Reviews</option>
          <option value="Wedding Review">Wedding Reviews</option>
        </select>
        <select className="bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 outline-none">
          <option>All Statuses</option>
          <option>Published</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="bg-white dark:bg-[#1e293b] p-16 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center">
            <MessageSquare className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No reviews yet</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">When guests leave feedback after their stay, it will appear here for you to moderate and reply to.</p>
          </div>
        ) : (
          reviews.filter(r => activeType === 'All' || r.type === activeType).map((review) => (
          <div key={review.id} className={`bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border-l-4 ${review.type === 'Wedding Review' ? 'border-l-rose-500' : 'border-l-[#ea580c]'} border-gray-100 dark:border-gray-800`}>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${review.type === 'Wedding Review' ? 'from-rose-500 to-rose-700' : 'from-[#ea580c] to-[#c2410c]'} text-white flex items-center justify-center font-black text-lg shadow-lg flex-shrink-0 uppercase`}>
                  {(review.user?.name || review.user?.email || 'G')[0]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    {review.user?.name || review.user?.email || 'Guest'} 
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${review.type === 'Wedding Review' ? 'bg-rose-100 text-rose-700' : 'bg-orange-100 text-orange-700'}`}>{review.type}</span>
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {review.type === 'Wedding Review' ? review.venue : (review.room?.name || 'Room ' + review.room?.number)} • {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                  <div className="mt-2">{renderStars(review.rating, review.type === 'Wedding Review')}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(review.status)}`}>{review.status}</span>
                <div className="flex gap-1 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-gray-800 p-1">
                  {review.status === 'PENDING' && (
                    <button onClick={() => handleStatusChange(review.id, 'PUBLISHED')} className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors tooltip-trigger" title="Publish"><CheckCircle className="w-4 h-4" /></button>
                  )}
                  {review.status !== 'REJECTED' && (
                    <button onClick={() => handleStatusChange(review.id, 'REJECTED')} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors tooltip-trigger" title="Reject"><XCircle className="w-4 h-4" /></button>
                  )}
                  <button className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors tooltip-trigger" title="More Options"><MoreVertical className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
              "{review.comment}"
            </p>

            {/* Admin Reply Section */}
            {review.reply ? (
              <div className="ml-8 md:ml-16 bg-orange-50 dark:bg-orange-500/5 p-4 rounded-2xl border border-orange-100 dark:border-orange-500/20 relative">
                <CornerDownRight className="w-5 h-5 text-gray-400 absolute -left-7 top-4" />
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-[#ea580c] text-sm">Response from Management</h4>
                  <div className="flex gap-2">
                    <button className="text-xs font-bold text-gray-500 hover:text-[#ea580c]">Edit</button>
                    <button className="text-xs font-bold text-gray-500 hover:text-red-500">Delete</button>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{review.reply}</p>
              </div>
            ) : (
              <div className="ml-8 md:ml-16">
                {activeReply === review.id ? (
                  <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-gray-700 p-4 relative animate-fade-in">
                    <CornerDownRight className="w-5 h-5 text-gray-400 absolute -left-7 top-4" />
                    <textarea 
                      rows={3} 
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full bg-transparent text-sm outline-none resize-none dark:text-white"
                      placeholder={`Write a reply...`}
                      autoFocus
                    ></textarea>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex flex-wrap gap-2">
                        {review.type === 'Hotel Review' ? (
                          <>
                            <span onClick={() => setReplyText('Thank you for your feedback! We are glad you enjoyed your stay.')} className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded cursor-pointer hover:bg-orange-100">🏨 Thank You</span>
                            <span onClick={() => setReplyText('We apologize for the inconvenience. We have noted your feedback and will improve.')} className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded cursor-pointer hover:bg-orange-100">🏨 Apology</span>
                          </>
                        ) : (
                          <>
                            <span onClick={() => setReplyText('Thank you for choosing Shani Marriage Palace for your special day! Wishing you a lifetime of happiness.')} className="text-xs bg-rose-50 text-rose-600 px-2 py-1 rounded cursor-pointer hover:bg-rose-100">💒 Congrats</span>
                            <span onClick={() => setReplyText('We appreciate your detailed feedback regarding your event. Our team will review this closely.')} className="text-xs bg-rose-50 text-rose-600 px-2 py-1 rounded cursor-pointer hover:bg-rose-100">💒 Follow-up</span>
                          </>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setActiveReply(null); setReplyText(''); }} className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Cancel</button>
                        <button onClick={() => handleSubmitReply(review.id)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white text-sm font-bold rounded-xl shadow-md">
                          Publish Reply <Send className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => setActiveReply(review.id)}
                    className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#ea580c] transition-colors"
                  >
                    <CornerDownRight className="w-4 h-4" /> Reply to guest
                  </button>
                )}
              </div>
            )}
          </div>
          ))
        )}
      </div>
    </div>
  );
}
