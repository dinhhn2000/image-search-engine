import express from 'express';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

const upload = multer();

// define the endpoint for file upload
router.post('/', upload.single('image'), (req, res) => {
  // read the uploaded file and convert it to base64
  const fileData = req.file.buffer.toString('base64');

  // return the base64-encoded image in the response
  res.send(fileData);
});

export default router;
