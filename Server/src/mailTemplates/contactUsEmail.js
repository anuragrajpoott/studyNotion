exports.contactUsEmail = (
  email,
  firstname,
  lastname,
  message,
  phoneNo,
  countrycode
) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Contact Form Confirmation</title>

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
      margin: 20px 0;
      text-align: center;
    }

    .content p {
      margin: 8px 0;
    }

    .highlight {
      font-weight: bold;
    }

    .box {
      background-color: #f9f9f9;
      padding: 16px;
      border-radius: 6px;
      margin-top: 16px;
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

    <div class="title">Contact Form Confirmation</div>

    <div class="content">
      <p>Dear <span class="highlight">${firstname} ${lastname}</span>,</p>

      <p>
        Thank you for reaching out to us. We have received your message and our
        support team will get back to you as soon as possible.
      </p>

      <div class="box">
        <p><span class="highlight">Name:</span> ${firstname} ${lastname}</p>
        <p><span class="highlight">Email:</span> ${email}</p>
        <p><span class="highlight">Phone:</span> ${countrycode} ${phoneNo}</p>
        <p><span class="highlight">Message:</span></p>
        <p>${message}</p>
      </div>

      <p>
        We appreciate your interest in StudyNotion and look forward to helping
        you.
      </p>
    </div>

    <div class="footer">
      If you need immediate assistance, contact us at
      <a href="mailto:info@studynotion.com">info@studynotion.com</a>
    </div>
  </div>
</body>
</html>`;
};
