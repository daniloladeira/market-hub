# Especificação Técnica: Dockerização (Market Hub)

Este documento especifica a infraestrutura de containers para o ambiente de desenvolvimento e produção do Market Hub, abrangendo o backend Django e o frontend Next.js.

## 1. Diretrizes Gerais
- **Multi-stage Builds:** Obrigatório para manter as imagens de produção limpas e leves.
- **Cache de Camadas:** Organizar os comandos (`COPY package*.json`, `COPY requirements.txt`) para maximizar o reaproveitamento do cache do Docker.
- **Segurança:** Rodar os containers como usuários não-root (`node` no frontend, usuário customizado no backend).

---

## 2. Especificação do Backend (Python/Django)

### Imagem Base:
- Desenvolvimento/Produção: `python:3.12-slim` (ou a versão utilizada atualmente no projeto).

### Requisitos do Dockerfile:
1. Instalar dependências do sistema operacional necessárias para compilar pacotes Python e conectar ao PostgreSQL (ex: `build-essential`, `libpq-dev`).
2. Configurar variáveis de ambiente do Python:
   - `PYTHONDONTWRITEBYTECODE=1` (evita arquivos .pyc).
   - `PYTHONUNBUFFERED=1` (garante logs em tempo real).
3. Instalar dependências via `pip` utilizando cache de camadas.
4. Expor a porta `8000`.

### Comportamento em Desenvolvimento:
- Volume montado apontando para `src/backend`.
- Execução com `python manage.py runserver 0.0.0.0:8000`.

---

## 3. Especificação do Frontend (Next.js)

### Imagem Base:
- Construção: `node:22-alpine` (Leve e segura).

### Requisitos do Dockerfile (Multi-stage):
1. **Estágio 1: Dependências (`deps`)**
   - Copiar `package.json` e `package-lock.json`.
   - Executar `npm ci` para garantir instalações limpas.
2. **Estágio 2: Construtor (`builder`)**
   - Copiar código fonte e arquivos de configuração.
   - Executar `npm run build`.
3. **Estágio 3: Produção (`runner`)**
   - Copiar apenas os arquivos necessários da build (`.next/standalone` e `.next/static`).
   - Configurar o usuário `node`.
   - Expor a porta `3000`.

### Comportamento em Desenvolvimento:
- Volume montado apontando para `src/frontend`.
- Execução com `npm run dev`.

---

## 4. Orquestração (docker-compose.yml)

O arquivo de orquestração na raiz do projeto deve subir os seguintes serviços:
1.  **db:** PostgreSQL com suporte a múltiplos schemas.
2.  **backend:** Rodando na porta `8000`, dependente do `db`.
3.  **frontend:** Rodando na porta `3000`.

### Redes:
- Uma rede interna compartilhada (`market-hub-network`) para permitir que o frontend se comunique diretamente com o backend usando o nome do serviço (ex: `http://backend:8000`).
