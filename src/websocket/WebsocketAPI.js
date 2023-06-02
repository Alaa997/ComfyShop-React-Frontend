// import React, { useState } from 'react'

// const WebsocketAPI = () => {
//     const [stompClient, setStompClient] = useState();
//     const [username, setUsername] = useState();
//     const [messagesReceived, setMessagesReceived] = useState([]);

// const setupStompClient = (username) => {
//   // stomp client over websockets
//   const stompClient = new Client({
//     brokerURL: "ws://localhost:8081/ws",
//     reconnectDelay: 5000,
//     heartbeatIncoming: 4000,
//     heartbeatOutgoing: 4000,
//   });

//   stompClient.onConnect = () => {
//     // subscribe to the backend "private" topic
//     stompClient.subscribe(`/user/${username}/queue/inboxmessages`, (data) => {
//       onMessageReceived(data);
//     });
//   };
//   // initiate client
//   stompClient.activate();

//   // maintain the client for sending and receiving
//   setStompClient(stompClient);
// };

//   return (
//     <div>
      
//     </div>
//   )
// }

// export default WebsocketAPI;
