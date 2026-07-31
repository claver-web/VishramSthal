'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function generateSessionId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Exclude admin routes from analytics
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
      return;
    }

    let sessionId = sessionStorage.getItem('visitor_session_id');
    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem('visitor_session_id', sessionId);
    }

    let device = 'Desktop';
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent;
      if (/mobile/i.test(ua)) device = 'Mobile';
      if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) device = 'Tablet';
    }

    let source = 'Direct';
    const referrer = document.referrer;
    if (referrer) {
      if (referrer.includes('google.') || referrer.includes('bing.') || referrer.includes('yahoo.')) {
        source = 'Search';
      } else if (referrer.includes('facebook.') || referrer.includes('twitter.') || referrer.includes('instagram.') || referrer.includes('t.co')) {
        source = 'Social';
      } else if (!referrer.includes(window.location.hostname)) {
        source = 'Referral';
      }
    }

    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathname,
        device,
        source,
        sessionId,
      }),
    }).catch(err => console.error('Analytics tracking failed', err));

  }, [pathname, searchParams]);

  return null;
}
