import express from 'express';
import UsuarioController from '../controllers/usuario';
const tokenValidator = require ('../middleware/tokenValidator');

const router = express.Router();

// Rutas para la entidad Usuario
router.post('/registrarse', UsuarioController.registrarse); // funciona
router.use(tokenValidator);
router.put('/updateContraseña', UsuarioController.updateContraseña);
router.put('/deleteUsuario', UsuarioController.deleteUsuario);
router.put('/updateUsuario', UsuarioController.updateUsuario);
router.get('/getUsuariosMismaEmpresa', UsuarioController.getUsuariosMismaEmpresa);

export default router;