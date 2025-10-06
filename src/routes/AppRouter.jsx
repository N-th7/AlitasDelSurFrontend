import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import OrderPage from '../pages/OrderPage';
import Menu from '../pages/Menu';
import UpBar from '../components/upBar/UpBar';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';

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
                    path="/menu" 
                    element={
                        <ProtectedRoute>
                            <Menu />
                        </ProtectedRoute>
                    } 
                />

                {/* Ruta pública */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

const NavbarWrapper = () => {
  const location = useLocation();
  if (location.pathname === "/login") return null;

  return <UpBar />;
};

export default AppRouter;
