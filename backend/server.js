// server.js

const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

// Import routes
const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup (use MongoStore for production)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve all frontend files from root folder (index.html, css/, js/, images/)
app.use(express.static(__dirname));

// API and Admin routes
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

// Fallback route: send index.html for all other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
