import { cn } from '@/lib/utils';

export interface SourceAttribution {
  source: string;
  percentage: number;
  color: string;
}

interface AttributionBreakdownProps {
  attributions: SourceAttribution[];
  compact?: boolean;
}

const sourceColors: Record<string, string> = {
  TikTok: 'bg-pink-500',
  Google: 'bg-blue-500',
  Instagram: 'bg-purple-500',
  ChatGPT: 'bg-green-500',
  LinkedIn: 'bg-sky-600',
  Facebook: 'bg-blue-600',
  Direct: 'bg-muted-foreground',
  Twitter: 'bg-sky-400',
  Email: 'bg-amber-500',
  Newsletter: 'bg-orange-500',
};

export function AttributionBreakdown({ attributions, compact = false }: AttributionBreakdownProps) {
  return (
    <div className="space-y-2">
      {/* Visual bar */}
      <div className="flex h-2 rounded-sm overflow-hidden">
        {attributions.map((attr, idx) => (
          <div
            key={idx}
            className={cn(sourceColors[attr.source] || 'bg-muted')}
            style={{ width: `${attr.percentage}%` }}
          />
        ))}
      </div>
      
      {/* Labels */}
      {!compact && (
        <div className="flex flex-wrap gap-3 text-xs">
          {attributions.map((attr, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <div className={cn('h-2 w-2 rounded-full', sourceColors[attr.source] || 'bg-muted')} />
              <span className="text-muted-foreground">{attr.source}</span>
              <span className="font-semibold">{attr.percentage}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper function to generate mock attributions for a lead
export function generateAttributions(sources: string[]): SourceAttribution[] {
  if (sources.length === 0) return [];
  if (sources.length === 1) {
    return [{ source: sources[0], percentage: 100, color: '' }];
  }
  
  // Multi-touch attribution logic (placeholder - to be developed)
  // For now, use a simple weighted distribution
  const weights = sources.map((_, idx) => {
    // First touch: 40%, Last touch: 40%, Middle: 20% split
    if (idx === 0) return 40;
    if (idx === sources.length - 1) return 40;
    return 20 / (sources.length - 2);
  });
  
  const total = weights.reduce((a, b) => a + b, 0);
  
  return sources.map((source, idx) => ({
    source,
    percentage: Math.round((weights[idx] / total) * 100),
    color: '',
  }));
}