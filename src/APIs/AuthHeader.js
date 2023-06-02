import TokenManager from "./TokenManager";

export default function AuthHeader() {
  const access_token = TokenManager.getAccessToken();
  if (access_token) {
    return { Authorization: "Bearer " + access_token }; // for Spring Boot back-end
  } else {
    return {};
  }
}
