import React, { useState, useEffect, useRef } from "react";
import { getSocket } from "../../socket/socket.js";
import InputField from "../../components/Input";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { addMessage , getMessages} from "../../Slices/messegeSlice";
import { request } from "../../utils/request.js";
import useMessages from "../../hooks/Chats/useMessages.js";
import './style.css';

const Chat = () => {
  const {fetchMessages} = useMessages();
  const dispatch = useDispatch();
  const messages = useSelector((state)=> state.messages.messageArray)
  const chatContainerRef = useRef(null);
  const socket = getSocket();
  const [typing, setTyping]   = useState("");



    const handleDis = async ()=>{
      const data = await fetchMessages();
      if(data.success){
        console.log(data)
        dispatch(getMessages(data.messages))
      }
    }
    useEffect(()=>{
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    },[messages]);
    
  useEffect(() => {
    handleDis()
    socket.on("connect",() =>
       console.log("Connected to server!", socket.id)
          );
    const onReceive = (msg) => {
      dispatch(addMessage({ message: msg, created_at: "now", user: { name: "You" } }));
    };
    socket.on("recieve", onReceive);
    return () => {
      socket.off("recieve", onReceive);
    };


  }, [socket]);

  const handleSend = () => {
    const token = localStorage.getItem('token');
    if (!typing.trim()) return;
    socket.emit("send", typing,token);
    setTyping("");
  };

  return (
    <div>
      <div className="chat-box flex flex-col" ref={chatContainerRef}>
      <h1>Chats</h1>

          {messages.map((msg, i) => (

            <div className="message flex flex-col p-1" key={i} >
              <p>{msg?.user?.name}</p>
              <div className="flex flex-row p-1 justify-space-between mt-2 p-1">
                <p className="message-text">{msg?.message}</p>
                <p className="date ">{msg?.created_at.split("T",)[0]}</p>
              </div>
            </div>
            ))}

      </div>

      <div className="chat-input flex flex-row p-1">
      <InputField
        type="text"
        value={typing}
        onChange={(e) => setTyping(e.target.value)}
        container="input-con width-100"
        style={"input-border"}
      />
      <Button label="Send" style={'send-btn'} onClick={handleSend} />
      </div>
    </div>
  );
};

export default Chat;
