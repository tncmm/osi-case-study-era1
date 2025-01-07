import * as jwt from 'jsonwebtoken';
import { config } from '../config/config';
import {  UserTokenPayload } from '../domain/dtos/token';
import { NotFound } from '../domain/error/not_found';
import { Unauthorized } from '../domain/error/unauthorized';



export function verifyJwtToken(token: string | undefined): UserTokenPayload {
    console.log(token);
  if (!token) {
    throw new Unauthorized('token-not-provided');
  }
  console.log(config.jwt_private_key);

  if (!config.jwt_private_key) {
    throw new NotFound('jwt-key-not-found');
  }

  const jwtKey: string = config.jwt_private_key;
  let decodedJwt: UserTokenPayload;

  try {
    decodedJwt = jwt.verify(token, jwtKey) as UserTokenPayload;
  } catch (error: any) {
    throw new Unauthorized(error.message ? error.message : 'invalid-token');
  }

  if (!decodedJwt) {
    throw new Unauthorized('empty-token');
  }

  return decodedJwt;
}