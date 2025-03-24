import express from 'express';
import UsuarioController from '../controllers/usuario';
const tokenValidator = require ('../middleware/tokenValidator');

const router = express.Router();

// Rutas para la entidad Usuario
router.post('/registrarse', UsuarioController.registrarse);
router.put('/deleteUsuario/:id', UsuarioController.deleteUsuario);
router.use(tokenValidator);
router.get('/getAllEmpresas', UsuarioController.getAllUsuario); 
router.get('/:id', UsuarioController.getUsuarioById);
router.post('/', UsuarioController.createUsuario);
router.put('/:id', UsuarioController.updateUsuario);


export default router;