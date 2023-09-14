import express from 'express'
import empresaRoutes from './routes/empresa';

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
app.use('/empresas', empresaRoutes);

initDB();