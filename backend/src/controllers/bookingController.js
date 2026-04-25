const { processBooking } = require('../services/bookingService');
const { getAllBookings } = require('../models/bookingModel');

/**
 * POST /api/bookings
 * Creates a new booking after validating dates and checking for conflicts.
 */
const createBooking = async (req, res, next) => {
  try {
    const { room_id, name, phone, email, check_in, check_out } = req.body;

    // Basic field validation
    if (!room_id || !name || !phone || !email || !check_in || !check_out) {
      const err = new Error('All fields are required: room_id, name, phone, email, check_in, check_out.');
      err.statusCode = 400;
      return next(err);
    }

    const { booking, room } = await processBooking({
      room_id: Number(room_id),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      check_in,
      check_out,
    });

    res.status(201).json({
      success: true,
      message: `Booking confirmed for ${room.name}! We look forward to welcoming you.`,
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/bookings
 * Returns all bookings sorted by latest — for Admin Panel.
 */
const listBookings = async (req, res, next) => {
  try {
    const bookings = await getAllBookings();

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createBooking, listBookings };
