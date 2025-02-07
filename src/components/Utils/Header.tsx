import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FaHome, FaBookOpen, FaBookmark, FaSignOutAlt } from "react-icons/fa"; // FaSignOutAltを追加
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
            <li>
              <Link to="/">
                <FaHome className="menu-icon" /> Home
              </Link>
            </li>
            <li>
              <Link to="/reviews">
                <FaBookOpen className="menu-icon" /> Reviews
              </Link>
            </li>
            <li>
              <Link to="/bookmark">
                <FaBookmark className="menu-icon" /> Bookmark
              </Link>
            </li>
            <li>
              <button className="logout-button" onClick={onLogout}>
                <FaSignOutAlt className="menu-icon" /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
