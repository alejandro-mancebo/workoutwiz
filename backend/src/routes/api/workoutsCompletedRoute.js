import { Router } from 'express';
import WorkoutsCompletedController from '../../controllers/workout/workoutsCompletedController.js';

const router = Router();

router.route('/')
  .get(WorkoutsCompletedController.getWorkoutsCompleted)
  .post(WorkoutsCompletedController.addWorkoutsCompleted)

export default router;