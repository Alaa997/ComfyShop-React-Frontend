import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { deleteCategory, getCategories } from "../../APIs/CategoryAPI";
import { getRole } from "../../APIs/AuthAPI";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";

const CategorySidebar = (props) => {
  const isAdmin = getRole() === "ADMIN";
  console.log(isAdmin);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getAllCategories() {
      const allCategories = await getCategories();
      setCategories(allCategories);
    }
    getAllCategories();
  }, []);

  const handleCategorySelect = (categoryId) => {
    if (categoryId) {
      props.filterProducts(categoryId);
    } else {
      props.filterProducts(null);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory(categoryId)
        .then(() => {
          setCategories(
            categories.filter((category) => category.id !== categoryId)
          );
          toast.success("Successfully removed!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong!");
        });
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
          {categories.map((category) => (
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
                    onClick={() => handleDeleteCategory(category.id)}
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
