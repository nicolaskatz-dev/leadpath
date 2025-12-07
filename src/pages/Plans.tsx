import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { mockUser, pricingPlans } from '@/data/visitors';
import { Check, CreditCard, Calendar, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const paymentHistory = [
  { id: 1, date: new Date('2024-12-15'), amount: 49, status: 'Pagado' },
  { id: 2, date: new Date('2024-11-15'), amount: 49, status: 'Pagado' },
  { id: 3, date: new Date('2024-10-15'), amount: 49, status: 'Pagado' },
];

export default function Plans() {
  const currentPlan = pricingPlans.find(p => p.id === mockUser.plan);

  const handleChangePlan = (planId: string) => {
    if (planId === mockUser.plan) {
      toast.info('Ya estás en este plan');
      return;
    }
    toast.success(`Solicitud de cambio a plan ${planId} enviada`);
  };

  const handleCancelSubscription = () => {
    toast.error('Funcionalidad no disponible en demo');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Planes y Facturación</h1>
          <p className="text-muted-foreground">Gestiona tu suscripción y método de pago</p>
        </div>

        {/* Current Plan Banner */}
        <Card className="border-primary bg-primary/5">
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">Plan {currentPlan?.name}</h3>
                  <Badge variant="default">Activo</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  ${currentPlan?.price}/mes • {currentPlan?.limit}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Próxima facturación</p>
                <p className="font-medium flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(mockUser.nextBillingDate, "d 'de' MMMM, yyyy", { locale: es })}
                </p>
              </div>
              <Button variant="outline" onClick={handleCancelSubscription}>
                Cancelar suscripción
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Plans */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Todos los planes</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.id}
                className={cn(
                  'relative',
                  plan.highlighted && 'border-primary shadow-lg',
                  plan.id === mockUser.plan && 'ring-2 ring-primary'
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Más popular</Badge>
                  </div>
                )}
                {plan.id === mockUser.plan && (
                  <div className="absolute -top-3 right-4">
                    <Badge variant="outline" className="bg-background">Tu plan</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                  <CardDescription className="mt-2">{plan.limit}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.id === mockUser.plan ? 'outline' : plan.highlighted ? 'default' : 'outline'}
                    onClick={() => handleChangePlan(plan.id)}
                    disabled={plan.id === mockUser.plan}
                  >
                    {plan.id === mockUser.plan ? 'Plan actual' : 'Cambiar a este plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Historial de pagos</CardTitle>
            <CardDescription>Tus últimas facturas y pagos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentHistory.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium">${payment.amount} USD</p>
                    <p className="text-sm text-muted-foreground">
                      {format(payment.date, "d 'de' MMMM, yyyy", { locale: es })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{payment.status}</Badge>
                    <Button variant="ghost" size="sm">Ver factura</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Método de pago</CardTitle>
            <CardDescription>Gestiona tu tarjeta de crédito o débito</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-16 rounded bg-muted flex items-center justify-center text-sm font-medium">
                  VISA
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expira 12/2026</p>
                </div>
              </div>
              <Button variant="outline">Cambiar tarjeta</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
