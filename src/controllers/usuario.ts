import { Request, Response } from 'express';
import UsuarioInformacion, { IUsuarioInformacion } from '../models/usuarioInformacion';

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

    try {
      const usuarioInformacionCreado: IUsuarioInformacion = await UsuarioInformacion.create(nuevousuarioInformacion);
      res.status(201).json(usuarioInformacionCreado);
    } catch (error) {
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
}

export default new UsuarioController();
