//*SingleProductsDetails.tsx
import React from "react";
import AddToCartButton from "../addToCartButton/AddToCartButton";
import type { ProductType } from "../../types/types";
import "./singleProductDetails.scss";
import { useCartActions } from "../../hooks/useCardActions";



const SingleProductDetails: React.FC<ProductType> = (productDetails) => {
  const {
    price,
    description,
    title,
    id,
  } = productDetails;

  
  const {
  quantity,
  handleAddToCart,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleRemoveFromCart
} = useCartActions(id);

  return (
    <>
      <AddToCartButton
        quantity={quantity}
        onAddToCart={handleAddToCart}
        onDecreaseQuantity={handleDecreaseQuantity}
        onIncreaseQuantity={handleIncreaseQuantity}
        onRemove={handleRemoveFromCart}
      />
      <div className="single-product-details">
        {title && (
          <p>
            <strong>Item: </strong>
            {title}
          </p>
        )}
        {price !== undefined && (
          <p>
            <strong>Precio: </strong>${price}
          </p>
        )}
        {description && (
          <p>
            <strong>Descripción: </strong>
            {description}
          </p>
        )}
        
      </div>
    </>
  );
};

export default SingleProductDetails;
