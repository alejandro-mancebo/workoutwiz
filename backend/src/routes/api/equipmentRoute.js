import { Router } from 'express';
import EquipmentsController from '../../controllers/userProfile/equipmentController.js';

const router = Router();

router.route('/')
  .get(EquipmentsController.getAllEquipments)
  .post(EquipmentsController.createEquipment)

export default router;