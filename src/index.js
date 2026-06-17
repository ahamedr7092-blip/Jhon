/**
 * Jhon - Main Application Entry Point (SaaS Version)
 * 
 * This is the main entry point for the Jhon SaaS application.
 * It initializes the core components, connects to MongoDB, and starts the application.
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Import routes
const jokeRoutes = require('./routes/jokeRoutes');
const todoRoutes = require('./routes/todoRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Import middleware
const { protect } = require('./middleware/authMiddleware');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jhon';

// Security Middleware
app.use(helmet());
app.use(cors());

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/jokes', jokeRoutes);
app.use('/api/todos', protect, todoRoutes); // Todos require authentication
app.use('/api/weather', weatherRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Jhon - Premium Task & Weather Management',
    version: '2.0.0',
    status: 'running',
    services: {
      'Authentication': '/api/auth',
      'Payments & Subscriptions': '/api/payments',
      'Todo List': '/api/todos',
      'Joke Generator': '/api/jokes',
      'Weather Dashboard': '/api/weather'
    },
    endpoints: {
      health: '/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/me',
        update_profile: 'PUT /api/auth/profile',
        change_password: 'PUT /api/auth/change-password'
      },
      payments: {
        plans: 'GET /api/payments/plans',
        subscribe: 'POST /api/payments/subscribe',
        subscription: 'GET /api/payments/subscription',
        cancel: 'DELETE /api/payments/subscription'
      },
      todos: {
        get_all: 'GET /api/todos',
        create: 'POST /api/todos'
      },
      jokes: {
        random: 'GET /api/jokes/random'
      },
      weather: {
        current: 'GET /api/weather/current?city=London'
      }
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Route ${req.path} not found`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Jhon SaaS running on port ${PORT}`);
  console.log(`📍 Access at http://localhost:${PORT}`);
  console.log(`🔐 Authentication at http://localhost:${PORT}/api/auth`);
  console.log(`💳 Payments at http://localhost:${PORT}/api/payments/plans`);
  console.log(`📝 Todos at http://localhost:${PORT}/api/todos`);
  console.log(`🌤️  Weather at http://localhost:${PORT}/api/weather`);
});

module.exports = app;
