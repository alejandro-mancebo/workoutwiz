import mongoose from "mongoose";

const userAuthsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please username is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Please password is required',]
    },
    refresh_token: [String],
  },
  { timestamps: true },
);

const UserAuths = mongoose.model('user_auths', userAuthsSchema);

export default UserAuths;