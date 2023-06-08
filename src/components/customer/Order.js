import React, { useEffect, useState } from "react";
import mobile1 from "../../Images/mobile1.png";
import { getOrders } from "../../APIs/ShoppingSessionAPI";
import TokenManager from "../../APIs/TokenManager";
import { getCurrentUser } from "../../APIs/AuthAPI";

const Order = () => {
  const [myOrderData, setMyOrderData] = useState([]);
  const [username, setUserName] = useState("");

  const getMyOrders = async () => {
    const user = await getCurrentUser();
    setUserName(user.firstName);
    const userId = TokenManager.getClaims().userId;
    const myOrders = await getOrders(userId);
    setMyOrderData(myOrders);
  };

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <>
      {myOrderData.map((order) => (
        <section className="h-100 gradient-custom" key={order.id}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-10 col-xl-8">
                <div className="card" style={{ borderRadius: "10px" }}>
                  <div className="card-header px-4 py-5">
                    <h5 className="text-muted mb-0">
                      My Orders,{" "}
                      <span style={{ color: "#512DA8" }}>{username}</span>!
                    </h5>
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <p
                        className="lead fw-normal mb-0"
                        style={{ color: "#512DA8" }}
                      >
                        Orders
                      </p>
                    </div>
                    <div className="card shadow-0 border mb-4">
                      {order.cartItems.map((cartItem) => (
                        <div className="card-body" key={cartItem.id}>
                          <div className="row">
                            <div className="col-md-2">
                              <img
                                src={mobile1}
                                className="img-fluid"
                                alt="Phone"
                              />
                            </div>
                            <div className="col-md-4 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0">
                                {cartItem.product.name}
                              </p>
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0 small">
                                Price: ${cartItem.product.price}
                              </p>
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0 small">
                                {cartItem.quantity}
                              </p>
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0 small">
                                Total: $
                                {cartItem.product.price * cartItem.quantity}
                              </p>
                            </div>
                          </div>
                          <hr
                            className="mb-4"
                            style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                          />
                          <div className="row d-flex align-items-center">
                            <div className="col-md-2">
                              <p className="text-muted mb-0 small">
                                Track Order
                              </p>
                            </div>
                            <div className="col-md-10">
                              <div
                                className="progress"
                                style={{ height: "6px", borderRadius: "16px" }}
                              >
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{
                                    width: "65%",
                                    borderRadius: "16px",
                                    backgroundColor: "#d1c4e9",
                                  }}
                                  aria-valuenow="65"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                              <div className="d-flex justify-content-around mb-1">
                                <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                  Out for delivery
                                </p>
                                <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                  Delivered
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="d-flex justify-content-between pt-2">
                      <p className="fw-bold mb-0">Order Details</p>
                    </div>

                    <div className="d-flex justify-content-between pt-2">
                      <p className="text-muted mb-0">Order ID : {order.id}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="text-muted mb-0">
                        Order Date : {order.date}
                      </p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Total</span> $
                        {order.total}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between mb-5">
                      <p className="text-muted mb-0">
                        Order Status : {order.orderStatus}
                      </p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Delivery Charges</span>{" "}
                        Free
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default Order;
