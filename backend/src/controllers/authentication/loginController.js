import jwt from 'jsonwebtoken';
import bycrypt from 'bcrypt';
import { validationResult } from "express-validator";
import UserAuths from "../../models/userAuths.model.js";


const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const MAX_AGE = 24 * 60 * 60 * 1000;


const handleLoginController = async (request, response) => {

  const cookies = request.cookies;

  // Validate request data
  const error = validationResult(request);
  if (!error.isEmpty())
    response.status(400).json({ message: 'Email and password are required!' });

  // Destructing user valiables
  const { email, password } = request.body.user;

  // Find and check if there are any user. If there aren't return
  const foundUser = await UserAuths.findOne({ email: email }).exec();
  if (!foundUser) return response.sendStatus(401); // Unauthorized

  try {
    // Evaluate password
    if (await bycrypt.compare(password, foundUser.password)) {

      // Convert _id to JSON 
      const id = foundUser._id.toJSON();

      // Generate access token
      const accessToken = jwt.sign({ '_id': id },
        ACCESS_TOKEN_SECRET, { expiresIn: '1w' });

      //Generate refresh token
      const refreshToken = jwt.sign({ '_id': id },
        REFRESH_TOKEN_SECRET, { expiresIn: '1w' });

      // Changed to let keyword
      let refreshTokenArray = !cookies?.refresgToken
        ? foundUser.refresh_token
        : foundUser.refresh_token.filter(rt => rt !== cookies.refreshToken);

      if (cookies?.refresh) {

        const refreshToken = cookies.refreshToken;
        const foundToken = await UserAuths.findOne({ refresh_token: refreshToken }).exec();

        // Detected refresh token reuse!
        if (!foundToken) {
          // clear out ALL previous refresh tokens
          refreshTokenArray = [];
        }
      }

      // Save refreshToken to the user in the database
      foundUser.refresh_token = [...refreshTokenArray, refreshToken];
      await foundUser.save();

      // Create Secure Cookie with access token
      response.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: MAX_AGE }); // 1 day

      // Create Secure Cookie with refresh token
      response.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * MAX_AGE }); // 1 week

      // Send found user and accessToken
      const user = {
        _id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
      }
      response.status(201).json({ user: user, accessToken: accessToken });

    } else {
      response.status(401).send({ message: 'Not Allowed' });
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ error: error.message })
  }
}

export default { handleLoginController }