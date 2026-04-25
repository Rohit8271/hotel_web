const express = require('express');
const { createBooking, listBookings } = require('../controllers/bookingController');

const router = express.Router();

// POST /api/bookings — create a new booking
router.post('/', createBooking);

// GET /api/bookings — list all bookings (admin panel)
router.get('/', listBookings);

module.exports = router;
