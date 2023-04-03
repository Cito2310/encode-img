import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DevApp } from './DevApp';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <DevApp/>
  </React.StrictMode>
);