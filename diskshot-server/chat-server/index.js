import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import db from './database/connection.js';
import chatSocket from "./sockets/chatSocket.js";
import env from 'dotenv';
import jwt from 'jsonwebtoken';

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*", 
  },
});
env.config();

chatSocket(io,db);


app.get("/", (req, res) => {
 
  res.send("hello");
});

httpServer.listen(3000, () => {
  console.log("server running on posrt 3000 ...");
});
