import { Server, Socket } from "socket.io";
import http from "http";
import express from "express";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.DEV_URL]
    }
});
const socketUserMap = {};

function getReceiverId(userId) {
    return socketUserMap[userId];
}
io.on("connection", (socket) => {
    console.log("a user conneected", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) socketUserMap[userId] = socket.id;
    io.emit("getOnlineusers", Object.keys(socketUserMap));
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        const userId = socket.handshake.query.userId;
        if (userId) delete socketUserMap[userId];
        io.emit("getOnlineusers", Object.keys(socketUserMap));
    });
});
export { io, server, app, getReceiverId };