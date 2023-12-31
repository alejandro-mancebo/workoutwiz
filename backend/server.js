import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import credentials from './src/middleware/credentials.js';
import cors from "cors";
import corsOptions from './src/config/corsOptions.js';
import cookieParser from 'cookie-parser';
import { connectMongoDB } from './src/config/mongodb.js';

// Authentication
import SignupRoute from './src/routes/authentication/signupRoute.js';
import LoginRoute from './src/routes/authentication/loginRoute.js';

// Api
import UserProfileRoute from './src/routes/api/userProfileRoute.js';
import MuscleGroupRoute from './src/routes/api/muscleGroupRoute.js';
import MuscleRoute from './src/routes/api/muscleRoute.js';
import EquipmentRoute from './src/routes/api/equipmentRoute.js';
import ExerciseLibraryRoute from './src/routes/api/exerciseLibraryRoute.js';

const PORT = process.env.SERVER_PORT || 5000;

const app = express();
app.use(bodyParser.json());

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cors Origin Resourse Sharing
app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// Authentication routes
app.use('/signup', SignupRoute);
app.use('/login', LoginRoute);


// Api
app.use('/api/profile', UserProfileRoute);
app.use('/api/muscle-group', MuscleGroupRoute);
app.use('/api/muscle', MuscleRoute);
app.use('/api/equipment', EquipmentRoute);
app.use('/api/exercise-library', ExerciseLibraryRoute);

// app.use('/api/getcreate-user-profile', UserProfileRoute);

// catch error from the previous middlewares
app.use((error, request, response, next) => {

  // skip if error has sent in response already
  if (response.headersSent) { return next(error); }

  // response catched error
  response
    .status(error.code || 500)
    .json({ message: error.message || 'An unknow error occurred!' });
});

// Connect to MongoDB
try {
  await connectMongoDB();
// list server on port
  app.listen(PORT, () => {
    console.log('Server is listening on port: ', PORT);
  });

} catch (error) {
  console.error('MongoDB error connection:', error.message);
}

