import express from 'express';
import CosechaController from '../controllers/cosecha';

const router = express.Router();

// Rutas para la entidad Cosecha
router.get('/getAllCosechas', CosechaController.getAllCosechas);
router.get('/getCosechaById/:id', CosechaController.getCosechaById);
router.post('/createCosecha', CosechaController.createCosecha);
router.put('/updateCosecha/:id', CosechaController.updateCosecha);
router.delete('/deleteCosecha/:id', CosechaController.deleteCosecha);

export default router;
