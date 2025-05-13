//connecting dot env
import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import AuthRouter from "./App/routes/authroutes.js";
import path from "path";
import MsgRouter from "./App/routes/messageroutes.js";
import { io, app, server } from "./App/controllers/socket.js";
app.use(cookieParser());
const __dirname = path.resolve();
app.use(express.json()); // Increase limit
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.get("/", (req, res) => {
  res.send("Working Fine");
});
// if(process.env.NODE_ENV === "production") app.use(express.static(path.join(__dirname, "../client/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// })
app.use("/api/auth", AuthRouter);
app.use("/api/msg", MsgRouter);
server.listen(process.env.PORT);

mongoose.connect(process.env.MONGO_URL).then(() => {

  console.log("Listening on port 4000");
});

//conncecting websocket
