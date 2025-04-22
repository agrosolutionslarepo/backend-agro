import { Types } from 'mongoose';
import InviteCodes, { IInviteCodes } from '../models/inviteCodes';
import {
  InviteCodeDisabledError,
  InviteCodeDuplicateError,
  InviteCodeNotFoundError,
} from '../errors/inviteCodesError';

/**
 * Crea un código de invitación.
 * Reglas de negocio:
 *   • Un código puede repetirse entre empresas.
 *   • Dentro de **la misma empresa** el par (codigo, empresa) debe ser único
 *     sin importar si el registro previo está habilitado o no.
 */
export async function createInviteCode(
    empresaId: string | Types.ObjectId,
    code: string
  ): Promise<IInviteCodes> {
    const empresa = new Types.ObjectId(empresaId);
    const codigo = code.trim().toUpperCase();
  
    // 1️⃣ La empresa ya tiene *algún* código activo → prohibido
    const anyActiveSameCompany = await InviteCodes.exists({ empresa, estado: true });
    if (anyActiveSameCompany) throw new InviteCodeDuplicateError();
  
    // 2️⃣ La empresa tiene el MISMO código deshabilitado → prohibido (no reusar)
    const sameCompanyDisabled = await InviteCodes.exists({ codigo, empresa, estado: false });
    if (sameCompanyDisabled) throw new InviteCodeDuplicateError();
  
    // 3️⃣ Otra empresa posee el MISMO código activo → prohibido
    const otherActive = await InviteCodes.exists({ codigo, empresa: { $ne: empresa }, estado: true });
    if (otherActive) throw new InviteCodeDuplicateError();
  
    // ✅ Se permite crear (o sólo hay registros deshabilitados en otras empresas)
    return InviteCodes.create({ codigo, estado: true, empresa });
  }

/**
 * Deshabilita un código (no importa a qué empresa pertenece).
 */
export async function disableInviteCode(empresaId: any, code: string): Promise<IInviteCodes> {
  const doc = await InviteCodes.findOneAndUpdate(
    { codigo: code.toUpperCase(), empresaId },
    { estado: false },
    { new: true, runValidators: true }
  );

  if (!doc) throw new InviteCodeNotFoundError();
  return doc;
}

/**
 * Verifica que el código exista y esté habilitado.
 */
export async function checkInviteCode(code: string): Promise<IInviteCodes> {
  const doc = await InviteCodes.findOne({ codigo: code.toUpperCase() });

  if (!doc) throw new InviteCodeNotFoundError();
  if (!doc.estado) throw new InviteCodeDisabledError();

  return doc;
}
export { InviteCodeDuplicateError };

