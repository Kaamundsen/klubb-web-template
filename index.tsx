
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import DevToolbar from './components/DevToolbar';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const showAdmin = import.meta.env.DEV || new URLSearchParams(window.location.search).has('admin');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      {showAdmin && <DevToolbar />}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
