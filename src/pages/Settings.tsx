import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Target, 
  Bell, 
  Copy, 
  Check, 
  Plus, 
  Trash2,
  Globe,
  MousePointer,
  FileText,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

interface ConversionGoal {
  id: string;
  name: string;
  type: 'form' | 'button' | 'page' | 'custom';
  selector: string;
  active: boolean;
}

const initialGoals: ConversionGoal[] = [
  { id: '1', name: 'Formulario de contacto', type: 'form', selector: '#contact-form', active: true },
  { id: '2', name: 'Botón de compra', type: 'button', selector: '.btn-purchase', active: true },
  { id: '3', name: 'Página de gracias', type: 'page', selector: '/thank-you', active: true },
  { id: '4', name: 'Demo request', type: 'form', selector: '#demo-form', active: false },
];

const typeIcons: Record<string, typeof FileText> = {
  form: FileText,
  button: MousePointer,
  page: Globe,
  custom: Eye,
};

const typeLabels: Record<string, string> = {
  form: 'Formulario',
  button: 'Botón',
  page: 'Página',
  custom: 'Custom',
};

const Settings = () => {
  const [copied, setCopied] = useState(false);
  const [goals, setGoals] = useState<ConversionGoal[]>(initialGoals);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalType, setNewGoalType] = useState<'form' | 'button' | 'page' | 'custom'>('form');
  const [newGoalSelector, setNewGoalSelector] = useState('');

  const widgetCode = `<script src="https://cdn.leadpath.io/widget.js" data-site="abc123"></script>`;

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(widgetCode);
    setCopied(true);
    toast.success('Código copiado al portapapeles');
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleGoal = (id: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, active: !g.active } : g));
    toast.success('Configuración actualizada');
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
    toast.success('Objetivo eliminado');
  };

  const addGoal = () => {
    if (!newGoalName || !newGoalSelector) {
      toast.error('Completa todos los campos');
      return;
    }
    const newGoal: ConversionGoal = {
      id: Date.now().toString(),
      name: newGoalName,
      type: newGoalType,
      selector: newGoalSelector,
      active: true,
    };
    setGoals([...goals, newGoal]);
    setNewGoalName('');
    setNewGoalSelector('');
    toast.success('Objetivo agregado');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
          <p className="text-muted-foreground">
            Configura tu widget y define qué conversiones trackear
          </p>
        </div>

        <Tabs defaultValue="widget" className="space-y-6">
          <TabsList>
            <TabsTrigger value="widget" className="gap-2">
              <Code className="h-4 w-4" />
              Widget
            </TabsTrigger>
            <TabsTrigger value="conversions" className="gap-2">
              <Target className="h-4 w-4" />
              Conversiones
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notificaciones
            </TabsTrigger>
          </TabsList>

          {/* Widget Tab */}
          <TabsContent value="widget" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Instalar Widget</CardTitle>
                <CardDescription>
                  Copia este código y pégalo antes del cierre del tag &lt;/body&gt; en tu sitio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <pre className="p-4 bg-foreground text-background rounded-lg overflow-x-auto text-sm">
                    <code>{widgetCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-2 right-2"
                    onClick={handleCopyCode}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  Widget detectado y funcionando correctamente
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuración del Widget</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Trackear pageviews</Label>
                    <p className="text-sm text-muted-foreground">
                      Registrar cada página visitada
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Trackear clicks</Label>
                    <p className="text-sm text-muted-foreground">
                      Registrar clicks en enlaces y botones
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-detectar fuentes</Label>
                    <p className="text-sm text-muted-foreground">
                      Identificar TikTok, ChatGPT, etc. automáticamente
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Persistencia cross-session</Label>
                    <p className="text-sm text-muted-foreground">
                      Mantener attribution aunque cierren el navegador
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conversions Tab */}
          <TabsContent value="conversions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Objetivos de Conversión</CardTitle>
                <CardDescription>
                  Define qué acciones contar como conversiones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {goals.map((goal) => {
                  const Icon = typeIcons[goal.type];
                  return (
                    <div
                      key={goal.id}
                      className="flex items-center gap-4 p-4 rounded-lg border border-border"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                        <Icon className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-card-foreground">{goal.name}</p>
                          <Badge variant="outline" className="text-xs">
                            {typeLabels[goal.type]}
                          </Badge>
                        </div>
                        <code className="text-xs text-muted-foreground">{goal.selector}</code>
                      </div>
                      <Switch checked={goal.active} onCheckedChange={() => toggleGoal(goal.id)} />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteGoal(goal.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agregar Objetivo</CardTitle>
                <CardDescription>
                  Crea un nuevo objetivo de conversión
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Nombre</Label>
                    <Input
                      value={newGoalName}
                      onChange={(e) => setNewGoalName(e.target.value)}
                      placeholder="Ej: Compra completada"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <div className="flex gap-2">
                      {(['form', 'button', 'page', 'custom'] as const).map((type) => {
                        const Icon = typeIcons[type];
                        return (
                          <Button
                            key={type}
                            variant={newGoalType === type ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setNewGoalType(type)}
                          >
                            <Icon className="h-4 w-4" />
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Selector/URL</Label>
                    <Input
                      value={newGoalSelector}
                      onChange={(e) => setNewGoalSelector(e.target.value)}
                      placeholder={newGoalType === 'page' ? '/thank-you' : '#form-id'}
                    />
                  </div>
                </div>
                <Button onClick={addGoal}>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar objetivo
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>
                  Configura cómo quieres recibir alertas de conversiones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email de conversiones</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibir email cuando hay una nueva conversión
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Resumen diario</Label>
                    <p className="text-sm text-muted-foreground">
                      Resumen de conversiones del día anterior
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Alertas de high-value leads</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificar conversiones mayores a $500
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2 pt-4">
                  <Label>Email de notificaciones</Label>
                  <Input defaultValue="team@tu-empresa.com" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
