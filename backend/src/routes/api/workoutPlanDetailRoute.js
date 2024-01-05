import { Router } from 'express';
import WorkoutPlanDetailController from '../../controllers/workout/workoutPlanDetailController.js';

const router = Router();

router.route('/')
  .get(WorkoutPlanDetailController.getAllWorkoutPlanDetails)
  .post(WorkoutPlanDetailController.createWorkoutPlanDetail)

export default router;