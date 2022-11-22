import sgMail from '@sendgrid/mail';

const { SENDGRID_API_KEY } = process.env;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export default {
  send: async (to: string, subject: string, html: string) => {
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
      .catch(() => {
        hasSend = false;
      });

    return hasSend;
  },
};
