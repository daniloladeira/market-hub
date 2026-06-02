# Tarefas: Catálogo e Inventário

Ref: `context/features/01_core/spec.md` e `context/features/01_core/plan.md`

## Fase 1: Infraestrutura e Ambiente
- [x] Criar `docker-compose.yml` com PostgreSQL 15.
- [x] Configurar `.env` e integrar com `settings.py`.
- [x] Rodar migrations iniciais (Schema Public).
- [x] Criar script `setup_test_tenant.py` para criar o primeiro lojista.

## Fase 2: Backend (Catalog & Inventory)
- [x] Criar o app Django `catalog`.
- [x] Implementar modelos `Product` e `Inventory`.
- [x] Rodar `python manage.py makemigrations` e `migrate_schemas`.
- [x] Criar Serializers e Viewsets para a API.
- [x] Configurar URLs da API.

## Fase 3: Frontend (Vitrine Inicial)
- [x] Configurar cliente de API (Axios/Fetch) no Next.js.
- [x] Criar página de listagem de produtos.
- [x] Validar roteamento por subdomínio/slug de tenant.

## Fase 4: Testes de Isolamento
- [ ] Criar teste unitário para garantir que dados de tenants são isolados.
