# Design System - Market Hub

Este documento define os fundamentos visuais e componentes da plataforma Market Hub.

## 1. Princípios
- **Agnóstico de Marca:** A estrutura deve funcionar bem tanto para uma loja de eletrônicos quanto para uma boutique de moda.
- **Densidade de Dados:** O ERP deve priorizar a exibição de informações (tabelas, métricas), enquanto a vitrine deve priorizar imagens e call-to-actions.
- **Acessibilidade:** Conformidade mínima com WCAG 2.1 (contraste e navegação por teclado).

## 2. Design Tokens (Tailwind v4 / CSS Variables)

### 2.1. Cores Base (Sistema)
Utilizamos o padrão de variáveis CSS para permitir que o backend injete cores customizadas por tenant.

- **Background:** `--background` (Padrão: `#ffffff`)
- **Foreground:** `--foreground` (Padrão: `#09090b`)
- **Primary:** `--primary` (Cor da marca do lojista)
- **Secondary:** `--secondary` (Ações secundárias)
- **Muted:** `--muted` (Textos de suporte e backgrounds sutis)
- **Destructive:** `--destructive` (Erros e ações críticas)

### 2.2. Tipografia
- **Font-family Sans:** `Geist Sans` (Moderna, ótima legibilidade para interface).
- **Font-family Mono:** `Geist Mono` (Para dados técnicos no ERP).

### 2.3. Espaçamento e Bordas
- **Radius:** `--radius` (Padrão: `0.5rem`). Lojistas podem escolher bordas mais quadradas (0) ou mais arredondadas (1rem).
- **Escala de Espaçamento:** Seguimos a escala nativa do Tailwind (rem-based).

## 3. Componentes Core (Shadcn/UI Customizados)

### 3.1. Tabelas (ERP)
- Devem permitir `sticky header`.
- Devem ter `hover state` nas linhas.
- Ações (Edit/Delete) sempre agrupadas à direita.

### 3.2. Cards de Produto (Vitrine)
- Proporção de imagem: 1:1 (Square).
- Título: Máximo 2 linhas (`line-clamp-2`).
- Preço: Peso semibold, destaque na cor `--primary`.

### 3.3. Formulários
- Labels sempre acima do input.
- Descrições de erro em `--destructive`.
- Uso obrigatório de `focus-ring` na cor `--primary`.
