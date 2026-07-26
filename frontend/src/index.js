import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './index.css';

import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';

import Homepage from './landing_page/home/Homepage';
import Signup from './landing_page/signup/Signup';
import Login from './landing_page/login/Login';

import AboutPage from './landing_page/about/AboutPage';
import ProductsPage from './landing_page/products/ProductsPage';
import PricingPage from './landing_page/pricing/PricingPage';
import SupportPage from './landing_page/support/SupportPage';
import NotFound from './landing_page/NotFound';
import ChatBot from './landing_page/ChatBot';

function Layout() {
  const location = useLocation();

  const hideLayout = location.pathname === "/signup" || location.pathname === "/login";

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideLayout && <Footer />}
      <ChatBot />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);