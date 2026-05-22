import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

const APP_VERSION = __APP_VERSION__;

async function clearStaleAssetCache() {
  const storedVersion = window.localStorage.getItem('portfolio-app-version');

  if (!storedVersion) {
    window.localStorage.setItem('portfolio-app-version', APP_VERSION);
    return;
  }

  if (storedVersion === APP_VERSION || window.sessionStorage.getItem('portfolio-cache-cleared')) {
    return;
  }

  window.sessionStorage.setItem('portfolio-cache-cleared', 'true');

  if ('caches' in window) {
    const keys = await window.caches.keys();
    await Promise.all(keys.map((key) => window.caches.delete(key)));
  }

  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));
  }

  window.localStorage.setItem('portfolio-app-version', APP_VERSION);
  window.location.reload();
}

clearStaleAssetCache().catch(() => {
  window.localStorage.setItem('portfolio-app-version', APP_VERSION);
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
