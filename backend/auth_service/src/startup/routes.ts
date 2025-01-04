import express from 'express';
import home from '../routes/home';
import authentication from '../routes/authentication';
export const setRoutes = (app: express.Application) => {
  app.use(express.json({ limit: '50mb' }));
  app.use('/', home);
  app.use('/authentication/', authentication);
  app.use(express.urlencoded({ extended: true }));  
};