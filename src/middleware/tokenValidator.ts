
const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
require('dotenv').config();
module.exports = (request: Request, response: Response, next: any) => {
    
    const auth = request.get('authorization');
    let token = null
    if (auth && auth.toLowerCase().startsWith('bearer')){
        token = auth.substring(7)
       

    }
        
    if(token){
    
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!decodedToken.id){

            return response.status(401).json({error: 'token no presentado o no valido'});
        } else {

            const {id: userId } = decodedToken;
            request.body.userId = userId;
            next();
        }

    } else {

        
        return response.status(401).json({error: 'token no presentado o no valido'});
      

    }



    }
