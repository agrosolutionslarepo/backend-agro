import { Request, Response } from 'express';
import Parcela, { IParcela } from '../models/parcela';
import Empresa, { IEmpresa } from '../models/empresa';

class ParcelaController {
  // Obtener todas las parcelas
  public async getAllParcelas(_req: Request, res: Response): Promise<void> {
    try {
      const parcelas: IParcela[] = await Parcela.find();
      res.json(parcelas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las parcelas' });
    }
  }

  // Obtener una parcela por su ID
  public async getParcelaById(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);

    try {
      const parcela: IParcela | null = await Parcela.findOne({ idParcela: id });

      if (parcela) {
        res.json(parcela);
      } else {
        res.status(404).json({ error: 'Parcela no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la parcela' });
    }
  }

  // Crear una nueva parcela
  public async createParcela(req: Request, res: Response): Promise<Response> {
    const nuevaParcela: IParcela = req.body;
    const idEmpresa: string = req.params.idEmpresa; // ID de la empresa a la que se asociará la parcela

    try {
      // Verificar si la empresa existe
      const empresa: IEmpresa | null = await Empresa.findById(idEmpresa);

      if (!empresa) {
        return res.status(404).json({ error: 'Empresa no encontrada' });
      }

      // Asignar la empresa a la parcela
      nuevaParcela.empresa = empresa._id;

      // Crear la parcela con la referencia a la empresa
      const parcelaCreada: IParcela = await Parcela.create(nuevaParcela);
      return res.status(201).json(parcelaCreada);
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear la parcela' });
    }
  }

  // Actualizar una parcela por su ID
  public async updateParcela(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);
    const datosActualizados: IParcela = req.body;

    try {
      const parcelaActualizada: IParcela | null = await Parcela.findOneAndUpdate(
        { idParcela: id },
        datosActualizados,
        { new: true }
      );

      if (parcelaActualizada) {
        res.json(parcelaActualizada);
      } else {
        res.status(404).json({ error: 'Parcela no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la parcela' });
    }
  }

  // Eliminar una parcela por su ID
  public async deleteParcela(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);

    try {
      const parcelaEliminada: IParcela | null = await Parcela.findOneAndDelete({
        idParcela: id,
      });

      if (parcelaEliminada) {
        res.json({ message: 'Parcela eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Parcela no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la parcela' });
    }
  }
}

export default new ParcelaController();
