import { Request, Response, NextFunction } from 'express';
import Usuario, { IUsuario } from '../models/usuario';
import { usuarioService } from '../servicios/usuario.service';
import { CustRequest } from "../custrequest";

class UsuarioController {

  public registrarse = async (req: Request, res: Response, next: NextFunction): Promise<void> => { // funciona
    try {
        const { codigoInvitacion, empresaData, ...usuarioData } = req.body;
        const usuarioCreado = await usuarioService.registrarse(usuarioData, codigoInvitacion, empresaData);
        res.status(201).json(usuarioCreado);
    } catch (error) {
        next(error);
    }
  };

  public deleteUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => { // funciona
    const { id } = (req as CustRequest).user; // Obtener el ID del usuario autenticado desde el JWT
    
    try {
        const usuarioEliminado = await usuarioService.deleteUsuario(id);
        
        res.status(200).json(usuarioEliminado);
    } catch (error) {
        next(error);
    }
  }

  public async updateUsuario(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = (req as CustRequest).user;
    const { nombre, apellido } = req.body; 

    try {
        const usuarioActualizado = await usuarioService.updateUsuario(id, { nombre, apellido });

        if (!usuarioActualizado) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        res.status(200).json({
            message: "Usuario actualizado correctamente",
            usuario: usuarioActualizado
        });
    } catch (error) {
        next(error);
    }
  }
  
  public async getUsuariosMismaEmpresa(req: Request, res: Response, next: NextFunction) { // funciona
    try {
      const { id } = (req as CustRequest).user;

        if (!id) {
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        const usuarios = await usuarioService.getUsuariosMismaEmpresa(id);
        res.json(usuarios);
    } catch (error) {
        next(error);
    }
}

  // Obtener todas las usuario
  public async getAllUsuario(_req: Request, res: Response): Promise<void> {
    try {
      const usuarioAll: IUsuario[] = await Usuario.find();
      res.json(usuarioAll);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  }

}

export default new UsuarioController();
