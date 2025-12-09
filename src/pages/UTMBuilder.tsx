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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy, Check, Link2, Sparkles, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';

interface SavedUrl {
  id: string;
  name: string;
  url: string;
  createdAt: Date;
}

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
  const [urlName, setUrlName] = useState('');
  const [savedUrls, setSavedUrls] = useState<SavedUrl[]>(() => {
    const saved = localStorage.getItem('leadpath_saved_urls');
    return saved ? JSON.parse(saved) : [];
  });

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

  const handleCopy = async (url?: string) => {
    await navigator.clipboard.writeText(url || generatedUrl);
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
    setUrlName('');
  };

  const handleSaveUrl = () => {
    if (!utmSource) {
      toast.error('Debes completar al menos la fuente');
      return;
    }
    
    const name = urlName || `${utmSource}_${utmCampaign || 'campaign'}`;
    const newUrl: SavedUrl = {
      id: Date.now().toString(),
      name,
      url: generatedUrl,
      createdAt: new Date(),
    };
    
    const updated = [newUrl, ...savedUrls];
    setSavedUrls(updated);
    localStorage.setItem('leadpath_saved_urls', JSON.stringify(updated));
    toast.success('URL guardada correctamente');
    setUrlName('');
  };

  const handleDeleteUrl = (id: string) => {
    const updated = savedUrls.filter(u => u.id !== id);
    setSavedUrls(updated);
    localStorage.setItem('leadpath_saved_urls', JSON.stringify(updated));
    toast.success('URL eliminada');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl">
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
                <div className="p-4 bg-accent/50 rounded-sm break-all">
                  <code className="text-sm text-accent-foreground">{generatedUrl}</code>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={() => handleCopy()} className="flex-1" disabled={!utmSource}>
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
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Nombre para guardar (ej: TikTok Black Friday)"
                    value={urlName}
                    onChange={(e) => setUrlName(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleSaveUrl} disabled={!utmSource}>
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
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

        {/* Saved URLs */}
        {savedUrls.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>URLs Guardadas</CardTitle>
              <CardDescription>
                Haz click en copiar para usar tus URLs guardadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead className="w-[100px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {savedUrls.map((savedUrl) => (
                    <TableRow key={savedUrl.id}>
                      <TableCell className="font-medium">{savedUrl.name}</TableCell>
                      <TableCell>
                        <code className="text-xs text-muted-foreground truncate block max-w-md">
                          {savedUrl.url}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleCopy(savedUrl.url)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteUrl(savedUrl.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UTMBuilder;