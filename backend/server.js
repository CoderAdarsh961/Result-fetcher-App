const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Import path module
const cors = require('cors'); // Import CORS
const app = express();
const PORT = process.env.PORT || 3000;
const Student = require('./model/student'); // Adjust path if needed

// Middleware to parse incoming requests
app.use(express.json());
app.use(cors()); // Use CORS for cross-origin requests

// Serve static files (like your HTML file)
app.use(express.static(path.join(__dirname, '../public'))); // Adjust path to public folder

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://adarshsinha_03:adarshsi961@cluster0.y3qau.mongodb.net/coaching_results?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error(err));


  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.html')); // Adjust the path to access home.html
  });
// API endpoint to fetch results
app.get('/api/results/:roll_number', async (req, res) => {
    try {
      const rollNumber = req.params.roll_number;
      console.log(`Roll number received: ${rollNumber}`); // Log the roll number received
      const student = await Student.findOne({ roll_number: rollNumber.trim() });
      
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.json(student);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
