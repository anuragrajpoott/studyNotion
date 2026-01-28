exports.courseEnrollmentEmail = (courseName, name) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Course Registration Confirmation</title>

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
      margin-bottom: 16px;
      text-align: center;
    }

    .content p {
      margin: 10px 0;
    }

    .highlight {
      font-weight: bold;
    }

    .cta {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 24px;
      background-color: #FFD60A;
      color: #000000;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
    }

    .footer {
      font-size: 14px;
      color: #777777;
      margin-top: 28px;
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

    <div class="title">Course Registration Confirmation</div>

    <div class="content">
      <p>Dear <span class="highlight">${name}</span>,</p>

      <p>
        Congratulations 🎉 You have successfully enrolled in the course
        <span class="highlight">"${courseName}"</span>.
      </p>

      <p>
        You can now access all course materials, track your progress, and start
        learning right away from your dashboard.
      </p>

      <div style="text-align: center;">
        <a
          class="cta"
          href="${process.env.FRONTEND_URL}/dashboard"
        >
          Go to Dashboard
        </a>
      </div>
    </div>

    <div class="footer">
      If you have any questions or need help, contact us at
      <a href="mailto:info@studynotion.com">info@studynotion.com</a>
    </div>
  </div>
</body>
</html>`;
};
