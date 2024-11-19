const express = require('express'); // Import Express framework
const router = express.Router(); // Create a new router instance
const multer = require('multer'); // Import Multer for handling file uploads
const nodemailer = require('nodemailer'); // Import Nodemailer for sending emails


// Define storage strategy for Multer (in-memory storage)
const storage = multer.memoryStorage(); // Store files in memory as Buffer objects

// Initialize Multer with the defined storage strategy
const upload = multer({ storage }); // Configure Multer to use in-memory storage

// Create a Nodemailer transporter using credentials from environment variables
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Gmail SMTP server
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sasitharani@gmail.com', // Replace with your email
    pass: 'joyssxsayiqeaunu' // Email password or app-specific password from .env file
  },
});

// Verify the Nodemailer transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error configuring Nodemailer transporter:', error); // Log any configuration errors
  } else {
    console.log('Nodemailer transporter is ready to send emails'); // Confirmation message when transporter is ready
  }
});

// Define POST route for uploading and sending email
router.post('/', upload.single('file'), (req, res) => { // Ensure Multer middleware is applied here
  console.log('upload.js route accessed'); // Log when the route is accessed
  console.log('Uploaded File:', req.file); // Log the file object
  console.log('Form Data:', req.body); // Log the form data
  const { name, email, phone, message } = req.body;
  const file = req.file; // Access the uploaded file from Multer's middleware

  if (!name || !email || !message) {
    console.error('Missing required fields.');
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }

  if (!file) {
    console.error('No file uploaded.');
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  console.log("File received:", file.originalname);


  // Define email options, including the attached file
  const mailOptions = {
    
    from: process.env.EMAIL_USER, // Sender address from environment variables
    to: 'hrd@insphile.in,sasitharani@gmail.com', // Recipient email address
        subject: 'New Enquiry Form Submission', // Subject of the email
    text: 'Please find the details below:', // Plain text body of the email
    html: `
      <h1>New Feedback Form Submission</h1>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><strong>Name</strong></td>
          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${name}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><strong>Email</strong></td>
          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${email}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><strong>Phone</strong></td>
          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${phone || 'N/A'}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><strong>Message</strong></td>
          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${message}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><strong>Attachment</strong></td>
          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${file ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><strong>Attachment Name</strong></td>
          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${file ? file.originalname : 'N/A'}</td>
        </tr>
      </table>
    `, // HTML body with the table
    attachments: file ? [ // Attach file only if it exists
      {
        filename: file.originalname, // Original name of the uploaded file
        content: file.buffer, // File content stored in memory as Buffer
      },
    ] : [],
  };

  // Send the email with the attached file
  transporter.sendMail(mailOptions, (error, info) => {
    console.log("Error:-"+error)
    console.log("into the transporter of send mail")
    
    if (error) {
      console.error('Error sending email:', error); // Log any errors that occur during email sending
      return res.status(500).json({ message: 'Error sending email' }); // Respond with server error
    } else {
      console.log('Email sent:', info.response); // Log successful email sending
      return res.status(200).json({ message: 'Email sent successfully' }); // Respond with success message
    }
  });
});

module.exports = router; // Export the router to be used in server.js