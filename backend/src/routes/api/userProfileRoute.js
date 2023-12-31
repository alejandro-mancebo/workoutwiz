import { Router } from 'express';
import UserProfilesController from '../../controllers/workout/userProfileController.js';

const router = Router();

router.route('/')
  .get(UserProfilesController.getAllUserProfile)
  .post(UserProfilesController.createUserProfile)

export default router;