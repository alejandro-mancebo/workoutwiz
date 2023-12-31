import { Router } from 'express';
import RefreshTokenController from '../../controllers/authentication/refreshTokenController.js';

const router = Router();

router.post('/', RefreshTokenController.handleRefreshTokenController);

export default router;