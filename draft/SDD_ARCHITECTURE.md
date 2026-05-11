# Arquitetura de Diretórios: Spec-Driven Development (SDD)

Baseado nas melhores práticas e metodologias emergentes para desenvolvimento focado em IA (AI-Native Development), como o ciclo DSPI (Design-Specify-Plan-Implement), esta é a proposta da arquitetura completa de diretórios para gerenciar o contexto do nosso projeto.

A premissa principal é: **A documentação é a fonte da verdade. O código é apenas o subproduto (output).**

---

## Estrutura Proposta

```text
market-hub/
├── draft/                     # 1. DESIGN: Rascunhos e Brainstorming (O "Porquê" e "O Quê")
│   ├── ideias_features/       # Documentos de texto livre sobre novas funcionalidades
│   └── pesquisas/             # Comparações de libs, provas de conceito (PoCs)
│
├── context/                   # 2. SPECIFY & PLAN: A Fonte da Verdade (O Contrato)
│   ├── constitution.md        # Regras imutáveis do projeto (ex: Tech stack, linting, segurança)
│   ├── active_sprint.md       # O foco atual do agente de IA (O que estamos fazendo AGORA)
│   │
│   ├── schema/                # Modelagem de Dados
│   │   └── database.md        # Tabelas, relacionamentos e regras do schema-per-tenant
│   │
│   ├── api/                   # Contratos de Integração
│   │   └── endpoints.md       # Definição de requests/responses JSON
│   │
│   └── features/              # Funcionalidades e Casos de Uso
│       ├── 01_auth/           
│       │   ├── spec.md        # Requisitos funcionais e fluxos do usuário (User Flows)
│       │   ├── plan.md        # Estratégia técnica (quais arquivos serão criados/modificados)
│       │   └── tasks.md       # Checklist atômico para a IA executar e verificar
│       │
│       └── 02_checkout/
│           ├── spec.md
│           ├── plan.md
│           └── tasks.md
│
├── docs/                      # 3. DOCUMENTAÇÃO MACRO
│   └── DOCUMENTO_DE_VISAO.md  # Escopo do produto, personas, objetivos de negócio
│
├── src/                       # 4. IMPLEMENT: O Código Fonte Real
│   ├── backend/               # Projeto Django
│   └── frontend/              # Projeto Next.js
│
└── GEMINI.md                  # "Manual de Operação" para a IA (Atalhos, comandos de build)
```

---

## O Fluxo de Trabalho (Workflow SDD)

Para que essa arquitetura funcione e a IA não se perca ("context drift"), devemos seguir o seguinte fluxo ao criar uma nova funcionalidade:

1. **Rascunho (`draft/`):** Nós conversamos e colocamos as ideias aqui. Quando a ideia amadurece, ela é promovida para o `context/`.
2. **Especificação (`context/features/funcionalidade/spec.md`):** Escrevemos os requisitos funcionais em Markdown estruturado.
3. **Plano (`context/features/funcionalidade/plan.md`):** A IA lê a `spec.md` e gera um plano técnico de arquitetura. O desenvolvedor humano aprova esse plano.
4. **Tarefas (`context/features/funcionalidade/tasks.md`):** O plano é quebrado em pequenos passos acionáveis (ex: "1. Criar a view X. 2. Rodar o teste Y").
5. **Implementação (`src/`):** A IA executa as tarefas uma a uma escrevendo o código final.

## Por que usar essa estrutura?
- **Previsibilidade:** A IA sabe exatamente onde procurar as regras (`constitution.md`) e o que precisa ser feito (`tasks.md`).
- **Verificação:** Evita que a IA escreva 500 linhas de código errado. Ela escreve o plano primeiro, nós aprovamos, e então ela executa.
- **Portabilidade:** Todo o "conhecimento" da aplicação reside em Markdown e não no histórico de chat temporal. Se abrirmos outra sessão, a IA consegue ler o `context/` e entender tudo perfeitamente.