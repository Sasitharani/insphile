const express = require('express'); // Import Express framework
const router = express.Router(); // Create a new router instance
const nodemailer = require('nodemailer'); // Import Nodemailer for sending emails

// Create a Nodemailer transporter using credentials from environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail as the email service provider
  auth: {
    user: process.env.EMAIL_USER, // Email address from .env file
    pass: process.env.EMAIL_PASS, // Email password or app-specific password from .env file
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

// Define POST route for file uploads
router.post('/', (req, res) => {
  console.log('upload.js hit'); // Log when the route is accessed
  const { name, email, phone, message, filePath, fileName } = req.body;
  const file = req.file; // Access the uploaded file from Multer's middleware
  console.log("into the transporter")
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' }); // Respond with error if no file is found
  }

  // Define email options, including the attached file
  const mailOptions = {
    
    from: process.env.EMAIL_USER, // Sender address from environment variables
    to: 'sasitharani@gmail.com', // Recipient email address
    subject: 'File Upload', // Subject of the email
    text: 'Please find the attached file.', // Plain text body of the email
    html: '', // Initialize htmlContent here
    attachments: [
      {
        filename: file.originalname, // Original name of the uploaded file
        content: file.buffer, // File content stored in memory as Buffer
      },
    ],
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

  // Send the email with the attached file
  transporter.sendMail(mailOptions, (error, info) => {
    console.log("into the transporter")
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