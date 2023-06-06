import React from "react";
import login from "../../Images/login.png";
import { Nav } from "react-bootstrap";

const AdminHeader = () => {
  return (
    <>
      <Nav.Link
        href="/statistics"
        className="nav-text d-flex mt-3 justify-content-end"
      >
        <img src={login} className="login-img" alt="sfvs" />
        <p style={{ color: "white" }}> Statistics</p>
      </Nav.Link>
      <Nav.Link
        href="/addcategory"
        className="nav-text d-flex mt-3 justify-content-end"
      >
        <img src={login} className="login-img" alt="sfvs" />
        <p style={{ color: "white" }}> Category</p>
      </Nav.Link>
      <Nav.Link
        href="/addproduct"
        className="nav-text d-flex mt-3 justify-content-end"
      >
        <img src={login} className="login-img" alt="sfvs" />
        <p style={{ color: "white" }}> Product</p>
      </Nav.Link>
    </>
  );
};

export default AdminHeader;
