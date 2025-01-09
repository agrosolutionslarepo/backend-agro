export class InvalidCredentialsError extends Error {
    constructor(message = "Usuario y/o password incorrectos") {
      super(message);
      this.name = "InvalidCredentialsError";
    }
  }
  