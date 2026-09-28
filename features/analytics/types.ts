export interface AnalyticsEvent {
  event: string;
  url: string;
  referrer?: string;
  timestamp: Date;
}
