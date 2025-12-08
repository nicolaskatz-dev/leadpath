import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { SourceChart } from '@/components/dashboard/SourceChart';
import { ConversionsChart } from '@/components/dashboard/ConversionsChart';
import { RecentConversions } from '@/components/dashboard/RecentConversions';
import { SourcesTable } from '@/components/dashboard/SourcesTable';
import { Users, DollarSign, TrendingUp, Clock } from 'lucide-react';
const Index = () => {
  return <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Overview</h1>
          <p className="text-muted-foreground">
            Resumen de attribution y conversiones de los últimos 7 días
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Total Conversiones" value="83" change="+24% vs semana anterior" changeType="positive" icon={Users} />
          <MetricCard title="Revenue Atribuido" value="$52,650" change="+18% vs semana anterior" changeType="positive" icon={DollarSign} iconColor="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" />
          <MetricCard title="Tasa de Conversión" value="3.2%" change="+0.4pp vs semana anterior" changeType="positive" icon={TrendingUp} iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
          <MetricCard title="Días hasta conversión" value="4.2" change="-0.8 días vs semana anterior" changeType="positive" icon={Clock} iconColor="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConversionsChart />
          <SourceChart />
        </div>

        {/* Recent conversions and table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentConversions />
          <SourcesTable />
        </div>
      </div>
    </DashboardLayout>;
};
export default Index;