import { Request, Response, NextFunction } from 'express';
import UsuarioInformacion, { IUsuarioInformacion } from '../models/usuarioInformacion';
const bcrypt = require('bcrypt');
import { UsuarioExistenteError } from "../errors/usuarioErrors";
import { empresaService } from '../servicios/empresa.service';

class UsuarioController {
  // Obtener todas las usuarioInformacions
  public async getAllUsuarioInformacion(_req: Request, res: Response): Promise<void> {
    try {
      const usuarioInformacionAll: IUsuarioInformacion[] = await UsuarioInformacion.find();
      res.json(usuarioInformacionAll);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarioInformacions' });
    }
  }

  // Obtener un usuarioInformacion por su ID
  public async getUsuarioInformacionById(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);

    try {
      const usuarioInformacion: IUsuarioInformacion | null = await UsuarioInformacion.findOne({ idUsuario: id });

      if (usuarioInformacion) {
        res.json(usuarioInformacion);
      } else {
        res.status(404).json({ error: 'usuarioInformacion no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el objeto usuarioInformacion' });
    }
  }

  // Crear un nuevo usuarioInformacion
  public async createUsuarioInformacion(req: Request, res: Response): Promise<void> {
    const nuevousuarioInformacion: IUsuarioInformacion = req.body;
    const salt = await bcrypt.genSalt(8);
    nuevousuarioInformacion.contraseña = await bcrypt.hash(nuevousuarioInformacion.contraseña, salt);

    try {
      const usuarioInformacionCreado: IUsuarioInformacion = await UsuarioInformacion.create(nuevousuarioInformacion);
      res.status(201).json(usuarioInformacionCreado);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error al crear el objeto usuarioInformacion' });
    }
  }

  // Actualizar un usuarioInformacion por su ID
  public async updateUsuarioInformacion(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);
    const datosActualizados: IUsuarioInformacion = req.body;

    try {
      const usuarioInformacionActualizado: IUsuarioInformacion | null = await UsuarioInformacion.findOneAndUpdate(
        { idUsuario: id },
        datosActualizados,
        { new: true }
      );

      if (usuarioInformacionActualizado) {
        res.json(usuarioInformacionActualizado);
      } else {
        res.status(404).json({ error: 'usuarioInformacion no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la usuarioInformacion' });
    }
  }

  // Eliminar un usuarioInformacion por su ID
  public async deleteUsuarioInformacion(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);

    try {
      const usuarioInformacionEliminado: IUsuarioInformacion | null = await UsuarioInformacion.findOneAndDelete({
        idUsuario: id,
      });

      if (usuarioInformacionEliminado) {
        res.json({ message: 'usuarioInformacion eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'usuarioInformacion no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la usuarioInformacion' });
    }
  }



private async getUsuarioInformacionByEmail(email: String): Promise<IUsuarioInformacion | null> {
  try {
    const usuarioInformacion = await UsuarioInformacion.findOne({ email });
    return usuarioInformacion; // Devuelves el objeto o null si no existe
  } catch (error) {
    // Puedes manejar o lanzar el error según tu conveniencia
    throw new Error('Error al obtener el objeto usuarioInformacion');
  }
}


  public async registrarse(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const nuevousuarioInformacion: IUsuarioInformacion = req.body;
      const { email, codigoInvitacion, empresaData } = req.body;
      const usuarioExistente = await this.getUsuarioInformacionByEmail(email);
      if (usuarioExistente) {
        // Maneja el caso de que el usuario ya exista
        throw new UsuarioExistenteError();
      }
      let empresa; // IEmpresa | null

      if (codigoInvitacion) {
        // 2a. Si existe un código de invitación, buscar la empresa por dicho código
        empresa = await empresaService.getEmpresaByCodigo(codigoInvitacion);
        if (!empresa) {
          throw new UsuarioExistenteError("Codigo de invitación invalodo o empresa no encontrada");
        }
      } else {
        // 2b. Si NO se recibió un código de invitación, creamos una nueva empresa
        if (!empresaData) {
          throw new UsuarioExistenteError("Faltan datos para empresa");
        }

        // Se asume que empresaData contiene { idNombreEmpresa, nombreEmpresa, ... }
        empresa = await empresaService.createEmpresa(empresaData);
      }
    
    const salt = await bcrypt.genSalt(8);
    nuevousuarioInformacion.contraseña = await bcrypt.hash(nuevousuarioInformacion.contraseña, salt);
    nuevousuarioInformacion.empresa = empresa._id

    
      const usuarioInformacionCreado: IUsuarioInformacion = await UsuarioInformacion.create(nuevousuarioInformacion);
      res.status(201).json(usuarioInformacionCreado);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }




}

export default new UsuarioController();
