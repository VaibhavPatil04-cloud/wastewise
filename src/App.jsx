import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocaleProvider } from './context/LocaleContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ItemDetail from './components/ItemDetail';
import UpcyclingTips from './components/UpcyclingTips';
import UpcyclingTipsPage from './components/UpcyclingTipsPage';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      offset: 100,
      anchorPlacement: 'top-bottom',
    });
  }, []);

  return (
    <LocaleProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/item/:category" element={<ItemDetail />} />
          <Route path="/upcycling-tips" element={<UpcyclingTipsPage />} />
        </Routes>
        <Footer />
      </Router>
    </LocaleProvider>
  );
}

export default App;
