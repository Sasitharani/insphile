// server.js

// Import necessary modules
const express = require('express'); // Express framework for building the server
const next = require('next'); // Next.js for server-side rendering and routing
const cors = require('cors'); // CORS middleware to enable Cross-Origin Resource Sharing
const multer = require('multer'); // Multer middleware for handling file uploads in memory
const nodemailer = require('nodemailer'); // Nodemailer for sending emails
require('dotenv').config(); // Load environment variables from .env file

// Import custom routers
const uploadRouter = require('./express/routes/upload-email'); // Adjust the path as necessary


// Determine the environment (development or production)
const dev = process.env.NODE_ENV !== 'production';

// Initialize Next.js app with the determined environment
const app = next({ dev });

// Get Next.js request handler to handle all other routes
const handle = app.getRequestHandler();

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



// Prepare the Next.js app
app.prepare().then(() => {
  const server = express(); // Initialize Express server
  const port = process.env.PORT || 3000; // Define the port number from environment variable or default to 3000

  // Enable CORS with specific settings
  server.use(cors({
    origin: process.env.BASE_URL, // Allow requests only from the specified origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
    credentials: true, // Allow cookies and authentication information in requests
  }));

  // Configure body parsers with increased size limits to handle large payloads
  server.use(express.json({ limit: '50mb' })); // Parse incoming JSON requests with a limit of 50MB
  server.use(express.urlencoded({ limit: '50mb', extended: true })); // Parse incoming URL-encoded requests with a limit of 50MB

 

  // Add logging middleware for /api/upload route to log when it's accessed
  server.use('/api/upload', uploadRouter);

  // Add logging middleware for /api/send-email route to log when it's accessed




  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res); // Delegate request handling to Next.js
  });

  // Start the server and listen on the defined port
  // server.listen(port, '0.0.0.0', (err) => {
  //   if (err) throw err; // Throw an error if server fails to start
  //   console.log(`> Server is running on ${process.env.BASE_URL}`); // Log the server URL as a clickable link
  // });

  server.listen(port, (err) => {
    if (err) throw err; // Throw an error if server fails to start
    console.log(`> Server is running on http://localhost:${port}`); // Log the server URL as a clickable link
  });

  // Verify the Nodemailer transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error configuring Nodemailer transporter:', error); // Log any configuration errors
  } else {
    console.log('Nodemailer transporter is ready to send emails'); // Confirmation message when transporter is ready
  }
});
});