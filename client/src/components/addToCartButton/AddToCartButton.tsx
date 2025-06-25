import React, { useEffect, useState } from "react";
import { RemoveIcon } from "../icons";

type AddToCartButtonTypes = {
  quantity: number;
  onAddToCart?: () => void;
  onDecreaseQuantity?: () => void;
  onIncreaseQuantity?: () => void;
  onRemove?: () => void;
};

const AddToCartButton: React.FC<AddToCartButtonTypes> = ({
  quantity,
  onAddToCart,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onRemove,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwtValid, setJwtValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Ajusta el nombre según tu almacenamiento
    if (token) {
      const valid = validarToken(token);
      setJwtValid(valid);
      setIsLoggedIn(valid);
    } else {
      setIsLoggedIn(false);
      setJwtValid(false);
    }
  }, []);

  function validarToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const ahora = Math.floor(Date.now() / 1000);
      return payload.exp > ahora;
    } catch (e) {
      return false;
    }
  }

  const canBuy = isLoggedIn && jwtValid;

  return (
    <div className="card-actions">
      {quantity === 0 ? (
        <button
          className="add-to-cart"
          onClick={canBuy ? onAddToCart : undefined}
          aria-label="Add to cart"
          disabled={!canBuy}
          title={
            !isLoggedIn
              ? "Debes iniciar sesión para comprar"
              : !jwtValid
              ? "Tu sesión expiró, por favor inicia sesión de nuevo"
              : ""
          }
        >
          Comprar
        </button>
      ) : (
        <div className="quantity-controls">
          <div className="quantity-display">
            <button
              className="quantity-button"
              onClick={onDecreaseQuantity}
              aria-label="Reduce order from cart"
            >
              -
            </button>
            <span className="quantity">{quantity}</span>
            <button
              className="quantity-button"
              onClick={onIncreaseQuantity}
              aria-label="Add order to cart"
            >
              +
            </button>
          </div>
          <button
            className="remove-button"
            onClick={onRemove}
            aria-label="Remove product from cart"
          >
            <RemoveIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
