import type { NextWebVitalsMetric } from 'next/app';
import { trackEvent } from '../utils/analytics';

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // Log to console
  if (process.env.NODE_ENV === 'development') {
     
    console.log('[Web Vitals]', metric);
  }
  // Optionally send to analytics
  trackEvent('web_vital', metric);
} 