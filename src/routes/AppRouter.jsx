import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import OrderPage from '../pages/OrderPage';
import Menu from '../pages/Menu';
import UpBar from '../components/organism/upBar/UpBar';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import ProductsPage from '../pages/ProductsPage';
import CategoriesPage from '../pages/CategoriesPage';
import OrdersPage from '../pages/OrdersPage';
import CashClosingPage from '../pages/CashClosingPage';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-lg text-white mb-6">
        Oops... La página que buscas no existe.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#664631] text-white rounded-lg shadow hover:bg-[#a46d47] transition duration-200"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <NavbarWrapper />
      <Routes>
        {/* Rutas protegidas */}
        <Route
          path="/pedido"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/categorias'
          element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cierre-caja"
          element={
            <ProtectedRoute>
              <CashClosingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productos"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pedidos"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        {/* Ruta pública */}
        <Route path="/" element={<Login />} />

        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const NavbarWrapper = () => {
  const location = useLocation();
  if (location.pathname === "/") return null;

  return <UpBar />;
};

export default AppRouter;
