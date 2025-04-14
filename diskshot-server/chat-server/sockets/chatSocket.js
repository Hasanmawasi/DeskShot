import jwt from 'jsonwebtoken'
import env from 'dotenv';



const chatSocket = (io, db)=> {
    io.on("connection", (socket) => {
      console.log("user connected!!!", socket.id);
  
      socket.on("send", (message,token) => {
       const senderId = getID(token)
        console.log("Received message:", message);
  
        const query = "INSERT INTO chats (message, user_id) VALUES (?, ?)";
        db.execute(query, [message, senderId], (err, results) => {
          if (err) {
            console.error("Insert failed:", err);
            return;
          }

          console.log("Insert success, ID:", results.insertId);
          //send the message for every one when someone send a message
          io.emit("recieve", message); 
        });
      });
  
      socket.on("disconnect", () => {
        console.log("user disconnected!", socket.id);
      });
    });
  }
  //get the is from the jwt;
  const getID = (token)=>{
    const splitToken = token?.split(' ')[1];

   const decoded =  jwt.verify(splitToken, process.env.PRIVATE_KEY);
   return decoded.sub;
  }

  export default chatSocket;