import express from 'express';
import EmpresaController from '../controllers/empresa';

const router = express.Router();

// Rutas para la entidad Empresa
router.get('/getAllEmpresas', EmpresaController.getAllEmpresas); 
router.get('/getEmpresaById/:id', EmpresaController.getEmpresaById);
router.post('/createEmpresa', EmpresaController.createEmpresa);
router.put('/updateEmpresa/:id', EmpresaController.updateEmpresa);
router.delete('/deleteEmpresa/:id', EmpresaController.deleteEmpresa);
router.get('/getEmpresaLogueado', EmpresaController.getEmpresaLogueado); 

export default router;
