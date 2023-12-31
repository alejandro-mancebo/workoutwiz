import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'Please first name is required'],
      trim: true
    },
    last_name: {
      type: String,
      required: [true, 'Please last name is required'],
      trim: true
    },
    day_of_birth: {
      type: Date,
    },
    gender: {
      type: Number,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    user_login_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user_auths',
      unique: true,
    }
  },
  { timestamps: true },
);

const UserProfiles = mongoose.model('user_profiles', userProfileSchema);

export default UserProfiles;