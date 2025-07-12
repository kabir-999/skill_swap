const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Import routes
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const app = express();

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('✅ Using MongoDB database');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed, using simple file-based database');
    console.log('📁 Data will be stored in data/users.json');
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// API Documentation
app.get('/', (req, res) => {
  res.json({
    message: 'Skill Swap Platform API',
    version: '1.0.0',
    endpoints: {
      'GET /api/users': 'Get all public user profiles',
      'GET /api/users/:id': 'Get a specific user profile',
      'POST /api/users': 'Create a new user profile',
      'PUT /api/users/:id': 'Update a user profile',
      'DELETE /api/users/:id': 'Delete a user profile',
      'POST /api/auth/signup': 'User signup',
      'POST /api/auth/login': 'User login'
    },
    search: {
      'GET /api/users?skill=javascript': 'Search users by skill',
      'GET /api/users?location=San Francisco': 'Search users by location'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}`);
      console.log(`💾 Database: MongoDB`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer(); 