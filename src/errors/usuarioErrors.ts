export class UsuarioExistenteError extends Error {
    constructor(message = "Usuario existente") {
      super(message);
      this.name = "UsuarioExistenteError";
    }
  }