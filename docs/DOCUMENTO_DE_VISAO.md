# Documento de Visão e Escopo

## Plataforma Market Hub - E-commerce e ERP Multi-tenant

**Componentes:** 
- Danilo Ladeira

## Histórico de Revisões

| Data | Versão | Descrição | Autores |
| :-: | :-: | :-: | :-: |
| 11/05/2026 | 1.0 | Inicialização do documento de visão adaptado para a arquitetura multi-tenant | Danilo Ladeira |

## 1. Requisitos de Negócio

### 1.1. Objetivo do Projeto

O presente projeto tem como objetivo desenvolver uma plataforma SaaS (Software as a Service) multi-tenant que unifica as operações de E-commerce e ERP (Enterprise Resource Planning). A iniciativa busca oferecer a pequenos e médios lojistas uma solução integrada e centralizada para o gerenciamento de catálogo de produtos, controle de estoque, vendas online e administração de clientes, garantindo total isolamento de dados entre cada loja.

## 2. Descrição do Problema

|     |      |
| --- | --- |
| **Problema** | A necessidade dos lojistas de gerenciar vendas online e operações de retaguarda (estoque, financeiro) em sistemas separados, gerando inconsistência de dados e alto esforço manual. |
| **Afeta** | Pequenos e médios lojistas, empreendedores de e-commerce e administradores de varejo. |
| **Impacta** | Dificuldade em manter o estoque sincronizado com a vitrine online, retrabalho administrativo, aumento de custos com múltiplas plataformas e perda de eficiência operacional. |
| **Solução** | Oferecer a implementação do Market Hub, uma plataforma SaaS unificada. A solução centraliza a vitrine virtual (E-commerce) e a gestão de retaguarda (ERP). O sistema permitirá que cada lojista (Tenant) tenha seu próprio ambiente seguro e isolado, automatizando as vendas e a atualização de estoque em tempo real. |

### 2.1. Oportunidade de Negócio

A criação de um sistema integrado elimina as barreiras técnicas para lojistas que desejam escalar suas vendas online sem perder o controle da sua operação física/backoffice. A solução substituirá a dependência de conectores falhos entre e-commerces e ERPs de terceiros.

Com a arquitetura multi-tenant (Schema-per-tenant), a plataforma escala de maneira eficiente, permitindo um modelo de negócios baseado em assinaturas (SaaS). O lojista ganha uma vitrine otimizada para SEO e alta performance, e um painel administrativo poderoso que garante que cada venda online reflita instantaneamente no controle de estoque e no fluxo de caixa.

### 2.2. Objetivos de Negócio

| NÚMERO | DESCRIÇÃO |
| --- | --- |
| ON-1 | Centralizar a gestão do catálogo, estoque e vendas online em uma única interface para o lojista. |
| ON-2 | Garantir a segurança e o isolamento total das informações financeiras e de clientes de cada lojista. |
| ON-3 | Reduzir a complexidade de configuração técnica, permitindo que novas lojas entrem em operação rapidamente (onboarding ágil). |
| ON-4 | Disponibilizar uma frente de loja (vitrine) com alta performance para garantir melhor conversão de vendas. |
| ON-5 | Eliminar os erros de ruptura de estoque (vender o que não tem) automatizando a baixa de inventário no momento da venda. |

### 2.3. Riscos de Negócio

| NÚMERO | DESCRIÇÃO | PROBABILIDADE | IMPACTO |
| --- | --- | :-: | :-: |
| RIS-1 | Gargalos de performance no banco de dados com o crescimento da quantidade de lojistas (schemas) na plataforma. | 0,3 | 8 |
| RIS-2 | Falhas críticas de software que afetem a sincronização de estoque, gerando vendas de produtos indisponíveis. | 0,4 | 9 |
| RIS-3 | Vulnerabilidades de segurança que possam comprometer o isolamento, permitindo que um lojista tenha acesso a dados de outro. | 0,1 | 10 |
| RIS-4 | Baixa adoção inicial devido à concorrência com grandes plataformas de e-commerce já consolidadas no mercado. | 0,6 | 7 |

## 3. Usuários

### 3.1. Descrição dos Usuários

| NOME | DESCRIÇÃO | RESPONSABILIDADE |
| --- | --- | --- |
| **Administrador SaaS (Plataforma)** | Possui autoridade total sobre o modelo de negócios SaaS, responsável pela infraestrutura e pelas assinaturas. | - Gerenciamento global de Tenants (Lojistas). <br> - Acompanhamento do faturamento da plataforma (assinaturas). <br> - Monitoramento da saúde do servidor e banco de dados. |
| **Lojista (Admin do Tenant)** | Dono ou gerente da loja hospedada na plataforma. Focado na operação do seu próprio negócio. | - Configuração das informações da loja e domínio. <br> - CRUD completo de produtos, categorias e estoque. <br> - Acompanhamento de pedidos, faturamento e cadastro de clientes (CRM). <br> - Cadastro de funcionários da sua própria loja. |
| **Consumidor Final** | Cliente que acessa a vitrine online de um Lojista específico para efetuar compras. | - Navegação no catálogo de produtos. <br> - Adição de itens ao carrinho de compras. <br> - Cadastro e finalização de checkout (pagamento e frete). <br> - Acompanhamento do status de seus pedidos. |

