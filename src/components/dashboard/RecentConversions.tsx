import { Link } from 'react-router-dom';
import { mockLeads } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Monitor, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

const sourceColors: Record<string, string> = {
  TikTok: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  Google: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Instagram: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  ChatGPT: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  LinkedIn: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  Direct: 'bg-muted text-muted-foreground',
};

export function RecentConversions() {
  const recentLeads = mockLeads.slice(0, 5);

  return (
    <div className="rounded-sm bg-card p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Conversiones Recientes</h3>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/conversions" className="text-primary">
            Ver todas <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="space-y-4">
        {recentLeads.map((lead) => (
          <div
            key={lead.id}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-card-foreground truncate">{lead.name}</p>
                {lead.device === 'Mobile' ? (
                  <Smartphone className="h-3.5 w-3.5 text-muted-foreground" />
                ) : (
                  <Monitor className="h-3.5 w-3.5 text-muted-foreground" />
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">{lead.email}</p>
            </div>
            <Badge className={cn('shrink-0', sourceColors[lead.source] || sourceColors.Direct)}>
              {lead.source}
            </Badge>
            <div className="text-right shrink-0">
              <p className="font-semibold text-card-foreground">${lead.conversionValue}</p>
              <p className="text-xs text-muted-foreground">{lead.daysToConvert}d</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
