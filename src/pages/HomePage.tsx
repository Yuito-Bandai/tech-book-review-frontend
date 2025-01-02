import React from 'react';
import BookList from '../components/Book/BookList.tsx';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  return (
    <body>
      <div className="homepage-container">
        <h1 className="homepage-title">Tech Book Review App</h1>
        <BookList />
      </div>
    </body>
  );
};

export default HomePage;
