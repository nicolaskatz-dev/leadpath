import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { SourceChart } from '@/components/dashboard/SourceChart';
import { ConversionsChart } from '@/components/dashboard/ConversionsChart';
import { RecentConversions } from '@/components/dashboard/RecentConversions';
import { SourcesTable } from '@/components/dashboard/SourcesTable';
import { DateRangePicker, type DateRange } from '@/components/dashboard/DateRangePicker';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { ConversionTypeChart } from '@/components/dashboard/ConversionTypeChart';
import { DeviceChart } from '@/components/dashboard/DeviceChart';
import { CountryChart } from '@/components/dashboard/CountryChart';
import { ConversionFunnel } from '@/components/dashboard/ConversionFunnel';
import { Users, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { dailyConversions, mockLeads } from '@/data/mockData';

const Index = () => {
  const [dateRange, setDateRange] = useState<DateRange>('7d');

  // Calculate device distribution
  const deviceData = useMemo(() => {
    const devices = mockLeads.reduce((acc, lead) => {
      acc[lead.device] = (acc[lead.device] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const total = mockLeads.length;
    return Object.entries(devices).map(([device, count]) => ({
      device,
      count,
      percentage: Math.round((count / total) * 100),
    }));
  }, []);

  // Calculate country distribution
  const countryData = useMemo(() => {
    const countries = mockLeads.reduce((acc, lead) => {
      acc[lead.country] = (acc[lead.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(countries)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, []);

  // Funnel data
  const funnelSteps = [
    { label: 'Visitantes', count: 2580, percentage: 100 },
    { label: 'Engaged (>2 páginas)', count: 1240, percentage: 48 },
    { label: 'Interested (pricing)', count: 620, percentage: 24 },
    { label: 'Convertidos', count: 83, percentage: 3.2 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header with date picker */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Overview</h1>
            <p className="text-muted-foreground">
              Resumen de attribution y conversiones
            </p>
          </div>
          <DateRangePicker value={dateRange} onChange={setDateRange} />
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Total Conversiones" value="83" change="+24% vs semana anterior" changeType="positive" icon={Users} />
          <MetricCard title="Revenue Atribuido" value="$52,650" change="+18% vs semana anterior" changeType="positive" icon={DollarSign} iconColor="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" />
          <MetricCard title="Tasa de Conversión" value="3.2%" change="+0.4pp vs semana anterior" changeType="positive" icon={TrendingUp} iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
          <MetricCard title="Días hasta conversión" value="4.2" change="-0.8 días vs semana anterior" changeType="positive" icon={Clock} iconColor="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" />
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConversionsChart />
          <SourceChart />
        </div>

        {/* Charts row 2 - New charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueChart data={dailyConversions} />
          <ConversionTypeChart />
          <ConversionFunnel steps={funnelSteps} />
        </div>

        {/* Charts row 3 - Device and Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DeviceChart data={deviceData} />
          <CountryChart data={countryData} />
          <div className="lg:col-span-2">
            <RecentConversions />
          </div>
        </div>

        {/* Table */}
        <div>
          <SourcesTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;