import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/big-shoulders-display/latin-800';
import '@fontsource/big-shoulders-display/latin-900';
import '@fontsource/hanken-grotesk/latin-400';
import '@fontsource/hanken-grotesk/latin-500';
import '@fontsource/hanken-grotesk/latin-600';
import '@fontsource/dm-mono/latin-400';
import '@fontsource/dm-mono/latin-500';
import './styles/base.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
