const express = require('express');
const { IncomingForm } = require('formidable');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.post('/', (req, res) => {
  console.log('Upload API hit'); // Logging statement

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
    const fileExtension = path.extname(file.originalFilename);
    const originalName = path.basename(file.originalFilename, fileExtension);
    const timestamp = Date.now();
    file.newFilename = `${originalName}.${timestamp}${fileExtension}`;
    file.filepath = path.join(uploadDir, file.newFilename);
    console.log(`File upload started: ${file.filepath}`); // Logging statement
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err); // Logging statement
      return res.status(500).json({ error: 'Error parsing form' });
    }

    console.log('Form parsed successfully:', fields, files); // Logging statement
    res.status(200).json({ message: 'File uploaded successfully', filePath: files.file[0].filepath });
  });
});

module.exports = router;