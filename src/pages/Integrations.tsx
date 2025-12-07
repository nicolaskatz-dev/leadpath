import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { integrations, type Integration } from '@/data/visitors';
import { Search, Plug } from 'lucide-react';

const categories = [
  { id: 'all', name: 'Todas' },
  { id: 'calendar', name: 'Calendarios' },
  { id: 'ecommerce', name: 'E-commerce' },
  { id: 'payments', name: 'Pagos' },
  { id: 'crm', name: 'CRM' },
  { id: 'forms', name: 'Formularios' },
  { id: 'analytics', name: 'Analytics' },
];

function getStatusBadge(status: Integration['status']) {
  switch (status) {
    case 'available':
      return <Badge className="bg-green-500 text-white">Disponible</Badge>;
    case 'beta':
      return <Badge variant="outline" className="border-primary text-primary">Beta</Badge>;
    case 'coming_soon':
      return <Badge variant="secondary">Próximamente</Badge>;
  }
}

export default function Integrations() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch = integration.name.toLowerCase().includes(search.toLowerCase()) ||
      integration.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || integration.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Integraciones</h1>
          <p className="text-muted-foreground">Conecta Leadpath con tus herramientas favoritas</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar integraciones..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="flex-wrap h-auto gap-2">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="px-4">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredIntegrations.map((integration) => (
                <Card key={integration.id} className="relative overflow-hidden opacity-75 hover:opacity-100 transition-opacity cursor-not-allowed">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                          {integration.logo}
                        </div>
                        <div>
                          <CardTitle className="text-base">{integration.name}</CardTitle>
                          {getStatusBadge(integration.status)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredIntegrations.length === 0 && (
              <div className="text-center py-12">
                <Plug className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No se encontraron integraciones</h3>
                <p className="text-muted-foreground">Intenta con otro término de búsqueda</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Coming Soon Banner */}
        <Card className="bg-accent/50 border-accent">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Plug className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">¿No encontrás la integración que necesitás?</h3>
              <p className="text-sm text-muted-foreground">
                Estamos trabajando en más integraciones. Contanos qué herramienta usás y la priorizamos.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
