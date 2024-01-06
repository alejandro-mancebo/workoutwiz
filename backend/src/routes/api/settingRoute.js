import { Router } from 'express';
import SettingsController from '../../controllers/workout/settingController.js';

const router = Router();

router.route('/')
  .get(SettingsController.getAllSettings)
  .post(SettingsController.createSetting)
  .put(SettingsController.updateSetting)

export default router;