const express = require('express');
const nodemailer = require('nodemailer');
const { IncomingForm } = require('formidable');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/', (req, res) => {
  console.log("Send Resume API hit"); // Logging statement

  const form = new IncomingForm();
  form.keepExtensions = true; // Keep file extensions
  form.uploadDir = path.join(__dirname, '../../uploads'); // Set upload directory

  form.on('fileBegin', (name, file) => {
    console.log('File upload started:', file); // Log file upload start
  });

  form.on('file', (name, file) => {
    console.log('File uploaded:', file); // Log file upload completion
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err); // Logging statement
      return res.status(500).json({ error: 'Error parsing form' });
    }

    const { email, subject, body } = fields;
    console.log('Parsed fields:', fields); // Log the parsed fields
    console.log('Parsed files:', files); // Log the parsed files

    // Check if files object contains the file
    if (!files || !files.file || !files.file[0]) {
      console.error('File is undefined in files object'); // Logging statement
      return res.status(400).json({ error: 'File is undefined in files object' });
    }

    const file = files.file[0];
    console.log('Parsed file:', file); // Log the parsed file information

    // Check if file and file.filepath are defined
    if (!file.filepath) {
      console.error('Filepath is undefined'); // Logging statement
      return res.status(400).json({ error: 'Filepath is undefined' });
    }

    console.log('File path:', file.filepath); // Log the file path

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

    try {
      // Send mail with defined transport object
      let info = await transporter.sendMail({
        from: `"Inshphile Enquiry form" <sasitharani@gmail.com>`, // Sender address
        to: email, // List of receivers
        subject: subject, // Subject line
        text: body, // Plain text body
        attachments: [
          {
            filename: file.originalFilename, // Name of the file
            path: file.filepath, // Path to the file on the server
          },
        ],
      });

      console.log('Message sent: %s', info.messageId); // Debugging statement
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error); // Logging statement
      res.status(500).json({ error: 'Error sending email' });
    }
  });
});

module.exports = router;