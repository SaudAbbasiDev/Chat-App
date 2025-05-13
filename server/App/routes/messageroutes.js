import Protect from "../middleware/authmiddleware.js"
import express from "express"
const MsgRouter=express.Router()
import { getAllUsers, Getmessage, Sendmessage } from "../controllers/messagecontroller.js"

MsgRouter.get("/getuser", getAllUsers)
MsgRouter.get("/:id", Protect, Getmessage)
MsgRouter.post("/send/:id", Protect, Sendmessage)

export default MsgRouter;