import express from 'express';
import LoginController from '../controllers/login';

const router = express.Router();

router.post('/', LoginController.loguear);


export default router;