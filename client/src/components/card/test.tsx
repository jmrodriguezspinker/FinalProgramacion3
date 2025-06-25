// src/components/Card/Card.tsx
type CardProps = {
  productId: number;
  imageUrl: any;
  title: string;
  price: number;
  onClickImg?: React.MouseEventHandler<HTMLImageElement>;
  quantity: number;
  // no más funciones individuales, lo hacemos con Axios ahora
};

import { addItemToCart, removeItemFromCart, updateItemQuantity } from "../../api/cart";

const Card: React.FC<CardProps> = ({//*Se declara "Card", pero su valor no se lee nunca.ts(6133) const Card: React.FC<CardProps>
  productId,
  imageUrl,
  title,
  price,
  onClickImg,
  quantity,
}) => {
  const handleAdd = async () => {
    await addItemToCart(productId, 1);
  };

  const handleRemove = async () => {
    await removeItemFromCart(productId);
  };

  const handleIncrease = async () => {
    await updateItemQuantity(productId, quantity + 1);
  };

  const handleDecrease = async () => {
    if (quantity > 1) {
      await updateItemQuantity(productId, quantity - 1);
    } else {
      await removeItemFromCart(productId);
    }
  };

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
          onAddToCart={handleAdd}
          onDecreaseQuantity={handleDecrease}
          onIncreaseQuantity={handleIncrease}
          onRemove={handleRemove}
        />
      </div>
    </div>
  );
};
