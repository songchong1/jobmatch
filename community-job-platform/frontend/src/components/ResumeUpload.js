import React, { useState } from 'react';

function ResumeUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      // 実際のアプリケーションでは、ここでファイルをサーバーにアップロードします
      // この例では、ファイル名とサイズをシミュレーションのためにオブジェクトとして渡します
      onUpload({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      });
    }
  };

  return (
    <div className="resume-upload">
      <h2>レジュメのアップロード</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
        <button type="submit" disabled={!file}>アップロード</button>
      </form>
    </div>
  );
}

export default ResumeUpload;