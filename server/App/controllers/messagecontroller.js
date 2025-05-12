const UserModel = require("../models/authmodel");
const Message = require("../models/messagemodel");
const cloudinary = require("./cloudnary");
const { getReceiverId } = require("./socket");
const { io } = require("./socket");
const getAllUsers = async (req, res) => {
  
    // const Loggeduser = req.user._id;
    // const allusers = await UserModel.find({
     let users = await UserModel.find({});
    
    res.status(200).json(users);
};
const Getmessage = async (req, res) => {
 try {
    const { id: RecieverId } = req.params;
    const MyId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: MyId, recieverId: RecieverId },
        { senderId: RecieverId, recieverId: MyId },
      ],
    });
    res.send(messages).json(messages)
 } catch (error) {
    res.send(error)
 }
};
const Sendmessage = async (req, res) => {
  try {
    const { id: recieverId } = req.params;
    const { text, image } = req.body;

    let Imageurl;
    if (image) {
      const responseImage = await cloudinary.uploader.upload(image);
      Imageurl = responseImage.secure_url;
    }

    const newMessage = await new Message({
      senderId: req.user._id,
      recieverId,
      text,
      image: Imageurl,
    });

    await newMessage.save();  // ✅ Await this to catch save errors

    const senderSocketid = getReceiverId(req.user._id);
    const recieverSocketid = getReceiverId(recieverId);

    if (senderSocketid) {
      io.to(senderSocketid).emit("newMessage", newMessage);
    }
    if (recieverSocketid && recieverSocketid !== senderSocketid) {
      io.to(recieverSocketid).emit("newMessage", newMessage);
    }
    // ✅ Only send one response
    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Sendmessage error:", error);
    // ✅ Use status and return to prevent multiple sends
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { getAllUsers, Getmessage,Sendmessage };
