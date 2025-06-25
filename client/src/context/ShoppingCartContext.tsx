import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ShoppingCart } from "../components/shoppingCart/ShoppingCart";
import {
  getUserCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
} from "../api/cart";

type CartItem = {
  id: number;
  quantity: number;
  price: number;
  title?: string;
  imgUrl?: string;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (
    id: number,
    price: number,
    title: string,
    imgUrl: string
  ) => Promise<void>;
  decreaseCartQuantity: (id: number) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  cartQuantity: number;
  cartItems: CartItem[];
  refreshCartItems: () => Promise<void>;
  clearCart: () => void;

};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const refreshCartItems = async () => {
    try {
      const response = await getUserCart();

      if (response && Array.isArray(response.items)) {
        const items = response.items.map((item: any) => ({
          id: Number(item.product.id), // Usa el ID del producto real
          quantity: item.quantity,
          price: Number(item.product.price),
          title: item.product.title,
          imgUrl: item.product.img, // ← Este es el campo correcto
        }));

        setCartItems(items);
      } else {
        console.error("Expected array in cart, got:", response);
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error refreshing cart items:", error);
      setCartItems([]);
    }

    
  };

  const clearCart = () => {
      setCartItems([]);
  };

  useEffect(() => {
    refreshCartItems();
  }, []);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  async function increaseCartQuantity(
    id: number,
    /* price: number,
    title: string,
    imgUrl: string */
  ) {
    console.log(id);
    await addItemToCart(id, 1);
    await refreshCartItems();
  }

  async function decreaseCartQuantity(id: number) {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;
    if (item.quantity === 1) {
      await removeItemFromCart(id);
    } else {
      await updateItemQuantity(id, item.quantity - 1);
    }
    await refreshCartItems();
  }

  async function removeFromCart(id: number) {
    await removeItemFromCart(id);
    await refreshCartItems();
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        refreshCartItems,
        clearCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
