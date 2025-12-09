import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';
import { conversionTypes } from '@/data/mockData';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export function ConversionTypeChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Target className="h-4 w-4" />
          Tipos de Conversión
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={conversionTypes}
              dataKey="count"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label={({ type, percentage }) => `${percentage}%`}
              labelLine={false}
            >
              {conversionTypes.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          {conversionTypes.map((item, index) => (
            <div key={item.type} className="flex items-center gap-1.5 text-xs">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
              <span className="text-muted-foreground">{item.type}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}