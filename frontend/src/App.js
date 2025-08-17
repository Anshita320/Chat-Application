import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
  socket.on("chatMessage", (data) => {
    console.log("Received message:", data); // Add this line
    setChat((prevChat) => [...prevChat, data]);
  });
  return () => socket.off("chatMessage");
}, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && username.trim()) {
      socket.emit("chatMessage", { username, message });
      setMessage("");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
      <h2>Chat App</h2>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Enter your Name"
        style={{ width: "80%", padding: 9, marginBottom: 12 }}
      />
      <div
        style={{
          border: "2px solid #ccc",
          height: 300,
          overflowY: "auto",
          marginBottom: 10,
          padding: 10,
        }}
      >
        {chat.map((data, idx) => (
          <div key={idx}>
            <strong>{data.username}:</strong> {data.message}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ width: "70%", padding: 8 }}
        />
        <button type="submit" style={{ padding: 8, marginLeft: 5 }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default App;