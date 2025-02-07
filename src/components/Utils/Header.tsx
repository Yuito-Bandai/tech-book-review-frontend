import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FaHome, FaBookOpen, FaBookmark, FaSignOutAlt } from "react-icons/fa";
import "../../styles/Header.css";

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // メニューの参照を作成

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // メニュー外をクリックしたら閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="navbar">
      <div className="navbar-container" ref={menuRef}>
        <h1 className="homepage-title">Tech Book Review App</h1>
        <button className="hamburger-menu" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <nav className={`menu ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <FaHome className="menu-icon" /> Home
              </Link>
            </li>
            <li>
              <Link to="/reviews" onClick={() => setIsMenuOpen(false)}>
                <FaBookOpen className="menu-icon" /> Reviews
              </Link>
            </li>
            <li>
              <Link to="/bookmark" onClick={() => setIsMenuOpen(false)}>
                <FaBookmark className="menu-icon" /> Bookmark
              </Link>
            </li>
            <li>
              <button className="logout-button" onClick={() => { onLogout(); setIsMenuOpen(false); }}>
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
