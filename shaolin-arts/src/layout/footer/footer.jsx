import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebook, FaTwitter, FaInstagram, FaSearch } from 'react-icons/fa';
import { AiOutlineCopyrightCircle } from 'react-icons/ai';
import '../footer/footer.css';

 const Footer = () => {
  const [searchInput, setSearchInput] = useState('');

  
  const handleSearch = () => {
    if (searchInput.trim()) {
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchInput)}`;
      window.open(googleSearchUrl, '_blank'); 
    } else {
      alert('Please enter a search term');
    }
  };

  return (
    <footer className="footer">
      <Container>
        <ul className="nav-links">
          <li><Link to="/" className="text-white">Home</Link></li>
          {/* <li><Link to="/about-shaolin" className="text-white">About Shaolin</Link></li> */}
          <li><Link to="/styles" className="text-white">Styles</Link></li>
          <li><Link to="/blog" className="text-white">Blog</Link></li>
          <li><Link to="/contact" className="text-white">Contact Us</Link></li>
        </ul>

        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>

        <div className="search-icon">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchInput} 
            onChange={(e) => setSearchInput(e.target.value)} 
          />
          <a onClick={handleSearch} style={{ cursor: 'pointer' }}><FaSearch /></a>
        </div>

        <div className="copyright">
          <AiOutlineCopyrightCircle /> 2024, Created by SUBHRAJIT ROY
        </div>
      </Container>
    </footer>
  );
};
export default Footer