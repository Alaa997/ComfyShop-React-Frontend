import axios from "axios";
import AuthHeader from "./AuthHeader";

const productAPI = "http://localhost:8081/products";
export const getProductById = async (productId) => {
  const response = await axios.get(`${productAPI}/${productId}`);
  return response.data;
};

export const getProducts = async (categoryId = null) => {
  const url =
    categoryId !== null ? `${productAPI}?categoryId=${categoryId}` : productAPI;
  const response = await axios.get(url);
  return response.data;
};

export const addProduct = async (product) => {
  const res = await axios.post(productAPI, product, {
    headers: AuthHeader(),
  });
  return res;
};

export const update = async (productId, product) => {
  const res = await axios.put(`${productAPI}/${productId}`, product, {
    headers: AuthHeader(),
  });
  return res;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${productAPI}/${id}`, {
    headers: AuthHeader(),
  });
  return response.data;
};

export const searchProductsByName = async (name) => {
  const url = `${productAPI}/search?name=${name}`;
  const response = await axios.get(url);
  return response.data;
};
