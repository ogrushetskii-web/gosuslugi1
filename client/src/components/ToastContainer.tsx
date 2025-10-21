import { useEffect, useState } from 'react';
import { useWebSocket } from '../providers/WebSocketProvider';

const ToastContainer = () => {
  const { lastMessage } = useWebSocket();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (lastMessage) {
      setMessages((prev) => [...prev.slice(-3), lastMessage]);
    }
  }, [lastMessage]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {messages.map((message, index) => (
        <div
          key={`${message}-${index}`}
          className="pointer-events-auto rounded-xl bg-white px-6 py-4 text-sm text-text-primary shadow-lg shadow-indigo-500/20 card-hover dark:bg-slate-800"
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
