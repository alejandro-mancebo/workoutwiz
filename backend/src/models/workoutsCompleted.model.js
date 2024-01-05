import mongoose from "mongoose";

const workoutsCompletedSchema = new mongoose.Schema(
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
    },
    week_number: {
      type: Number,
      required: [true, 'Please week duration is required'],
    },
    day_week: {
      type: Number,
      required: [true, 'Please times per week is required'],
    },
    calories_burned: {
      type: Number,
    },
    workout_detail_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'workout_plan_details',
    },
  },
  { timestamps: { createdAt: 'completed_date', updatedAt: false } }
);

const workoutsCompleted = mongoose.model('completed_workouts', workoutsCompletedSchema);

export default workoutsCompleted;