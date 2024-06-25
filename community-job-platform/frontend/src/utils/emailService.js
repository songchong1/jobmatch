// メール送信をシミュレートする関数
export const sendEmail = (to, subject, body) => {
  console.log(`メール送信:
    宛先: ${to}
    件名: ${subject}
    本文: ${body}`);
};

// 新しい求人のメール通知
export const sendNewJobNotification = (job, subscribers) => {
  subscribers.forEach(subscriber => {
    sendEmail(
      subscriber.email,
      '新しい求人が投稿されました',
      `新しい求人「${job.title}」が${job.company}から投稿されました。詳細を確認してください。`
    );
  });
};

// 新しい応募のメール通知
export const sendNewApplicationNotification = (application, job, employer) => {
  sendEmail(
    employer.email,
    '新しい応募がありました',
    `求人「${job.title}」に新しい応募がありました。応募者: ${application.applicantName}`
  );
};

// 応募ステータス更新のメール通知
export const sendApplicationStatusUpdateNotification = (application, job, applicant) => {
  sendEmail(
    applicant.email,
    '応募ステータスが更新されました',
    `求人「${job.title}」への応募のステータスが「${application.status}」に更新されました。`
  );
};