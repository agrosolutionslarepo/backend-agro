import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
import User from '../models/usuarioInformacion';
//const User = require('../models/usuarioInformacion');


class LoginController {

    public async loguear (req: Request, res: Response, next: any): Promise<void>{
        const { body } = req;
        const { email, contraseña } = body;
        try{
        const user = await User.findOne({ email });
        console.log(user)
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(contraseña, user.contraseña);
            console.log(passwordCorrect)
        if (!(user && passwordCorrect)){
            res.status(401).json({
                error: 'Usuario y/o Password incorrecto'


            })

        }
        const infoToken = {
            id: user?.idUsuario,
            nombreUsuario: user?.nombreUsuario,
            email: user?.email,
    
            }

        const token = jwt.sign(infoToken, process.env.SECRET);
        console.log(process.env.SECRET);
        res.send ({


            jwt: token


        })
         
    
        

    } catch(e) {
        next(e);

    }   

}
}
export default new LoginController();