import React from 'react';

function ApplicationManagement({ applications, jobs, onUpdateStatus }) {
  return (
    <div className="application-management">
      <h2>応募管理</h2>
      {applications.length === 0 ? (
        <p>応募はありません。</p>
      ) : (
        <ul>
          {applications.map(app => {
            const job = jobs.find(j => j.id === app.jobId);
            return (
              <li key={app.id}>
                <h3>{job ? job.title : '削除された求人'}</h3>
                <p>応募者: {app.applicantName}</p>
                <p>応募日: {new Date(app.applicationDate).toLocaleDateString()}</p>
                <p>ステータス: {app.status}</p>
                {app.status === 'pending' && (
                  <div>
                    <button onClick={() => onUpdateStatus(app.id, 'approved')}>承認</button>
                    <button onClick={() => onUpdateStatus(app.id, 'rejected')}>拒否</button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ApplicationManagement;