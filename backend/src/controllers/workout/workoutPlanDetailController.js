import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import WorkoutPlanDetails from '../../models/workoutPlanDetails.model.js';
import WorkoutPlans from '../../models/workoutPlans.model.js';
import { exerciseDuration, caloriesBurned } from '../../services/dateCalculation.js';


const getAllWorkoutPlanDetails = async (request, response) => {

  const workoutPlanDetails = await WorkoutPlanDetails.aggregate([
    {
      $lookup: {
        from: "workout_plans",
        localField: "plan_id",
        foreignField: "_id",
        as: "workoutPlanWorkoutPlanDetails"
      }
    },
    {
      $unwind: "$workoutPlanWorkoutPlanDetails" // If you expect multiple matches and want to unwind
    },
    {
      $lookup: {
        from: "exercise_libraries",
        localField: "exercise_id", // Use the joined field from collectionB
        foreignField: "_id",
        as: "exercisesLibrariesWorkoutDetails"
      }
    },
    {
      $unwind: "$exercisesLibrariesWorkoutDetails" // If you expect multiple matches and want to unwind
    },
    // Add more stages or do further operations with the aggregated data
    {
      $lookup: {
        from: "muscles",
        localField: "exercisesLibrariesWorkoutDetails.muscle_id",
        foreignField: "_id",
        as: "muscleDetails"
      }
    },
    {
      $lookup: {
        from: "equipments",
        localField: "exercisesLibrariesWorkoutDetails.equipment_id",
        foreignField: "_id",
        as: "equipmentDetails"
      }
    },
    {
      $group: {
        _id: "$workoutPlanWorkoutPlanDetails",
        totalExercises: { $sum: 1 },
        exercises: {
          $addToSet: {
            $mergeObjects: [
              "$exercisesLibrariesWorkoutDetails",
              {
                musclesDetails: "$muscleDetails",
                equipmentDetails: "$equipmentDetails"
              }
            ]
          }
        },
      }
    }
  ]);

  response.json(workoutPlanDetails);

};


const createWorkoutPlanDetail = async (request, response) => {

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
      sets,
      reps,
      weight,
      // duration,
      week_duration,
      times_week,
      sequence_number,
      plan_id,
      exercise_id,
    } = request.body.workoutPlanDetail;

    const foundPlanDetail = await WorkoutPlanDetails.findOne({ plan_id, exercise_id }).exec();
    if (foundPlanDetail) return response.sendStatus(409); // Conflict

    const foundPlan = await WorkoutPlans.findOne({ _id: plan_id }).exec();

    let weekDuration = week_duration;
    if (foundPlan.duration < week_duration)
      weekDuration = foundPlan.duration;

    const exercise_duration = exerciseDuration(reps, sets).toFixed(3); // duration (in hours)
    const calories_burned = caloriesBurned(exercise_duration, weight).toFixed(1);  // weight (in kg)

    const workoutPlanDetail = new WorkoutPlanDetails({
      sets: sets,
      reps: reps,
      weight: weight,
      duration: exercise_duration,
      week_duration: weekDuration,
      times_week: times_week,
      sequence_number: sequence_number,
      calories_burned: calories_burned,
      plan_id: plan_id,
      exercise_id: exercise_id
    });

    // Save the user profile to the database
    await workoutPlanDetail.save();

    // End transaction
    await session.commitTransaction();

    // Set and send status to the client
    response.status(201).json({ workout_plan_details: workoutPlanDetail.toObject({ getters: true }) });

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
  getAllWorkoutPlanDetails,
  createWorkoutPlanDetail
};