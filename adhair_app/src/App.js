import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Crudam from './pages/Crudam';
import Product from './pages/Product';
import Login from './pages/login';
import SignUp from './pages/register';
import AdminConfig from './pages/AdminConfiguration'
import Usuarios from "./components/User_Admin";
import Orders from "./components/Orders_Admin";
import OrderView from './components/OrderView';
import OrderNow from './pages/OrderNow';
import ForgotPassword from "./components/ForgotPassword"

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Orders" element={<Orders />} />
        <Route path="Crudam" element={<Crudam />} />
        <Route path="Product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/admin/configuracion" element={<AdminConfig />} />   
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderView />} />
        <Route path="/orderproduct/:id" element={<OrderNow />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="pages/Adhair_product" element={<AdahairProduct />} /> */}
        
      </Routes>
  );
}

export default App;
