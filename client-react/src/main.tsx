import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { AlertProvider } from './components/alert/alertContext.tsx';
import AlertComponent from './components/alert/AlertComponent.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AlertProvider>
      <App />
      <AlertComponent />
    </AlertProvider>
  </StrictMode>,
)
