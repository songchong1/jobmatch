import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'jobseeker' // デフォルトは求職者
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここでユーザー登録のロジックを実装
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = { ...userData, id: Date.now() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('登録が完了しました！');
    navigate('/login'); // ログインページへリダイレクト
  };

  return (
    <div className="register">
      <h2>ユーザー登録</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="ユーザー名"
          required
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="メールアドレス"
          required
        />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="パスワード"
          required
        />
        <select
          name="role"
          value={userData.role}
          onChange={handleChange}
        >
          <option value="jobseeker">求職者</option>
          <option value="employer">雇用者</option>
        </select>
        <button type="submit">登録</button>
      </form>
    </div>
  );
}

export default Register;