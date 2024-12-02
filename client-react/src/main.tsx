import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AlertProvider } from './components/alert/alertContext';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AlertProvider>
      <App/>
    </AlertProvider>
  </StrictMode>,
);
