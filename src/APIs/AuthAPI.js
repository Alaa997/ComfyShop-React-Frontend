import axios from "axios";
import TokenManager from "./TokenManager";

const API_URL = "http://localhost:8081/user";

export const register = async(user) =>{
  const response = await axios.post(API_URL + "/sign-up", user);
  console.log("Response:", response);
  // Process the response or return it if needed
  return response;
}

export const login = (data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  console.log(data);
  axios
    .post("http://localhost:8081/user/login", data, headers)
    .then((response) => response.data.accessToken)
    .then((accessToken) => TokenManager.setAccessToken(accessToken))
    .catch((error) => console.log(error));
};

export const getCurrentUser = () => {
  const claims = TokenManager.getClaims();
  if (claims?.sub) {
    return claims.sub;
  }
  return null;
};

export const getRole = () => {
  const claims = TokenManager.getClaims();
  if (claims?.roles[0]) {
    return claims.roles[0];
  }
  return null;
};