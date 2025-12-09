const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple addition endpoint
app.post('/api/add', (req, res) => {
  try {
    const { num1, num2 } = req.body;
    
    // Validate input
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      return res.status(400).json({
        error: 'Please provide two numbers',
        success: false
      });
    }
    
    const result = num1 + num2;
    
    res.json({
      success: true,
      result: result,
      message: `${num1} + ${num2} = ${result}`
    });
    
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
      success: false
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the frontend build directory
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  POST http://localhost:${PORT}/api/add`);
  console.log(`  GET  http://localhost:${PORT}/api/health`);
  console.log(`  GET  http://localhost:${PORT}/api/test`);
});