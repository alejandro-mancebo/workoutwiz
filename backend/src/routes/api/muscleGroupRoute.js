import { Router } from 'express';
import MuscleGroupsController from '../../controllers/workout/muscleGroupController.js';

const router = Router();

router.route('/')
  .get(MuscleGroupsController.getAllMuscleGroup)
  .post(MuscleGroupsController.createMuscleGroup)

export default router;