import express from 'express';
import home from '../routes/home';
import authentication from '../routes/authentication';
import { jwt } from '../middleware/jwt';
import errorMiddleware from '../middleware/error';
import { response } from '../middleware/response';

export const setRoutes = (app: express.Application) => {
  app.use(express.json({ limit: '50mb' }));
  app.use(response);
  app.use(jwt);
  app.use('/', home);
  app.use('/authentication/', authentication);
  app.use(errorMiddleware);
  app.use(express.urlencoded({ extended: true }));
};