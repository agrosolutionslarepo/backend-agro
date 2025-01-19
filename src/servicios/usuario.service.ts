import Usuario, { IUsuario } from '../models/usuario';

class UsuarioService {

  public getUsuarioByEmail = async (email: string): Promise<IUsuario | null> => {
    try {
      const usuario = await Usuario.findOne({ email });
      return usuario; 
    } catch (error) {
      throw new Error('Error al obtener el objeto usuario');
    }
  };
}

export const usuarioService = new UsuarioService();
