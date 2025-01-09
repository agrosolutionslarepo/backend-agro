import { Request, Response, NextFunction } from 'express';
import { InvalidCredentialsError } from "../errors/loginErrors";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
import User from '../models/usuarioInformacion';


class LoginController {

    public async loguear (req: Request, res: Response, next: NextFunction): Promise<void>{
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
            throw new InvalidCredentialsError();

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
         
    
        

    } catch(error) {
        next(error);

    }   

}
}
export default new LoginController();