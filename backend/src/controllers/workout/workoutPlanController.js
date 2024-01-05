import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import WorkoutPlans from '../../models/workoutPlans.model.js';
import { addingDays } from '../../services/dateCalculation.js';


const getAllWorkoutPlans = async (request, response) => {
  const workoutPlans = await WorkoutPlans.find().exec();
  response.json(workoutPlans);
};

const createWorkoutPlan = async (request, response) => {

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
      plan_name,
      week_duration,
      start_day,
      end_day,
      description,
      user_id
    } = request.body.workoutPlan;

    const foundPlan = await WorkoutPlans.findOne({ plan_name, user_id }).exec();
    if (foundPlan) return response.sendStatus(409); // Conflict

    const workoutPlan = new WorkoutPlans({
      plan_name: plan_name,
      week_duration: week_duration,
      start_day: start_day,
      end_day: addingDays(start_day, duration),
      description: description,
      user_id: user_id
    });

    // Save the user profile to the database
    await workoutPlan.save();

    // End transaction
    await session.commitTransaction();

    // Set and send status to the client
    response.status(201).json({ workout_plans: workoutPlan.toObject({ getters: true }) });

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
  getAllWorkoutPlans,
  createWorkoutPlan
};