import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import UserProfiles from '../../models/userProfiles.model.js';
import Settings from '../../models/settings.model.js';


const getAllSettings = async (request, response) => {

  const foundSettings = await Settings.find({}).exec();

  response.json(foundSettings);

};

const createSetting = async (request, response) => {

  // Validate request data
  const error = validationResult(request);
  if (!error.isEmpty())
    response.status(400).json({ message: 'The information supplied is incorrect' });

  // Start mongoose session to the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    // Get the workouts Completed data from the body of the request
    const {
      measurement_unit,
      exercise_preferences,
      user_id,
    } = request.body.settings;

    const {
      distance,
      length,
      weight,
      volume
    } = measurement_unit;

    const {
      preferred_types,
      difficulty_levels,
      preferred_exercises,
      preferred_equipments
    } = exercise_preferences

    const foundUser = await UserProfiles.findOne({ _id: user_id }).exec();
    if (!foundUser) return response.sendStatus(404); // Not Found

    const foundSetting = await Settings.findOne({ user_id }).exec();
    if (foundSetting) return response.sendStatus(409); // conflict

    const settings = new Settings({
      measurement_unit: {
        distance: distance,
        length: length,
        weight: weight,
        volume: volume
      },
      profiles: {
        default_language: 'en',
        default_theme: 'light',
        time_zone: 'UTC'
      },
      exercise_preferences: {
        preferred_types: preferred_types,
        difficulty_levels: difficulty_levels,
        preferred_exercises: preferred_exercises,
        preferred_equipments: preferred_equipments
      },
      user_id: user_id
    });

    await settings.save();

    // End transaction
    await session.commitTransaction();

    // Set and send status to the client
    response.status(201).json({
      settings: settings.toObject({ getters: true }),
    });

  } catch (error) {

    //Abort transaction and send error message
    await session.abortTransaction();

    response.status(500).json({ error: error.message })
  } finally {

    // End the mongoose session
    session.endSession();

  }
};

const updateSetting = async (request, response) => {

  // Validate request data
  const error = validationResult(request);
  if (!error.isEmpty())
    response.status(400).json({ message: 'The information supplied is incorrect' });

  // Start mongoose session to the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    // Get the workouts Completed data from the body of the request
    const {
      measurement_unit,
      exercise_preferences,
      user_id,
    } = request.body.settings;

    const {
      distance,
      length,
      weight,
      volume
    } = measurement_unit;

    const {
      preferred_types,
      difficulty_levels,
      preferred_exercises,
      preferred_equipments
    } = exercise_preferences

    const foundUser = await UserProfiles.findOne({ _id: user_id }).exec();
    if (!foundUser) return response.sendStatus(404); // Not Found

    const foundSetting = await Settings.findOne({ user_id }).exec();
    if (!foundSetting) return response.sendStatus(404); // Not Found

    foundSetting.measurement_unit = {
      distance: distance,
      length: length,
      weight: weight,
      volume: volume
    };


    foundSetting.profiles = {
      default_language: 'en',
      default_theme: 'light',
      time_zone: 'UTC'
    };

    // Check for duplicates preferred types
    preferred_types.forEach(newType => {
      if (!foundSetting.exercise_preferences.preferred_types.includes(newType)) {
        console.log(newType)
        foundSetting.exercise_preferences.preferred_types.push(newType);
      }
    });

    // Check for duplicates difficulty levels
    difficulty_levels.forEach(newType => {
      if (!foundSetting.exercise_preferences.difficulty_levels.includes(newType)) {
        foundSetting.exercise_preferences.difficulty_levels.push(newType);
      }
    });

    // Check for duplicates preferred exercises
    preferred_exercises.forEach(newType => {
      if (!foundSetting.exercise_preferences.preferred_exercises.includes(newType)) {
        foundSetting.exercise_preferences.preferred_exercises.push(newType);
      }
    });

    // Check for duplicates preferred equipments
    preferred_equipments.forEach(newType => {
      if (!foundSetting.exercise_preferences.preferred_equipments.includes(newType)) {
        foundSetting.exercise_preferences.preferred_equipments.push(newType);
      }
    });

    foundSetting.exercise_preferences = {
      preferred_types: foundSetting.exercise_preferences.preferred_types,
      difficulty_levels: foundSetting.exercise_preferences.difficulty_levels,
      preferred_exercises: foundSetting.exercise_preferences.preferred_exercises,
      preferred_equipments: foundSetting.exercise_preferences.preferred_equipments,
    };

    foundSetting.user_id = user_id;

    await foundSetting.save();

    // End transaction
    await session.commitTransaction();

    // Set and send status to the client
    response.status(201).json({
      settings: foundSetting.toObject({ getters: true }),
    });

  } catch (error) {

    //Abort transaction and send error message
    await session.abortTransaction();

    response.status(500).json({ error: error.message })
  } finally {

    // End the mongoose session
    session.endSession();

  }
};

export default {
  getAllSettings,
  createSetting,
  updateSetting
};