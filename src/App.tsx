import React, { useState } from 'react';
import HomePage from './pages/HomePage.tsx';
import LoginForm from './components/User/LoginForm.tsx';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);  // ログイン状態を管理

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);  // ログイン成功時に状態を更新
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <HomePage />
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;
