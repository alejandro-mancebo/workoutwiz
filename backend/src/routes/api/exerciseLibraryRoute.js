import { Router } from 'express';
import ExerciseLibrariesController from '../../controllers/userProfile/exerciseLibraryController.js';

const router = Router();

router.route('/')
  .get(ExerciseLibrariesController.getAllExerciseLibraries)
  .post(ExerciseLibrariesController.createNewExercise)

export default router;