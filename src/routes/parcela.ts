import express from 'express';
import ParcelaController from '../controllers/parcela';

const router = express.Router();

// Rutas para la entidad Parcela
router.get('/getAllParcelas', ParcelaController.getAllParcelas);
router.get('/getParcelaById/:id', ParcelaController.getParcelaById);
router.post('/createParcela/:idEmpresa', ParcelaController.createParcela);
router.put('/updateParcela/:id', ParcelaController.updateParcela);
router.delete('/deleteParcela/:id', ParcelaController.deleteParcela);

export default router;
