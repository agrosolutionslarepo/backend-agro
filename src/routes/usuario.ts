import express from 'express';
import UsuarioController from '../controllers/usuario';
const tokenValidator = require ('../middleware/tokenValidator');

const router = express.Router();

// Rutas para la entidad Usuario
router.post('/registrarse', UsuarioController.registrarse); // funciona
router.use(tokenValidator);
router.put('/deleteUsuario', UsuarioController.deleteUsuario); // usa instancia
router.put('/updateUsuario', UsuarioController.updateUsuario); // usa instancia
router.get('/getUsuariosMismaEmpresa', UsuarioController.getUsuariosMismaEmpresa); // usa instancia

export default router;