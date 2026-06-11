"use client";

import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutDashboard, Package, Users, Settings, LogOut } from "lucide-react";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="p-4">
            <h2 className="text-xl font-bold tracking-tight">Market Hub ERP</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/produtos">
                    <Package className="mr-2 h-4 w-4" />
                    <span>Produtos</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/clientes">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Clientes</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/configuracoes">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 p-8">
          <div className="flex items-center mb-8">
            <SidebarTrigger className="mr-4 lg:hidden" />
            <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
