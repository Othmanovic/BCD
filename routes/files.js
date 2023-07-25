const express = require("express");
const router = express.Router();
const multer = require('multer');
const File = require('../models/file');
const fs = require('fs');
const readline = require('readline');
const { promisify } = require('util');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
    fileFilter: function (req, file, cb) {
      // Only allow txt files
      if (file.mimetype === 'text/plain') {
        cb(null, true);
      } else {
        cb(new Error('Only .txt files are allowed!'), false);
      }
    }
  });

const upload = multer({ storage });

// Handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file received' });
    }

    const fileData = {
        filename: req.file.filename,
        path: req.file.path,
    };

    // Save file details to MongoDB
    File.create(fileData)
    .then((file) => {
      res.json({ message: 'File uploaded successfully!', file });
    })
    .catch((err) => {
      console.error('Error saving file to database:', err);
      return res.status(500).json({ message: 'Error saving file to database' });
    });
});

router.get('/search', async (req, res) => {
  try {
    const query = req.query.query;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const filePath = 'uploads/' + req.query.filename; // Assuming you are sending the filename in the query

    // Read the content of the file using promisify to handle asynchronous reading
    const readFile = promisify(fs.readFile);
    const fileContent = await readFile(filePath, 'utf-8');

    // Split the file content into lines
    const lines = fileContent.split('\n');

    // Extract card information from each line and filter based on search query
    const searchData = lines
      .map(line => line.split('|'))
      .filter(fields => fields.length >= 3)
      .map(fields => ({
        accountNumber: fields[2].trim(),
        cardNumber: fields[1].trim(),
        cardHolderName: fields[8].trim(),
        // Add other fields as needed
      }))
      .filter(item => {
        return (
          item.accountNumber.includes(query) ||
          item.cardNumber.includes(query) ||
          item.cardHolderName.includes(query)
          // Add other conditions as needed
        );
      });

    // Return the filtered card information
    res.json({ cardInfo: searchData });
  } catch (error) {
    console.error('Error searching cards:', error);
    res.status(500).json({ message: 'Error searching cards' });
  }
});

module.exports = router;