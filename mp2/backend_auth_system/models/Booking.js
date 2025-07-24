const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  state: String,
  museumName: String,
  date: String,
  timeSlot: String,
  tickets: {
    adult: Number,
    child: Number,
    student: Number,
    foreigner: Number
  },
  contactInfo: {
    name: String,
    email: String,
    phone: String
  },
  totalAmount: Number,
  paymentMethod: String,
  bookingId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
