import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { type Visitor } from '@/data/visitors';
import { Download, FileDown } from 'lucide-react';
import { toast } from 'sonner';

interface ExportCSVDialogProps {
  visitors: Visitor[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportCSVDialog({ visitors, open, onOpenChange }: ExportCSVDialogProps) {
  const [filters, setFilters] = useState({
    onlyConverted: false,
    onlyHighScore: false,
    onlyActive: false,
    includeUtms: true,
    includeSessions: true,
  });

  const getFilteredData = () => {
    let data = [...visitors];
    
    if (filters.onlyConverted) {
      data = data.filter(v => v.status === 'converted');
    }
    if (filters.onlyHighScore) {
      data = data.filter(v => v.conversionScore >= 70);
    }
    if (filters.onlyActive) {
      data = data.filter(v => v.status === 'active');
    }
    
    return data;
  };

  const exportToCSV = () => {
    const data = getFilteredData();
    
    const headers = [
      'Visitor ID',
      'Nombre',
      'Email',
      'Fuente',
      'Estado',
      'Score',
      'Páginas Visitadas',
      'Sesiones',
      'Dispositivo',
      'País',
      'Primera Visita',
      'Última Actividad',
      ...(filters.includeUtms ? ['UTM Source', 'UTM Medium', 'UTM Campaign'] : []),
      ...(filters.includeSessions ? ['Duración Promedio (seg)'] : []),
    ];
    
    const rows = data.map(v => [
      v.visitorId,
      v.name || '',
      v.email || '',
      v.source,
      v.status,
      v.conversionScore,
      v.pagesVisited,
      v.totalSessions,
      v.device,
      v.country,
      v.firstVisit.toISOString().split('T')[0],
      v.lastActivity.toISOString().split('T')[0],
      ...(filters.includeUtms ? [v.utmSource || '', v.utmMedium || '', v.utmCampaign || ''] : []),
      ...(filters.includeSessions ? [v.avgSessionDuration] : []),
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `visitantes_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    toast.success(`${data.length} visitantes exportados correctamente`);
    onOpenChange(false);
  };

  const filteredCount = getFilteredData().length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileDown className="h-5 w-5" />
            Exportar Visitantes a CSV
          </DialogTitle>
          <DialogDescription>
            Selecciona las opciones para normalizar y filtrar los datos
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold mb-3">Filtrar datos</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="onlyConverted" 
                  checked={filters.onlyConverted}
                  onCheckedChange={(checked) => setFilters(f => ({ ...f, onlyConverted: !!checked }))}
                />
                <Label htmlFor="onlyConverted" className="text-sm">Solo conversiones</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="onlyHighScore" 
                  checked={filters.onlyHighScore}
                  onCheckedChange={(checked) => setFilters(f => ({ ...f, onlyHighScore: !!checked }))}
                />
                <Label htmlFor="onlyHighScore" className="text-sm">Solo scores altos (&gt;70)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="onlyActive" 
                  checked={filters.onlyActive}
                  onCheckedChange={(checked) => setFilters(f => ({ ...f, onlyActive: !!checked }))}
                />
                <Label htmlFor="onlyActive" className="text-sm">Solo visitantes activos</Label>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-semibold mb-3">Incluir columnas</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includeUtms" 
                  checked={filters.includeUtms}
                  onCheckedChange={(checked) => setFilters(f => ({ ...f, includeUtms: !!checked }))}
                />
                <Label htmlFor="includeUtms" className="text-sm">Incluir UTMs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includeSessions" 
                  checked={filters.includeSessions}
                  onCheckedChange={(checked) => setFilters(f => ({ ...f, includeSessions: !!checked }))}
                />
                <Label htmlFor="includeSessions" className="text-sm">Incluir datos de sesión</Label>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Visitantes a exportar:</span>
            <span className="font-semibold">{filteredCount} de {visitors.length}</span>
          </div>

          <Button onClick={exportToCSV} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}