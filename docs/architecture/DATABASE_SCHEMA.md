# Database Schema (Market Hub)

## Architectures Rules
- **Multi-tenant:** Schema-per-tenant via `django-tenants`.
- `public` schema: Contains only global models (Tenants, Domains, Subscriptions).
- `tenant_*` schemas: Contains business logic (Products, Orders, Customers, Inventory).

---

## DB Diagram (DBML)
Copie o código abaixo e cole em [dbdiagram.io](https://dbdiagram.io) para visualizar o diagrama entidade-relacionamento do sistema.

```dbml
Project MarketHub {
  database_type: 'PostgreSQL'
  Note: 'E-commerce and ERP Multi-tenant Schema'
}

TableGroup Public_Schema {
  customers_client
  customers_domain
  billing_subscription
}

TableGroup Tenant_Schema {
  auth_user
  crm_customer
  crm_address
  catalog_category
  catalog_product
  catalog_product_image
  inventory_warehouse
  inventory_stock
  inventory_stock_movement
  sales_order
  sales_order_item
  sales_payment
}

// ==========================================
// 1. PUBLIC SCHEMA (Global)
// ==========================================

Table customers_client {
  id uuid [pk]
  schema_name varchar [unique, note: 'e.g., tenant_loja_do_ze']
  name varchar
  created_on date
  is_active boolean
}

Table customers_domain {
  id uuid [pk]
  domain varchar [unique, note: 'e.g., loja-do-ze.markethub.com']
  tenant_id uuid [ref: > customers_client.id]
  is_primary boolean
}

Table billing_subscription {
  id uuid [pk]
  tenant_id uuid [ref: - customers_client.id]
  plan_name varchar
  status varchar [note: 'ACTIVE, PAST_DUE, CANCELED']
  current_period_end datetime
}

// ==========================================
// 2. TENANT SCHEMA (Business Logic)
// ==========================================

// --- AUTH & USERS (Staff do ERP) ---
Table auth_user {
  id uuid [pk]
  email varchar [unique]
  password_hash varchar
  first_name varchar
  last_name varchar
  is_staff boolean [note: 'True for ERP users, False for customers']
  is_active boolean
  created_at datetime
}

// --- CRM (Clientes do Lojista) ---
Table crm_customer {
  id uuid [pk]
  user_id uuid [ref: - auth_user.id, null, note: 'Optional link for authenticated buyers']
  full_name varchar
  email varchar
  phone varchar
  document_number varchar [note: 'CPF/CNPJ']
  created_at datetime
}

Table crm_address {
  id uuid [pk]
  customer_id uuid [ref: > crm_customer.id]
  street varchar
  number varchar
  complement varchar
  neighborhood varchar
  city varchar
  state varchar
  zip_code varchar
  country varchar
  is_default boolean
}

// --- CATALOG (Produtos e Vitrine) ---
Table catalog_category {
  id uuid [pk]
  parent_id uuid [ref: > catalog_category.id, null]
  name varchar
  slug varchar [unique]
  description text
}

Table catalog_product {
  id uuid [pk]
  category_id uuid [ref: > catalog_category.id]
  name varchar
  slug varchar [unique]
  description text
  base_price decimal(10,2)
  is_active boolean
  created_at datetime
}

Table catalog_product_image {
  id uuid [pk]
  product_id uuid [ref: > catalog_product.id]
  image_url varchar
  alt_text varchar
  is_primary boolean
}

// --- INVENTORY (Estoque e Depósitos) ---
Table inventory_warehouse {
  id uuid [pk]
  name varchar
  location varchar
}

Table inventory_stock {
  id uuid [pk]
  product_id uuid [ref: > catalog_product.id]
  warehouse_id uuid [ref: > inventory_warehouse.id]
  quantity integer
  reserved_quantity integer [note: 'Stock held for unpaid orders']
}

Table inventory_stock_movement {
  id uuid [pk]
  stock_id uuid [ref: > inventory_stock.id]
  type varchar [note: 'IN, OUT, ADJUSTMENT']
  quantity integer
  reason text
  created_at datetime
  created_by uuid [ref: > auth_user.id]
}

// --- SALES (Pedidos e Pagamentos) ---
Table sales_order {
  id uuid [pk]
  customer_id uuid [ref: > crm_customer.id]
  shipping_address_id uuid [ref: > crm_address.id]
  total_amount decimal(10,2)
  status varchar [note: 'PENDING, PAID, SHIPPED, DELIVERED, CANCELED']
  created_at datetime
}

Table sales_order_item {
  id uuid [pk]
  order_id uuid [ref: > sales_order.id]
  product_id uuid [ref: > catalog_product.id]
  quantity integer
  unit_price decimal(10,2)
  total_price decimal(10,2)
}

Table sales_payment {
  id uuid [pk]
  order_id uuid [ref: > sales_order.id]
  payment_method varchar [note: 'CREDIT_CARD, PIX, BOLETO']
  amount decimal(10,2)
  status varchar [note: 'PENDING, APPROVED, FAILED, REFUNDED']
  transaction_id varchar [note: 'Gateway transaction ID']
  created_at datetime
}
```