### 3.2. Descrição do Ambiente dos Usuários

O sistema é dividido em duas frentes principais: A frente da loja (Storefront) focada na conversão do Consumidor Final, e o Painel Administrativo (ERP) focado na operação do Lojista.

- **Número de pessoas envolvidas**: Administradores da plataforma, Lojistas (e seus funcionários) e milhares de consumidores finais.
- **Duração de tarefas**:
  - **Criação de Loja (Tenant)**: Rápida, via processo de onboarding automatizado.
  - **Gerenciamento de Produtos**: Contínuo, com cadastros que podem durar de minutos a horas em caso de importações em lote.
  - **Finalização de Compra (Consumidor)**: Em média 2 a 5 minutos.
- **Restrições ambientais**: Acesso via internet. A vitrine precisa ser otimizada prioritariamente para dispositivos móveis (Mobile First). O painel do lojista será primariamente acessado via desktop.
- **Plataformas**: Backend em Python (Django + django-tenants) com PostgreSQL. Frontend em Next.js/React.
- **Princípios do ambiente**:
  - **Isolamento Lógico**: Nenhuma interface do Lojista deve exibir ou dar indícios da existência de outros lojistas no sistema.
  - **Conversão e Performance**: A vitrine deve ser extremamente rápida e intuitiva.
  - **Praticidade**: O painel ERP deve reduzir cliques para tarefas diárias (ex: despachar pedido).

### 3.3. Principais Necessidades dos Usuários

A principal necessidade do lojista é **paz de espírito e eficiência**: saber que ao gerenciar seu estoque e produtos em um único painel, sua loja virtual estará atualizada e operando de forma confiável. Para o consumidor, a necessidade é **confiança e velocidade** na jornada de compra.

**Objetivos:**
- Centralização da operação em um único painel.
- Escalabilidade para suportar picos de acessos (ex: Black Friday).
- Confiabilidade na segurança de dados financeiros.
- Gestão fluida do funil de vendas.

## 4. Requisitos

### 4.1. Requisitos Funcionais

| CÓDIGO | NOME | DESCRIÇÃO | GRAVIDADE |
| --- | --- | --- | --- |
| RF01 | Gestão de Tenants (Lojas) | O sistema global deve permitir criar um novo Tenant (Lojista) dinamicamente, gerando um schema de banco de dados isolado e atrelando a um subdomínio/domínio. | Alta |
| RF02 | Manter Catálogo | O lojista deve poder realizar o CRUD completo de produtos, variações (tamanho/cor), categorias e marcas. | Alta |
| RF03 | Controle de Inventário | O sistema deve gerenciar o nível de estoque de cada produto, permitindo entradas, saídas manuais e baixas automáticas a cada pedido aprovado. | Alta |
| RF04 | Fluxo de Carrinho e Pedido | A vitrine deve permitir a adição de produtos ao carrinho, cálculo de frete e finalização da compra (checkout). | Alta |
| RF05 | Gestão de Pedidos (ERP) | O lojista deve visualizar e atualizar o status dos pedidos (Aguardando Pagamento, Pago, Embalagem, Enviado, Entregue). | Alta |
| RF06 | Manter Clientes (CRM) | O lojista deve poder visualizar, editar e acompanhar o histórico de compras dos clientes que se cadastraram em sua loja. | Média |
| RF07 | Dashboard e Relatórios | O sistema deve prover um painel com métricas de vendas, produtos mais vendidos, faturamento diário/mensal e alertas de baixo estoque. | Alta |
| RF08 | Autenticação Isolada | Autenticação e autorização separadas: funcionários de uma loja não podem ter acesso ao painel de outra loja sob nenhuma circunstância. | Alta |

### 4.2. Requisitos Não Funcionais

| CÓDIGO | NOME | DESCRIÇÃO | GRAVIDADE |
| --- | --- | --- | --- |
| RNF 01 | Arquitetura Multi-Tenant | O isolamento de dados DEVE ser implementado em nível de banco de dados (Schema-per-tenant no PostgreSQL) usando `django-tenants`. | Alta |
| RNF 02 | Performance da Vitrine | O carregamento da página de produto (Storefront) para o consumidor final não deve exceder 2 segundos, utilizando estratégias de cache e SSR. | Alta |
| RNF 03 | Segurança e SSL | Todas as conexões devem ser HTTPS e as senhas armazenadas com hashing seguro. | Alta |
| RNF 04 | Consistência Transacional | Operações de compra que afetem estoque e financeiro devem ser tratadas em transações atômicas no banco de dados para evitar inconsistências. | Alta |
| RNF 05 | Escalabilidade de Schemas | O sistema deve ser capaz de suportar a criação inicial de centenas de schemas sem comprometer o tempo de resposta da aplicação global. | Média |