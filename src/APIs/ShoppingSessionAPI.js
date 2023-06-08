import axios from "axios";

const ORDER_API = "http://localhost:8081/shopping_session";

export const getSessionId = async (userId) => {
  const response = await axios.get(`${ORDER_API}/${userId}`);
  // localStorage.setItem("sessionId", response.data);
//  const data = await response.json();
 return response.data;
};

export const placeOrder = async (shoppingSessionId, userId) => {
  const response = await axios.put(
    `${ORDER_API}/${shoppingSessionId}/${userId}`
  );
  return response.data;
};

export const getOrders = async (userId) => {
  const response = await axios.get(`${ORDER_API}/orders/${userId}`);
  return response.data;
};
