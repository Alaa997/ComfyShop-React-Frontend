import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { addTocart } from "../../APIs/CartAPI";
import { getRole } from "../../APIs/AuthAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { getSessionId } from "../../APIs/ShoppingSessionAPI";
import TokenManager from "../../APIs/TokenManager";

const ProductCard = (props) => {
  const isAdmin = getRole() === "ADMIN";
  const navigate = useNavigate();

  const updateProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = async (selectedProduct) => {
    const userId = TokenManager.getClaims().userId;
    const sessionId = await getSessionId(userId);

    const cartData = {
      sessionId: sessionId,
      product: selectedProduct,
      quantity: 1,
    };

    await addTocart(cartData);
    navigate(`/cart`);
  };

  return (
    <Col xs="6" sm="6" md="4" lg="3" className="d-flex">
      <Card
        className="my-2"
        style={{
          width: "100%",
          height: "345px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
        }}
      >
        <Card.Img
          style={{ height: "228px", width: "100%" }}
          src={props.product.photo}
          alt={props.product.name}
        />
        <Card.Body>
          <Card.Title>
            <div className="card-title">{props.product.name}</div>
          </Card.Title>
          <Card.Text>
            <span className="d-flex justify-content-between">
              {isAdmin ? (
                <Link
                  to={
                    TokenManager.getClaims()?.userId
                      ? `/update-product/${props.product.id}`
                      : `/login`
                  }
                  className="btn btn-success"
                  onClick={() => updateProduct(props.product.id)}
                >
                  Update Product
                </Link>
              ) : getRole() === "CUSTOMER" ? (
                <Link
                  // to={TokenManager.getClaims()?.userId ? `/cart` : `/login`}
                  className="btn btn-success"
                  onClick={() => handleAddToCart(props.product)}
                >
                  Add to Cart
                </Link>
              ) : null}
              {isAdmin && (
                <Button
                  variant="link"
                  className="delete-icon"
                  onClick={() => props.handleDeleteProduct(props.product.id)}
                  style={{ marginLeft: "auto", color: "red" }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              )}
              <span className="d-flex">
                <span className="card-price">{props.product.price} $</span>
              </span>
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
