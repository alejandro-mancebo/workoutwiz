import { Router } from 'express';
import LoginController from '../../controllers/authentication/loginController.js';

const router = Router();

router.post('/', LoginController.handleLoginController);

export default router;