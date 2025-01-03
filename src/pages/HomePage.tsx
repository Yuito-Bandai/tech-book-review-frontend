import React, { useState } from 'react';
import BookList from '../components/Book/BookList.tsx';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <h1 className="homepage-title">Tech Book Review App</h1>
          <button className="hamburger-menu" onClick={toggleMenu}>
            ☰
          </button>
          <nav className={`menu ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="homepage-container">
        <BookList />
      </main>
    </>
  );
};

export default HomePage;
