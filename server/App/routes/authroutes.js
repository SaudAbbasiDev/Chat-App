import express from "express";
import {
  signup,
  logout,
  login,
  check,
  updateProfile,
} from "../controllers/authconroller.js";
import Protect from "../middleware/authmiddleware.js";
const AuthRouter = express.Router();
AuthRouter.get("/check", Protect,check);
AuthRouter.post("/signup", signup);
AuthRouter.post("/login", login);
AuthRouter.post("/logout", Protect,logout);
AuthRouter.put("/update-profile", Protect, updateProfile);

export default AuthRouter;
