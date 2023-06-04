import React, { useState } from "react";
import { Nav, ToastContainer } from "react-bootstrap";
import cart from "../../Images/cart.png";
import { toast } from "react-hot-toast";

// const UserHeader = () => {
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [notificationMessage, setNotificationMessage] = useState("");

//   // Function to handle receiving new notifications
//   const handleNewNotification = (message) => {
//     setNotificationCount(notificationCount + 1);
//     setNotificationMessage(message);
//   };

//   // Function to handle clicking on the notification icon
//   const handleNotificationClick = () => {
//     if (notificationCount > 0) {
//       toast(notificationMessage);
//       alert(notificationMessage)
//       console.log(notificationMessage);
//       setNotificationCount(0);
//     }
//   };

//   // Function to simulate receiving a new notification
//   const simulateNewNotification = () => {
//     const newNotification = "New notification received";
//     handleNewNotification(newNotification);
//   };

//   return (
//     <>
//       <button onClick={simulateNewNotification}>
//         Trigger New Notification
//       </button>

//       <Nav.Link
//         className="nav-text d-flex mt-3 justify-content-end"
//         style={{ color: "white" }}
//         onClick={handleNotificationClick}
//       >
//         <img src={cart} className="login-img" alt="sfvs" />
//         <p style={{ color: "white" }}> Notification</p>
//         {notificationCount > 0 && <span>{notificationCount}</span>}
//       </Nav.Link>
//       <ToastContainer />
//     </>
//   );
// };

// export default UserHeader;
const UserHeader = () => {
  return (
    <>
      <Nav.Link
        className="nav-text d-flex mt-3 justify-content-end"
        style={{ color: "white" }}
      >
        <img src={cart} className="login-img" alt="sfvs" />
        <p style={{ color: "white" }}> Notification</p>
      </Nav.Link>
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
        {/* <img src={cart} className="login-img" alt="sfvs" /> */}
        <p style={{ color: "white" }}> Orders</p>
      </Nav.Link>
    </>
  );
};

export default UserHeader;
