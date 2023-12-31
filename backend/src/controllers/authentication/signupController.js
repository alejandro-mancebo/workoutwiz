import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import UserAuths from '../../models/userAuths.model.js';


const handleSignupController = async (request, response) => {

  // Validate request data
  const error = validationResult(request);
  if (!error.isEmpty())
    response.status(400).json({ message: 'The information supplied is Incorrect' })

  // Get the user data from the body of the request
  const { username, email, password } = request.body.newUser;

  // Check for duplicate user email in the database
  const duplicatedEmail = await UserAuths.findOne({ email: email }).exec();
  if (duplicatedEmail) return response.sendStatus(409); // Conflict

  // Check for duplicate username in the database
  const duplicatedUsername = await UserAuths.findOne({ username: username }).exec();
  if (duplicatedUsername)
    return response.sendStatus(409); // Conflict

  // Start mongoose session to the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    // Create hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // create new user with encrypted password
    const createNewUser = new UserAuths({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await createNewUser.save();

    // End transaction
    await session.commitTransaction();

    // Set and send status to the client
    response.status(201).json({ user_auth: createNewUser.toObject({ getters: true }) });

  } catch (error) {

    // Abort transaction and send error message
    await session.abortTransaction();

    response.status(500).json({ message: error.message });

  } finally {

    // End the mongoose session
    session.endSession();
  }
}

export default { handleSignupController };