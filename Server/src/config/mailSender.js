const nodemailer = require("nodemailer");

/**
 * Sends an email using Nodemailer
 * @param {string} email - recipient email
 * @param {string} subject - email subject
 * @param {string} body - html body
 */
const mailSender = async (email, subject, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: email,
      subject,
      html: body,
    });

    console.log("📧 Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email send failed:", error.message);
    throw error;
  }
};

module.exports = mailSender;
