import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown } from 'lucide-react';

interface FunnelStep {
  label: string;
  count: number;
  percentage: number;
}

interface ConversionFunnelProps {
  steps: FunnelStep[];
}

export function ConversionFunnel({ steps }: ConversionFunnelProps) {
  const maxCount = Math.max(...steps.map(s => s.count));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingDown className="h-4 w-4" />
          Funnel de Conversión
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {steps.map((step, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{step.label}</span>
                <span className="font-medium">{step.count}</span>
              </div>
              <div className="h-6 bg-accent rounded-sm overflow-hidden relative">
                <div 
                  className="h-full bg-primary transition-all"
                  style={{ width: `${(step.count / maxCount) * 100}%` }}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium">
                  {step.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}