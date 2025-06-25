
Enum "orders_status_enum" {
  "Pendiente"
  "Completado"
  "Cancelado"
}

Enum "products_category_enum" {
  "Blusa"
  "Abrigo"
  "Sweater"
  "Pantalón"
  "Falda"
  "Deportivo"
  "Vestido"
  "Calzado"
  "Ropa de Baño"
  "Accesorio"
}

Table "carts" {
  "id" int(11) [pk, not null]
  "isActive" tinyint(4) [not null, default: 1]
  "createdAt" datetime(6) [not null, default: `current_timestamp(6)`]
  "updatedAt" datetime(6) [not null, default: `current_timestamp(6)`]
  "userId" int(11) [default: NULL]
}

Table "cart_items" {
  "id" int(11) [pk, not null]
  "quantity" tinyint(4) [not null]
  "cartId" int(11) [default: NULL]
  "productId" int(11) [default: NULL]
}

Table "orders" {
  "id" int(11) [pk, not null]
  "total" decimal(10,2) [default: NULL]
  "status" orders_status_enum [not null, default: 'Pendiente']
  "createdAt" datetime(6) [not null, default: `current_timestamp(6)`]
  "updatedAt" datetime(6) [not null, default: `current_timestamp(6)`]
  "userId" int(11) [default: NULL]
}

Table "order_items" {
  "id" int(11) [pk, not null]
  "quantity" tinyint(4) [not null]
  "priceAtPurchase" decimal(10,2) [not null]
  "orderId" int(11) [default: NULL]
  "productId" int(11) [default: NULL]
}

Table "products" {
  "id" int(11) [pk, not null]
  "title" varchar(50) [not null]
  "description" tinytext [default: NULL]
  "price" decimal(10,2) [not null]
  "inStock" int(11) [not null, default: 0]
  "brand" varchar(50) [not null]
  "category" products_category_enum [not null]
  "img" varchar(200) [not null]
  "createdAt" datetime(6) [not null, default: `current_timestamp(6)`]
  "updatedAt" datetime(6) [not null, default: `current_timestamp(6)`]
}

Table "users" {
  "id" int(11) [pk, not null]
  "email" varchar(100) [not null]
  "password" varchar(200) [not null]
  "firstName" varchar(50) [default: NULL]
  "lastName" varchar(50) [default: NULL]
  "createdAt" datetime(6) [not null, default: `current_timestamp(6)`]
  "updatedAt" datetime(6) [not null, default: `current_timestamp(6)`]
}

Ref "FK_69828a178f152f157dcf2f70a89":"users"."id" < "carts"."userId" [update: no action, delete: cascade]

Ref "FK_72679d98b31c737937b8932ebe6":"products"."id" < "cart_items"."productId" [update: no action, delete: no action]

Ref "FK_edd714311619a5ad09525045838":"carts"."id" < "cart_items"."cartId" [update: no action, delete: cascade]

Ref "FK_151b79a83ba240b0cb31b2302d1":"users"."id" < "orders"."userId" [update: no action, delete: no action]

Ref "FK_cdb99c05982d5191ac8465ac010":"products"."id" < "order_items"."productId" [update: no action, delete: no action]

Ref "FK_f1d359a55923bb45b057fbdab0d":"orders"."id" < "order_items"."orderId" [update: no action, delete: cascade]
