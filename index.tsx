
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import DevToolbar from './components/DevToolbar';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Dev-mode - ikke legg til padding siden toolbar er minimert som standard

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      {import.meta.env.DEV && <DevToolbar />}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
