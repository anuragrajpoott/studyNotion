const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Verification</title>

  <style>
    body {
      background-color: #ffffff;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: #333333;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 24px;
      text-align: left;
    }

    .header {
      text-align: center;
      margin-bottom: 24px;
    }

    .logo {
      max-width: 180px;
    }

    .title {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 16px;
    }

    .content p {
      margin: 10px 0;
    }

    .otp-box {
      background-color: #f9f9f9;
      border: 1px dashed #cccccc;
      padding: 16px;
      text-align: center;
      margin: 20px 0;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 4px;
    }

    .footer {
      font-size: 14px;
      color: #777777;
      margin-top: 24px;
      text-align: center;
    }

    a {
      color: #0056d2;
      text-decoration: none;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <a href="${process.env.FRONTEND_URL}">
        <img
          class="logo"
          src="https://i.ibb.co/7Xyj3PC/logo.png"
          alt="StudyNotion Logo"
        />
      </a>
    </div>

    <div class="title">OTP Verification</div>

    <div class="content">
      <p>Dear User,</p>

      <p>
        Thank you for signing up with <strong>StudyNotion</strong>.
        Please use the OTP below to verify your email address.
      </p>

      <div class="otp-box">${otp}</div>

      <p>
        This OTP is valid for <strong>5 minutes</strong>.
        If you did not request this verification, you can safely ignore this email.
      </p>

      <p>
        Once verified, you’ll be able to access all features of the platform.
      </p>
    </div>

    <div class="footer">
      Need help? Contact us at
      <a href="mailto:info@studynotion.com">info@studynotion.com</a>
    </div>
  </div>
</body>
</html>`;
};

module.exports = otpTemplate;
