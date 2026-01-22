import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DollarSign } from 'lucide-react';

const transactions = [
  { id: 'txn1', date: '2024-07-15', description: 'Transporte para Ana C.', amount: 45.00, status: 'Completado' },
  { id: 'txn2', date: '2024-07-14', description: 'Retiro de fondos', amount: -150.00, status: 'Procesado' },
  { id: 'txn3', date: '2024-07-12', description: 'Entrega para Pedro M.', amount: 75.00, status: 'Completado' },
  { id: 'txn4', date: '2024-07-10', description: 'Mudanza para Luis G.', amount: 28.00, status: 'Completado' },
  { id: 'txn5', date: '2024-07-09', description: 'Retiro de fondos', amount: -200.00, status: 'Procesado' },
];

const totalBalance = 248.50;

export default function EarningsPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Mis Ganancias</h1>
        <p className="mt-1 text-muted-foreground">Revisa tu balance e historial de transacciones.</p>
      </header>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Balance Actual</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalBalance.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Disponible para retirar</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Transacciones</CardTitle>
          <CardDescription>Aquí están tus transacciones más recientes.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString('es-ES')}</TableCell>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>
                    <Badge variant={transaction.status === 'Completado' ? 'default' : 'secondary'} className={transaction.status === 'Completado' ? 'bg-green-500' : ''}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className={`text-right font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
