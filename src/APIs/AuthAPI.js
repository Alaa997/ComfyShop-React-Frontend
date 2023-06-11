import axios from "axios";
import TokenManager from "./TokenManager";
import AuthHeader from "./AuthHeader";

const API_URL = "http://localhost:8081/user";

export const register = async (user) => {
  const response = await axios.post(API_URL + "/sign-up", user);
  console.log("Response:", response);
  // Process the response or return it if needed
  return response;
};

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

export const getCurrentUser = async () => {
  const claims = TokenManager.getClaims();
  if (claims?.sub) {
    const response = await axios.get(`${API_URL}/${claims.sub}`, {
      headers: AuthHeader(),
    });
    localStorage.setItem("userId", JSON.stringify(response.data.id));
    return response.data;
  }
};

export const getRole = () => {
  const claims = TokenManager.getClaims();
  if (claims?.roles[0]) {
    return claims.roles[0];
  }
  return null;
};

export const getSessionI = () => {
  const claims = JSON.parse(localStorage.getItem("claims"));
  // Update the shoppingSessionId value here
  claims.shoppingSessionId = "newSessionId";
  localStorage.setItem("claims", JSON.stringify(claims));
  return claims.shoppingSessionId;
};
