import { Request, Response, NextFunction } from 'express';
import Usuario, { IUsuario } from '../models/usuario';
import { usuarioService } from '../servicios/usuario.service';
import { CustRequest } from "../custrequest";

class UsuarioController {

  public registrarse = async (req: Request, res: Response, next: NextFunction): Promise<void> => { // Validada
    try {
        const { codigoInvitacion, empresaData, ...usuarioData } = req.body;
        const usuarioCreado = await usuarioService.registrarse(usuarioData, codigoInvitacion, empresaData);
        res.status(201).json(usuarioCreado);
    } catch (error) {
        next(error);
    }
  };

  // Eliminar un usuario por su ID
  public  deleteUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => { // Funciona 
    const { id } = req.params; // Obtener el ID del usuario desde la URL
    
    try {
        // Llamar al servicio de eliminación
        const usuarioEliminado = await usuarioService.deleteUsuario(id);
        
        // Enviar la respuesta con el usuario actualizado
        res.status(200).json(usuarioEliminado);
    } catch (error) {
        next(error);
    }
  }

  public async updateUsuario(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params; // Obtener ID del usuario
    const { nombre, apellido } = req.body; // Obtener datos a actualizar

    try {
        // Llamar al servicio para actualizar el usuario
        const usuarioActualizado = await usuarioService.updateUsuario(id, { nombre, apellido });

        // Verificar si el usuario fue encontrado y actualizado
        if (!usuarioActualizado) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        res.status(200).json(usuarioActualizado);
    } catch (error) {
        next(error);
    }
  }
  
  public async getUsuariosMismaEmpresa(req: CustRequest, res: Response, next: NextFunction) { // funciona
    try {
        const userId = req.user;

        if (!userId) {
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        const usuarios = await usuarioService.getUsuariosMismaEmpresa(userId);
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

  // Obtener un usuario por su ID
  public async getUsuarioById(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);

    try {
      const usuario: IUsuario | null = await Usuario.findOne({ idUsuario: id });

      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ error: 'usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el objeto usuario' });
    }
  }

}

export default new UsuarioController();
