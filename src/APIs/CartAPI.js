import axios from "axios";

const CART_ITEM_API = "http://localhost:8081/cart";

export const getCartItems = async (sessionId) => {
  const response = await axios.get(`${CART_ITEM_API}/${sessionId}`);
  return response.data; // Assuming the response.data contains the cart items
};

export const addTocart = async (item) => {
  if (item) {
    const response = await axios.post(CART_ITEM_API + "/add", item);
    return response;
  }
};

export const deleteCartItem = async (id) => {
  const response = await axios.delete(`${CART_ITEM_API}/${id}`);
  return response.data;
};
