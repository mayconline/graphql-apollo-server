import sgMail from '@sendgrid/mail';

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

export const send = async (to, subject, html) => {
  let hasSend = false;

  const msg = {
    to,
    from: 'rebalanceeiapp@gmail.com',
    subject,
    html,
  };

  await sgMail
    .send(msg)
    .then(() => {
      hasSend = true;
    })
    .catch(err => {
      hasSend = false;
    });

  return hasSend;
};
