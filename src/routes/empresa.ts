import express from 'express';
import EmpresaController from '../controllers/empresa';
const tokenValidator = require ('../middleware/tokenValidator');


const router = express.Router();

router.use(tokenValidator);

// Rutas para la entidad Empresa
router.put('/updateEmpresa/:id', EmpresaController.updateEmpresa); // funciona
router.get('/getAllEmpresas', EmpresaController.getAllEmpresas);  // funciona
router.get('/getEmpresaById/:id', EmpresaController.getEmpresaById);
//router.post('/createEmpresa', EmpresaController.createEmpresa);
router.put('/updateEmpresa/:id', EmpresaController.updateEmpresa);
router.delete('/deleteEmpresa/:id', EmpresaController.deleteEmpresa);
router.get('/getEmpresaLogueado', EmpresaController.getEmpresaLogueado); 

export default router;
