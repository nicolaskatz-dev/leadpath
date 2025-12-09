import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone } from 'lucide-react';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

interface DeviceChartProps {
  data: { device: string; count: number; percentage: number }[];
}

export function DeviceChart({ data }: DeviceChartProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Smartphone className="h-4 w-4" />
          Por Dispositivo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="device"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              label={({ percentage }) => `${percentage}%`}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-2">
          {data.map((item, index) => (
            <div key={item.device} className="flex items-center gap-2 text-xs">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
              <span className="text-muted-foreground">{item.device}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}