const {Server, Socket} = require("socket.io");
const http=require("http")
const express=require("express")
const app=express()
const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }

})
const socketUserMap={}

function getReceiverId(userId){
    return socketUserMap[userId]
}
io.on("connection",(socket)=>{
    console.log("a user conneected",socket.id);
    const userId=socket.handshake.query.userId;
    if(userId)socketUserMap[userId]=socket.id;
    io.emit("getOnlineusers",Object.keys(socketUserMap));
    socket.on("disconnect",()=>{

        console.log("user disconnected",socket.id);
        const userId=socket.handshake.query.userId;
        if(userId)delete socketUserMap[userId];
        io.emit("getOnlineusers",Object.keys(socketUserMap));
    }  )
})
module.exports={io,server,app,getReceiverId}