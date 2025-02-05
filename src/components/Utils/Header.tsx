import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Header.css";

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="homepage-title">Tech Book Review App</h1>
        <button className="hamburger-menu" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <nav className={`menu ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/bookmark">Bookmark</Link></li>
            <li><button onClick={onLogout}>Logout</button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
