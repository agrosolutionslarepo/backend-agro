import { Types } from 'mongoose';

export async function pushToUser(userId: Types.ObjectId, message: string) {
  // Placeholder push implementation
  console.log(`[PUSH] to ${userId}: ${message}`);
}