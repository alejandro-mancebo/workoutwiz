import mongoose from "mongoose";
import {
  ExerciseTypesEnum,
  DifficultyLevelsEnum,
  Distance,
  Length,
  Weight,
  Volume
} from '../config/globalValues.js';

const settingsSchema = new mongoose.Schema(
  {
    measurement_unit: {
      distance: {
        type: String,
        enum: Object.values(Distance),
        default: Distance.KILOMETERS,
      },
      length: {
        type: String,
        enum: Object.values(Length),
        default: Length.METERS,
      },
      weight: {
        type: String,
        enum: Object.values(Weight),
        default: Weight.KILOGRAMS,
      },
      volume: {
        type: String,
        enum: Object.values(Volume),
        default: Volume.CUBIC_METERS,
      }
    },
    profiles: {
      default_language: {
        type: String,
        default: 'en'
      },
      default_theme: {
        type: String,
        default: 'light'
      },
      time_zone: {
        type: String,
        default: 'UTC'
      }
    },
    exercise_preferences: {
      preferred_types: [{
        type: String,
        enum: Object.values(ExerciseTypesEnum),
        default: ExerciseTypesEnum.CARDIO,
      }],
      difficulty_levels: [{
        type: String,
        enum: Object.values(DifficultyLevelsEnum),
        default: DifficultyLevelsEnum.BEGINNER,
      }],
      preferred_exercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exercise-libraries',
      }],
      preferred_equipments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'equipments',
      }]
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user_profiles',
      required: [true, 'Please user id is required'],
      unique: true
    },
  },
  { timestamps: true }
);

const Settings = mongoose.model('settings', settingsSchema);

export default Settings;
