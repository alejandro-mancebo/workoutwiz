import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import ExerciseLibraries from '../../models/exerciseLibraries.model.js';


const getAllExerciseLibraries = async (request, response) => {

  const exerciseLibraries = await ExerciseLibraries.aggregate([
    {
      $lookup: {
        from: "muscles",
        localField: "muscle_id",
        foreignField: "_id",
        as: "muscleExercises"
      }
    },
    {
      $unwind: "$muscleExercises" // If you expect multiple matches and want to unwind
    },
    {
      $lookup: {
        from: "equipments",
        localField: "equipment_id", // Use the joined field from collectionB
        foreignField: "_id",
        as: "equipmentExercises"
      }
    },
    {
      $unwind: "$equipmentExercises" // If you expect multiple matches and want to unwind
    },
    // Add more stages or do further operations with the aggregated data

  ]);

  response.json(exerciseLibraries);
};


const createNewExercise = async (request, response) => {

  // Validate request data
  const error = validationResult(request);
  if (!error.isEmpty())
    response.status(400).json({ message: 'The information supplied is incorrect' });

  // Start mongoose session to the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    // Get the user profile data from the body of the request
    const {
      exercise_name,
      category,
      description,
      equipment_needed,
      image_url,
      video_url,
      difficulty_level,
      muscle_id,
      equipment_id
    } = request.body.exercise;


    // exercise_name
    // category
    // description
    // equipment_needed
    // image_url
    // video_url
    // difficulty_level
    // muscle_id
    // equipment_id

    // Find if there is a muscle and equipment use for the exercise
    const findconflict = await ExerciseLibraries.findOne({ muscle_id, equipment_id }).exec();
    if (findconflict) return response.sendStatus(409); // Conflict

    // Find if there is a exercise with the same name
    const foundExercise = await ExerciseLibraries.findOne({ exercise_name }).exec();
    if (foundExercise) return response.sendStatus(409); // Conflict

    const exerciseLibrary = new ExerciseLibraries({
      exercise_name: exercise_name,
      category: category,
      description: description,
      equipment_needed: equipment_needed,
      image_url: image_url,
      video_url: video_url,
      difficulty_level: difficulty_level,
      muscle_id: muscle_id,
      equipment_id: equipment_id,
    });

    // Save the user profile to the database
    await exerciseLibrary.save();

    // End transaction
    await session.commitTransaction();

    // Set and send status to the client
    response.status(201).json({ exerciseLibraries: exerciseLibrary.toObject({ getters: true }) });

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
  getAllExerciseLibraries,
  createNewExercise
};