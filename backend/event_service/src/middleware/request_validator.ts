import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { InvalidParameter } from '../domain/error/invalid_paramters';

export function requestValidator(
  schema: Joi.ObjectSchema<any>,
  options?: Joi.ValidationOptions
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(
      req.method === 'GET' ? req.query : req.body,
      options
    );
    if (error) {
      throw new InvalidParameter(error.details[0].message);
    }
    next();
  };
}