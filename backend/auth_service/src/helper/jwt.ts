import * as jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { Token, UserTokenPayload } from '../domain/dtos/token';
import { NotFound } from '../domain/error/not_found';
import { Unauthorized } from '../domain/error/unauthorized';
import { InvalidParameter } from '../domain/error/invalid_paramters';
import { UserDbManager } from '../database/user';

export interface TokenGenerationOptions {
  userId: number;
  tokenDurationInMinutes?: number;
}

export function verifyJwtToken(token: string | undefined): UserTokenPayload {
  if (!token) {
    throw new Unauthorized('token-not-provided');
  }

  if (!config.jwt_private_key) {
    throw new NotFound('jwt-key-not-found');
  }

  const jwtKey: string = config.jwt_private_key;
  let decodedJwt: UserTokenPayload;

  try {
    decodedJwt = jwt.verify(token, jwtKey) as UserTokenPayload;
    decodedJwt.name = decodeURIComponent(decodedJwt.name);
    decodedJwt.surname = decodeURIComponent(decodedJwt.surname);
  } catch (error: any) {
    throw new Unauthorized(error.message ? error.message : 'invalid-token');
  }

  if (!decodedJwt) {
    throw new Unauthorized('empty-token');
  }

  return decodedJwt;
}

export async function generateJwtToken({
  userId,
  tokenDurationInMinutes,
}: TokenGenerationOptions): Promise<Token> {
  const duration =
    tokenDurationInMinutes ?? config.tokenExpireDurationInMinutes;
  const user = await new UserDbManager().findById(userId);

  if (!user) {
    throw new NotFound('user-not-found');
  }

  if (Number.isNaN(duration)) {
    throw new InvalidParameter('token-duration-invalid');
  }

  const payload: UserTokenPayload = {
    userId: userId,
    role: user.role,
    name: encodeURIComponent(user.name),
    surname: encodeURIComponent(user.surname),
  };

  return jwt.sign(payload, config.jwt_private_key, {
    expiresIn: `${duration}m`,
  });
}