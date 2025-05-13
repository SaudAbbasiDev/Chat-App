import UserModel from "../models/authmodel.js";
import jwt from "jsonwebtoken";

const Protect = async(req, res, next) => {
  try {
    const token = req.cookies.jwt; // Corrected `res.cookie.jwt` to `req.cookies.jwt`
    if (!token) return res.status(401).send("No Token Found");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).send("Token not Decoded");

    const user = await UserModel.findById(decoded.UserId)
    if (!user) return res.status(401).send("Token user Not Found");

    req.user = user;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default Protect;
