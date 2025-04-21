import { Router } from 'express';
import * as ctrl from '../controllers/precios';

const router = Router();
router.get('/:symbol/latest', ctrl.latest);
router.get('/:symbol/history', ctrl.history);
export default router;
