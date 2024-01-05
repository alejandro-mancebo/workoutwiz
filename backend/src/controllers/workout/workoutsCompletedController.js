import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import WorkoutPlanDetails from '../../models/workoutPlanDetails.model.js';
import WorkoutsCompleted from '../../models/workoutsCompleted.model.js';
import { exerciseDuration, caloriesBurned } from '../../services/dateCalculation.js';


const getWorkoutsCompleted = async (request, response) => {

  // const workoutPlanDetails = await WorkoutPlanDetails.aggregate([
  //   {
  //     $lookup: {
  //       from: "workout_plans",
  //       localField: "plan_id",
  //       foreignField: "_id",
  //       as: "workoutPlanWorkoutPlanDetails"
  //     }
  //   },
  //   {
  //     $unwind: "$workoutPlanWorkoutPlanDetails" // If you expect multiple matches and want to unwind
  //   },
  //   {
  //     $lookup: {
  //       from: "exercise_libraries",
  //       localField: "exercise_id", // Use the joined field from collectionB
  //       foreignField: "_id",
  //       as: "exercisesLibrariesWorkoutDetails"
  //     }
  //   },
  //   {
  //     $unwind: "$exercisesLibrariesWorkoutDetails" // If you expect multiple matches and want to unwind
  //   },
  //   // Add more stages or do further operations with the aggregated data
  //   {
  //     $lookup: {
  //       from: "muscles",
  //       localField: "exercisesLibrariesWorkoutDetails.muscle_id",
  //       foreignField: "_id",
  //       as: "muscleDetails"
  //     }
  //   },
  //   {
  //     $lookup: {
  //       from: "equipments",
  //       localField: "exercisesLibrariesWorkoutDetails.equipment_id",
  //       foreignField: "_id",
  //       as: "equipmentDetails"
  //     }
  //   },
  //   {
  //     $group: {
  //       _id: "$workoutPlanWorkoutPlanDetails",
  //       totalExercises: { $sum: 1 },
  //       exercises: {
  //         $addToSet: {
  //           $mergeObjects: [
  //             "$exercisesLibrariesWorkoutDetails",
  //             {
  //               musclesDetails: "$muscleDetails",
  //               equipmentDetails: "$equipmentDetails"
  //             }
  //           ]
  //         }
  //       },
  //     }
  //   }
  // ]);

  const foundWorkoutCompleted = await WorkoutsCompleted.find({}).sort({ week_number: 1, day_week: 1 }).exec();


  response.json(foundWorkoutCompleted);

};


const addWorkoutsCompleted = async (request, response) => {

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
      sets,
      reps,
      weight,
      add_new_week,
      plan_weeks_completed,
      workout_detail_id,
    } = request.body.workoutsCompleted;

    const foundPlanDetail = await WorkoutPlanDetails.findOne({ _id: workout_detail_id }).exec();
    if (foundPlanDetail.weeks_completed) return response.sendStatus(409); // Conflict

    const foundWorkoutCompleted = await WorkoutsCompleted.findOne({ workout_detail_id }).exec();
    let lastWeek;
    let lastDayWeek;
    let addNewWeek = add_new_week;
    if (foundWorkoutCompleted) {

      const workout = await WorkoutsCompleted.findOne({ workout_detail_id }).sort({ week_number: -1, day_week: -1 }).exec();

      if (workout.day_week > 4) addNewWeek = true;

      if (addNewWeek) {
        lastWeek = workout.week_number + 1;
        lastDayWeek = 1;
      } else {
        lastWeek = workout.week_number
        lastDayWeek = workout.day_week + 1;
      }

    } else {
      lastWeek = 1;
      lastDayWeek = 1;
    }

    // let weekDuration = week_duration;
    // if (foundPlan.duration < week_duration)
    //   weekDuration = foundPlan.duration;


    const exercise_duration = exerciseDuration(reps, sets).toFixed(3); // duration (in hours)
    const calories_burned = caloriesBurned(exercise_duration, weight).toFixed(1);  // weight (in kg)

    const workoutsCompleted = new WorkoutsCompleted({
      sets: sets,
      reps: reps,
      weight: weight,
      duration: exercise_duration,
      week_number: lastWeek,
      day_week: lastDayWeek,
      calories_burned: calories_burned,
      workout_detail_id: workout_detail_id,
    });

    // Check if the last week for workouts completed is greeter than 4.
    // update Workout Plan Details and return
    if (foundPlanDetail && lastWeek > 4) {
      await WorkoutPlanDetails.findOneAndUpdate(
        { _id: workout_detail_id },
        { $set: { weeks_completed: true } },
      ).exec();
      return response.sendStatus(409); // Conflict
    }

    // Check if the plan week for the exercise was completed and update Workout Plan Details
    if (foundPlanDetail && plan_weeks_completed) {
      await WorkoutPlanDetails.findOneAndUpdate(
        { _id: workout_detail_id },
        { $set: { weeks_completed: true } },
      ).exec();
    }

    // Save the workouts Completed to the database
    await workoutsCompleted.save();

    // End transaction
    await session.commitTransaction();

    // Set and send status to the client
    response.status(201).json({
      completed_workouts: workoutsCompleted.toObject({ getters: true }),
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
  getWorkoutsCompleted,
  addWorkoutsCompleted
};