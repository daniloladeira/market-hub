# Market Hub - E-commerce e ERP Multi-tenant

## Mandatos do Projeto
- **Tecnologias Core:** Python (Django), PostgreSQL (com `django-tenants`), Next.js (React).
- **Arquitetura de Dados:** Schema-per-tenant. Cada lojista possui seu próprio schema no PostgreSQL para garantir isolamento total. O schema `public` contém apenas dados globais (Tenants, Assinaturas).
- **Idioma:** Código-fonte e comentários em Inglês. Documentação técnica (como o Documento de Visão) em Português.

## Padrões de Código
- Manter o isolamento rigoroso entre os dados de inquilinos. Nenhuma query de um tenant deve conseguir acessar dados do schema `public` indevidamente ou de outro tenant.
- Utilizar tipagem forte sempre que possível (Type Hints no Python, TypeScript no Next.js).
- Adicionar testes para garantir que o isolamento do banco de dados não seja violado.