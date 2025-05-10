import express from 'express';
import SemillaController from '../controllers/semilla';
const tokenValidator = require('../middleware/tokenValidator');

const router = express.Router();

router.use(tokenValidator);

router.get('/getAllSemillas', SemillaController.getAllSemillas);
router.get('/getSemillaById/:id', SemillaController.getSemillaById);
router.put('/updateSemilla/:id', SemillaController.updateSemilla);
router.post('/agregarSemilla/agregar', SemillaController.agregarSemilla);

export default router;