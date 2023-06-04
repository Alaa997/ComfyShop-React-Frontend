import axios from "axios";

const Order_API = "http://localhost:8081/shopping_session";

export const placeOrder = async (sessionId, userId) => {
  const response = await axios.put(`${Order_API}/${sessionId}/${userId}`);
  return response.data; // Assuming the response.data contains the cart items
};

export const getOrders = async (userId) => {
  const response = await axios.get(`${Order_API}/${userId}`);
  return response.data; // Assuming the response.data contains the cart items
};
