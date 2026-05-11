# User Flows (Market Hub)

## Flow 1: Lojista Cria um Produto e Define Estoque
**Goal:** O lojista (Admin do Tenant) adiciona um novo item para ser vendido na sua vitrine.
**Actors:** Lojista (Tenant Admin), Sistema.

**Steps:**
1. **Trigger:** Lojista acessa `/admin/catalog/new`.
2. **Action:** Sistema exibe formulário de cadastro de produto.
3. **Input:** Lojista preenche Nome, Preço, Descrição e define o Estoque inicial.
4. **Validation:** 
   - O preço deve ser maior que 0.
   - O slug deve ser único no schema daquele lojista.
5. **Outcome:** 
   - Sistema salva o registro em `catalog_product` no schema do lojista.
   - Sistema salva a quantidade inicial em `inventory_stock`.
   - Sistema redireciona para a lista de produtos com mensagem de sucesso.

---

## Flow 2: Consumidor Finaliza uma Compra
**Goal:** Consumidor entra na loja de um tenant, escolhe um produto e finaliza a compra.
**Actors:** Consumidor Final, Sistema.

**Steps:**
1. **Trigger:** Consumidor clica em "Finalizar Compra" no carrinho.
2. **Action:** Sistema verifica a disponibilidade do estoque (`inventory_stock.quantity - reserved_quantity`).
   - *Edge Case:* Se não houver estoque, exibe erro: "Produto esgotado no momento".
3. **Action:** Sistema cria o pedido `sales_order` (Status: PENDING) e move a quantidade comprada do estoque disponível para o estoque reservado.
4. **Input:** Consumidor insere dados de pagamento (Simulação).
5. **Action:** Pagamento aprovado.
6. **Outcome:** 
   - Status do `sales_order` muda para PAID.
   - Estoque é permanentemente descontado (`reserved_quantity` zera e `quantity` é reduzida).
   - E-mail de confirmação é enviado.