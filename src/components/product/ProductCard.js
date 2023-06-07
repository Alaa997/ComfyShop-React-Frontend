import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import pic from "../../Images/pic.png";
import favoff from "../../Images/fav-off.png";
import TokenManager from "../../APIs/TokenManager";
import { addTocart } from "../../APIs/CartAPI";
import { getRole } from "../../APIs/AuthAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteProduct } from "../../APIs/ProductAPI";
import { toast } from "react-hot-toast";

const ProductCard = ({ product }) => {
  const isAdmin = getRole() === "ADMIN";
  const navigate = useNavigate();

  const updateProduct = (productId) => {
    navigate(`/products/${productId}`);
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

  const handleDeleteProduct  = (productId) => {
if (window.confirm("Are you sure you want to delete this product?")) {
  deleteProduct(productId)
    .then(() => {
      navigate(`/home`);
      toast.success("Successfully removed!");
    })
    .catch((error) => {
      console.log(error);
      toast.error("Something went wrong!");
    });
}
  }

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
              {!isAdmin ? (
                <Link
                  to={`/cart?id=${product}`}
                  className="btn btn-success"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Link>
              ) : (
                <>
                  <Link
                    to={`/update-product/${product.id}`}
                    className="btn btn-success"
                    onClick={() => updateProduct(product.id)}
                  >
                    Update Product
                  </Link>
                  <Button
                    variant="link"
                    className="delete-icon"
                    onClick={() => handleDeleteProduct(product.id)}
                    style={{ marginLeft: "auto", color: "red" }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </>
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
