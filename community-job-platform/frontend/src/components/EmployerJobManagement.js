import React from 'react';
import { Link } from 'react-router-dom';

function EmployerJobManagement({ jobs, onDelete }) {
  const employerJobs = jobs.filter(job => job.employerId === localStorage.getItem('userId'));

  return (
    <div className="employer-job-management">
      <h2>投稿した求人</h2>
      {employerJobs.length === 0 ? (
        <p>まだ求人を投稿していません。</p>
      ) : (
        <ul>
          {employerJobs.map(job => (
            <li key={job.id}>
              <h3>{job.title}</h3>
              <p>会社: {job.company}</p>
              <p>投稿日: {new Date(job.date).toLocaleDateString()}</p>
              <Link to={`/edit-job/${job.id}`}>編集</Link>
              <button onClick={() => onDelete(job.id)}>削除</button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/post-job">新しい求人を投稿</Link>
    </div>
  );
}

export default EmployerJobManagement;