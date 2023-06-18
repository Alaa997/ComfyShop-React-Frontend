import React, { useEffect, useState } from "react";
import { addTocart, deleteCartItem, getCartItems } from "../../APIs/CartAPI";
import { getSessionId, placeOrder } from "../../APIs/ShoppingSessionAPI";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TokenManager from "../../APIs/TokenManager";

const MyCart = () => {
  const userId = TokenManager.getClaims()?.userId;
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const deleteProductFromCart = async (cartId) => {
    console.log(cartId);
    const response = await deleteCartItem(cartId);
    console.log(response);
    // Remove the deleted item from the cartItems state
    setCartItems(cartItems.filter((item) => item.id !== cartId));
  };

  const checkout = async () => {
    try {
      const shoppingSessionId = await getSessionId(userId);
      console.log(shoppingSessionId);

      placeOrder(shoppingSessionId, userId)
        .then((res) => {
          console.log(res);
          toast.success("Your order is confirmed!");
          setTimeout(() => {
            navigate("/order");
          }, 1500);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong!");
        });
    } catch (error) {
      console.log(error);
      // Handle error if getCurrentUser() or placeOrder() throws an exception
    }
  };

  const getMyCart = async () => {
    const shoppingSessionId = await getSessionId(userId);
    const myCart = await getCartItems(shoppingSessionId);
    console.log(myCart);
    setCartItems(myCart);

    // Calculate the total price
    let total = 0;
    myCart.forEach((cartData) => {
      total += cartData.product.price * cartData.quantity;
    });
    setTotalPrice(total);
  };

  useEffect(() => {
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
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="text-color">
                {cartItems.map((cartData) => {
                  return (
                    <tr key={cartData.id}>
                      <td>
                        <img
                          src={cartData.product.photo}
                          className="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
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
                        <b>
                          {(cartData.product.price * cartData.quantity).toFixed(
                            2
                          )}
                        </b>
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
            <div className="text-color me-2" style={{ textAlign: "right" }}>
              <h5>Total Price: $ {totalPrice.toFixed(2)}</h5>
            </div>

            <div className="float-end me-2">
              <button
                type="submit"
                className="btn btn-primary mb-3"
                onClick={() => checkout()}
              >
                Checkout
              </button>
              <button
                type="submit"
                className="btn btn-secondary mb-3 ms-2"
                onClick={() => navigate("/home")}
              >
                Continue Shopping
              </button>
              <Toaster />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
