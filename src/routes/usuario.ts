import express from 'express';
import UsuarioController from '../controllers/usuario';
const tokenValidator = require ('../middleware/tokenValidator');

const router = express.Router();

// Rutas para la entidad Usuario
router.post('/registrarse', UsuarioController.registrarse); // funciona
router.use(tokenValidator);
router.put('/deleteUsuario', UsuarioController.deleteUsuario); // funciona
router.put('/updateUsuario', UsuarioController.updateUsuario); // funciona
router.get('/getUsuariosMismaEmpresa', UsuarioController.getUsuariosMismaEmpresa); // funciona
router.get('/getAllEmpresas', UsuarioController.getAllUsuario);

export default router;