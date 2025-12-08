import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor,
}: MetricCardProps) {
  return (
    <div className="rounded-sm bg-card p-6 shadow-sm border border-border">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-card-foreground">{value}</p>
        </div>
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-sm',
            iconColor || 'bg-primary/10 text-primary'
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {change && (
        <p
          className={cn(
            'mt-3 text-sm font-medium',
            changeType === 'positive' && 'text-green-600 dark:text-green-400',
            changeType === 'negative' && 'text-destructive',
            changeType === 'neutral' && 'text-muted-foreground'
          )}
        >
          {change}
        </p>
      )}
    </div>
  );
}
