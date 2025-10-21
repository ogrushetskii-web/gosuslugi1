import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './i18n';
import { ThemeProvider } from './providers/ThemeProvider';
import { WebSocketProvider } from './providers/WebSocketProvider';
import { registerServiceWorker } from './utils/registerSW';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <WebSocketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WebSocketProvider>
    </ThemeProvider>
  </React.StrictMode>
);

registerServiceWorker();
