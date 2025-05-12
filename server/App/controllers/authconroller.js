const UserModel = require("../models/authmodel.js");
const bcrypt = require("bcrypt");
const cloudinary = require("./cloudnary.js");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { fullname, username, password, profilePic } = req.body;

  try {
    // 1. Validate input
    if (!fullname || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create new user
    const newUser = new UserModel({
      fullname,
      username,
      password: hashedPassword,
      profilePic,
    });

    await newUser.save();

    // 5. Generate JWT and set cookie
    const token = jwt.sign({ UserId: newUser._id }, process.env.JWT_SECRET);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // 6. Respond to client
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      fullname: newUser.fullname,
      profilePic: newUser.profilePic,
      token,
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ UserId: user._id }, process.env.JWT_SECRET);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      profilePic: user.profilePic,
      token,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const check = (req, res) => {
  try {
    res.status(200).json({ info: req.user });
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signup, login, logout, updateProfile, check };
