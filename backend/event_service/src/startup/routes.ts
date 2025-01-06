import express from 'express';
import event from '../routes/event';

export const setRoutes = (app: express.Application) => {
  app.use(express.json({ limit: '50mb' }));
  app.use('/api/events', event);
  app.use(express.urlencoded({ extended: true }));  
}; 