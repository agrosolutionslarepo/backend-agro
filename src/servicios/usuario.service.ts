import Usuario, { IUsuario } from '../models/usuario';
import { IEmpresa } from '../models/empresa';
import { UsuarioExistenteError } from "../errors/usuarioErrors";
import { empresaService } from '../servicios/empresa.service';
const bcrypt = require('bcrypt');

class UsuarioService {

  public async registrarse(nuevousuario: IUsuario, codigoInvitacion?: string, empresaData?: IEmpresa): Promise<IUsuario> { // funciona
    if (await Usuario.exists({ email: nuevousuario.email })) {
        throw new UsuarioExistenteError();
    }

    let empresa: IEmpresa | null = null;

    if (codigoInvitacion) {
        empresa = await empresaService.getEmpresaByCodigo(codigoInvitacion);
        if (!empresa) {
            throw new UsuarioExistenteError("Código de invitación inválido o empresa no encontrada");
        }
    } else if (empresaData) {
        empresa = await empresaService.createEmpresa(empresaData);
    } else {
        throw new UsuarioExistenteError("Faltan datos para empresa");
    }

    nuevousuario.contraseña = await bcrypt.hash(nuevousuario.contraseña, 8);
    nuevousuario.empresa = empresa._id;

    return await Usuario.create(nuevousuario);
  }

  public async deleteUsuario(id: string): Promise<IUsuario | null> {
    try {
      // Buscar el usuario por ID
      const usuario = await Usuario.findById(id);
      console.log(usuario)
      if (!usuario) {
          throw new Error('Usuario no encontrado');
      }

      // Actualizar el estado del usuario a 'false' (inactivo)
      usuario.estado = false;
      await usuario.save(); // Guardar el cambio

      return usuario;
  } catch (error: unknown) { 
      if (error instanceof Error) {
          throw new Error(error.message || 'Error al eliminar usuario');
      }
      // Si el error no es una instancia de Error, lanzamos un error genérico
      throw new Error('Error desconocido al eliminar usuario');
  }
}


  /* public getUsuarioByEmail = async (email: string): Promise<IUsuario | null> => {
    try {
      const usuario = await Usuario.findOne({ email });
      return usuario; 
    } catch (error) {
      throw new Error('Error al obtener el objeto usuario');
    }
  }; */ 
}

export const usuarioService = new UsuarioService();
