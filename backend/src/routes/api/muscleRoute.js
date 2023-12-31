import { Router } from 'express';
import MuscleController from '../../controllers/userProfile/muscleController.js';

const router = Router();

router.route('/')
  .get(MuscleController.getAllMuscle)
  .post(MuscleController.createMuscle)

export default router;