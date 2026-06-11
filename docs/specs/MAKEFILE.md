# Especificação Técnica: Automação com Makefile

Este documento define a especificação para a criação de um `Makefile` unificado na raiz do projeto Market Hub para simplificar os comandos de gerenciamento do ciclo de vida do backend, frontend e infraestrutura Docker.

## 1. Filosofia do arquivo
- **Simplicidade:** Atalhos fáceis de lembrar para tarefas complexas.
- **Portabilidade:** Comandos universais ou adaptados para rodar de forma previsível.
- **Auto-documentado:** O comando padrão `make` ou `make help` deve listar e descrever todos os comandos disponíveis organizados por categorias.

---

## 2. Comandos Obrigatórios (Escopo)

### A. Infraestrutura e Docker (`infra`)
- `make up`: Sobe todos os containers em modo background (`docker-compose up -d`).
- `make down`: Derruba e remove os containers e redes criadas (`docker-compose down`).
- `make build`: Força a reconstrução de todas as imagens docker (`docker-compose build --no-cache`).
- `make logs`: Exibe e acompanha os logs combinados de todos os serviços em tempo real (`docker-compose logs -f`).

### B. Backend Django (`backend`)
- `make backend-shell`: Abre o terminal interativo dentro do container do backend (`docker compose exec backend python manage.py shell`).
- `make migrate`: Executa as migrações do banco de dados (inclusive comandos do `django-tenants`, se aplicável).
- `make makemigrations`: Cria novas migrações com base nas alterações dos models.
- `make backend-test`: Executa a suíte de testes automatizados do Django.

### C. Frontend Next.js (`frontend`)
- `make frontend-install`: Instala dependências locais do node se necessário.
- `make frontend-lint`: Executa o linter para checar a saúde e formatação do código frontend.
- `make frontend-test`: Executa os testes unitários/integração do frontend.

---

## 3. Padrão de Saída e Help Dinâmico

O Makefile deve conter uma meta de ajuda dinâmica utilizando `awk` ou `grep` para extrair os comentários das regras e exibi-los formatados.

### Exemplo de sintaxe esperada:
```makefile
help: ## Exibe esta tela de ajuda
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
```
