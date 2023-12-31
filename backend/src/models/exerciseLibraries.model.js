import mongoose from "mongoose";

const exerciseLibrariesSchema = new mongoose.Schema(
  {
    exercise_name: {
      type: String,
      required: [true, 'Please exercise name is required'],
      unique: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['cardio', 'strength', 'training', 'flexibility']
    },
    description: {
      type: String,
    },
    equipment_needed: {
      type: Boolean,
    },
    image_url: {
      type: String,
    },
    video_url: {
      type: String,
    },
    difficulty_level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced']
    },
    muscle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'muscles',
    },
    equipment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'equipments',
    },
  },
);

const ExerciseLibraries = mongoose.model('exercise_libraries', exerciseLibrariesSchema);

export default ExerciseLibraries;