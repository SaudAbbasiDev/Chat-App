const express = require("express");
const {
  signup,
  logout,
  login,
  check,
  updateProfile,
} = require("../controllers/authconroller");
const Protect = require("../middleware/authmiddleware");
const AuthRouter = express.Router();
AuthRouter.get("/check", Protect,check);
AuthRouter.post("/signup", signup);
AuthRouter.post("/login", login);
AuthRouter.post("/logout", Protect,logout);
AuthRouter.put("/update-profile", Protect, updateProfile);

module.exports = AuthRouter;
