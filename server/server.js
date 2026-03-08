const express=require('express');
const http=require('http');
const {Server}=require('socket.io');
const cors=require('cors');

const app=express();
app.use(cors());

const path = require("path");

app.use(express.static(path.join(__dirname, "../client")));


const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"*",
    }
});

io.on("connection",(socket)=>{
    console.log("User connected",socket.id);
socket.on("join-room",(roomId)=>{
    socket.join(roomId);
    socket.to(roomId).emit("user-joined");
});
socket.on("offer",(data)=>{
    socket.to(data.room).emit("offer",data.offer);
});
socket.on("answer",(data)=>{
    socket.to(data.room).emit("answer",data.answer);
});
socket.on("ice-candidate",(data)=>{
    socket.to(data.room).emit("ice-candidate",data.candidate);
});





});
server.listen(5000,()=>{
  console.log("server os running on port 50000");
});
