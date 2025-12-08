import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { LeadJourney } from '@/components/dashboard/LeadJourney';
import { mockLeads, Lead } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Monitor, Smartphone, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const sourceColors: Record<string, string> = {
  TikTok: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  Google: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Instagram: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  ChatGPT: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  LinkedIn: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  Direct: 'bg-muted text-muted-foreground',
};

const sources = ['Todas', 'TikTok', 'Google', 'Instagram', 'ChatGPT', 'LinkedIn', 'Direct'];

const Conversions = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('Todas');

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());
    const matchesSource = sourceFilter === 'Todas' || lead.source === sourceFilter;
    return matchesSearch && matchesSource;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Conversiones</h1>
          <p className="text-muted-foreground">
            Journey individual de cada lead con attribution completa
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lead list */}
          <div className="lg:col-span-1 space-y-4">
            {/* Filters */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar lead..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sources.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Lead cards */}
            <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto">
              {filteredLeads.map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={cn(
                    'w-full text-left p-4 rounded-sm border transition-all',
                    selectedLead?.id === lead.id
                      ? 'bg-primary/10 border-primary'
                      : 'bg-card border-border hover:border-primary/50'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-card-foreground truncate">
                          {lead.name}
                        </p>
                        {lead.device === 'Mobile' ? (
                          <Smartphone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        ) : (
                          <Monitor className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {lead.email}
                      </p>
                    </div>
                    <Badge
                      className={cn(
                        'shrink-0 text-xs',
                        sourceColors[lead.source] || sourceColors.Direct
                      )}
                    >
                      {lead.source}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-sm">
                    <span className="text-muted-foreground">
                      {format(lead.conversionDate, "d MMM", { locale: es })}
                    </span>
                    <span className="font-semibold text-card-foreground">
                      ${lead.conversionValue}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2 text-xs text-muted-foreground">
                    <span>{lead.pagesVisited} páginas</span>
                    <span>•</span>
                    <span>{lead.totalSessions} sesiones</span>
                    <span>•</span>
                    <span>{lead.daysToConvert}d</span>
                  </div>
                </button>
              ))}

              {filteredLeads.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No se encontraron leads
                </div>
              )}
            </div>
          </div>

          {/* Lead detail */}
          <div className="lg:col-span-2">
            {selectedLead ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 lg:hidden z-10"
                  onClick={() => setSelectedLead(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <LeadJourney lead={selectedLead} />
              </div>
            ) : (
              <div className="rounded-sm bg-card p-12 text-center border border-border">
                <div className="mx-auto w-16 h-16 rounded-sm bg-accent flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  Selecciona un lead
                </h3>
                <p className="text-muted-foreground">
                  Haz click en un lead para ver su journey completo con todos los eventos y atribución
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Conversions;
