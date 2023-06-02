import React from "react";
import { Nav } from "react-bootstrap";
import login from "../../Images/login.png";
import cart from "../../Images/cart.png";

const NormalHeader = () => {
  return (
    <>
      <Nav.Link
        href="/login"
        className="nav-text d-flex mt-3 justify-content-end"
      >
        <img src={login} className="login-img" alt="sfvs" />
        <p style={{ color: "white" }}> Login</p>
      </Nav.Link>
      <Nav.Link
        href="/signup"
        className="nav-text d-flex mt-3 justify-content-end"
        style={{ color: "white" }}
      >
        <img src={cart} className="login-img" alt="sfvs" />
        <p style={{ color: "white" }}> Register</p>
      </Nav.Link>
    </>
  );
};

export default NormalHeader;
