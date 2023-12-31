import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import MuscleGroups from '../../models/muscleGroups.model.js';
import Muscles from '../../models/muscles.model.js';


const getAllMuscle = async (request, response) => {

  const muscleGroup = await Muscles.aggregate([{
    $lookup: {
      from: "muscle_groups",
      localField: "muscle_group_id",
      foreignField: "_id",
      as: "all_muscles",
    }
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [{
          $arrayElemAt: ["$all_muscles", 0]
        }, "$$ROOT"]
      }
    }
  },
  {
    $project: {
      all_muscles: 0,
      muscle_group_id: 0,
    }
  }]);

  response.json(muscleGroup);
};


const createMuscle = async (request, response) => {

  // Validate request data
  const error = validationResult(request);
  if (!error.isEmpty())
    response.status(400).json({ message: 'The information supplied is incorrect' });

  // Start mongoose session to the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    // Get the user profile data from the body of the request
    const { group_name, description } = request.body.muscleGroup;

    const foundMuscleGroup = await MuscleGroups.findOne({ group_name }).exec();
    if (foundMuscleGroup) return response.sendStatus(409); // Conflict

    const muscleGroup = new MuscleGroups({
      group_name: group_name,
      description: description,
    });

    // Save the user profile to the database
    await muscleGroup.save();

    // End transaction
    await session.commitTransaction();

    // Set and send status to the client
    response.status(201).json({ muscle_groups: muscleGroup.toObject({ getters: true }) });

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
  getAllMuscle,
  createMuscle
};