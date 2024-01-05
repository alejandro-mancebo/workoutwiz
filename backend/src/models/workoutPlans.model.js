import mongoose from "mongoose";

const workoutPlansSchema = new mongoose.Schema(
  {
    plan_name: {
      type: String,
      required: [true, 'Please plan name is required'],
      trim: true
    },
    week_duration: {
      type: Number,
      required: [true, 'Please duration is required'],
    },
    start_day: {
      type: Date,
      required: [true, 'Please start date is required'],
    },
    end_day: {
      type: Date,
    },
    description: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user_profiles',
    },
  },
  { timestamps: true },
);

const WorkoutPlans = mongoose.model('workout_plans', workoutPlansSchema);

export default WorkoutPlans;