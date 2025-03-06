import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Products from '../pages/Products';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/produits" element={<Products />} />
    </Routes>
  );
};

export default AppRoutes;
