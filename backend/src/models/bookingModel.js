const supabase = require('../config/supabase');

/**
 * Find all active bookings for a room that overlap with the given date range.
 * Overlap condition: existing.check_in < new_check_out AND existing.check_out > new_check_in
 *
 * @param {number} roomId
 * @param {string} checkIn  - ISO date string e.g. "2025-06-01"
 * @param {string} checkOut - ISO date string e.g. "2025-06-05"
 */
const findOverlappingBookings = async (roomId, checkIn, checkOut) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('id, check_in, check_out')
    .eq('room_id', roomId)
    .eq('status', 'confirmed')
    .lt('check_in', checkOut)   // existing.check_in < new_check_out
    .gt('check_out', checkIn);  // existing.check_out > new_check_in

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Create a new booking record.
 * @param {object} bookingData - { room_id, name, phone, email, check_in, check_out }
 */
const createBooking = async (bookingData) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Fetch all bookings for the admin panel, sorted by newest first.
 * Joins with rooms to include room name and type.
 */
const getAllBookings = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      id,
      name,
      phone,
      email,
      check_in,
      check_out,
      status,
      created_at,
      rooms (
        id,
        name,
        type,
        price
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

module.exports = { findOverlappingBookings, createBooking, getAllBookings };
