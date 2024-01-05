import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import UserAuths from '../../models/userAuths.model.js';
import UserProfiles from '../../models/userProfiles.model.js';



const getAllUserProfile = async (request, response) => {

  const userProfile = await UserAuths.aggregate([{
    $lookup: {
      from: "user_profiles",
      localField: "_id",
      foreignField: "user_login_id",
      as: "profile",
    }
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [{
          $arrayElemAt: ["$profile", 0]
        }, "$$ROOT"]
      }
    }
  },
  {
    $project: {
      profile: 0,
      user_login_id: 0,
      createdAt: 0,
      updatedAt: 0,
      password: 0,
      refresh_token: 0
    }
  }]);

  response.json(userProfile);
};

const createUserProfile = async (request, response) => {

  // Validate request data
  const error = validationResult(request);
  if (!error.isEmpty())
    response.status(400).json({ message: 'The information supplied is incorrect' });

  // Start mongoose session to the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    // Get the user profile data from the body of the request
    const { first_name, last_name, day_of_birth, gender, height, weight, user_id } = request.body.userProfile;

    const foundUser = await UserProfiles.findOne({ user_login_id: user_id }).exec();
    if (foundUser) return response.sendStatus(409); // Conflict

    const userProfile = new UserProfiles({
      first_name: first_name,
      last_name: last_name,
      day_of_birth: day_of_birth,
      gender: gender,
      height: height,
      weight: weight,
      user_login_id: user_id
    });

    // Save the user profile to the database
    await userProfile.save();

    // End transaction
    await session.commitTransaction();

    // Set and send status to the client
    response.status(201).json({ user_profiles: userProfile.toObject({ getters: true }) });

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
  getAllUserProfile,
  createUserProfile
};