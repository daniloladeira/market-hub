# Planejamento Técnico: Catálogo e Produtos

**Ref:** `context/features/01_core/spec.md`

## Tarefas de Implementação
- [ ] Criar o app Django 'catalog' focado no domínio do lojista (Tenant Schema)
- [ ] Modelar a tabela de Produtos com os campos Name, Slug, Description e Base Price
- [ ] Modelar a tabela de Estoque e vinculá-la ao Produto com chaves estrangeiras
- [ ] Implementar a view e o endpoint REST GET /api/v1/products com paginação
- [ ] Implementar o banco de dados PostgreSQL usando docker-compose.yml localmente