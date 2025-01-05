import { Response, Request, NextFunction } from 'express';

export function response(req: Request, res: Response, next: NextFunction) {
  const send = res.send.bind(res);
  res.send = function (value: any) {
    if (typeof value == 'object' && !value.isError) {
      return send({ isError: false, data: value, error: {} });
    }

    if (typeof value == 'string' && !value.includes('{')) {
      return send({ isError: false, data: value, error: {} });
    }

    return send(value);
  };

  next();
}