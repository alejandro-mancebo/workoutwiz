import mongoose from "mongoose";

const musclesSchema = new mongoose.Schema(
  {
    muscle_name: {
      type: String,
      required: [true, 'Please muscle name is required'],
      unique: true,
      trim: true
    },
    description: {
      type: String,
    },
    image_url: {
      type: String,
    },
    muscle_group_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'muscle_groups',
      unique: true,
    },
  },
);

const Muscles = mongoose.model('muscles', musclesSchema);

export default Muscles;