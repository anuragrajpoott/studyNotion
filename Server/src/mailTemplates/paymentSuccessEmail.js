exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Payment Confirmation</title>

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

    .amount-box {
      background-color: #f1f8ff;
      border-left: 4px solid #0056d2;
      padding: 14px;
      margin: 20px 0;
      font-size: 16px;
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

    <div class="title">Payment Successful 🎉</div>

    <div class="content">
      <p>Hi <span class="highlight">${name}</span>,</p>

      <p>
        Thank you for your payment! We’ve successfully received your transaction.
      </p>

      <div class="amount-box">
        <p><span class="highlight">Amount Paid:</span> ₹${amount}</p>
        <p><span class="highlight">Payment ID:</span> ${paymentId}</p>
        <p><span class="highlight">Order ID:</span> ${orderId}</p>
      </div>

      <p>
        You can now access your enrolled course(s) from your dashboard and start
        learning right away.
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
