const dotenv = require('dotenv');
dotenv.config(); // ✅ Must be FIRST

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');

const app = express(); // ✅ Initialize app before use

// ✅ Enable CORS for frontend at 127.0.0.1:5500
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Configure session (must be before passport.session)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,          // ✅ false for HTTP (localhost dev)
    sameSite: 'lax'         // ✅ Lax is recommended for dev
  }
}));

// ✅ Passport strategies
require('./config/passport');

// ✅ Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.use('/auth', authRoutes);
app.use('/bookings', bookingRoutes);

// ✅ Debug environment
console.log("✅ ENV TEST:");
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("SESSION_SECRET:", process.env.SESSION_SECRET);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
