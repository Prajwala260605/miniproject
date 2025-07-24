const express = require('express');
const router = express.Router(); // ✅ Required to make router work
const Booking = require('../models/Booking');

router.post('/book', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  try {
    const { state, date, tickets, contactInfo, totalAmount, paymentMethod } = req.body;

    const booking = new Booking({
      state,
      date,
      tickets,
      contactInfo,
      totalAmount,
      paymentMethod,
      userId: req.user._id,
      bookingId: 'BK' + Date.now()
    });

    await booking.save();
    res.status(201).json({ message: 'Booking confirmed', bookingId: booking.bookingId });

  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router; // ✅ Export it so server.js can use it
