# Label

- required: yes
- use one existing repository label as the primary classification for the issue
- apply the label when creating or updating the issue
- label: enhancement

# Context

O frontend do Market Hub (tanto o Storefront quanto o ERP) precisa de uma fundação sólida e padronizada para garantir consistência visual, acessibilidade e alta produtividade durante o desenvolvimento das próximas telas e fluxos de usuários.

# Objective

Estabelecer o Design System básico da aplicação e implementar os componentes de UI (User Interface) iniciais e os layouts estruturais no projeto Next.js.

# Scope

- Configurar o tema visual no Tailwind CSS (cores primárias, tipografia, espaçamentos e breakpoints).
- Criar a estrutura de diretórios para componentes compartilhados (`src/frontend/src/components/ui`).
- Implementar os componentes de interface fundamentais (Botões, Inputs de Formulário, Cards e Tabelas).
- Desenvolver os layouts estruturais base (Layout do ERP com Sidebar e Layout do Storefront com Navbar).

# Deliverables

- Arquivo `tailwind.config.ts` atualizado com o design system.
- Componentes `Button`, `Input`, `Card` e `Table` criados e tipados com TypeScript.
- Estrutura de rotas base (`app/(admin)/layout.tsx` e `app/(storefront)/layout.tsx`) implementada.

# Acceptance Criteria

- Todos os componentes devem ser responsivos (Mobile-first).
- O código deve passar em todas as regras de Linting (`npm run lint`).
- Os componentes base devem ser completamente independentes de regras de negócio específicas (Totalmente reutilizáveis).

# Notes

Recomenda-se avaliar o uso da biblioteca **shadcn/ui** (baseada em Radix UI e Tailwind) para acelerar a criação desta camada de componentes acessíveis e customizáveis.