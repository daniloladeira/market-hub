import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Search } from "lucide-react";

export default function StorefrontLayout({ children, params }: { children: React.ReactNode, params: { tenant: string } }) {
  const { tenant } = params;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <a href={`/${tenant}`} className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight uppercase">
                {tenant || "Market Hub Store"}
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a href={`/${tenant}/produtos`} className="transition-colors hover:text-primary">Produtos</a>
              <a href={`/${tenant}/categorias`} className="transition-colors hover:text-primary">Categorias</a>
              <a href={`/${tenant}/sobre`} className="transition-colors hover:text-primary">Sobre</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="search" 
                placeholder="Buscar produtos..." 
                className="pl-9 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-[200px]"
              />
            </div>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                0
              </span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        {children}
      </main>
      <footer className="border-t py-12 bg-muted/30">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold uppercase">{tenant}</h3>
            <p className="text-sm text-muted-foreground">
              A melhor experiência de compra personalizada para você.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Links Úteis</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Minha Conta</a></li>
              <li><a href="#" className="hover:text-primary">Meus Pedidos</a></li>
              <li><a href="#" className="hover:text-primary">Política de Privacidade</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Suporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">FAQ</a></li>
              <li><a href="#" className="hover:text-primary">Contato</a></li>
              <li><a href="#" className="hover:text-primary">Envios</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Newsletter</h4>
            <p className="text-sm text-muted-foreground">Receba ofertas exclusivas.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Seu email" className="flex-1 px-3 py-1 text-sm border rounded-md" />
              <Button size="sm">Ok</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
