export class InvalidCredentialsError extends Error {
  constructor(message = "Usuario y/o password incorrectos") {
      super(message);
      this.name = "InvalidCredentialsError";
  }
}

export class UsuarioEliminadoError extends Error {
  constructor(message = "El usuario ha sido eliminado") {
      super(message);
      this.name = "UsuarioEliminadoError";
  }
}