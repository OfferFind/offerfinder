const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo');

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

// Session setup (production safe using MongoDB)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

// Serve public folder (CSS, JS, images, admin pages)
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploads folder if you have file uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API and Admin routes
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

// SPA fallback: serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
