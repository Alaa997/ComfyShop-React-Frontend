import React, { useEffect, useState } from "react";
import logo from "../../Images/logo.png";
import TokenManager from "../../APIs/TokenManager";
import NormalHeader from "./NormalHeader";
import AdminHeader from "./AdminHeader";
import UserHeader from "./UserHeader";
import cart from "../../Images/cart.png";
import { Container, FormControl, Nav, Navbar } from "react-bootstrap";

const Header = (props) => {
  const [claims, setClaims] = useState(TokenManager.getClaims());
    const [adminMsg, setAdminmsg] = useState([]);

    console.log("adminMsg", adminMsg[0]?.text);
  useEffect(() => {
    setAdminmsg(props.messagesReceived);
  }, [props.messagesReceived]);
  const handleLogout = () => {
    TokenManager.clear();
    setClaims(null);
  };

  return (
    <>
      <Navbar
        className="sticky-top"
        bg="dark"
        variant="dark"
        expand="sm"
        // style={{ backgroundColor: "#856088" }}
      >
        <Container>
          <Navbar.Brand>
            <a href="/">
              <img src={logo} className="logo" alt="sfvs" />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <FormControl
              type="search"
              placeholder="Search..."
              className="me-2 w-75"
              aria-label="Search"
            />

            <Nav className="mx-auto">
              {claims ? (
                <>
                  {claims.roles.includes("ADMIN") ? (
                    <AdminHeader />
                  ) : (
                    <UserHeader />
                  )}
                  <Nav.Link
                    onClick={handleLogout}
                    className="nav-text d-flex mt-3 justify-content-end"
                    style={{ color: "white" }}
                  >
                    <img src={cart} className="login-img" alt="sfvs" />
                    <p style={{ color: "white" }}>Logout</p>
                  </Nav.Link>
                </>
              ) : (
                <NormalHeader />
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
