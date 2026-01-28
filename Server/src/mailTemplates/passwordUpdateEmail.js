exports.passwordUpdated = (email, name) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Update Confirmation</title>

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

    .highlight {
      font-weight: bold;
    }

    .alert-box {
      background-color: #fff4e5;
      border-left: 4px solid #ff9800;
      padding: 12px;
      margin: 20px 0;
      font-size: 15px;
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

    <div class="title">Password Updated Successfully</div>

    <div class="content">
      <p>Hi <span class="highlight">${name}</span>,</p>

      <p>
        This is a confirmation that the password for your account associated
        with <span class="highlight">${email}</span> has been successfully updated.
      </p>

      <div class="alert-box">
        ⚠️ If you did not make this change, please reset your password immediately
        and contact our support team to secure your account.
      </div>

      <p>
        Keeping your account secure is important to us. We recommend using a
        strong, unique password and not sharing it with anyone.
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
