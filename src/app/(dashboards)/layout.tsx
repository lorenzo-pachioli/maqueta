import { BottomNav } from '@/components/shared/bottom-nav';
import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-screen-lg w-full flex-grow">
        <main className="flex-1 pb-24 md:pb-8">{children}</main>
      </div>
      <Footer />
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="mx-auto max-w-lg bg-background/95 backdrop-blur-sm">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
