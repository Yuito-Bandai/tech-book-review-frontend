import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import LoginForm from './components/User/LoginForm.tsx';
import BookList from './components/Book/BookList.tsx';
import BookDetails from './components/Book/BookDetail.tsx';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // トークンを削除
    setIsLoggedIn(false);  // ログイン状態をfalseに
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
          <Route
            path="/"
            element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <LoginForm onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/books" element={<BookList />} />
          <Route
            path="/books/:id"
            element={isLoggedIn ? <BookDetails onLogout={handleLogout} /> : <LoginForm onLoginSuccess={handleLoginSuccess} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
