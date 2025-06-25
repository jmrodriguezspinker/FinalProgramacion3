import axios from "axios";

export const getOrderById = async (orderId: string | number) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${import.meta.env.VITE_API_URL}/order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.order;
};
