import { sourceMetrics } from '@/data/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function SourcesTable() {
  const totalConversions = sourceMetrics.reduce((acc, s) => acc + s.conversions, 0);

  return (
    <div className="rounded-sm bg-card p-6 shadow-sm border border-border">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Rendimiento por Fuente</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fuente</TableHead>
            <TableHead className="text-right">Conversiones</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead className="text-right">Días prom.</TableHead>
            <TableHead className="text-right">% del total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sourceMetrics.map((source) => (
            <TableRow key={source.source}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="font-medium">{source.source}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">{source.conversions}</TableCell>
              <TableCell className="text-right">${source.revenue.toLocaleString()}</TableCell>
              <TableCell className="text-right">{source.avgDaysToConvert}</TableCell>
              <TableCell className="text-right">
                {Math.round((source.conversions / totalConversions) * 100)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
