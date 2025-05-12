//connecting dot env
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const AuthRouter = require("./App/routes/authroutes");
const path = require("path");
const MsgRouter = require("./App/routes/messageroutes");
const {io,app,server}=require("./App/controllers/socket")
app.use(cookieParser());
// const __dirname = path.resolve();
app.use(express.json()); // Increase limit
app.use(cors({ credentials: true, origin: process.env.LOCAL_URL }));
app.get("/", (req, res) => {
  res.send("Working Fine");
});
if(process.env.NODE_ENV === "production") app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client","dist","index.html"));
})
app.use("/api/auth", AuthRouter);
app.use("/api/msg", MsgRouter);
server.listen(process.env.PORT);

mongoose.connect(process.env.MONGO_URL).then(() => {

  console.log("Listening on port 4000");
});

//conncecting websocket
