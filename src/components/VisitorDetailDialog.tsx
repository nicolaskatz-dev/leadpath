import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type Visitor } from '@/data/visitors';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  Monitor, 
  Smartphone, 
  MapPin, 
  Calendar, 
  Clock, 
  Globe, 
  Eye,
  Tag,
  Link2,
  MousePointer
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VisitorDetailDialogProps {
  visitor: Visitor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock additional data for the visitor detail
function getMockVisitorDetails(visitor: Visitor) {
  return {
    ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    city: visitor.country === 'Argentina' ? 'Buenos Aires' : 
          visitor.country === 'México' ? 'Ciudad de México' : 
          visitor.country === 'Colombia' ? 'Bogotá' : 
          visitor.country === 'España' ? 'Madrid' : 
          visitor.country === 'Chile' ? 'Santiago' : 
          visitor.country === 'Perú' ? 'Lima' : 
          visitor.country === 'Uruguay' ? 'Montevideo' : 'Ciudad',
    browser: visitor.device === 'Mobile' ? 'Safari Mobile' : 'Chrome',
    os: visitor.device === 'Mobile' ? 'iOS 17.2' : 'Windows 11',
    sources: [
      { date: visitor.firstVisit, source: visitor.source, medium: visitor.utmMedium || 'organic' },
      ...(visitor.totalSessions > 1 ? [
        { date: new Date(visitor.firstVisit.getTime() + 86400000), source: 'Direct', medium: 'none' }
      ] : []),
      ...(visitor.totalSessions > 2 ? [
        { date: new Date(visitor.firstVisit.getTime() + 86400000 * 2), source: 'Google', medium: 'organic' }
      ] : []),
    ],
    allUtms: [
      ...(visitor.utmSource ? [{
        source: visitor.utmSource,
        medium: visitor.utmMedium,
        campaign: visitor.utmCampaign,
        content: visitor.utmCampaign?.includes('video') ? 'video_123' : undefined,
        date: visitor.firstVisit,
      }] : []),
      ...(visitor.totalSessions > 2 ? [{
        source: 'google',
        medium: 'cpc',
        campaign: 'remarketing',
        content: 'banner_retarget',
        date: new Date(visitor.firstVisit.getTime() + 86400000 * 3),
      }] : []),
    ],
    pageViews: [
      { page: '/home', time: '0:45', date: visitor.firstVisit },
      { page: '/pricing', time: '2:10', date: new Date(visitor.firstVisit.getTime() + 60000) },
      { page: '/features', time: '1:35', date: new Date(visitor.firstVisit.getTime() + 180000) },
      ...(visitor.pagesVisited > 3 ? [
        { page: '/demo', time: '3:20', date: new Date(visitor.firstVisit.getTime() + 300000) }
      ] : []),
      ...(visitor.pagesVisited > 6 ? [
        { page: '/case-studies', time: '2:45', date: new Date(visitor.firstVisit.getTime() + 500000) },
        { page: '/about', time: '0:55', date: new Date(visitor.firstVisit.getTime() + 700000) }
      ] : []),
    ],
    sessions: Array.from({ length: visitor.totalSessions }, (_, i) => ({
      date: new Date(visitor.firstVisit.getTime() + i * 86400000),
      duration: Math.floor(Math.random() * 300) + 30,
      pages: Math.floor(Math.random() * 5) + 1,
    })),
  };
}

function getSourceColor(source: string): string {
  const colors: Record<string, string> = {
    TikTok: 'bg-pink-500',
    Google: 'bg-blue-500',
    Instagram: 'bg-purple-500',
    ChatGPT: 'bg-green-500',
    LinkedIn: 'bg-sky-600',
    Facebook: 'bg-blue-600',
    Direct: 'bg-muted-foreground',
    Twitter: 'bg-sky-400',
  };
  return colors[source] || 'bg-muted-foreground';
}

export function VisitorDetailDialog({ visitor, open, onOpenChange }: VisitorDetailDialogProps) {
  if (!visitor) return null;

  const details = getMockVisitorDetails(visitor);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>{visitor.name || visitor.visitorId}</span>
            <Badge 
              variant={visitor.status === 'converted' ? 'default' : 'secondary'}
              className={cn(visitor.status === 'converted' && 'bg-primary')}
            >
              {visitor.status === 'converted' ? 'Convertido' : 
               visitor.status === 'cache_lost' ? 'Cache perdido' : 'Activo'}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm">
                {visitor.device === 'Mobile' ? (
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                )}
                <div>
                  <p className="text-muted-foreground text-xs">Dispositivo</p>
                  <p className="font-medium">{visitor.device}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground text-xs">Ubicación</p>
                  <p className="font-medium">{details.city}, {visitor.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground text-xs">IP</p>
                  <p className="font-medium font-mono text-xs">{details.ip}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Monitor className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground text-xs">Browser / OS</p>
                  <p className="font-medium text-xs">{details.browser} / {details.os}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* All Sources */}
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Link2 className="h-4 w-4" />
                Historial de fuentes ({details.sources.length} entradas)
              </h4>
              <div className="space-y-2">
                {details.sources.map((src, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-sm bg-accent/50">
                    <div className="flex items-center gap-2">
                      <div className={cn('h-2 w-2 rounded-full', getSourceColor(src.source))} />
                      <span className="font-medium text-sm">{src.source}</span>
                      <span className="text-xs text-muted-foreground">/ {src.medium}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {format(src.date, "d MMM yyyy", { locale: es })}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* All UTMs */}
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Todas las UTMs ({details.allUtms.length} registros)
              </h4>
              {details.allUtms.length > 0 ? (
                <div className="space-y-3">
                  {details.allUtms.map((utm, idx) => (
                    <div key={idx} className="p-3 rounded-sm bg-accent/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">
                          {format(utm.date, "d MMM yyyy, HH:mm", { locale: es })}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <code className="text-xs bg-background px-2 py-1 rounded-sm">
                          source={utm.source}
                        </code>
                        {utm.medium && (
                          <code className="text-xs bg-background px-2 py-1 rounded-sm">
                            medium={utm.medium}
                          </code>
                        )}
                        {utm.campaign && (
                          <code className="text-xs bg-background px-2 py-1 rounded-sm">
                            campaign={utm.campaign}
                          </code>
                        )}
                        {utm.content && (
                          <code className="text-xs bg-background px-2 py-1 rounded-sm">
                            content={utm.content}
                          </code>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No hay UTMs registradas para este visitante.</p>
              )}
            </div>

            <Separator />

            {/* Sessions */}
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Sesiones ({visitor.totalSessions} total)
              </h4>
              <div className="space-y-2">
                {details.sessions.map((session, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-sm bg-accent/50">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {format(session.date, "d MMM yyyy", { locale: es })}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{Math.floor(session.duration / 60)}:{String(session.duration % 60).padStart(2, '0')} min</span>
                      <span>{session.pages} páginas</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Page Views */}
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Páginas visitadas ({visitor.pagesVisited} total)
              </h4>
              <div className="space-y-2">
                {details.pageViews.map((pv, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-sm hover:bg-accent/50">
                    <div className="flex items-center gap-2">
                      <MousePointer className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-mono">{pv.page}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{pv.time}</span>
                      <span className="text-xs">
                        {format(pv.date, "HH:mm", { locale: es })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Pages */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Páginas más visitadas</h4>
              <div className="flex flex-wrap gap-2">
                {visitor.topPages.map((page) => (
                  <Badge key={page} variant="outline" className="font-mono text-xs">
                    {page}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}