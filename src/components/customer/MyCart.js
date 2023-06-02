import React, { useEffect, useState } from "react";
import { deleteCartItem, getCartItems } from "../../APIs/CartAPI";

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const deleteProductFromCart = (cartId) => {
    console.log(cartId);
    const response = deleteCartItem(cartId);

    console.log(response);
  };
  useEffect(() => {
    let claimsString = localStorage.getItem("claims");
    var claims = JSON.parse(claimsString);
    var shoppingSessionId = claims.shoppingSessionId;
    // console.log(shoppingSessionId)

    const getMyCart = async () => {
      const myCart = await getCartItems(shoppingSessionId);
      // console.log(myCart)
      if (myCart) {
        setCartItems(myCart);
      }
    };
    getMyCart();
  }, []);

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color"
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header text-center bg-color custom-bg-text">
          <h2>My Cart</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover custom-bg-text text-center">
              <thead className="bg-color table-bordered border-color">
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="text-color">
                {cartItems.map((cartData) => {
                  return (
                    <tr key={cartData.id}>
                      <td>
                        {/* <img
                          src={
                            "http://localhost:8080/api/product/" +
                            cartData.productImage
                          }
                          class="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }
                        /> */}
                      </td>
                      <td>
                        <b>{cartData.product.name}</b>
                      </td>
                      <td>
                        <b>{cartData.product.description}</b>
                      </td>
                      <td>
                        <b>{cartData.quantity}</b>
                      </td>
                      <td>
                        <button
                          className="btn bg-color custom-bg-text btn-sm"
                          onClick={() => deleteProductFromCart(cartData.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer custom-bg">
          <div className="float-right">
            <div
              className="text-color me-2"
              style={{
                textAlign: "right",
              }}
            >
              {/* <h5>Total Price: &#8377; {totatPrice}/-</h5> */}
            </div>

            <div className="float-end me-2">
              <button
                type="submit"
                className="btn bg-color custom-bg-text mb-3"
                // onClick={checkout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
