import { Request, Response, NextFunction } from 'express';
import { UserTokenPayload } from '../domain/dtos/token';
import { verifyJwtToken } from '../helper/jwt';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      user: UserTokenPayload;
    }
  }
}

export function jwt(req: Request, res: Response, next: NextFunction) {
  const token = req.header('x-auth-token');

  const nullUser: UserTokenPayload = {
    userId: 0,
    role: '',
    name: '',
    surname: '',
  };

  const user = token ? verifyJwtToken(token) : nullUser;
  console.log(user);
  
  req.user = user;
  next();
}