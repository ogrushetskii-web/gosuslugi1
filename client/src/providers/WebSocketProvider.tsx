import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';

interface WebSocketContextValue {
  status: 'disconnected' | 'connecting' | 'connected';
  lastMessage?: string;
}

const WebSocketContext = createContext<WebSocketContextValue>({ status: 'disconnected' });

export const WebSocketProvider = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('connecting');
  const [lastMessage, setLastMessage] = useState<string>();

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WS_URL || 'ws://localhost:4000/ws');
    ws.onopen = () => setStatus('connected');
    ws.onclose = () => setStatus('disconnected');
    ws.onerror = () => setStatus('disconnected');
    ws.onmessage = (event) => setLastMessage(event.data);

    return () => ws.close();
  }, []);

  const value = useMemo(() => ({ status, lastMessage }), [status, lastMessage]);

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = () => useContext(WebSocketContext);
