import React from 'react';
import { Link } from 'react-router-dom';

function JobList({ jobs, onEdit, onDelete, onBookmark, bookmarkedJobs, user }) {
  return (
    <div className="job-list">
      <h2>求人一覧</h2>
      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.company} - {job.location}</p>
            <Link to={`/job/${job.id}`}>詳細を見る</Link>
            {user && user.role === 'jobseeker' && (
              <button onClick={() => onBookmark(job.id)}>
                {bookmarkedJobs.includes(job.id) ? 'ブックマーク解除' : 'ブックマーク'}
              </button>
            )}
            {user && user.role === 'employer' && user.id === job.employerId && (
              <>
                <button onClick={() => onEdit(job.id)}>編集</button>
                <button onClick={() => onDelete(job.id)}>削除</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;