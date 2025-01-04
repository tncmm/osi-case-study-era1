import express from 'express';

export const setRoutes = (app: express.Application) => {
  app.use(express.json({ limit: '50mb' }));

  app.use(express.urlencoded({ extended: true }));  
};