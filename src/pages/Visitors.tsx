import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockVisitors, visitorInsights, type Visitor } from '@/data/visitors';
import { VisitorDetailDialog } from '@/components/VisitorDetailDialog';
import { ExportCSVDialog } from '@/components/ExportCSVDialog';
import { DeviceChart } from '@/components/dashboard/DeviceChart';
import { CountryChart } from '@/components/dashboard/CountryChart';
import { Users, TrendingUp, Target, Clock, Search, Filter, Eye, BarChart3, Download, Activity } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line } from 'recharts';

const CHART_COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

function getScoreBadge(score: number, status: Visitor['status']) {
  if (status === 'converted') {
    return <Badge className="bg-primary text-primary-foreground">Convertido</Badge>;
  }
  if (status === 'cache_lost') {
    return <Badge variant="outline" className="text-muted-foreground">Cache perdido</Badge>;
  }
  if (score >= 70) {
    return <Badge className="bg-green-500 text-white">{score}% Alto</Badge>;
  }
  if (score >= 40) {
    return <Badge className="bg-yellow-500 text-white">{score}% Medio</Badge>;
  }
  return <Badge variant="secondary">{score}% Bajo</Badge>;
}

function getSourceColor(source: string): string {
  const colors: Record<string, string> = {
    TikTok: 'bg-pink-500',
    Google: 'bg-blue-500',
    Instagram: 'bg-purple-500',
    ChatGPT: 'bg-green-500',
    LinkedIn: 'bg-sky-600',
    Facebook: 'bg-blue-600',
    Direct: 'bg-muted',
    Twitter: 'bg-sky-400',
  };
  return colors[source] || 'bg-muted';
}

