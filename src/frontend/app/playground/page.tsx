"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function PlaygroundPage() {
  return (
    <div className="container mx-auto space-y-12 py-10">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Design System Playground
        </h1>
        <p className="text-lg text-muted-foreground">
          Testando componentes base seguindo as <strong>Laws of UX</strong> e o{" "}
          <strong>Design System</strong> do Market Hub.
        </p>
      </header>

      {/* Aesthetic-Usability Effect & Chunking */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Laws of UX</Badge>
          <h2 className="text-2xl font-semibold">
            Aesthetic-Usability & Chunking
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Identidade Visual</CardTitle>
              <CardDescription>
                Cores e Tipografia base do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div
                  className="h-10 w-10 rounded bg-primary shadow-sm"
                  title="Primary"
                />
                <div
                  className="h-10 w-10 rounded bg-secondary shadow-sm"
                  title="Secondary"
                />
                <div
                  className="h-10 w-10 rounded bg-muted shadow-sm"
                  title="Muted"
                />
                <div
                  className="h-10 w-10 rounded bg-destructive shadow-sm"
                  title="Destructive"
                />
              </div>
              <p className="text-sm">
                A tipografia utiliza <strong>Geist Sans</strong> para interfaces
                limpas e legíveis.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Doherty Threshold</CardTitle>
              <CardDescription>Feedback rápido (&lt;400ms).</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button onClick={() => alert("Ação instantânea!")}>
                Ação Rápida
              </Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground italic">
                Botões com estados de hover e active imediatos.
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fitts Law</CardTitle>
              <CardDescription>Alvos fáceis de alcançar.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="exemplo@markethub.com" />
              </div>
              <Button className="w-full">Entrar na Conta</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Data Density - Law of Similarity & Proximity */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Badge variant="outline">ERP View</Badge>
          <h2 className="text-2xl font-semibold">Densidade de Dados (ERP)</h2>
        </div>
        <Card>
          <Table>
            <TableCaption>
              Lista de produtos recentes no inventário.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-25">ID</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Preço</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">PROD-001</TableCell>
                <TableCell>Smartphone Galaxy S24</TableCell>
                <TableCell>
                  <Badge>Ativo</Badge>
                </TableCell>
                <TableCell className="text-right">R$ 4.500,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">PROD-002</TableCell>
                <TableCell>MacBook Air M2</TableCell>
                <TableCell>
                  <Badge variant="secondary">Estoque Baixo</Badge>
                </TableCell>
                <TableCell className="text-right">R$ 8.200,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">PROD-003</TableCell>
                <TableCell>Fone Sony WH-1000XM5</TableCell>
                <TableCell>
                  <Badge variant="outline">Inativo</Badge>
                </TableCell>
                <TableCell className="text-right">R$ 2.100,00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </section>
    </div>
  )
}
