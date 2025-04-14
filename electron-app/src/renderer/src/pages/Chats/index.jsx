import React, { useState, useEffect } from "react";
import { getSocket } from "../../socket/socket.js";
import InputField from "../../components/Input";
import Button from "../../components/Button";

const Chat = () => {
  const socket = getSocket();
  const [received, setReceived] = useState([]);
  const [typing, setTyping]   = useState("");

  useEffect(() => {
    // log connect once
    const onConnect = () => console.log("Connected to server!", socket.id);
    socket.on("connect", onConnect);

    // handle incoming messages
    const onReceive = (msg) => {
      setReceived((prev) => [...prev, msg]);
    };
    socket.on("recieve", onReceive);


  }, [socket]);

  const handleSend = () => {
    const token = localStorage.getItem('token');
    if (!typing.trim()) return;
    socket.emit("send", typing,token);
    setTyping("");
  };

  return (
    <div>
      <h1>Chats</h1>
      <ul>
        {received.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
      <InputField
        type="text"
        value={typing}
        onChange={(e) => setTyping(e.target.value)}
      />
      <Button label="Send" onClick={handleSend} />
    </div>
  );
};

export default Chat;
