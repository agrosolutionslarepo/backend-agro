import express from 'express';
import EmpresaController from '../controllers/empresa';

const router = express.Router();

// ✅ Llamamos a los métodos como estáticos
router.put('/updateEmpresa', EmpresaController.updateEmpresa);
router.put('/deleteEmpresa', EmpresaController.deleteEmpresa);
router.get('/getNombreEmpresa', EmpresaController.getNombreEmpresa);



export default router;