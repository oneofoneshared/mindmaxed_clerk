// Analytics/event tracking utility

export interface AnalyticsEvent {
  event: string;
  data?: Record<string, unknown>;
}

export function trackEvent(event: string, data?: Record<string, unknown>) {
  // Replace this with your analytics integration (e.g., Google Analytics, Segment, etc.)
  if (process.env.NODE_ENV === 'development') {
    // Log to console in development
     
    console.log('[Analytics]', event, data);
  }
  // Example: window.gtag('event', event, data);
  // Example: analytics.track(event, data);
} 