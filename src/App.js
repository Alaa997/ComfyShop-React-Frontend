import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  const [stompClient, setStompClient] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [messagesReceived, setMessagesReceived] = useState([]);

  const handleSearchReslut = (e) => {
    console.log(e.target.value)
    setSearchResult(e.target.value);
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
  
  return (
    <div className="font">
      <Header
        messagesReceived={messagesReceived}
        handleSearchReslut={handleSearchReslut}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/home"
            element={<HomePage searchResult={searchResult} />}
          />
          <Route path="/home/all/product/categories" element={<HomePage />} />
          <Route
            path="/home/all/product/category/:categoryId/:categoryName"
            element={<HomePage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cart" element={<MyCart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/statistics" element={<ChartComponent />} />
          <Route path="/addcategory" element={<AddCategory />} />
          {/* <Route path="/addcategory" element={<UpdateProduct />} /> */}
          <Route
            path="/addproduct"
            element={<AddProduct sendMessage={sendMessage} />}
          />
          <Route
            path="/update-product/:productId"
            element={<UpdateProduct />}
          />
          {/* <Route path="/chat" element={<Chat />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
