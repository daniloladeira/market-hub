import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function TenantPage({ params }: { params: { tenant: string } }) {
  const { tenant } = params;

  const products = [
    { id: 1, name: "Produto Premium", price: "R$ 299,00", image: "https://placehold.co/400x400?text=Produto+1" },
    { id: 2, name: "Oferta Especial", price: "R$ 149,00", image: "https://placehold.co/400x400?text=Produto+2" },
    { id: 3, name: "Lançamento Exclusivo", price: "R$ 890,00", image: "https://placehold.co/400x400?text=Produto+3" },
    { id: 4, name: "Item de Coleção", price: "R$ 55,00", image: "https://placehold.co/400x400?text=Produto+4" },
  ];

  return (
    <div className="space-y-12">
      <section className="relative h-[400px] flex items-center justify-center rounded-xl overflow-hidden bg-primary/10">
        <div className="text-center space-y-4 px-4">
          <h1 className="text-5xl font-extrabold tracking-tight">Bem-vindo à {tenant}</h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            Confira nossas ofertas exclusivas e produtos selecionados para você.
          </p>
          <Button size="lg" className="rounded-full px-8">Ver Coleção</Button>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Destaques</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden group">
              <CardHeader className="p-0">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <p className="text-primary font-bold mt-2">{product.price}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">Adicionar ao Carrinho</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
