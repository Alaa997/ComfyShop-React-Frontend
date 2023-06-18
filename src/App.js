import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage";
import UpdateProduct from "./components/product/UpdateProduct";
import AddProduct from "./components/product/AddProduct";
import AddCategory from "./components/category/AddCategory";
import MyCart from "./components/customer/MyCart";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import "bootstrap/dist/css/bootstrap.css";
import Order from "./components/customer/Order";
import ChartComponent from "./components/statistics/Chart";
import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import TokenManager from "./APIs/TokenManager";
import { searchProductsByName } from "./APIs/ProductAPI";
import { getRole } from "./APIs/AuthAPI";

function App() {
  const [stompClient, setStompClient] = useState();
  const [messagesReceived, setMessagesReceived] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [claims, setClaims] = useState(TokenManager.getClaims());
  const handleLogout = () => {
    TokenManager.clear();
    setClaims(null);
  };
  useEffect(() => {
    setClaims(TokenManager.getClaims());
  }, [setClaims]); 

  const handleSearchResult = async (event) => {

    const searchQuery = event.target.value.toLowerCase();
    try {
      const response = await searchProductsByName(searchQuery);
      setSearchResults(response);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  const setupStompClient = (username) => {
    // stomp client over websockets
    const stompClient = new Client({
      brokerURL: "ws://localhost:8081/ws",
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      // subscribe to the backend public topic
      stompClient.subscribe("/topic/publicmessages", (data) => {
        console.log(data);
        onMessageReceived(data);
      });

      // subscribe to the backend "private" topic
      stompClient.subscribe(`/user/${username}/queue/inboxmessages`, (data) => {
        onMessageReceived(data);
      });
    };

    // initiate client
    stompClient.activate();

    // maintain the client for sending and receiving
    setStompClient(stompClient);
  };
  // send the data using Stomp
  const sendMessage = (newMessage) => {
    const payload = {
      id: uuidv4(),
      from: TokenManager.getClaims().sub,
      to: newMessage.to,
      text: newMessage.text,
    };
    if (payload.to) {
      stompClient.publish({
        destination: `/user/${payload.to}/queue/inboxmessages`,
        body: JSON.stringify(payload),
      });
    } else {
      stompClient.publish({
        destination: "/topic/publicmessages",
        body: JSON.stringify(payload),
      });
    }
  };

  // display the received data
  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setMessagesReceived((messagesReceived) => [...messagesReceived, message]);
  };

  useEffect(() => {
    setupStompClient(TokenManager.getClaims()?.sub);
  }, []);
  console.log(stompClient);

  const isAuthorized = (allowedRoles) => {
    const role = getRole();
    return role && allowedRoles.includes(role);
  };


  return (
    <div className="font">
      <Header
        messagesReceived={messagesReceived}
        handleSearchResult={handleSearchResult}
        claims={claims}
        handleLogout={handleLogout}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage searchResults={searchResults} />}
          />
          <Route
            path="/home"
            element={<HomePage searchResults={searchResults} />}
          />
          <Route
            path="/home/all/product/categories"
            element={<HomePage searchResults={searchResults} />}
          />
          <Route
            path="/home/all/product/category/:categoryId/:categoryName"
            element={<HomePage searchResults={searchResults} />}
          />
          <Route
            path="/addcategory"
            element={
              isAuthorized(["ADMIN"]) ? <AddCategory /> : <Navigate to="/" />
            }
          />
          <Route
            path="/addproduct"
            element={
              isAuthorized(["ADMIN"]) ? (
                <AddProduct sendMessage={sendMessage} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/update-product/:productId"
            element={
              isAuthorized(["ADMIN"]) ? <UpdateProduct /> : <Navigate to="/" />
            }
          />
          <Route
            path="/cart"
            element={
              isAuthorized(["CUSTOMER"]) ? <MyCart /> : <Navigate to="/" />
            }
          />
          <Route
            path="/order"
            element={
              isAuthorized(["CUSTOMER"]) ? <Order /> : <Navigate to="/" />
            }
          />
          <Route
            path="/statistics"
            element={
              isAuthorized(["ADMIN"]) ? <ChartComponent /> : <Navigate to="/" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
