import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { subDays, format, isAfter } from 'date-fns';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const range = url.searchParams.get('range') || '7';
    let daysToFetch = parseInt(range, 10);
    if (isNaN(daysToFetch)) daysToFetch = 7;
    
    // We want data up to last 'daysToFetch' days
    const startDate = subDays(new Date(), daysToFetch);

    const logs = await prisma.visitorLog.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    });

    // 1. Total Visitors (unique sessions)
    const uniqueSessions = new Set(logs.map(log => log.sessionId));
    const totalVisitors = uniqueSessions.size;

    // 2. Page Views
    const pageViews = logs.length;

    // 3. Daily Visitor Data for Chart
    const dailyDataMap = new Map<string, number>();
    for (let i = daysToFetch - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      dailyDataMap.set(format(date, 'EEE'), 0); // Mon, Tue, etc
    }

    // We count unique visitors per day for the chart
    const dailyVisitorSessions = new Map<string, Set<string>>();
    logs.forEach(log => {
      const day = format(log.createdAt, 'EEE');
      if (!dailyVisitorSessions.has(day)) {
        dailyVisitorSessions.set(day, new Set());
      }
      if (log.sessionId) {
        dailyVisitorSessions.get(day)!.add(log.sessionId);
      }
    });

    dailyVisitorSessions.forEach((sessions, day) => {
      if (dailyDataMap.has(day)) {
        dailyDataMap.set(day, sessions.size);
      }
    });

    const visitorData = Array.from(dailyDataMap.entries()).map(([name, visitors]) => ({
      name,
      visitors
    }));

    // 4. Traffic Sources
    let searchCount = 0;
    let directCount = 0;
    let socialCount = 0;
    let referralCount = 0;

    // We'll count sources per unique session to avoid page views skewing it
    const sessionSources = new Map<string, string>();
    logs.forEach(log => {
      if (log.sessionId && !sessionSources.has(log.sessionId)) {
        sessionSources.set(log.sessionId, log.source || 'Direct');
      }
    });

    sessionSources.forEach((source) => {
      if (source === 'Search') searchCount++;
      else if (source === 'Social') socialCount++;
      else if (source === 'Referral') referralCount++;
      else directCount++;
    });

    const totalSources = sessionSources.size || 1; // avoid division by zero
    const trafficSources = [
      { name: 'Search', value: Math.round((searchCount / totalSources) * 100) },
      { name: 'Direct', value: Math.round((directCount / totalSources) * 100) },
      { name: 'Social', value: Math.round((socialCount / totalSources) * 100) },
      { name: 'Referral', value: Math.round((referralCount / totalSources) * 100) },
    ];

    // 5. Device Breakdown
    let mobileCount = 0;
    let desktopCount = 0;
    let tabletCount = 0;

    const sessionDevices = new Map<string, string>();
    logs.forEach(log => {
      if (log.sessionId && !sessionDevices.has(log.sessionId)) {
        sessionDevices.set(log.sessionId, log.device || 'Desktop');
      }
    });

    sessionDevices.forEach((device) => {
      if (device === 'Mobile') mobileCount++;
      else if (device === 'Tablet') tabletCount++;
      else desktopCount++;
    });

    const totalDevices = sessionDevices.size || 1;
    const deviceBreakdown = {
      mobile: Math.round((mobileCount / totalDevices) * 100),
      desktop: Math.round((desktopCount / totalDevices) * 100),
      tablet: Math.round((tabletCount / totalDevices) * 100),
    };

    // 6. Booking Funnel
    const websiteVisitors = totalVisitors;
    const roomViews = new Set(logs.filter(log => log.path.includes('/rooms')).map(l => l.sessionId)).size;
    const checkoutsStarted = new Set(logs.filter(log => log.path.includes('/booking')).map(l => l.sessionId)).size;
    
    // We can fetch actual completed bookings in this timeframe
    const completedBookings = await prisma.booking.count({
      where: {
        createdAt: { gte: startDate }
      }
    });

    const funnel = {
      websiteVisitors,
      roomViews,
      checkoutsStarted,
      completedBookings
    };

    return NextResponse.json({
      metrics: {
        totalVisitors,
        pageViews,
      },
      visitorData,
      trafficSources,
      deviceBreakdown,
      funnel
    });
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
