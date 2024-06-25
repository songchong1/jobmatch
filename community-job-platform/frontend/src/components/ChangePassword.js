import React, { useState } from 'react';

function ChangePassword({ onChangePassword }) {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('新しいパスワードと確認用パスワードが一致しません。');
      return;
    }

    onChangePassword(passwords.currentPassword, passwords.newPassword)
      .then(() => {
        alert('パスワードが正常に変更されました。');
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <div className="change-password">
      <h2>パスワード変更</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="currentPassword">現在のパスワード：</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">新しいパスワード：</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">新しいパスワード（確認）：</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">パスワードを変更</button>
      </form>
    </div>
  );
}

export default ChangePassword;