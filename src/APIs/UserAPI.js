import axios from "axios";
import TokenManager from "./TokenManager";

const API_URL = "http://localhost:8081/user";

export const getUser = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
  });
  return response.data;
};
