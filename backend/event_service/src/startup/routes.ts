import express from 'express';
import event from '../routes/event';
import errorMiddleware from '../middleware/error';
import { response } from '../middleware/response';
import { jwt } from '../middleware/jwt';

export const setRoutes = (app: express.Application) => {
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(response);
  app.use(jwt);
  app.use('/events', event);
  app.use(errorMiddleware);
}; 