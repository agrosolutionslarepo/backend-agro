import express from 'express';
import UsuarioController from '../controllers/usuario';

const router = express.Router();

// Rutas para la entidad Empresa
router.get('/getAllEmpresas', UsuarioController.getAllUsuarioInformacion); 
router.get('/:id', UsuarioController.getUsuarioInformacionById);
router.post('/', UsuarioController.createUsuarioInformacion);
router.put('/:id', UsuarioController.updateUsuarioInformacion);
router.delete('/:id', UsuarioController.deleteUsuarioInformacion);

export default router;