import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please username is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please password is required',]
    },
    refreshToken: [String],
  },
  { timestamps: true },
);

const UserAuth = mongoose.model('user_auths', userSchema);

export default UserAuth;