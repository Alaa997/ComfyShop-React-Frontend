import React from "react";
import { Nav } from "react-bootstrap";
import cart from "../../Images/cart.png";

const UserHeader = () => {
  return (
    <>
      <Nav.Link
        href="/notification"
        className="nav-text d-flex mt-3 justify-content-end"
        style={{ color: "white" }}
      >
        <img src={cart} className="login-img" alt="sfvs" />
        <p style={{ color: "white" }}> Notification</p>
      </Nav.Link>

      <Nav.Link
        href="/cart"
        className="nav-text d-flex mt-3 justify-content-end"
        style={{ color: "white" }}
      >
        <img src={cart} className="login-img" alt="sfvs" />
        <p style={{ color: "white" }}> Cart</p>
      </Nav.Link>
    </>
  );
};

export default UserHeader;
