import React, { useState } from 'react';
import ResumeUpload from './ResumeUpload';

function UserProfile({ user, onUpdateUser }) {
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(editedUser);
    setEditing(false);
  };

  const handleResumeUpload = (resumeData) => {
    onUpdateUser({ ...user, resume: resumeData });
  };

  return (
    <div className="user-profile">
      <h2>ユーザープロフィール</h2>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={editedUser.username}
            onChange={handleChange}
            placeholder="ユーザー名"
          />
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            placeholder="メールアドレス"
          />
          <button type="submit">保存</button>
          <button type="button" onClick={() => setEditing(false)}>キャンセル</button>
        </form>
      ) : (
        <div>
          <p><strong>ユーザー名:</strong> {user.username}</p>
          <p><strong>メールアドレス:</strong> {user.email}</p>
          <p><strong>役割:</strong> {user.role === 'employer' ? '雇用者' : '求職者'}</p>
          <button onClick={() => setEditing(true)}>編集</button>
        </div>
      )}
      {user.role === 'jobseeker' && (
        <div>
          <h3>レジュメ</h3>
          {user.resume ? (
            <div>
              <p>ファイル名: {user.resume.name}</p>
              <p>サイズ: {Math.round(user.resume.size / 1024)} KB</p>
              <p>最終更新: {new Date(user.resume.lastModified).toLocaleString()}</p>
            </div>
          ) : (
            <p>レジュメがアップロードされていません。</p>
          )}
          <ResumeUpload onUpload={handleResumeUpload} />
        </div>
      )}
    </div>
  );
}

export default UserProfile;