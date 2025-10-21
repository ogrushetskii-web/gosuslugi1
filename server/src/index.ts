import http from 'node:http';
import dotenv from 'dotenv';
import { createApp } from './app';
import { initWebSocket } from './websocket/server';

dotenv.config();

const app = createApp();
const port = Number(process.env.PORT ?? 4000);
const server = http.createServer(app);
initWebSocket(server);

server.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
