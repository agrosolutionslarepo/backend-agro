import express from 'express';
import EmpresaController from '../controllers/empresa';

const router = express.Router();

// Rutas para la entidad Empresa
router.get('/getAllEmpresas', EmpresaController.getAllEmpresas); 
router.get('/:id', EmpresaController.getEmpresaById);
router.post('/', EmpresaController.createEmpresa);
router.put('/:id', EmpresaController.updateEmpresa);
router.delete('/:id', EmpresaController.deleteEmpresa);

export default router;