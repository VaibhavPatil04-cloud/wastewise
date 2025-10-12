import React from 'react';
import { Link } from 'react-router-dom';
import { FaRecycle, FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer id="footer" className="premium-footer">
      <div className="footer-content">
        {/* Footer Grid */}
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <FaRecycle className="footer-logo-icon" />
              <h3 className="footer-logo-text">WasteWise</h3>
            </div>
            <p className="footer-tagline">
              AI-powered waste classification for a sustainable future. 
              Making recycling easy and accessible for everyone.
            </p>
            <div className="footer-social">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaTwitter />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/how-it-works" className="footer-link">How It Works</Link>
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
          </div>

          {/* Resources */}
          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <div className="footer-links">
              <Link to="/guides" className="footer-link">Recycling Guides</Link>
              <Link to="/tips" className="footer-link">Eco Tips</Link>
              <Link to="/faq" className="footer-link">FAQ</Link>
              <Link to="/blog" className="footer-link">Blog</Link>
            </div>
          </div>

          {/* Legal */}
          <div className="footer-section">
            <h4 className="footer-heading">Legal</h4>
            <div className="footer-links">
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
              <Link to="/terms" className="footer-link">Terms of Service</Link>
              <Link to="/cookies" className="footer-link">Cookie Policy</Link>
              <Link to="/disclaimer" className="footer-link">Disclaimer</Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} WasteWise. All rights reserved.
          </p>
          <p className="footer-developer">
            Developed by <span className="developer-name">Vaibhav</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
