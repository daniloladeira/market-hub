# Constituição do Projeto (Market Hub)

## 1. Stack Tecnológica
- **Backend:** Python 3.11+, Django 5.x, Django REST Framework, `django-tenants`.
- **Banco de Dados:** PostgreSQL 15+.
- **Frontend:** Next.js 14+ (React), Tailwind CSS.

## 2. Padrões de Arquitetura (Backend)
- **Multi-tenancy:** Uso estrito do padrão Schema-per-tenant.
- O schema `public` só deve conter modelos globais (Tenant, Domain).
- Toda a lógica de negócio (Products, Orders, Customers) deve residir nos schemas específicos do tenant.
- Nenhuma query cruzada entre schemas de inquilinos diferentes é permitida.

## 3. Padrões de Código
- **Tipagem:** Uso obrigatório de Type Hints no Python e TypeScript estrito no Next.js.
- **Idiomas:** 
  - Código, variáveis, funções, commits: Inglês.
  - Documentação (`context/`, `draft/`, `docs/`): Português.
- **Testes:** Todo endpoint REST deve possuir pelo menos um teste cobrindo o caminho feliz (happy path) e um caso de erro (edge case).