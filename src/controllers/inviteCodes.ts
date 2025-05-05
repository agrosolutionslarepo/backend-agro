import { Request, Response, NextFunction } from 'express';
import {
  createInviteCode,
  disableInviteCode,
  checkInviteCode,
} from '../servicios/inviteCodes.service';
import {
  InviteCodeDuplicateError,
} from '../errors/inviteCodesError';
import { randomString } from '../helpers/randomString';
const MAX_ATTEMPTS = 5; // reintentos ante colisión
class InviteCodesController {



    public async createInviteCodes(req: Request, res: Response, next: NextFunction) {
        try {
         
          const idEmpresa = req.user?.idEmpresa;
          if (!idEmpresa) return res.status(403).json({ error: 'empresaId missing in token' });
          let lastErr: unknown = null;
          for (let attempts = 0; attempts < MAX_ATTEMPTS; attempts++) {
            const code = randomString(6);
            try {
              const doc = await createInviteCode(idEmpresa, code);
              return res.status(201).json(doc);
            } catch (err) {
              if (err instanceof InviteCodeDuplicateError) {
                // colisión: vuelve al for y prueba con nuevo código
                continue;
              }
              // otro tipo de error -> lo capturará el catch externo
              throw err;
            }
          }
          // se agotaron los intentos
          throw lastErr ?? new Error('Unexpected error generating invite code');
        } catch (e) {
          next(e);
        }
      }

public async disableInviteCodes(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(req.body.code);
    const idEmpresa = req.user?.idEmpresa;
    if (!idEmpresa) return res.status(403).json({ error: 'empresaId missing in token' });
    disableInviteCode(idEmpresa, req.body.code);
    return res.status(200).send('done');
  } catch (e) {
    next(e);
  }
}

public async checkInviteCodes(req: Request, res: Response, next: NextFunction) {
  try {
    const doc = await checkInviteCode(req.body.code);
    res.json({ valid: true, empresa: doc.empresa });
  } catch (e) {
    next(e);
  }
}
}

export default new InviteCodesController();