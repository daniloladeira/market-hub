# Plano Técnico: Catálogo e Inventário (Multi-tenant)

Este plano descreve a implementação da funcionalidade core do Market Hub: a gestão de produtos e estoque isolada por lojista.

## 1. Infraestrutura (Docker & DB)
- Criar `docker-compose.yml` na raiz para PostgreSQL 15.
- Criar `.env.example` com as variáveis de conexão.
- Configurar `src/backend/core/settings.py` para ler do `.env`.
- Executar `python manage.py migrate` para criar o schema `public`.
- Criar um script de setup inicial para facilitar a criação do primeiro tenant de teste.

## 2. Modelagem de Dados (Catalog App)
- Criar app `catalog` em `src/backend/`.
- **Modelos:**
    - `Product`: name, slug, description, price, created_at, updated_at.
    - `Inventory`: product (OneToOne), quantity, reserved_quantity.
- Adicionar `catalog` ao `TENANT_APPS` no `settings.py`.

## 3. API REST (Django REST Framework)
- Configurar Serializers para Produto e Estoque.
- Implementar Viewsets que filtram automaticamente pelo tenant atual (provido pelo `django-tenants`).
- Registrar rotas em `api/v1/`.

## 4. Frontend (Next.js Storefront)
- Criar um serviço de API no frontend para buscar produtos.
- Implementar página `app/[tenant]/page.tsx` para exibir a vitrine.
- Utilizar Server Components para fetch de dados (SSR/ISR) visando performance.

## 5. Validação e Testes
- Teste de isolamento: Criar dois tenants e garantir que o Tenant A não veja produtos do Tenant B.
- Teste de fluxo: Criar produto -> Verificar estoque -> Simular reserva.
