import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage.tsx';
import LoginForm from './components/User/LoginForm.tsx';

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
    <div className="App">
      {isLoggedIn ? (
        <HomePage onLogout={handleLogout} />  // HomePageにonLogoutを渡す
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />  // ログインしていない場合はLoginFormを表示
      )}
    </div>
  );
};

export default App;
