const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

router.post('/', (req, res) => {
  const form = new formidable.IncomingForm({
    uploadDir: uploadDir,
    keepExtensions: true,
    maxFileSize: 50 * 1024 * 1024, // 50MB
  });

  form.on('fileBegin', (name, file) => {
    const fileExtension = path.extname(file.originalFilename);
    const originalName = path.basename(file.originalFilename, fileExtension);
    const timestamp = Date.now();
    file.newFilename = `${originalName}.${timestamp}${fileExtension}`;
    file.filepath = path.join(uploadDir, file.newFilename);
    console.log(`File upload started: ${file.filepath}`); // Logging statement
    res.status(200).json({ message: 'File attached successfully', path:file.filepath});
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err); // Logging statement
      return res.status(500).json({ error: 'Error parsing form' });
    }

    console.log('Form parsed successfully:'); // Logging statement
    
  });
});

module.exports = router;