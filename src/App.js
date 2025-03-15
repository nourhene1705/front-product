import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
// Test commit

function App() {
  return (
    <div>
      <Header /> 
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Footer /> 
    </div>
  );
}

export default App;

