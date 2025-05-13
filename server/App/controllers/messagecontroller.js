import UserModel from "../models/authmodel.js";
import Message from "../models/messagemodel.js";
import cloudinary from "./cloudnary.js";
import { getReceiverId,io } from "./socket.js";

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
    res.status(200).json(messages);
  } catch (error) {
    res.send(error);
  }
};
const Sendmessage = async (req, res) => {
  try {
    const { id: recieverId } = req.params;
    const { text, image } = req.body;
    const senderId = req.user._id;

    let Imageurl;
    if (image) {
      const responseImage = await cloudinary.uploader.upload(image);
      Imageurl = responseImage.secure_url;
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      text,
      image: Imageurl,
    });

    await newMessage.save(); // ✅ Await this to catch save errors

    // const senderSocketid = getReceiverId(req.user._id);
    const recieverSocketid = getReceiverId(recieverId);

    // if (senderSocketid) {
    //   io.to(senderSocketid).emit("newMessage", newMessage);
    // }
    if (recieverSocketid) {
      io.to(recieverSocketid).emit("newMessage", newMessage);
    }
    // ✅ Only send one response
    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Sendmessage error:", error);
    // ✅ Use status and return to prevent multiple sends
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export { getAllUsers, Getmessage, Sendmessage };
