// import React, { useState } from "react";
// import { Client } from "@stomp/stompjs";
// import { v4 as uuidv4 } from "uuid";
// import ChatMessagesPlaceholder from "./components/ChatMessagesPlaceHolder";
// import SendMessagePlaceholder from "./components/SendMessagePlaceholder";
// import UsernamePlaceholder from "./components/UsernamePlaceholder";

// function WebsocketAPI() {
//   const [stompClient, setStompClient] = useState(null);
//   const [username, setUsername] = useState();
//   const [messagesReceived, setMessagesReceived] = useState([]);

//   const setupStompClient = (username) => {
//     // stomp client over websockets
//     const stompClient = new Client({
//       brokerURL: "ws://localhost:8081/ws",
//       reconnectDelay: 5000,
//       heartbeatIncoming: 4000,
//       heartbeatOutgoing: 4000,
//     });

//     stompClient.onConnect = () => {
//       // subscribe to the backend "private" topic
//       stompClient.subscribe(`/user/${username}/queue/inboxmessages`, (data) => {
//         onMessageReceived(data);
//       });
//     };

//     // initiate client
//     stompClient.activate();

//     // maintain the client for sending and receiving
//     setStompClient(stompClient);
//   };

//   // send the data using Stomp
//   const sendMessage = (newMessage) => {
//     if (!newMessage.text || !newMessage.to) {
//       alert("Please enter a message and specify a recipient.");
//       return;
//     }
//     const payload = {
//       id: uuidv4(),
//       from: username,
//       to: newMessage.to,
//       text: newMessage.text,
//       timestamp: new Date().toISOString(),
//     };
//     if (payload.to) {
//       stompClient.publish({
//         destination: `/user/${payload.to}/queue/inboxmessages`,
//         body: JSON.stringify(payload),
//       });
//     } else {
//       stompClient.publish({
//         destination: `/user/${username}/queue/inboxmessages`,
//         body: JSON.stringify(payload),
//       });
//     }
//     onMessageReceived({ body: JSON.stringify(payload) }); // Add this line to display sender's own message
//   };

//   // display the received data
//   const onMessageReceived = (data) => {
//     const message = JSON.parse(data.body);
//     setMessagesReceived((messagesReceived) => [...messagesReceived, message]);
//   };

//   const onUsernameInformed = (username) => {
//     setUsername(username);
//     setupStompClient(username);
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
//       <ChatMessagesPlaceholder
//         username={username}
//         messagesReceived={messagesReceived}
//       />
//     </div>
//   );
// }

// export default WebsocketAPI;
