import React from "react";
import logo from "../../Images/logo.png";
import NormalHeader from "./NormalHeader";
import AdminHeader from "./AdminHeader";
import UserHeader from "./UserHeader";
import { Container, FormControl, Nav, Navbar } from "react-bootstrap";

const Header = (props) => {
  return (
    <>
      <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
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
              onChange={(e) => props.handleSearchResult(e)}
            />
            <Nav.Link
              href="/home"
              className="nav-text d-flex mt-3 justify-content-end"
            >
              <p style={{ color: "white" }}> Home</p>
            </Nav.Link>
            <Nav className="mx-auto">
              {props.claims ? (
                <>
                  {props.claims.roles.includes("ADMIN") ? (
                    <AdminHeader />
                  ) : (
                    <UserHeader {...props} />
                  )}
                  <Nav.Link
                    onClick={() => props.handleLogout()}
                    className="nav-text d-flex mt-3 justify-content-end"
                    style={{ color: "white" }}
                  >
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
