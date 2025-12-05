// Mock data for Leadpath dashboard

export interface LeadEvent {
  id: string;
  type: 'pageview' | 'click' | 'form_submit' | 'conversion';
  timestamp: Date;
  page: string;
  details?: string;
}

export interface Lead {
  id: string;
  visitorId: string;
  name: string;
  email: string;
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  firstVisit: Date;
  conversionDate: Date;
  conversionValue: number;
  conversionType: string;
  device: string;
  country: string;
  pagesVisited: number;
  totalSessions: number;
  daysToConvert: number;
  events: LeadEvent[];
}

export interface SourceMetric {
  source: string;
  conversions: number;
  revenue: number;
  avgDaysToConvert: number;
  color: string;
}

// Generate mock events for a lead
const generateEvents = (firstVisit: Date, conversionDate: Date, pagesCount: number): LeadEvent[] => {
  const events: LeadEvent[] = [];
  const pages = ['/home', '/features', '/pricing', '/about', '/blog', '/demo', '/contact', '/case-studies'];
  const timeDiff = conversionDate.getTime() - firstVisit.getTime();
  
  for (let i = 0; i < pagesCount; i++) {
    const eventTime = new Date(firstVisit.getTime() + (timeDiff * (i / pagesCount)));
    events.push({
      id: `evt-${i}`,
      type: i === pagesCount - 1 ? 'conversion' : (Math.random() > 0.8 ? 'click' : 'pageview'),
      timestamp: eventTime,
      page: pages[Math.floor(Math.random() * pages.length)],
      details: i === pagesCount - 1 ? 'Form submitted' : undefined
    });
  }
  
  return events.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

export const mockLeads: Lead[] = [
  {
    id: '1',
    visitorId: 'v_8f3k2j1',
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    source: 'TikTok',
    utmSource: 'tiktok',
    utmMedium: 'social',
    utmCampaign: 'black_friday_2024',
    firstVisit: new Date('2024-11-28'),
    conversionDate: new Date('2024-12-02'),
    conversionValue: 450,
    conversionType: 'Purchase',
    device: 'Mobile',
    country: 'Argentina',
    pagesVisited: 12,
    totalSessions: 4,
    daysToConvert: 4,
    events: generateEvents(new Date('2024-11-28'), new Date('2024-12-02'), 12)
  },
  {
    id: '2',
    visitorId: 'v_9k4l3m2',
    name: 'María García',
    email: 'maria.garcia@empresa.com',
    source: 'Google',
    utmSource: 'google',
    utmMedium: 'cpc',
    utmCampaign: 'brand_search',
    firstVisit: new Date('2024-12-01'),
    conversionDate: new Date('2024-12-03'),
    conversionValue: 890,
    conversionType: 'Demo Request',
    device: 'Desktop',
    country: 'México',
    pagesVisited: 8,
    totalSessions: 2,
    daysToConvert: 2,
    events: generateEvents(new Date('2024-12-01'), new Date('2024-12-03'), 8)
  },
  {
    id: '3',
    visitorId: 'v_2n5o4p3',
    name: 'Carlos Rodríguez',
    email: 'carlos.r@startup.io',
    source: 'ChatGPT',
    firstVisit: new Date('2024-11-25'),
    conversionDate: new Date('2024-12-04'),
    conversionValue: 1200,
    conversionType: 'Purchase',
    device: 'Desktop',
    country: 'Colombia',
    pagesVisited: 24,
    totalSessions: 7,
    daysToConvert: 9,
    events: generateEvents(new Date('2024-11-25'), new Date('2024-12-04'), 24)
  },
  {
    id: '4',
    visitorId: 'v_6q7r8s5',
    name: 'Ana Martínez',
    email: 'ana.martinez@agencia.com',
    source: 'Instagram',
    utmSource: 'instagram',
    utmMedium: 'social',
    utmCampaign: 'stories_promo',
    utmContent: 'carousel_1',
    firstVisit: new Date('2024-12-02'),
    conversionDate: new Date('2024-12-04'),
    conversionValue: 299,
    conversionType: 'Subscription',
    device: 'Mobile',
    country: 'España',
    pagesVisited: 5,
    totalSessions: 2,
    daysToConvert: 2,
    events: generateEvents(new Date('2024-12-02'), new Date('2024-12-04'), 5)
  },
  {
    id: '5',
    visitorId: 'v_1t2u3v6',
    name: 'Roberto Sánchez',
    email: 'roberto@empresa.mx',
    source: 'LinkedIn',
    utmSource: 'linkedin',
    utmMedium: 'paid',
    utmCampaign: 'b2b_leads',
    firstVisit: new Date('2024-11-20'),
    conversionDate: new Date('2024-12-03'),
    conversionValue: 2500,
    conversionType: 'Enterprise Demo',
    device: 'Desktop',
    country: 'México',
    pagesVisited: 32,
    totalSessions: 11,
    daysToConvert: 13,
    events: generateEvents(new Date('2024-11-20'), new Date('2024-12-03'), 32)
  },
  {
    id: '6',
    visitorId: 'v_4w5x6y7',
    name: 'Laura Fernández',
    email: 'laura.f@gmail.com',
    source: 'TikTok',
    utmSource: 'tiktok',
    utmMedium: 'organic',
    firstVisit: new Date('2024-12-01'),
    conversionDate: new Date('2024-12-05'),
    conversionValue: 149,
    conversionType: 'Purchase',
    device: 'Mobile',
    country: 'Argentina',
    pagesVisited: 7,
    totalSessions: 3,
    daysToConvert: 4,
    events: generateEvents(new Date('2024-12-01'), new Date('2024-12-05'), 7)
  },
  {
    id: '7',
    visitorId: 'v_8z9a0b1',
    name: 'Diego López',
    email: 'diego.lopez@tech.co',
    source: 'Google',
    utmSource: 'google',
    utmMedium: 'organic',
    firstVisit: new Date('2024-11-30'),
    conversionDate: new Date('2024-12-04'),
    conversionValue: 599,
    conversionType: 'Purchase',
    device: 'Desktop',
    country: 'Chile',
    pagesVisited: 15,
    totalSessions: 5,
    daysToConvert: 4,
    events: generateEvents(new Date('2024-11-30'), new Date('2024-12-04'), 15)
  },
  {
    id: '8',
    visitorId: 'v_2c3d4e5',
    name: 'Valentina Torres',
    email: 'val.torres@mail.com',
    source: 'Direct',
    firstVisit: new Date('2024-12-03'),
    conversionDate: new Date('2024-12-05'),
    conversionValue: 199,
    conversionType: 'Subscription',
    device: 'Mobile',
    country: 'Perú',
    pagesVisited: 4,
    totalSessions: 1,
    daysToConvert: 2,
    events: generateEvents(new Date('2024-12-03'), new Date('2024-12-05'), 4)
  }
];

export const sourceMetrics: SourceMetric[] = [
  { source: 'TikTok', conversions: 24, revenue: 8420, avgDaysToConvert: 3.2, color: 'hsl(var(--chart-1))' },
  { source: 'Google', conversions: 18, revenue: 12650, avgDaysToConvert: 4.1, color: 'hsl(var(--chart-2))' },
  { source: 'Instagram', conversions: 15, revenue: 4890, avgDaysToConvert: 2.8, color: 'hsl(var(--chart-3))' },
  { source: 'ChatGPT', conversions: 12, revenue: 9200, avgDaysToConvert: 5.5, color: 'hsl(var(--chart-4))' },
  { source: 'LinkedIn', conversions: 8, revenue: 15600, avgDaysToConvert: 8.2, color: 'hsl(var(--chart-5))' },
  { source: 'Direct', conversions: 6, revenue: 1890, avgDaysToConvert: 1.5, color: 'hsl(var(--muted))' },
];

export const dailyConversions = [
  { date: 'Nov 25', conversions: 3, revenue: 1200 },
  { date: 'Nov 26', conversions: 5, revenue: 2100 },
  { date: 'Nov 27', conversions: 4, revenue: 1800 },
  { date: 'Nov 28', conversions: 8, revenue: 3500 },
  { date: 'Nov 29', conversions: 12, revenue: 5200 },
  { date: 'Nov 30', conversions: 15, revenue: 6800 },
  { date: 'Dec 1', conversions: 11, revenue: 4900 },
  { date: 'Dec 2', conversions: 9, revenue: 4100 },
  { date: 'Dec 3', conversions: 14, revenue: 6200 },
  { date: 'Dec 4', conversions: 18, revenue: 8100 },
  { date: 'Dec 5', conversions: 21, revenue: 9400 },
];

export const conversionTypes = [
  { type: 'Purchase', count: 45, percentage: 54 },
  { type: 'Demo Request', count: 22, percentage: 26 },
  { type: 'Subscription', count: 12, percentage: 14 },
  { type: 'Form Submit', count: 5, percentage: 6 },
];
