import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import LoginForm from './components/User/LoginForm.tsx';
import BookList from './components/Book/BookList.tsx'; // BookListのインポート
import BookDetails from './components/Book/BookDetail.tsx';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // 初期化時にlocalStorageからトークンをチェック
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
          {/* ログインしていない場合はLoginFormを表示 */}
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />

          {/* ログインしている場合はHomePageを表示 */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <HomePage onLogout={handleLogout} />
              ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
              )
            }
          />

          {/* 本のリストページ */}
          <Route path="/books" element={<BookList />} />

          {/* 本の詳細ページ */}
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
