import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import cart from "../../Images/cart.png";
import { Toaster, toast } from "react-hot-toast";

const UserHeader = (props) => {
  const [adminMsg, setAdminmsg] = useState([]);
  console.log("adminMsg", adminMsg[0]?.text);

  useEffect(() => {
    setAdminmsg(props.messagesReceived);
    toast.success(props.messagesReceived[0]?.text);
  }, [props.messagesReceived]);

  return (
    <>
      
      <Nav.Link
        href="/cart"
        className="nav-text d-flex mt-3 justify-content-end"
        style={{ color: "white" }}
      >
        <img src={cart} className="login-img" alt="sfvs" />
        <p style={{ color: "white" }}> Cart</p>
      </Nav.Link>
      <Nav.Link
        href="/order"
        className="nav-text d-flex mt-3 justify-content-end"
        style={{ color: "white" }}
      >
        {" "}
        {/* <img src={cart} className="login-img" alt="sfvs" /> */}
        <p style={{ color: "white" }}> Orders</p>
      </Nav.Link>{" "}
      <Toaster position="top-right" />
    </>
  );
};

export default UserHeader;
