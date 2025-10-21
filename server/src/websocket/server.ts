import { Server } from 'socket.io';
import type { Server as HttpServer } from 'node:http';

export let io: Server | undefined;

export const initWebSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: '*'
    }
  });

  io.on('connection', (socket) => {
    socket.emit('connected', 'Вы подключены к семейным уведомлениям');
  });

  return io;
};

export const broadcastNotification = (payload: { title: string; body: string }) => {
  io?.emit('notification', payload);
};