export default function Visitors() {
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [scoreFilter, setScoreFilter] = useState<string>('all');
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  const filteredVisitors = useMemo(() => {
    return mockVisitors.filter((visitor) => {
      const matchesSearch = 
        visitor.visitorId.toLowerCase().includes(search.toLowerCase()) ||
        visitor.name?.toLowerCase().includes(search.toLowerCase()) ||
        visitor.email?.toLowerCase().includes(search.toLowerCase());
      
      const matchesSource = sourceFilter === 'all' || visitor.source === sourceFilter;
      const matchesStatus = statusFilter === 'all' || visitor.status === statusFilter;
      
      let matchesScore = true;
      if (scoreFilter === 'high') matchesScore = visitor.conversionScore >= 70;
      if (scoreFilter === 'medium') matchesScore = visitor.conversionScore >= 40 && visitor.conversionScore < 70;
      if (scoreFilter === 'low') matchesScore = visitor.conversionScore < 40;
      
      return matchesSearch && matchesSource && matchesStatus && matchesScore;
    });
  }, [search, sourceFilter, statusFilter, scoreFilter]);

  const sources = [...new Set(mockVisitors.map(v => v.source))];
  
  const totalVisitors = mockVisitors.length;
  const convertedVisitors = mockVisitors.filter(v => v.status === 'converted').length;
  const avgScore = Math.round(mockVisitors.filter(v => v.status === 'active').reduce((sum, v) => sum + v.conversionScore, 0) / mockVisitors.filter(v => v.status === 'active').length);

  // Device distribution
  const deviceData = useMemo(() => {
    const devices = mockVisitors.reduce((acc, v) => {
      acc[v.device] = (acc[v.device] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const total = mockVisitors.length;
    return Object.entries(devices).map(([device, count]) => ({
      device,
      count,
      percentage: Math.round((count / total) * 100),
    }));
  }, []);

  // Country distribution
  const countryData = useMemo(() => {
    const countries = mockVisitors.reduce((acc, v) => {
      acc[v.country] = (acc[v.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(countries)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, []);

  // Source distribution
  const sourceData = useMemo(() => {
    const sourceCounts = mockVisitors.reduce((acc, v) => {
      acc[v.source] = (acc[v.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(sourceCounts)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // Session trend data (mock)
  const sessionTrendData = [
    { day: 'Lun', sessions: 45 },
    { day: 'Mar', sessions: 52 },
    { day: 'Mié', sessions: 48 },
    { day: 'Jue', sessions: 61 },
    { day: 'Vie', sessions: 55 },
    { day: 'Sáb', sessions: 32 },
    { day: 'Dom', sessions: 28 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Visitantes</h1>
            <p className="text-muted-foreground">Todos los visitantes con scoring de probabilidad de conversión</p>
          </div>
          <Button onClick={() => setExportDialogOpen(true)}>
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-sm bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total visitantes</p>
                  <p className="text-2xl font-bold">{totalVisitors}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-sm bg-green-500/10">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tasa conversión</p>
                  <p className="text-2xl font-bold">{visitorInsights.conversionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-sm bg-yellow-500/10">
                  <Target className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Score promedio</p>
                  <p className="text-2xl font-bold">{avgScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-sm bg-blue-500/10">
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Días hasta conversión</p>
                  <p className="text-2xl font-bold">{visitorInsights.avgTimeToConvert}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Páginas más visitadas antes de convertir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={visitorInsights.topPagesBeforeConversion} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="page" type="category" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="visits" fill="hsl(var(--primary))" radius={[0, 2, 2, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Distribución de scores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={visitorInsights.scoreDistribution}
                    dataKey="count"
                    nameKey="range"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ percentage }) => `${percentage}%`}
                  >
                    {visitorInsights.scoreDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2">
                {visitorInsights.scoreDistribution.map((item, index) => (
                  <div key={item.range} className="flex items-center gap-2 text-sm">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: CHART_COLORS[index] }} />
                    <span className="text-muted-foreground">{item.range}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-4">
          <DeviceChart data={deviceData} />
          <CountryChart data={countryData} />
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Sesiones por día
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={sessionTrendData}>
                  <defs>
                    <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis hide />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="sessions" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorSessions)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Por Fuente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sourceData.slice(0, 5).map((item) => (
                  <div key={item.source} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn('h-2 w-2 rounded-full', getSourceColor(item.source))} />
                      <span className="text-sm">{item.source}</span>
                    </div>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros inteligentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por ID, nombre o email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Fuente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las fuentes</SelectItem>
                  {sources.map((source) => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="converted">Convertidos</SelectItem>
                  <SelectItem value="cache_lost">Cache perdido</SelectItem>
                </SelectContent>
              </Select>
              <Select value={scoreFilter} onValueChange={setScoreFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los scores</SelectItem>
                  <SelectItem value="high">Alto (&gt;70)</SelectItem>
                  <SelectItem value="medium">Medio (40-70)</SelectItem>
                  <SelectItem value="low">Bajo (&lt;40)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Visitors Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de visitantes</CardTitle>
            <CardDescription>{filteredVisitors.length} visitantes encontrados</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Visitante</TableHead>
                  <TableHead>Fuente</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Páginas</TableHead>
                  <TableHead>Sesiones</TableHead>
                  <TableHead>Última actividad</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVisitors.map((visitor) => (
                  <TableRow key={visitor.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{visitor.name || visitor.visitorId}</p>
                        {visitor.email && (
                          <p className="text-sm text-muted-foreground">{visitor.email}</p>
                        )}
                        <p className="text-xs text-muted-foreground">{visitor.device} • {visitor.country}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn('h-2 w-2 rounded-full', getSourceColor(visitor.source))} />
                        <span>{visitor.source}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getScoreBadge(visitor.conversionScore, visitor.status)}
                    </TableCell>
                    <TableCell>{visitor.pagesVisited}</TableCell>
                    <TableCell>{visitor.totalSessions}</TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(visitor.lastActivity, { addSuffix: true, locale: es })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedVisitor(visitor);
                          setDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <VisitorDetailDialog 
          visitor={selectedVisitor} 
          open={dialogOpen} 
          onOpenChange={setDialogOpen} 
        />

        <ExportCSVDialog
          visitors={filteredVisitors}
          open={exportDialogOpen}
          onOpenChange={setExportDialogOpen}
        />
      </div>
    </DashboardLayout>
  );
}