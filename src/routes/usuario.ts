import express from 'express';
import UsuarioController from '../controllers/usuario';
const tokenValidator = require ('../middleware/tokenValidator');

const router = express.Router();

// Rutas para la entidad Usuario
router.post('/registrarse', UsuarioController.registrarse); // funciona
router.use(tokenValidator);
router.put('/deleteUsuario/:id', UsuarioController.deleteUsuario); // funciona
router.put('/updateUsuario/:id', UsuarioController.updateUsuario); // funciona
router.get('/getUsuariosMismaEmpresa', UsuarioController.getUsuariosMismaEmpresa); // funciona
router.get('/getAllEmpresas', UsuarioController.getAllUsuario); 
router.get('/:id', UsuarioController.getUsuarioById);

export default router;