import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PricingPage from './pages/PricingPage';
import EventTypes from './pages/EventTypes';
import AdminPage from './pages/AdminPage';
import TeamPage from './pages/TeamPage';
import SettingsPage from './pages/SettingsPage';
import ContactPage from './pages/ContactPage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import OAuthDiagnostic from './components/OAuthDiagnostic';
import Navbar from './components/Navbar';

function App() {
  return (
    <Layout>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scheduling" element={<EventTypes />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/oauth-diagnostic" element={<OAuthDiagnostic />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Layout>
  );
}

export default App;