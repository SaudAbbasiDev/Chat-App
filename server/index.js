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
app.use(express.json({ limit: '10mb' })); // Increase limit to 10MB
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Increase limit for URL-encoded data
app.use(cors({ credentials: true, origin:process.env.DEV_URL }));
app.get("/", (req, res) => {
  res.send("Working Fine");
});
app.use("/api/auth", AuthRouter);
app.use("/api/msg", MsgRouter);
server.listen(process.env.PORT);

mongoose.connect(process.env.MONGO_URL).then(() => {

  console.log("Listening on port 4000");
});

//conncecting websocket
