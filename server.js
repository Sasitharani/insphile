// server.js
const express = require('express');
const next = require('next');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Import the cors middleware
const uploadRouter = require('./express/routes/upload');
const sendEmailRouter = require('./express/routes/send-email'); // Import the send-email router
require('dotenv').config(); // Load environment variables from .env file

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const port = process.env.PORT || 3000;

  // Use the cors middleware
  server.use(cors());

  // Ensure the upload directory exists
  const uploadDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Serve static files from the upload directory
  server.use('/uploads', express.static(uploadDir));

  // Configure body size limit
  server.use(express.json({ limit: '25mb' })); // Adjust the limit as needed
  server.use(express.urlencoded({ limit: '25mb', extended: true })); // Adjust the limit as needed

  // Use the upload router
  server.use('/api/upload', (req, res, next) => {
    console.log('Upload route hit'); // Logging statement
    next();
  }, uploadRouter);

  // Use the send-email router
  server.use('/api/send-email', (req, res, next) => {
    console.log('Send Email route hit'); // Logging statement
    next();
  }, sendEmailRouter);

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    console.log(`Handling request for ${req.url}`); // Logging statement
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${port}`);
  });
});
