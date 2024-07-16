// TODO Agregar un archivo con las variables como la contraseña del connection string y ponerlo en el gitignore

const mongoose = require('mongoose');

const DB_URI =  'mongodb+srv://agrosolutions:RdPOgidAqoMvCqtp@clusteragrosolutions.npywedp.mongodb.net/'

module.exports = async () => {
    const connect = async () => {
        try {
            await mongoose.connect(DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Conexion correcta');
        } catch (err) {
            console.error('DB: ERROR', err);
        }
    };
    await connect();
};