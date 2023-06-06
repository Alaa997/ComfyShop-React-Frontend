import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import pic from "../../Images/pic.png";
import favoff from "../../Images/fav-off.png";
import UpdateProduct from "./UpdateProduct";
import TokenManager from "../../APIs/TokenManager";
import { addTocart } from "../../APIs/CartAPI";
import { getRole } from "../../APIs/AuthAPI";

const ProductCard = ({ product }) => {
  const isAdmin = getRole() !== "ADMIN";
  const navigate = useNavigate();

  const updateProduct = (productId) => {
    // console.log(productId);
    navigate(`/products/${productId}`);
    // return <UpdateProduct />;
  };

  const handleAddToCart = (selectedProduct) => {
    const cartData = {
      sessionId: TokenManager.getClaims().shoppingSessionId,
      product: selectedProduct,
      quantity: 1,
    };
    console.log(cartData);
    addTocart(cartData);
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
        {/* <Link
          to="/products/:id"
          style={{
            textDecoration: "none",
          }}
        > */}
        <Card.Img style={{ height: "228px", width: "100%" }} src={pic} />
        <div className="d-flex justify-content-end mx-2">
          <img
            src={favoff}
            alt=""
            className="text-center"
            style={{
              height: "24px",
              width: "26px",
            }}
          />
        </div>
        <Card.Body>
          <Card.Title>
            <div className="card-title">{product.name}</div>
          </Card.Title>
          <Card.Text>
            <span className="d-flex justify-content-between">
              {isAdmin ? (
                <Link
                  to={`/cart?id=${product}`}
                  className="btn btn-success"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Link>
              ) : (
                <Link
                  to={`/update-product/${product.id}`}
                  className="btn btn-success"
                  onClick={() => updateProduct(product.id)}
                >
                  Update Product
                </Link>
              )}
              <span className="d-flex">
                <span className="card-price">{product.price} $</span>
              </span>
            </span>
          </Card.Text>
        </Card.Body>
        {/* </Link> */}
      </Card>
    </Col>
  );
};

export default ProductCard;
