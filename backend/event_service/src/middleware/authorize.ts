import { Request, Response, NextFunction } from 'express';
import { Unauthorized } from '../domain/error/unauthorized';
import { Forbidden } from '../domain/error/forbidden';

export function authorize(allowedRoles?: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = req.user;
      console.log(user);
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