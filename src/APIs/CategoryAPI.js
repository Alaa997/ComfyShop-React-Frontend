import axios from "axios";
import AuthHeader from "./AuthHeader";

const categoryAPI = "http://localhost:8081/categories";

export const getCategories = async () => {
  const response = await axios.get(categoryAPI);
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axios.post(categoryAPI, category, {
    headers: AuthHeader(),
  });
  return response;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${categoryAPI}/${id}`, {
    headers: AuthHeader(),
  });
  return response.data;
};
