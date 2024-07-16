import express from 'express'
import empresaRoutes from './routes/empresa';
import usuarioRoutes from './routes/usuario';
import LoginRoutes from './routes/login';
const tokenValidator = require ('./middleware/tokenValidator');
const errorHandler = require ('./middleware/errorHandler');
require('dotenv').config();

const initDB = require('../config/db')

const app = express();

// * Middleware que transforma los req.body a un json
app.use(express.json()); 

const PORT = 3000; 

app.get('/ping', (_req,res) => {
    console.log('someone pinged here!!')
    res.send('pong')
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

// Agregar las rutas de la entidad Empresa
app.use('/empresas',tokenValidator, empresaRoutes);
app.use('/usuarios',tokenValidator, usuarioRoutes);
app.use('/login', LoginRoutes);
app.use(errorHandler);
initDB();