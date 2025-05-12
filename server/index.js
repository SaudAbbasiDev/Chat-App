// //connecting dot env
// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const mongoose = require("mongoose");
// const AuthRouter = require("./App/routes/authroutes");
// const path = require("path");
// const MsgRouter = require("./App/routes/messageroutes");
// const UserModel = require("./App/models/authmodel");
// const {io,app,server}=require("./App/controllers/socket")
// app.use(cookieParser());
// const __dirname = path.resolve();
// app.use(express.json()); // Increase limit
// app.use(cors({ credentials: true, origin: process.env.LOCAL_URL }));
// app.get("/", (req, res) => {
//   res.send("Working Fine");
// });
// if(process.env.NODE_ENV === "production") app.use(express.static(path.join(__dirname, "../client/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client","dist","index.html"));
// })
// app.use("/api/auth", AuthRouter);
// app.use("/api/msg", MsgRouter);
// app.get("/seee", async(req, res) => {
//   let users= await UserModel.find();
//   res.status(200).json(users)
// })
// server.listen(process.env.PORT);

// mongoose.connect(process.env.MONGO_URL).then(() => {

//   console.log("Listening on port 4000");
// });

// //conncecting websocket
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");

const AuthRouter = require("./App/routes/authroutes");
const MsgRouter = require("./App/routes/messageroutes");
const UserModel = require("./App/models/authmodel");

// Load env variables
dotenv.config();

// Initialize app
const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.LOCAL_URL }));

// Static build path for production
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/msg", MsgRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Working Fine");
});

// Debug route
app.get("/seee", async (req, res) => {
  const users = await UserModel.find();
  res.status(200).json(users);
});

// Start server
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
