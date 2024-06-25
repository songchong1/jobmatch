import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostJob.css';

function PostJob({ addJob }) {
  const [job, setJob] = useState({ title: '', company: '', location: '', description: '', category: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addJob(job);
    navigate('/');
  };

  return (
    <div className="post-job">
      <h2>新しい求人を投稿</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="title" 
          value={job.title} 
          onChange={handleChange} 
          placeholder="職種" 
          required 
        />
        <input 
          type="text" 
          name="company" 
          value={job.company} 
          onChange={handleChange} 
          placeholder="会社名" 
          required 
        />
        <input 
          type="text" 
          name="location" 
          value={job.location} 
          onChange={handleChange} 
          placeholder="勤務地" 
          required 
        />
        <textarea 
          name="description" 
          value={job.description} 
          onChange={handleChange} 
          placeholder="職務内容" 
          required 
        />
        <select
          name="category"
          value={job.category}
          onChange={handleChange}
          required
        >
          <option value="">カテゴリーを選択</option>
          <option value="IT">IT</option>
          <option value="データ">データ</option>
          <option value="デザイン">デザイン</option>
          <option value="マーケティング">マーケティング</option>
          <option value="営業">営業</option>
        </select>
        <button type="submit">投稿する</button>
      </form>
    </div>
  );
}

export default PostJob;