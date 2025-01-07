import express from 'express';
import home from '../routes/home';
import authentication from '../routes/authentication';
import { jwt } from '../middleware/jwt';
import errorMiddleware from '../middleware/error';
import { response } from '../middleware/response';
import cors from 'cors';

export const setRoutes = (app: express.Application) => {
  app.use(cors({
    origin: ["https://osi-case-study-era1.onrender.com", "http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-auth-token'],
    credentials: true
  }));

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(response);
  app.use('/', home);
  app.use('/authentication/', authentication);
  app.use(jwt);
  app.use(errorMiddleware);
};