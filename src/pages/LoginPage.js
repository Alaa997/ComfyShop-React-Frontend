import React from "react";
import Login from "../components/auth/Login";
import { useState } from "react";
import TokenManager from "../APIs/TokenManager";
import { useEffect } from "react";
import { login } from "../APIs/AuthAPI";


const LoginPage = () => {
  const [claims, setClaims] = useState(TokenManager.getClaims());
  const [userDetails, setUserDetails] = useState(null);

  const handleLogin = (loginRequest) => {
    console.log(loginRequest);
    login(loginRequest)
      .catch(() => alert("Login failed!"))
      .then((claims) => setClaims(claims))
      .catch((error) => console.error(error));
  };

  const handleLogout = () => {
    TokenManager.clear();
    setClaims(null);
    setUserDetails(null);
  };

  useEffect(() => {
    // getUserDetails();
  }, [claims]);

  return (
    <div
      style={{
        display: "flex",
        marginTop: "50px",
        justifyContent: "center",
        alignItems: "top",
        height: "10vh",
      }}
    >
      {claims ? (
        <div>
          <p>Welcome, {claims.sub}</p>
          <button onClick={handleLogout}>Logout</button>
          <br />
          <a href="/" target="_blank">
            Open in new Tab
          </a>
        </div>
      ) : (
        <div className="container">
          <Login onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default LoginPage;
