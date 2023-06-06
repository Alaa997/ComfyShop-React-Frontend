import axios from "axios";
import AuthHeader from "./AuthHeader";

const productAPI = "http://localhost:8081/products";

export const update = async (productId, product) => {
  console.log(product.category);
  const res = await axios.put(`${productAPI}/${productId}`, product);
  return res;
};

export const getProductById = async(productId)=> {
  try {
    const response = await axios.get(`${productAPI}/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

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


export const deleteProduct=async(id)=> {
  try {
    const response = await axios.delete(`${productAPI}/${id}`, {
      headers: AuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
