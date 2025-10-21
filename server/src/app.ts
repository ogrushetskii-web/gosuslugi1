import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import routes from './routes';

export const createApp = () => {
  const app = express();
  app.use(cors({ origin: '*', credentials: true }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.SESSION_SECRET));
  app.use('/files', express.static(path.resolve(process.cwd(), 'uploads')));
  app.use('/api', routes);

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  return app;
};
