import { UserRole } from '@prisma/client';

export interface UserTokenPayload {
  userId: number;
  role: UserRole;
  name: string;
  surname: string;
}

export type Token = string;