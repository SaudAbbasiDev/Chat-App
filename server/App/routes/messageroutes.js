const Protect=require("../middleware/authmiddleware")
const express=require("express")
const MsgRouter=express.Router()
const {getAllUsers,Getmessage, Sendmessage}=require("../controllers/messagecontroller")

MsgRouter.get("/getuser",getAllUsers)
MsgRouter.get("/:userId", Protect, Getmessage)
MsgRouter.post("/send/:userId", Protect, Sendmessage)


module.exports=MsgRouter