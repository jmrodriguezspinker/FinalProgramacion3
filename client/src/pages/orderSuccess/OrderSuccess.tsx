import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderById } from "../../api/order";
import "./orderSuccess.scss";

export default function OrderSuccess() {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order);
  const [loading, setLoading] = useState(!location.state?.order);

  useEffect(() => {
    if (!order && id) {
      getOrderById(id)
        .then((data) => setOrder(data))
        .catch((err) => console.error("❌ Error al cargar la orden:", err))
        .finally(() => setLoading(false));
    }
  }, [id, order]);

  if (loading) return <p className="loading-message">Cargando orden...</p>;

  if (!order) return <p className="error-message">No se pudo cargar la orden.</p>;

  return (
    <section className="order-success-container">
      <h1>¡Gracias por tu compra!</h1>
      <p className="order-id">
        <strong>Orden ID:</strong> {order.id}
      </p>
      <p className="order-total">
        <strong>Total:</strong> ${order.total ? Number(order.total).toFixed(2) : "0.00"}
      </p>

      <h3 className="products-heading">Productos:</h3>
      <ul className="order-items">
        {order.items?.map((item: any) => (
          <li key={item.id} className="order-item">
            <span>{item.product.title} × {item.quantity}</span>
            <span className="item-price">${Number(item.priceAtPurchase).toFixed(2)} c/u</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
