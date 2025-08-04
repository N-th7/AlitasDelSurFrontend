import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderPage from '../pages/OrderPage';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/order" element={<OrderPage />} />

            </Routes>
        </Router>
    );
};

export default AppRouter;