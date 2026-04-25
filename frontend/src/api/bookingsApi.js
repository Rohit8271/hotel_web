import api from './axiosInstance';

/**
 * Create a new booking.
 * @param {object} bookingData - { room_id, name, phone, email, check_in, check_out }
 */
export const createBooking = async (bookingData) => {
  const { data } = await api.post('/bookings', bookingData);
  return data;
};

/**
 * Fetch all bookings (admin panel).
 */
export const fetchAllBookings = async () => {
  const { data } = await api.get('/bookings');
  return data;
};
