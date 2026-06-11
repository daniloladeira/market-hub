# API Endpoints (Market Hub)

**Base Rules:**
- All API requests to the Tenant Schema must be routed correctly based on the subdomain (handled by `django-tenants` middleware).
- All requests must return JSON.

---

### [GET] /api/v1/products
**Description:** Retrieves a paginated list of active products for the storefront.
**Auth Required:** No (Public to storefront)

**Request Query Params:**
- `page`: Integer (default: 1)
- `category`: String (optional slug)

**Success Response (200 OK):**
```json
{
  "count": 120,
  "next": "/api/v1/products?page=2",
  "results": [
    {
      "id": "uuid",
      "name": "Camiseta Preta",
      "slug": "camiseta-preta",
      "price": "49.90",
      "stock_available": 10
    }
  ]
}
```

---

### [POST] /api/v1/orders
**Description:** Creates a new order from the storefront checkout.
**Auth Required:** No (Guest checkout supported)

**Request Body (JSON):**
```json
{
  "customer_name": "João da Silva",
  "customer_email": "joao@email.com",
  "items": [
    {
      "product_id": "uuid",
      "quantity": 2
    }
  ]
}
```

**Success Response (201 Created):**
```json
{
  "order_id": "uuid",
  "status": "PENDING",
  "total_amount": "99.80",
  "message": "Order placed successfully"
}
```

**Error Responses:**
- **400 Bad Request:** Missing fields or insufficient stock.
```json
{ "error": "Insufficient stock for product Camiseta Preta" }
```

---

### [POST] /api/v1/admin/products
**Description:** Creates a new product.
**Auth Required:** Yes (Role: Tenant Admin)

**Request Body (JSON):**
```json
{
  "name": "Tênis Esportivo",
  "description": "Tênis para corrida...",
  "base_price": "199.90",
  "initial_stock": 50
}
```