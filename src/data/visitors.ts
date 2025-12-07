// Mock data for visitors and user account

export interface Visitor {
  id: string;
  visitorId: string;
  name?: string;
  email?: string;
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  firstVisit: Date;
  lastActivity: Date;
  pagesVisited: number;
  totalSessions: number;
  device: string;
  country: string;
  status: 'active' | 'converted' | 'cache_lost';
  conversionScore: number;
  topPages: string[];
  avgSessionDuration: number; // in seconds
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  timezone: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'business';
  planStartDate: Date;
  nextBillingDate: Date;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  highlighted?: boolean;
  limit: string;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'calendar' | 'ecommerce' | 'payments' | 'crm' | 'forms' | 'analytics';
  logo: string;
  status: 'available' | 'coming_soon' | 'beta';
}

export const mockUser: UserAccount = {
  id: 'user-1',
  name: 'Juan Pérez',
  email: 'juan.perez@empresa.com',
  company: 'Mi Empresa SRL',
  phone: '+54 11 1234-5678',
  timezone: 'America/Argentina/Buenos_Aires',
  plan: 'pro',
  planStartDate: new Date('2024-10-15'),
  nextBillingDate: new Date('2025-01-15'),
};

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'month',
    limit: '1,000 visitantes/mes',
    features: [
      '1 sitio web',
      'Tracking básico',
      'Retención 7 días',
      'Dashboard básico',
      'Soporte por email',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49,
    period: 'month',
    limit: '50,000 visitantes/mes',
    highlighted: true,
    features: [
      '5 sitios web',
      'Tracking avanzado',
      'Retención 90 días',
      'Dashboard completo',
      'Scoring de visitantes',
      'Integraciones básicas',
      'Soporte prioritario',
      'Exportar datos',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    price: 149,
    period: 'month',
    limit: '500,000 visitantes/mes',
    features: [
      'Sitios ilimitados',
      'Tracking enterprise',
      'Retención 1 año',
      'Dashboard avanzado',
      'Scoring + IA',
      'Todas las integraciones',
      'Soporte 24/7',
      'API access',
      'Webhooks',
      'White label',
    ],
  },
];

