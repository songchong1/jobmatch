import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
    if (user) {
      onLogin(user);
      navigate('/');
    } else {
      alert('メールアドレスまたはパスワードが間違っています。');
    }
  };

  return (
    <div className="login">
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="メールアドレス"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="パスワード"
          required
        />
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}

export default Login;