
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [clientId, setClientId] = useState(
    Math.floor(new Date().getTime() / 1000)
  );

  const [websckt, setWebsckt] = useState();

  const [message, setMessage] = useState([]);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const url = "ws://localhost:8000/ws/" + clientId;

    const ws = new WebSocket(url);

    ws.onopen = (event) => {
      ws.send("Connect");
    };

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages([...messages, message]);
    };

    setWebsckt(ws);

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    websckt.send(message);
    websckt.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages([...messages, message]);
    };
    setMessage([]);
  };



  return (
    <div className="container">
      <h1>CHAT</h1>
      <h2>Your Client ID : {clientId}</h2>
      <div className="chat-container">
        <div className="chat">
          {messages.map((value, index) => {
            console.log("value.clientId:", value.clientId);
            if (value.clientId == clientId) {
              console.log("Condition for my message is true");
              return (
                <div key={index} className="my-message-container">
                  <div className="my-message">
                    <p className="client">client id: {clientId}</p>
                    <p className="message">{value.message}</p>
                  </div>
                </div>
              );
            } else {
              console.log("Condition for my message is false",clientId);
              return (
                <div key={index} className="another-message-container">
                  <div className="another-message">
                    <p className="client">client id: {clientId}</p>
                    <p className="message">{value.message}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="input-chat-container">
          <input
            className="input-chat"
            type="text"
            placeholder="Chat message..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></input>
          <button className="submit-chat" onClick={sendMessage}>
            send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;



