# Guia de Implementação: Frontend Multi-tenant com Next.js

Este guia descreve como implementar uma arquitetura multi-tenant no frontend do Market Hub, permitindo que diferentes clientes (tenants) tenham experiências personalizadas (white-label) usando uma única base de código.

## 1. Arquitetura Base: O Padrão de "Platforms"

A abordagem recomendada utiliza o **Next.js Middleware** para interceptar requisições e realizar **Rewrites Dinâmicos**. Isso permite mapear domínios ou subdomínios para rotas internas específicas sem alterar a URL no navegador do usuário.

### Estrutura de Domínios:
- **Domínio Principal:** `markethub.com.br` (Landing page, Login global).
- **Subdomínios:** `cliente1.markethub.com.br`, `loja-abc.markethub.com.br`.
- **Domínios Customizados:** `www.lojadocliente.com.br` (via CNAME).

---

## 2. Implementação do Middleware

O middleware identifica o tenant a partir do `host` da requisição e redireciona internamente para uma pasta dinâmica no App Router.

Crie o arquivo `src/frontend/middleware.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Define os domínios base para ignorar o prefixo do tenant
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
  
  // Extrai o subdomínio ou domínio customizado
  const currentHost = hostname.replace(`.${rootDomain}`, '');

  // 1. Previne rewrites para arquivos estáticos, api e caminhos internos do Next.js
  if (
    url.pathname.startsWith('/_next') || 
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. Caso seja o domínio principal (sem subdomínio)
  if (hostname === rootDomain || hostname === 'localhost:3000') {
    return NextResponse.rewrite(new URL(`/app${url.pathname}`, req.url));
  }

  // 3. Rewrite para a pasta do tenant: app/[tenant]/...
  // Ex: cliente1.localhost:3000/produtos -> /cliente1/produtos
  return NextResponse.rewrite(new URL(`/${currentHost}${url.pathname}`, req.url));
}
```

---

## 3. Estrutura de Pastas (App Router)

Organize o diretório `app` para suportar as rotas mapeadas pelo middleware:

```text
src/frontend/app/
├── (main)/           # Rotas do domínio principal (Landing page)
│   ├── page.tsx
│   └── layout.tsx
├── [tenant]/         # Rotas multi-tenant (interceptadas pelo middleware)
│   ├── layout.tsx    # Onde o "White-label" acontece (Themes, Logos)
│   ├── page.tsx      # Home da loja do cliente
│   └── produtos/
│       └── [id]/
└── api/              # APIs compartilhadas
```

---

## 4. Estratégias de White-labeling

### A. Tematização Dinâmica (CSS Variables)
No `layout.tsx` da pasta `[tenant]`, você pode buscar as configurações do tenant no backend Django e injetar variáveis CSS.

```tsx
// app/[tenant]/layout.tsx
export default async function TenantLayout({ params, children }) {
  const { tenant } = params;
  
  // Chamada ao Backend Django (usando o schema do tenant)
  const tenantConfig = await getTenantSettings(tenant); 

  return (
    <html lang="pt-br">
      <head>
        <style>{`
          :root {
            --primary-color: ${tenantConfig.primaryColor};
            --secondary-color: ${tenantConfig.secondaryColor};
            --font-family: ${tenantConfig.fontFamily};
          }
        `}</style>
      </head>
      <body style={{ fontFamily: 'var(--font-family)' }}>
        <Navbar logo={tenantConfig.logoUrl} />
        {children}
      </body>
    </html>
  );
}
```

### B. Isolamento de Dados
Como o `django-tenants` gerencia o isolamento por Schema no banco de dados, o frontend só precisa garantir que o Header `X-Tenant` ou o próprio Hostname seja enviado nas requisições da API para que o Django identifique qual schema ativar.

---

## 5. Desenvolvimento Local

Para testar subdomínios localmente no Windows:
1. Abra o Bloco de Notas como Administrador.
2. Edite `C:\Windows\System32\drivers\etc\hosts`.
3. Adicione as linhas:
   ```text
   127.0.0.1  localhost
   127.0.0.1  cliente1.localhost
   127.0.0.1  cliente2.localhost
   ```

## 6. Checklist de Implementação
- [ ] Configurar Wildcard DNS no provedor (`*.seudominio.com`).
- [ ] Implementar Middleware de detecção de Hostname.
- [ ] Criar estrutura de pastas `app/[tenant]`.
- [ ] Criar endpoint no Django para retornar `tenant_settings`.
- [ ] Validar injeção de CSS Variables para cores e fontes.
