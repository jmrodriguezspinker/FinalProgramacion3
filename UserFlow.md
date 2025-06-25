Gracias por compartir la estructura de la base de datos. A partir de ella, te presento un **flujo de usuario en español** que representa cómo un usuario interactúa con el sistema, desde que entra hasta que realiza una compra.

---

## 🧭 **Flujo de usuario basado en la base de datos**

### 1. **Registro e inicio de sesión**

* El usuario se registra proporcionando su correo electrónico, contraseña, y opcionalmente su nombre y apellido (`users`).
* Luego inicia sesión usando su email y contraseña.

---

### 2. **Navegación por productos**

* El usuario navega por el catálogo de productos (`products`), que están clasificados por categorías como Blusa, Abrigo, Calzado, etc. (`products_category_enum`).
* Cada producto tiene un título, descripción, precio, stock disponible, marca y una imagen.

---

### 3. **Agregar productos al carrito**

* Al seleccionar un producto, el usuario puede agregarlo a su carrito (`carts`).
* Si no tiene un carrito activo, se crea uno nuevo con `isActive = 1`.
* Los productos agregados se guardan en `cart_items`, junto con la cantidad deseada.

---

### 4. **Revisión del carrito**

* El usuario puede revisar su carrito actual viendo los ítems (`cart_items`) asociados.
* Puede cambiar las cantidades o eliminar productos.

---

### 5. **Realización de pedido**

* Al confirmar el carrito, se crea una orden (`orders`) con estado inicial `Pendiente`.
* Cada ítem del carrito se convierte en un ítem de orden (`order_items`) que incluye la cantidad y el precio en el momento de la compra (`priceAtPurchase`).
* Se calcula el total de la orden.

---

### 6. **Gestión de pedidos**

* El usuario puede ver el estado de sus pedidos anteriores: `Pendiente`, `Completado` o `Cancelado` (`orders_status_enum`).
* El sistema podría permitir cancelar pedidos antes de ser completados.

---

## 🔁 Relaciones importantes del sistema

* Cada `user` puede tener múltiples `orders` y un carrito activo (`carts`).
* Cada `cart` contiene varios `cart_items`, cada uno asociado a un `product`.
* Cada `order` contiene múltiples `order_items`, que también referencian `products`.

---

## ✅ Acciones típicas del usuario

| Acción                       | Tablas involucradas     |
| ---------------------------- | ----------------------- |
| Registrarse / iniciar sesión | `users`                 |
| Ver productos                | `products`              |
| Agregar producto al carrito  | `carts`, `cart_items`   |
| Confirmar compra             | `orders`, `order_items` |
| Ver historial de pedidos     | `orders`, `order_items` |

---

¿Te gustaría que te genere también un diagrama de flujo visual o un caso de uso en formato texto para cada acción?
