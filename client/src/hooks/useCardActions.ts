// src/hooks/useCartActions.ts
import { useShoppingCart } from "../context/ShoppingCartContext";
import {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity
} from "../api/cart";

export const useCartActions = (productId: number) => {
  const { getItemQuantity, refreshCartItems } = useShoppingCart();
  const quantity = getItemQuantity(productId);

  const handleAddToCart = async () => {
    try {
      await addItemToCart(productId, 1);
      await refreshCartItems();
    } catch (error: any) {
      console.error("Error al agregar al carrito:", error.response?.data || error.message);
    }
  };

  const handleIncreaseQuantity = async () => {
    try {
      await updateItemQuantity(productId, quantity + 1);
      await refreshCartItems();
    } catch (error: any) {
      console.error("Error al aumentar cantidad:", error.response?.data || error.message);
    }
  };

  const handleDecreaseQuantity = async () => {
    try {
      if (quantity > 1) {
        await updateItemQuantity(productId, quantity - 1);
      } else {
        await removeItemFromCart(productId);
      }
      await refreshCartItems();
    } catch (error: any) {
      console.error("Error al disminuir cantidad:", error.response?.data || error.message);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await removeItemFromCart(productId);
      await refreshCartItems();
    } catch (error: any) {
      console.error("Error al remover del carrito:", error.response?.data || error.message);
    }
  };

  return {
    quantity,
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveFromCart
  };
};
