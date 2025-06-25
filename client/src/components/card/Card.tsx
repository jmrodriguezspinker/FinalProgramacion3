//*Card.tsx
import React from "react";
import { formatCurrency } from "../../utilities/formatCurrency";
import AddToCartButton from "../addToCartButton/AddToCartButton";
import "./card.scss";
import { useCartActions } from "../../hooks/useCardActions";



type CardProps = {
  productId: number;
  imageUrl: any;
  title: string;
  price: number;
  onClickImg?: React.MouseEventHandler<HTMLImageElement>;
  quantity: number;
   onAddToCart: () => void;            
  onDecreaseQuantity: () => void;     
  onIncreaseQuantity: () => void;     
  onRemove: () => void;  
};


const Card: React.FC<CardProps> = ({
  productId,
  imageUrl,
  title,
  price,
  onClickImg,
  //quantity,
  
}) => {
  //const { refreshCartItems } = useShoppingCart();

  const {
  quantity,
  handleAddToCart,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleRemoveFromCart
} = useCartActions(productId);

  /* const handleAdd = async () => {
  try {
    await addItemToCart(productId, 1);
    await refreshCartItems();
  } catch (err: any) {
    console.error("Error al agregar al carrito:", err.response?.data || err.message);
  }
};

  const handleRemove = async () => {
    await removeItemFromCart(productId);
    await refreshCartItems();
  };

  const handleIncrease = async () => {
    await updateItemQuantity(productId, quantity + 1);
    await refreshCartItems();
  };

  const handleDecrease = async () => {
    if (quantity > 1) {
      await updateItemQuantity(productId, quantity - 1);
    } else {
      await removeItemFromCart(productId);
    }
    await refreshCartItems();
  }; */

  return (
    <div className="custom-card">
      <img
        src={imageUrl}
        alt={title}
        className="card-image"
        onClick={onClickImg}
        loading="lazy"
      />
      <div className="card-body">
        <div className="card-title">
          <p className="title">{title}</p>
          <p className="price text-muted">{formatCurrency(price)}</p>
        </div>
        <AddToCartButton
          quantity={quantity}
          onAddToCart={handleAddToCart}
          onDecreaseQuantity={handleDecreaseQuantity}
          onIncreaseQuantity={handleIncreaseQuantity}
          onRemove={handleRemoveFromCart}
        />
      </div>
    </div>
  );
};

export default Card;



