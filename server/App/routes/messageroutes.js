const Protect=require("../middleware/authmiddleware")
const express=require("express")
const MsgRouter=express.Router()
const {getAllUsers,Getmessage, Sendmessage}=require("../controllers/messagecontroller")

MsgRouter.get("/getuser",getAllUsers)
MsgRouter.get("/:id",Protect,Getmessage)
MsgRouter.post("/send/:id",Protect,Sendmessage)


module.exports=MsgRouter