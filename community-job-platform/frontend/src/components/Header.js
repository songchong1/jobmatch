import React from 'react';
import { Link } from 'react-router-dom';

function Header({ user, onLogout }) {
  return (
    <header>
      <h1>コミュニティ求人マッチングプラットフォーム</h1>
      <nav>
        <ul>
          <li><Link to="/">ホーム</Link></li>
          {user ? (
            <>
              <li><Link to="/profile">プロフィール</Link></li>
              <li><Link to="/change-password">パスワード変更</Link></li>
              <li><Link to="/messaging">メッセージ</Link></li>
              {user.role === 'employer' ? (
                <>
                  <li><Link to="/manage-jobs">求人管理</Link></li>
                  <li><Link to="/manage-applications">応募管理</Link></li>
                </>
              ) : (
                <li><Link to="/applications">応募履歴</Link></li>
              )}
              <li><button onClick={onLogout}>ログアウト</button></li>
            </>
          ) : (
            <>
              <li><Link to="/register">ユーザー登録</Link></li>
              <li><Link to="/login">ログイン</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;