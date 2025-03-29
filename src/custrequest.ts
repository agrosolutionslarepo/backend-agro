import { Request } from "express";

// Definimos la estructura del usuario dentro del request
export interface IUserToken {
  id: string;
  nombreUsuario: string;
  email: string;
  idEmpresa: string;
}

export interface CustRequest extends Request {
  user: IUserToken;
}