import React from 'react';

function ApplicationHistory({ applications, jobs }) {
  return (
    <div className="application-history">
      <h2>応募履歴</h2>
      {applications.length === 0 ? (
        <p>まだ応募していません。</p>
      ) : (
        <ul>
          {applications.map(app => {
            const job = jobs.find(j => j.id === app.jobId);
            return (
              <li key={app.id}>
                <h3>{job ? job.title : '削除された求人'}</h3>
                <p>会社: {job ? job.company : 'N/A'}</p>
                <p>応募日: {new Date(app.applicationDate).toLocaleDateString()}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ApplicationHistory;