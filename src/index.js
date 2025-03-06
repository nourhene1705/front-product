import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);
