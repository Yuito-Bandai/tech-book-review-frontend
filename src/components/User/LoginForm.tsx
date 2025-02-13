import React, { useState } from 'react';
import '../../styles/User/LoginForm.css';

interface LoginFormProps {
  onLoginSuccess: () => void;  // ログイン成功時に呼ばれる関数
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // APIにログインリクエストを送信
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`//nullで問題ない
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      // レスポンスからトークンを取得
      const data = await response.json();

      // トークンをlocalStorageに保存
      localStorage.setItem('token', data.token);

      // ログイン成功時に親コンポーネントに通知
      onLoginSuccess();
    } catch (err) {
      console.error("Login error: ", err);  // エラーの詳細をログに出力
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
