// import React, { useEffect, useState } from "react";
// import { Client } from "@stomp/stompjs";
// import { v4 as uuidv4 } from "uuid";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import SendMessagePlaceholder from "./components/SendMessagePlaceholder";
// import UsernamePlaceholder from "./components/UsernamePlaceholder";

// function NotificationService() {
//   const [username, setUsername] = useState();
//   let [messagesReceived, setMessagesReceived] = useState([]);
 
 
//   const [stompClient, setStompClient] = useState();

//   useEffect(() => {
//     if (username) {
//       setupStompClient(username);
//     }
//   }, [username]);

//   const setupStompClient = (username) => {
//     // stomp client over websockets
//     const stompClient = new Client({
//       brokerURL: "ws://localhost:8081/ws",
//       reconnectDelay: 5000,
//       heartbeatIncoming: 4000,
//       heartbeatOutgoing: 4000,
//     });

//     stompClient.onConnect = () => {
//       // if (username === "Alaa") {
//       // subscribe to the backend public topic
//       stompClient.subscribe("/topic/publicmessages", (data) => {
//         console.log(data);
//         onMessageReceived(data);
//       });
//       // }
//     };

//     // initiate client
//     stompClient.activate();

//     // maintain the client for sending and receiving
//     setStompClient(stompClient);
//   };

//   // send the data using Stomp
//   const sendMessage = () => {
//     const payload = {
//       id: uuidv4(),
//       from: "Alaa",
//       text: "New product is available!",
//     };
//     stompClient.publish({
//       destination: "/topic/publicmessages",
//       body: JSON.stringify(payload),
//     });
//   };

//   // display the received data
//   const onMessageReceived = (data) => {
//     const message = JSON.parse(data.body);
//     setMessagesReceived([message]);
//   };

//   const onUsernameInformed = (username) => {
//     setUsername(username);
//     // setupStompClient(username);
//   };

//   return (
//     <div className="App">
//       <UsernamePlaceholder
//         username={username}
//         onUsernameInformed={onUsernameInformed}
//       />
//       <br></br>
//       <SendMessagePlaceholder username={username} onMessageSend={sendMessage} />
//       <br></br>
//       {messagesReceived
//         .filter((message) => message.from !== username)
//         .map((message) => {
//           toast(message.text); // Display toast message
//           return null;
//         })}
//       <ToastContainer />
//     </div>
//   );
// }

// export default NotificationService;
