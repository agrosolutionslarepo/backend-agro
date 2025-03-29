import express from 'express';
import EmpresaController from '../controllers/empresa';

const router = express.Router();

// Rutas para la entidad Empresa
router.put('/updateEmpresa/:id', EmpresaController.updateEmpresa); // funciona
router.get('/getAllEmpresas', EmpresaController.getAllEmpresas);  // funciona
router.put('/deleteEmpresa', EmpresaController.deleteEmpresa); // funciona
router.get('/getEmpresaLogueado', EmpresaController.getEmpresaLogueado); 

export default router;
