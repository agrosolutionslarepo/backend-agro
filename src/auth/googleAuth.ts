import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Usuario from '../models/usuario';
import Empresa from '../models/empresa';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUserToken } from '../custrequest';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: '/auth/google/callback',
      passReqToCallback: true,
    },
    async (_req, _accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new Error('Email no encontrado'), false);
        }

        let usuario = await Usuario.findOne({ email });

        // ✅ Si no existe el usuario, lo creamos junto con una empresa ficticia
        if (!usuario) {
          const nombreRandom = `Empresa_${Math.floor(Math.random() * 10000)}`;

          const empresaCreada = await Empresa.create({
            nombreEmpresa: nombreRandom,
            fechaCreacion: new Date(),
            estado: true,
          });

          usuario = await Usuario.create({
            nombre: profile.name?.givenName,
            apellido: profile.name?.familyName,
            email,
            googleId: profile.id,
            estado: true,
            administrador: true,
            nombreUsuario: profile.displayName,
            empresa: empresaCreada._id,
            authType: 'google', // ✅ clave para que no exija campos locales
          });
        }

        if (usuario.estado === false) {
          return done(new Error('Usuario eliminado'), false);
        }

        const tokenPayload: IUserToken = {
          id: usuario.id.toString(),
          nombre: usuario.nombre.toString(),
          apellido: usuario.apellido.toString(),
          administrador: usuario.administrador === true,
          nombreUsuario: usuario.nombreUsuario.toString(),
          email: usuario.email.toString(),
          idEmpresa: usuario.empresa?.toString() || '',
        };

        const token = jwt.sign(tokenPayload, process.env.SECRET as string);

        return done(null, { usuario, jwt: token });
      } catch (error) {
        done(error, false);
      }
    }
  )
);

export default passport;
