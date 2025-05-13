import mongoose from "mongoose";
const RegisterSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      Unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: { type: String },
  },
  { timestamps: true }
);

let UserModel = mongoose.model("User", RegisterSchema);

export default UserModel;
