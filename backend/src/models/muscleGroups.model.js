import mongoose from "mongoose";

const muscleGroupsSchema = new mongoose.Schema(
  {
    group_name: {
      type: String,
      required: [true, 'Please muscle group name is required'],
      unique: true,
      trim: true
    },
    description: {
      type: String,
    },
  },
);

const MuscleGroups = mongoose.model('muscle_groups', muscleGroupsSchema);

export default MuscleGroups;