export const mockVisitors: Visitor[] = [
  {
    id: 'v1',
    visitorId: 'v_8f3k2j1',
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    source: 'TikTok',
    utmSource: 'tiktok',
    utmMedium: 'social',
    utmCampaign: 'black_friday_2024',
    firstVisit: new Date('2024-11-28'),
    lastActivity: new Date('2024-12-02'),
    pagesVisited: 12,
    totalSessions: 4,
    device: 'Mobile',
    country: 'Argentina',
    status: 'converted',
    conversionScore: 100,
    topPages: ['/pricing', '/features', '/demo'],
    avgSessionDuration: 245,
  },
  {
    id: 'v2',
    visitorId: 'v_9k4l3m2',
    source: 'Google',
    utmSource: 'google',
    utmMedium: 'cpc',
    utmCampaign: 'brand_search',
    firstVisit: new Date('2024-12-03'),
    lastActivity: new Date('2024-12-05'),
    pagesVisited: 6,
    totalSessions: 2,
    device: 'Desktop',
    country: 'México',
    status: 'active',
    conversionScore: 78,
    topPages: ['/pricing', '/features'],
    avgSessionDuration: 180,
  },
  {
    id: 'v3',
    visitorId: 'v_2n5o4p3',
    source: 'ChatGPT',
    firstVisit: new Date('2024-12-01'),
    lastActivity: new Date('2024-12-04'),
    pagesVisited: 18,
    totalSessions: 5,
    device: 'Desktop',
    country: 'Colombia',
    status: 'active',
    conversionScore: 85,
    topPages: ['/blog', '/case-studies', '/pricing'],
    avgSessionDuration: 320,
  },
  {
    id: 'v4',
    visitorId: 'v_6q7r8s5',
    source: 'Instagram',
    utmSource: 'instagram',
    utmMedium: 'social',
    firstVisit: new Date('2024-12-02'),
    lastActivity: new Date('2024-12-03'),
    pagesVisited: 3,
    totalSessions: 1,
    device: 'Mobile',
    country: 'España',
    status: 'active',
    conversionScore: 32,
    topPages: ['/home', '/about'],
    avgSessionDuration: 45,
  },
  {
    id: 'v5',
    visitorId: 'v_1t2u3v6',
    name: 'Roberto Sánchez',
    email: 'roberto@empresa.mx',
    source: 'LinkedIn',
    utmSource: 'linkedin',
    utmMedium: 'paid',
    firstVisit: new Date('2024-11-20'),
    lastActivity: new Date('2024-12-03'),
    pagesVisited: 32,
    totalSessions: 11,
    device: 'Desktop',
    country: 'México',
    status: 'converted',
    conversionScore: 100,
    topPages: ['/enterprise', '/pricing', '/demo'],
    avgSessionDuration: 420,
  },
  {
    id: 'v6',
    visitorId: 'v_4w5x6y7',
    source: 'TikTok',
    utmSource: 'tiktok',
    utmMedium: 'organic',
    firstVisit: new Date('2024-12-04'),
    lastActivity: new Date('2024-12-05'),
    pagesVisited: 2,
    totalSessions: 1,
    device: 'Mobile',
    country: 'Argentina',
    status: 'active',
    conversionScore: 15,
    topPages: ['/home'],
    avgSessionDuration: 30,
  },
  {
    id: 'v7',
    visitorId: 'v_lost_1',
    source: 'Google',
    firstVisit: new Date('2024-11-15'),
    lastActivity: new Date('2024-11-18'),
    pagesVisited: 8,
    totalSessions: 3,
    device: 'Desktop',
    country: 'Chile',
    status: 'cache_lost',
    conversionScore: 0,
    topPages: ['/pricing', '/features'],
    avgSessionDuration: 150,
  },
  {
    id: 'v8',
    visitorId: 'v_8z9a0b1',
    source: 'Direct',
    firstVisit: new Date('2024-12-05'),
    lastActivity: new Date('2024-12-05'),
    pagesVisited: 4,
    totalSessions: 1,
    device: 'Mobile',
    country: 'Perú',
    status: 'active',
    conversionScore: 45,
    topPages: ['/home', '/pricing'],
    avgSessionDuration: 90,
  },
  {
    id: 'v9',
    visitorId: 'v_2c3d4e5',
    source: 'Facebook',
    utmSource: 'facebook',
    utmMedium: 'paid',
    utmCampaign: 'retargeting',
    firstVisit: new Date('2024-11-30'),
    lastActivity: new Date('2024-12-04'),
    pagesVisited: 14,
    totalSessions: 6,
    device: 'Desktop',
    country: 'Argentina',
    status: 'active',
    conversionScore: 72,
    topPages: ['/pricing', '/demo', '/features'],
    avgSessionDuration: 280,
  },
  {
    id: 'v10',
    visitorId: 'v_5f6g7h8',
    source: 'Twitter',
    firstVisit: new Date('2024-12-03'),
    lastActivity: new Date('2024-12-03'),
    pagesVisited: 1,
    totalSessions: 1,
    device: 'Mobile',
    country: 'Uruguay',
    status: 'active',
    conversionScore: 8,
    topPages: ['/home'],
    avgSessionDuration: 15,
  },
];

