import React from 'react';

function JobDetail({ jobs, onApply, user, onBookmark, bookmarkedJobs }) {
  const job = jobs.find(j => j.id === parseInt(window.location.pathname.split('/')[2]));

  if (!job) {
    return <div>求人が見つかりません。</div>;
  }

  return (
    <div className="job-detail">
      <h2>{job.title}</h2>
      <p><strong>会社:</strong> {job.company}</p>
      <p><strong>場所:</strong> {job.location}</p>
      <p><strong>給与:</strong> {job.salary}円</p>
      <p><strong>雇用形態:</strong> {job.jobType}</p>
      <p><strong>経験レベル:</strong> {job.experienceLevel}</p>
      <p><strong>説明:</strong> {job.description}</p>
      {user && user.role === 'jobseeker' && (
        <>
          <button onClick={() => onApply(job.id)}>応募する</button>
          <button onClick={() => onBookmark(job.id)}>
            {bookmarkedJobs.includes(job.id) ? 'ブックマーク解除' : 'ブックマーク'}
          </button>
        </>
      )}
    </div>
  );
}

export default JobDetail;