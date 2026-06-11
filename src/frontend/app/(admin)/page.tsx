import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, TrendingUp, Users, DollarSign } from "lucide-react";

export default function AdminPage() {
  const stats = [
    { title: "Vendas Totais", value: "R$ 45.231,89", icon: DollarSign, trend: "+20.1%" },
    { title: "Novos Clientes", value: "+2350", icon: Users, trend: "+180.1%" },
    { title: "Produtos Ativos", value: "12,234", icon: Package, trend: "+19%" },
    { title: "Taxa de Conversão", value: "3.2%", icon: TrendingUp, trend: "+4.3%" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">{stat.trend}</span> em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Visão Geral</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[200px] flex items-center justify-center text-muted-foreground italic">
            Gráfico de vendas será renderizado aqui...
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