export const integrations: Integration[] = [
  // Calendars
  { id: 'cal', name: 'Cal.com', description: 'Conecta tus agendas y trackea conversiones de reuniones', category: 'calendar', logo: '📅', status: 'coming_soon' },
  { id: 'calendly', name: 'Calendly', description: 'Atribuye cada reunión agendada a su fuente original', category: 'calendar', logo: '📆', status: 'coming_soon' },
  { id: 'google-calendar', name: 'Google Calendar', description: 'Sincroniza eventos y trackea conversiones', category: 'calendar', logo: '📅', status: 'coming_soon' },
  
  // E-commerce
  { id: 'tiendanube', name: 'Tiendanube', description: 'Trackea ventas y atribuye cada orden a su fuente', category: 'ecommerce', logo: '☁️', status: 'coming_soon' },
  { id: 'shopify', name: 'Shopify', description: 'Conecta tu tienda y ve qué campañas generan ventas', category: 'ecommerce', logo: '🛒', status: 'coming_soon' },
  { id: 'woocommerce', name: 'WooCommerce', description: 'Integración con WordPress y WooCommerce', category: 'ecommerce', logo: '🛍️', status: 'coming_soon' },
  { id: 'mercadoshops', name: 'Mercado Shops', description: 'Trackea ventas de tu tienda en Mercado Libre', category: 'ecommerce', logo: '🟡', status: 'coming_soon' },
  
  // Payments
  { id: 'stripe', name: 'Stripe', description: 'Atribuye cada pago a la fuente que lo generó', category: 'payments', logo: '💳', status: 'beta' },
  { id: 'mercadopago', name: 'Mercado Pago', description: 'Conecta pagos con el journey del visitante', category: 'payments', logo: '💰', status: 'coming_soon' },
  { id: 'rebill', name: 'Rebill', description: 'Trackea suscripciones y pagos recurrentes', category: 'payments', logo: '🔄', status: 'coming_soon' },
  { id: 'paypal', name: 'PayPal', description: 'Integración con pagos de PayPal', category: 'payments', logo: '🅿️', status: 'coming_soon' },
  
  // CRM
  { id: 'hubspot', name: 'HubSpot', description: 'Sincroniza leads con tu CRM automáticamente', category: 'crm', logo: '🧡', status: 'coming_soon' },
  { id: 'salesforce', name: 'Salesforce', description: 'Envía datos de atribución a Salesforce', category: 'crm', logo: '☁️', status: 'coming_soon' },
  { id: 'pipedrive', name: 'Pipedrive', description: 'Conecta deals con fuentes de tráfico', category: 'crm', logo: '🎯', status: 'coming_soon' },
  
  // Forms
  { id: 'typeform', name: 'Typeform', description: 'Trackea cada respuesta con su fuente', category: 'forms', logo: '📝', status: 'coming_soon' },
  { id: 'google-forms', name: 'Google Forms', description: 'Atribuye respuestas de formularios', category: 'forms', logo: '📋', status: 'coming_soon' },
  { id: 'tally', name: 'Tally', description: 'Integración con formularios Tally', category: 'forms', logo: '✅', status: 'coming_soon' },
  
  // Analytics
  { id: 'google-analytics', name: 'Google Analytics', description: 'Envía eventos custom a GA4', category: 'analytics', logo: '📊', status: 'coming_soon' },
  { id: 'mixpanel', name: 'Mixpanel', description: 'Sincroniza datos de atribución con Mixpanel', category: 'analytics', logo: '📈', status: 'coming_soon' },
  { id: 'amplitude', name: 'Amplitude', description: 'Enriquece eventos con datos de fuente', category: 'analytics', logo: '📉', status: 'coming_soon' },
];

export const visitorInsights = {
  scoreDistribution: [
    { range: 'Alto (70-100)', count: 15, percentage: 18 },
    { range: 'Medio (40-69)', count: 32, percentage: 38 },
    { range: 'Bajo (0-39)', count: 37, percentage: 44 },
  ],
  topPagesBeforeConversion: [
    { page: '/pricing', visits: 156 },
    { page: '/features', visits: 134 },
    { page: '/demo', visits: 98 },
    { page: '/case-studies', visits: 67 },
    { page: '/about', visits: 45 },
  ],
  avgTimeToConvert: 4.2, // days
  avgPagesBeforeConvert: 8.5,
  conversionRate: 12.4, // percentage
};
