import React from 'react';
import { Link } from 'react-router-dom';

function BookmarkedJobs({ bookmarkedJobs, jobs, removeBookmark }) {
  return (
    <div className="bookmarked-jobs">
      <h2>ブックマークした求人</h2>
      {bookmarkedJobs.length === 0 ? (
        <p>ブックマークした求人はありません。</p>
      ) : (
        <ul>
          {bookmarkedJobs.map(bookmarkId => {
            const job = jobs.find(j => j.id === bookmarkId);
            return job ? (
              <li key={job.id}>
                <h3>{job.title}</h3>
                <p>{job.company} - {job.location}</p>
                <Link to={`/job/${job.id}`}>詳細を見る</Link>
                <button onClick={() => removeBookmark(job.id)}>ブックマークを削除</button>
              </li>
            ) : null;
          })}
        </ul>
      )}
    </div>
  );
}

export default BookmarkedJobs;