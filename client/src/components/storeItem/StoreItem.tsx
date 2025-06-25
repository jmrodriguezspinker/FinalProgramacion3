import React from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import Card from "../card/Card"; // Assuming the Card component is in the same directory

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  title: string;
  onClickImg: React.MouseEventHandler<HTMLImageElement> | undefined;
};

export const StoreItem: React.FC<StoreItemProps> = ({
  id,
  name,
  price,
  title,
  imgUrl,
  onClickImg,
}: StoreItemProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);

  const handleAddToCart = () => {
    increaseCartQuantity(id, price, title, imgUrl);
  };

  const handleDecreaseQuantity = () => {
    decreaseCartQuantity(id);
  };

  const handleIncreaseQuantity = () => {
    increaseCartQuantity(id, price, title, imgUrl);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  return (
    <Card
      productId={id} 
      imageUrl={imgUrl}
      onClickImg={onClickImg}
      title={name}
      price={price}
      onAddToCart={handleAddToCart}
      onDecreaseQuantity={handleDecreaseQuantity}
      onIncreaseQuantity={handleIncreaseQuantity}
      onRemove={handleRemoveFromCart}
      quantity={quantity}
    />
  );
};
