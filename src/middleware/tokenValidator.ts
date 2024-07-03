import { Response, NextFunction } from "express";
import {CustRequest} from '../definitrion';
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (request: CustRequest, response: Response, next: NextFunction) => {
  const auth = request.get("authorization");
  let token = null;
  if (auth && auth.toLowerCase().startsWith("bearer")) {
    token = auth.substring(7);
  }

  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return response
        .status(401)
        .json({ error: "token no presentado o no valido" });
    } else {
      const { id: userId } = decodedToken;
      console.log(userId);

      request.user = userId;
      next();
    }
  } else {
    return response
      .status(401)
      .json({ error: "token no presentado o no valido" });
  }
};
