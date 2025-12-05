import { Lead, LeadEvent } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  MousePointer, 
  FileText, 
  CheckCircle2, 
  Monitor, 
  Smartphone,
  MapPin,
  Calendar,
  Clock,
  Globe
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface LeadJourneyProps {
  lead: Lead;
}

const eventIcons: Record<string, typeof Eye> = {
  pageview: Eye,
  click: MousePointer,
  form_submit: FileText,
  conversion: CheckCircle2,
};

const sourceColors: Record<string, string> = {
  TikTok: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  Google: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Instagram: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  ChatGPT: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  LinkedIn: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  Direct: 'bg-muted text-muted-foreground',
};

export function LeadJourney({ lead }: LeadJourneyProps) {
  return (
    <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-card-foreground">{lead.name}</h3>
          <p className="text-sm text-muted-foreground">{lead.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={cn(sourceColors[lead.source] || sourceColors.Direct)}>
            {lead.source}
          </Badge>
          <Badge variant="outline" className="font-semibold">
            ${lead.conversionValue}
          </Badge>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm">
          {lead.device === 'Mobile' ? (
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Monitor className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-muted-foreground">{lead.device}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{lead.country}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{lead.daysToConvert} días</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{lead.totalSessions} sesiones</span>
        </div>
      </div>

      {/* UTM info */}
      {lead.utmSource && (
        <div className="mb-6 p-3 rounded-lg bg-accent/50">
          <p className="text-xs font-medium text-muted-foreground mb-2">UTM Parameters</p>
          <div className="flex flex-wrap gap-2">
            {lead.utmSource && (
              <code className="text-xs bg-background px-2 py-1 rounded">
                source={lead.utmSource}
              </code>
            )}
            {lead.utmMedium && (
              <code className="text-xs bg-background px-2 py-1 rounded">
                medium={lead.utmMedium}
              </code>
            )}
            {lead.utmCampaign && (
              <code className="text-xs bg-background px-2 py-1 rounded">
                campaign={lead.utmCampaign}
              </code>
            )}
            {lead.utmContent && (
              <code className="text-xs bg-background px-2 py-1 rounded">
                content={lead.utmContent}
              </code>
            )}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div>
        <h4 className="text-sm font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Journey Timeline ({lead.pagesVisited} páginas)
        </h4>
        <div className="space-y-3">
          {lead.events.map((event, index) => {
            const Icon = eventIcons[event.type] || Eye;
            const isConversion = event.type === 'conversion';
            
            return (
              <div
                key={event.id}
                className={cn(
                  'flex items-start gap-3 p-3 rounded-lg transition-colors',
                  isConversion ? 'bg-primary/10' : 'hover:bg-accent/50'
                )}
              >
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full shrink-0',
                    isConversion ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    'font-medium text-sm',
                    isConversion ? 'text-primary' : 'text-card-foreground'
                  )}>
                    {event.type === 'pageview' && `Visitó ${event.page}`}
                    {event.type === 'click' && `Click en ${event.page}`}
                    {event.type === 'form_submit' && 'Envió formulario'}
                    {event.type === 'conversion' && `✨ ${lead.conversionType}`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(event.timestamp), "d MMM, HH:mm", { locale: es })}
                  </p>
                </div>
                {index === 0 && (
                  <Badge variant="secondary" className="shrink-0 text-xs">
                    Primera visita
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
