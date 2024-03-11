import express from 'express';
import SemillaController from '../controllers/semilla';

const router = express.Router();

// Rutas para la entidad Semilla
router.get('/getAllSemillas', SemillaController.getAllSemillas);
router.get('/getSemillaById/:id', SemillaController.getSemillaById);
router.post('/createSemilla', SemillaController.createSemilla);
router.put('/updateSemilla/:id', SemillaController.updateSemilla);
router.delete('/deleteSemilla/:id', SemillaController.deleteSemilla);

export default router;
