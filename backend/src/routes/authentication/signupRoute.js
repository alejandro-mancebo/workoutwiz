import { Router } from 'express';
import SignupController from '../../controllers/authentication/signupController.js';

const router = Router();

router.post('/', SignupController.handleSignupController);

export default router;