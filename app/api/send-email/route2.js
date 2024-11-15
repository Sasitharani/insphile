const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, phone, message, fileName } = req.body;

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail SMTP server
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sasitharani@gmail.com', // Replace with your email
      pass: 'xwwhhaozejfdiavv', // Replace with your Google App Password
    },
  });

  // Create the HTML content for the email
  const htmlContent = `
    <h2>You have got an enquiry from Insphile website</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Field</th>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Details</th>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Name</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${name}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Email</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${email}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Phone</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${phone}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Message</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${message}</td>
      </tr>
    </table>
  `;

  // Send mail with defined transport object
  let mailOptions = {
    from: '"Insphile Support" <sasitharani@gmail.com>', // Replace with your email
    to: "hrd@insphile.in, sasitharani@gmail.com", // Multiple recipients
    subject: "New Enquiry from Insphile Website",
    html: htmlContent,
  };

  if (fileName) {
    const filePath = path.join('uploads', fileName);
    mailOptions.attachments = [
      {
        filename: fileName,
        path: filePath,
      },
    ];
  }

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending email' });
  }
});

module.exports = router;