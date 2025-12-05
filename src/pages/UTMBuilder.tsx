import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check, Link2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const sources = [
  { value: 'google', label: 'Google' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'Twitter/X' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'email', label: 'Email' },
  { value: 'newsletter', label: 'Newsletter' },
];

const mediums = [
  { value: 'cpc', label: 'CPC (Paid Search)' },
  { value: 'social', label: 'Social' },
  { value: 'email', label: 'Email' },
  { value: 'organic', label: 'Organic' },
  { value: 'referral', label: 'Referral' },
  { value: 'display', label: 'Display' },
  { value: 'video', label: 'Video' },
  { value: 'affiliate', label: 'Affiliate' },
];

const UTMBuilder = () => {
  const [baseUrl, setBaseUrl] = useState('https://tu-sitio.com');
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [utmContent, setUtmContent] = useState('');
  const [utmTerm, setUtmTerm] = useState('');
  const [copied, setCopied] = useState(false);

  const generatedUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (utmSource) params.append('utm_source', utmSource);
    if (utmMedium) params.append('utm_medium', utmMedium);
    if (utmCampaign) params.append('utm_campaign', utmCampaign);
    if (utmContent) params.append('utm_content', utmContent);
    if (utmTerm) params.append('utm_term', utmTerm);

    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }, [baseUrl, utmSource, utmMedium, utmCampaign, utmContent, utmTerm]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    toast.success('URL copiada al portapapeles');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setBaseUrl('https://tu-sitio.com');
    setUtmSource('');
    setUtmMedium('');
    setUtmCampaign('');
    setUtmContent('');
    setUtmTerm('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Generador de UTMs</h1>
          <p className="text-muted-foreground">
            Crea URLs con parámetros UTM para trackear tus campañas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="h-5 w-5" />
                Parámetros UTM
              </CardTitle>
              <CardDescription>
                Completa los campos para generar tu URL trackeada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="baseUrl">URL Base *</Label>
                <Input
                  id="baseUrl"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://tu-sitio.com/landing"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source">Source (utm_source) *</Label>
                <Select value={utmSource} onValueChange={setUtmSource}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la fuente" />
                  </SelectTrigger>
                  <SelectContent>
                    {sources.map((source) => (
                      <SelectItem key={source.value} value={source.value}>
                        {source.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  ¿De dónde viene el tráfico?
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medium">Medium (utm_medium) *</Label>
                <Select value={utmMedium} onValueChange={setUtmMedium}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el medio" />
                  </SelectTrigger>
                  <SelectContent>
                    {mediums.map((medium) => (
                      <SelectItem key={medium.value} value={medium.value}>
                        {medium.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  ¿Qué tipo de canal es?
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign">Campaign (utm_campaign) *</Label>
                <Input
                  id="campaign"
                  value={utmCampaign}
                  onChange={(e) => setUtmCampaign(e.target.value)}
                  placeholder="black_friday_2024"
                />
                <p className="text-xs text-muted-foreground">
                  Nombre de tu campaña o promoción
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content (utm_content)</Label>
                <Input
                  id="content"
                  value={utmContent}
                  onChange={(e) => setUtmContent(e.target.value)}
                  placeholder="banner_hero, video_1, cta_footer"
                />
                <p className="text-xs text-muted-foreground">
                  Diferencia entre anuncios similares
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="term">Term (utm_term)</Label>
                <Input
                  id="term"
                  value={utmTerm}
                  onChange={(e) => setUtmTerm(e.target.value)}
                  placeholder="keyword, audiencia"
                />
                <p className="text-xs text-muted-foreground">
                  Palabras clave o audiencia target
                </p>
              </div>

              <Button variant="outline" onClick={handleReset} className="w-full">
                Limpiar campos
              </Button>
            </CardContent>
          </Card>

          {/* Generated URL */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  URL Generada
                </CardTitle>
                <CardDescription>
                  Tu URL con parámetros UTM lista para usar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-accent/50 rounded-lg break-all">
                  <code className="text-sm text-accent-foreground">{generatedUrl}</code>
                </div>
                <Button onClick={handleCopy} className="w-full" disabled={!utmSource}>
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar URL
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tips para UTMs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  ✓ Usa <strong>minúsculas</strong> y guiones bajos para consistencia
                </p>
                <p>
                  ✓ Mantén nombres de campaña <strong>descriptivos</strong> pero cortos
                </p>
                <p>
                  ✓ Usa <strong>utm_content</strong> para diferenciar variantes A/B
                </p>
                <p>
                  ✓ Documenta tus convenciones de naming en tu equipo
                </p>
                <p>
                  ✓ LeadPath detecta automáticamente TikTok, ChatGPT e Instagram aunque no uses UTMs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UTMBuilder;
