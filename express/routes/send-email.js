const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', async (req, res) => {
  console.log(req.body);
  const { name, email, phone, message, filePath, fileName } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'sasitharani@gmail.com,hrd@insphile.in', // Replace with your recipient email address
    subject: 'New Enquiry Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    html: '', // Initialize htmlContent here
  };

  // Define htmlContent
  const htmlContent = `
    <h1>New Feedback Form Submission</h1>
    <table style="border-collapse: collapse; width: 100%;">
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
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Attachment</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${filePath ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Attachment Name</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${fileName}</td>
      </tr>
    </table>
  `;

  mailOptions.html = htmlContent;

  // Add attachment if present
  if (filePath && fileName) {
    mailOptions.attachments = [
      {
        filename: fileName, // Name of the file
        path: filePath, // Path to the document
      },
    ];
  }

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Error sending email' });
    }
  }
});

module.exports = router;