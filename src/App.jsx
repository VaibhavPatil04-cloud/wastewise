import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocaleProvider } from './context/LocaleContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ItemDetail from './components/ItemDetail';
import UpcyclingTips from './components/UpcyclingTips';
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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/tips" element={<UpcyclingTips />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </LocaleProvider>
  );
}

export default App;
