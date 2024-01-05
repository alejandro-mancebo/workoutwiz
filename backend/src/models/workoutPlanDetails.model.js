import mongoose from "mongoose";

const workoutPlanDetailsSchema = new mongoose.Schema(
  {
    sets: {
      type: Number,
      required: [true, 'Please set number is required'],
    },
    reps: {
      type: Number,
      required: [true, 'Please rep number is required'],
    },
    weight: {
      type: Number,
      required: [true, 'Please weight is required'],
    },
    duration: {
      type: Number,
      // required: [true, 'Please duration is required'],
    },
    week_duration: {
      type: Number,
      required: [true, 'Please week duration is required'],
    },
    times_week: {
      type: Number,
      required: [true, 'Please times per week is required'],
    },
    weeks_completed: {
      type: Boolean,
      default: false,
    },
    sequence_number: {
      type: Number,
      required: [true, 'Please sequence number is required'],
    },
    calories_burned: {
      type: Number,
    },
    plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'workout_plans',
    },
    exercise_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'exerce_libraries',
    },
  },
  { timestamps: true },
);

const workoutPlanDetails = mongoose.model('workout_plan_details', workoutPlanDetailsSchema);

export default workoutPlanDetails;