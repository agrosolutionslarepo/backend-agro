import Usuario, { IUsuario } from '../models/usuario';
import { IEmpresa } from '../models/empresa';
import { UsuarioExistenteError } from "../errors/usuarioErrors";
import { empresaService } from '../servicios/empresa.service';
import { semillaService } from '../servicios/semilla.service';
import { inviteCodeService } from '../servicios/inviteCodes.service';
const bcrypt = require('bcrypt');

class UsuarioService {

  public async registrarse(nuevousuario: IUsuario, codigoInvitacion?: string, empresaData?: IEmpresa): Promise<IUsuario> {
    if (await Usuario.exists({ email: nuevousuario.email })) {
        throw new UsuarioExistenteError();
    }

    let empresa: IEmpresa | null = null;

    if (codigoInvitacion) {
        // Si hay código de invitación, busca la empresa asociada
        let inviteDoc = await inviteCodeService.checkInviteCode(codigoInvitacion);
        const idEmpresaStr = inviteDoc.empresa.toString();
        empresa = await empresaService.getEmpresaById(idEmpresaStr);
        if (!empresa) {
            throw new UsuarioExistenteError("Código de invitación inválido o empresa no encontrada");
        }
        // Si el usuario se está uniendo con invitación, no es administrador
        nuevousuario.administrador = false;
    } else if (empresaData) {
        // Si está creando una empresa nueva, asignar fecha de creación y registrar la empresa
        empresaData.fechaCreacion = new Date();
        empresa = await empresaService.createEmpresa(empresaData);
        
        // Crear semillas base con stock 0
        await semillaService.crearSemillasBase(empresa._id);
        
        // El primer usuario que crea la empresa es administrador
        nuevousuario.administrador = true;
    } else {
        throw new UsuarioExistenteError("Faltan datos para empresa");
    }

    // Hashear la contraseña antes de guardar
    nuevousuario.contraseña = await bcrypt.hash(nuevousuario.contraseña, 8);
    nuevousuario.empresa = empresa._id;

    return await Usuario.create(nuevousuario);
  }

  public async deleteUsuario(id: string): Promise<IUsuario | null> { // funciona
    try {
      const usuario = await Usuario.findById(id);
      console.log(usuario)
      if (!usuario) {
          throw new Error('Usuario no encontrado');
      }

      // Actualizar el estado del usuario a 'false' (inactivo)
      usuario.estado = false;
      await usuario.save();

      return usuario;
    } catch (error: unknown) { 
      if (error instanceof Error) {
          throw new Error(error.message || 'Error al eliminar usuario');
      }
      throw new Error('Error desconocido al eliminar usuario');
    }
  }

  public async updateUsuario(id: string, datosActualizados: Partial<IUsuario>): Promise<IUsuario | null> {
    try {
        // Buscar el usuario por ID
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Verificar qué campos se actualizarán
        if (datosActualizados.nombre !== undefined) {
            usuario.nombre = datosActualizados.nombre;
        }
        if (datosActualizados.apellido !== undefined) {
            usuario.apellido = datosActualizados.apellido;
        }

        // Guardar los cambios
        await usuario.save();

        return usuario;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Error al actualizar usuario');
        }
        throw new Error('Error desconocido al actualizar usuario');
    }
  }

  public async cambioContraseña(check: boolean, id: string, datosActualizados: Partial<IUsuario>): Promise<IUsuario | null> {
    try {
        if(!check){
          throw new Error('invalid credentials');
        }
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Verificar qué campos se actualizarán
        if (datosActualizados.contraseña !== undefined) {
            usuario.contraseña = await bcrypt.hash(datosActualizados.contraseña, 8);
            console.log(usuario.contraseña);
        }  else{
          
          throw new Error('invalid credentials');

        }

        // Guardar los cambios
        await usuario.save();

        return usuario; //revisar
      
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Error al actualizar usuario');
        }
        throw new Error('Error desconocido al actualizar usuario');
    }
  }

  public async getUsuariosMismaEmpresa(id: String): Promise<{ nombreUsuario: String }[]> { // funciona
    try {
        // Buscar el usuario logueado para obtener su empresa
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Buscar otros usuarios de la misma empresa, excluyendo al usuario logueado
        const usuarios = await Usuario.find(
            { empresa: usuario.empresa, _id: { $ne: usuario._id } },
            { nombreUsuario: 1, _id: 0 } // Solo traemos el nombreUsuario
        );

        return usuarios;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Error al obtener usuarios de la empresa');
        }
        throw new Error('Error desconocido al obtener usuarios de la empresa');
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
