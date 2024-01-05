import { Router } from 'express';
import WorkoutPlanController from '../../controllers/workout/workoutPlanController.js';

const router = Router();

router.route('/')
  .get(WorkoutPlanController.getAllWorkoutPlans)
  .post(WorkoutPlanController.createWorkoutPlan)

export default router;