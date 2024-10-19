const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: processexample.env.EMAIL_HOST,
  port: processexample.env.EMAIL_PORT,
  auth: {
    user: processexample.env.EMAIL_USER,
    pass: processexample.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: processexample.env.EMAIL_FROM,
      to,
      subject,
      text,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;