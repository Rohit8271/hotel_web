const { findOverlappingBookings, createBooking } = require('../models/bookingModel');
const { getRoomById } = require('../models/roomModel');

/**
 * Custom error class for booking conflicts.
 */
class BookingConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.name = 'BookingConflictError';
  }
}

/**
 * Validates that the check-in is before check-out.
 * @param {string} checkIn
 * @param {string} checkOut
 */
const validateDates = (checkIn, checkOut) => {
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(inDate.getTime()) || isNaN(outDate.getTime())) {
    const err = new Error('Invalid date format. Please use YYYY-MM-DD.');
    err.statusCode = 400;
    throw err;
  }
  if (inDate < today) {
    const err = new Error('Check-in date cannot be in the past.');
    err.statusCode = 400;
    throw err;
  }
  if (outDate <= inDate) {
    const err = new Error('Check-out date must be after check-in date.');
    err.statusCode = 400;
    throw err;
  }
};

/**
 * Core booking service — validates, checks overlap, and creates the booking.
 * @param {object} payload - { room_id, name, phone, email, check_in, check_out }
 * @returns {object} The created booking record
 */
const processBooking = async (payload) => {
  const { room_id, name, phone, email, check_in, check_out } = payload;

  // 1. Validate dates
  validateDates(check_in, check_out);

  // 2. Verify the room exists
  const room = await getRoomById(room_id);
  if (!room) {
    const err = new Error(`Room with id ${room_id} not found.`);
    err.statusCode = 404;
    throw err;
  }

  // 3. Check for overlapping bookings (critical double-booking prevention)
  //    Condition: existing.check_in < new_check_out AND existing.check_out > new_check_in
  const overlaps = await findOverlappingBookings(room_id, check_in, check_out);
  if (overlaps.length > 0) {
    throw new BookingConflictError(
      `Room "${room.name}" is already booked for the selected dates. ` +
      `Please choose different dates or a different room.`
    );
  }

  // 4. Create the booking
  const booking = await createBooking({ room_id, name, phone, email, check_in, check_out });

  return { booking, room };
};

module.exports = { processBooking };
