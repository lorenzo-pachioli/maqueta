import { BottomNav } from '@/components/shared/bottom-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="mx-auto max-w-lg">
        <main className="flex-1 pb-24">{children}</main>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-lg bg-background">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
