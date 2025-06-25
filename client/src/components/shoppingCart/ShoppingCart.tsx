import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utilities/formatCurrency";
import { CartItem } from "../cartItem/CartItem";
import axios from "axios";
import "./shoppingCart.scss";

type ShoppingCartProps = {
  isOpen: boolean;
};


export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const navigate = useNavigate();
  const { closeCart, cartItems, clearCart } = useShoppingCart();

  console.log(cartItems);

  const totalAmount = cartItems.reduce((total, item) => {
    const price = Number(item.price);      // ← forzar conversión
    const quantity = Number(item.quantity);

    if (isNaN(price) || isNaN(quantity)) return total;

    return total + price * quantity;
  }, 0);

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Debes iniciar sesión para confirmar la compra.");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/order`,
        {}, // cuerpo vacío porque tu backend no necesita datos
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const order = response.data.order;

      // ✅ Cierra y limpia carrito
      closeCart();
      clearCart();

      navigate(`/order-success/${order.id}`, {
        state: { order },
      });
    } catch (error: any) {
      console.error("❌ Error al confirmar la compra:", error);
      alert(
        error.response?.data?.message ||
        "Hubo un error al procesar tu orden. Intenta nuevamente."
      );
    }
  };

  return (
    <section className={`shopping-cart ${isOpen ? "open" : ""}`}>
      <div className="overlay" onClick={closeCart}></div>
      <div className="cart-container">
        <div className="cart-header">
          <button
            className="close-button"
            onClick={closeCart}
            aria-label="Close cart"
          >
            &times;
          </button>
          <div className="cart-title">Carrito</div>
        </div>
        <div className="cart-body">
          {cartItems.map((item) => (
            <div key={item.id}>
              <CartItem
                id={Number(item.id)}
                imgUrl={item.imgUrl!}
                price={item.price}
                quantity={item.quantity}
                title={item.title!}
              />
            </div>
          ))}
          <p className="total-amount">Total: {formatCurrency(totalAmount)}</p>

          <button
            className={
              cartItems.length === 0
                ? "disabled-btn checkout-btn"
                : "submit-button checkout-btn"
            }
            onClick={handleCheckout}
            disabled={cartItems.length === 0 ? true : false}
            aria-label="Proceed to checkout"
          >
            Confirmar compra
          </button>
        </div>
      </div>
    </section>
  );
}


