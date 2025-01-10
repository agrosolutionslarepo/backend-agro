import { Response, NextFunction } from "express";
import { CustRequest } from '../custrequest';
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (request: CustRequest, _res: Response, next: NextFunction) => {
  try {
    const auth = request.get("authorization");
    let token = null;

    if (auth && auth.toLowerCase().startsWith("bearer")) {
      token = auth.substring(7);
    }

    if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!decodedToken.id) {
        throw new jwt.JsonWebTokenError();
      }

      const { id: userId } = decodedToken;
      console.log(userId);

      request.user = userId;
      next();
    } else {
      throw new jwt.JsonWebTokenError();
    }
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

