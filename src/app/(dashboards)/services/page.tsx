import { serviceCategories } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ServicesPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Servicios</h1>
        <p className="text-muted-foreground">Explora todos los servicios que ofrecemos.</p>
      </header>

      {serviceCategories.map((category) => (
        <section key={category.name}>
          <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {category.services.map((service) => (
              <Card key={service.name} className="flex flex-col items-center justify-center text-center p-4">
                <CardHeader className="p-2">
                  <service.icon className="h-10 w-10 text-primary mx-auto" />
                </CardHeader>
                <CardContent className="p-2">
                  <p className="font-semibold">{service.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
