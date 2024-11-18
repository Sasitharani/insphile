const express = require('express');
const { IncomingForm } = require('formidable');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.post('/', (req, res) => {
  console.log('Request received in api/upload'); // Debugging statement

  const form = new IncomingForm();
  const uploadDir = path.join(__dirname, '../../uploads');

  // Ensure the upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  form.uploadDir = uploadDir; // Set the upload directory
  form.keepExtensions = true; // Keep file extensions

  // Customize the filename to include the original file name, upload time, and original extension
  form.on('fileBegin', (name, file) => {
    console.log('working')
    const fileExtension = path.extname(file.originalFilename);
    const originalName = path.basename(file.originalFilename, fileExtension);
    const timestamp = Date.now();
    file.newFilename = `${originalName}.${timestamp}${fileExtension}`;
    file.filepath = path.join(uploadDir, file.newFilename);
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err); // Debugging statement
      return res.status(500).json({ error: 'Error parsing form' });
    }

    console.log('Form parsed successfully:', fields, files); // Debugging statement
    res.status(200).json({ message: 'Form parsed successfully', fields, files });
  });
});

module.exports = router;