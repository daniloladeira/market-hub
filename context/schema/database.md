# Database Schema (Market Hub)

## Architectures Rules
- **Multi-tenant:** Schema-per-tenant via `django-tenants`.
- `public` schema: Contains only global models (Tenants, Domains, Subscriptions).
- `tenant_*` schemas: Contains business logic (Products, Orders, Customers).

---

## 1. Public Schema (Global)

### `customers_client` (Tenant)
- `id` (PK, UUID)
- `schema_name` (String, Unique) - The PostgreSQL schema name (e.g., 'tenant_loja_do_ze').
- `name` (String) - Store name.
- `created_on` (Date)
- `is_active` (Boolean)

### `customers_domain`
- `id` (PK, UUID)
- `domain` (String, Unique) - e.g., 'loja-do-ze.markethub.com'.
- `tenant_id` (FK -> customers_client)
- `is_primary` (Boolean)

---

## 2. Tenant Schema (Business Logic)

### `catalog_product`
- `id` (PK, UUID)
- `name` (String)
- `slug` (String, Unique per tenant)
- `description` (Text)
- `base_price` (Decimal: 10,2)
- `is_active` (Boolean)

### `inventory_stock`
- `id` (PK, UUID)
- `product_id` (FK -> catalog_product)
- `quantity` (Integer)
- `reserved_quantity` (Integer) - Stock held for unpaid orders.

### `sales_order`
- `id` (PK, UUID)
- `customer_name` (String)
- `customer_email` (String)
- `total_amount` (Decimal: 10,2)
- `status` (Enum: PENDING, PAID, SHIPPED, DELIVERED, CANCELED)
- `created_at` (Datetime)

### `sales_orderitem`
- `id` (PK, UUID)
- `order_id` (FK -> sales_order)
- `product_id` (FK -> catalog_product)
- `quantity` (Integer)
- `unit_price` (Decimal: 10,2)