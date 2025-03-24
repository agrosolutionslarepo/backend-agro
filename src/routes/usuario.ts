import express from 'express';
import UsuarioController from '../controllers/usuario';
const tokenValidator = require ('../middleware/tokenValidator');

const router = express.Router();

// Rutas para la entidad Usuario
router.post('/registrarse', UsuarioController.registrarse);
router.use(tokenValidator);
router.put('/deleteUsuario/:id', UsuarioController.deleteUsuario);
router.get('/getAllEmpresas', UsuarioController.getAllUsuario); 
router.get('/:id', UsuarioController.getUsuarioById);
router.put('/:id', UsuarioController.updateUsuario);

export default router;