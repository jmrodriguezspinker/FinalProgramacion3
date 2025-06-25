// src/api/cart.ts
import axios from "./axiosInstance";

export const addItemToCart = async (productId: number, quantity: number) => {
  const id = Number(productId);
  console.log("📤 Enviando al carrito:", { productId: id, quantity });

  return await axios.post("/cart/add", {
    productId: id,
    quantity,
  });
};

export const removeItemFromCart = async (productId: number) => {
  return axios.post("/cart/remove", { productId });
};

export const updateItemQuantity = async (productId: number, quantity: number) => {
  return await axios.put(`/cart/update`, {
    productId,
    quantity,
  });
};

export const getUserCart = async () => {
  const res = await axios.get("/cart");
  return res.data;
};

export const clearCart = async () => {
  return axios.post("/cart/clear");
};
