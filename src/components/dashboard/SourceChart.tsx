import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { sourceMetrics } from '@/data/mockData';

export function SourceChart() {
  const data = sourceMetrics.map(s => ({
    name: s.source,
    value: s.conversions,
    color: s.color
  }));

  return (
    <div className="rounded-sm bg-card p-6 shadow-sm border border-border">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Conversiones por Fuente</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '2px',
                color: 'hsl(var(--card-foreground))'
              }}
              formatter={(value: number) => [`${value} conversiones`, '']}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
