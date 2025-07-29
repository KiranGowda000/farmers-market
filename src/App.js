 // App.jsx
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FarmerLogin from './components/auth/FarmerLogin';
import ConsumerLogin from './components/auth/ConsumerLogin';
import FarmerDashboard from './components/dashboard/FarmerDashboard';
import ConsumerDashboard from './components/dashboard/ConsumerDashboard';
import { Provider } from 'react-redux';
import store from './redux/store';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Help from './components/Help';
import News from './components/News';
import FarmerRegister from './components/FarmerRegister';
import ConsumerRegister from './components/ConsumerRegister';
import AdminPanel from './components/auth/AdminPanel';
import ConsumerOrderHistory from './components/auth/ConsumerOrderHistory';
import CartPage from './components/CartPage';






const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/farmer-login" element={<FarmerLogin />} />
          <Route path="/consumer-login" element={<ConsumerLogin />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/news" element={<News />} />
          <Route path="/farmer-register" element={<FarmerRegister />} />
          <Route path="/consumer-register" element={<ConsumerRegister />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/consumer-orders" element={<ConsumerOrderHistory />} />
          <Route path="/cart" element={<CartPage />} />








        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
