import React from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utilities/formatCurrency";
import "./cartItem.scss";

type CartItemProps = {
  id: number;
  imgUrl: string;
  price: number;
  quantity: number;
  title: string;
};

export const CartItem: React.FC<CartItemProps> = ({
  id,
  price,
  quantity,
  imgUrl,
  title,
}: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();

  return (
    <div className="cart-item">
      <div className="img-wrapper">
        <img src={imgUrl} alt={title} className="cart-item__image" />
      </div>
      <div className="cart-item__wrapper">
        <div className="cart-item__details">
          <div className="cart-item__name">
            {title}
            {quantity > 1 && (
              <span className="cart-item__quantity">X{quantity}</span>
            )}
          </div>
          <div className="cart-item__price">{formatCurrency(price)}</div>
        </div>
        <div className="cart-item__total-wrapper">
          <p className="cart-item__total">{formatCurrency(price * quantity)}</p>
          <button
            className="cart-item__remove-button"
            onClick={() => removeFromCart(id)}
            aria-label="Remove from cart"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};
