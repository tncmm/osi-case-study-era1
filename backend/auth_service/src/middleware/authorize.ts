import { UserRole } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { Forbidden } from '../domain/error/forbidden';
import { Unauthorized } from '../domain/error/unauthorized';

export function authorize(allowedRoles?: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user?.userId || user.userId <= 0) {
      throw new Unauthorized('user-not-found');
    }

    if (
      allowedRoles &&
      allowedRoles.length > 0 &&
      (!user.role || !allowedRoles.includes(user.role))
    ) {
      throw new Forbidden('user-role-not-allowed');
    }

    next();
  };
}