import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

export default function Account() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mi Cuenta</h1>
          <p className="text-muted-foreground">Gestiona tu información personal y preferencias</p>
        </div>

        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-2xl font-semibold text-muted-foreground">Próximamente</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
