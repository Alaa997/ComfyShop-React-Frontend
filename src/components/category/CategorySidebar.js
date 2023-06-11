import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { getRole } from "../../APIs/AuthAPI";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";

const CategorySidebar = (props) => {
  const isAdmin = getRole() === "ADMIN";

  const handleCategorySelect = (categoryId) => {
    if (categoryId) {
      props.filterProducts(categoryId);
    } else {
      props.filterProducts(null);
    }
  };

  return (
    <Container
      className="sidebar"
      style={{ backgroundColor: "#333", color: "#fff", height: "50%" }}
    >
      <Row
        className="sidebar-header"
        style={{ alignItems: "center", padding: "10px" }}
      >
        <Col xs={1}>
          <i className="fa fa-bars fa-lg"></i>
        </Col>
        <Col xs={11}>
          <h5 className="sidebar-title">Categories</h5>
        </Col>
      </Row>
      <Row className="sidebar-content" style={{ overflow: "auto" }}>
        <Nav className="flex-column">
          <Nav.Item
            className="sidebar-menu-item"
            onClick={() => handleCategorySelect(null)}
          >
            <Nav.Link
              as={Link}
              to="/home/all/product/categories"
              style={{ color: "#fff" }}
            >
              All products
            </Nav.Link>
          </Nav.Item>
          {props.categories.map((category) => (
            <Nav.Item
              className="sidebar-menu-item"
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
            >
              <Nav.Link
                as={Link}
                to={`/home/all/product/category/${category.id}/${category.name}`}
                style={{ color: "#fff", display: "flex", alignItems: "center" }}
              >
                {category.name}
                {isAdmin && (
                  <Button
                    variant="link"
                    className="delete-icon"
                    onClick={() => props.handleDeleteCategory(category.id)}
                    style={{ marginLeft: "auto", color: "#fff" }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                )}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Row>
    </Container>
  );
};

export default CategorySidebar;
