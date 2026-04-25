/**
 * BookingTable — Admin panel table displaying all bookings.
 * @param {Array} bookings - Array of booking objects from API
 * @param {boolean} loading
 */
export default function BookingTable({ bookings, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-gold-300 border-t-gold-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <span className="text-4xl block mb-3">📋</span>
        No bookings found.
      </div>
    );
  }

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const formatDateTime = (dateStr) =>
    new Date(dateStr).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });

  const nights = (checkIn, checkOut) =>
    Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
      <table className="w-full text-sm" id="admin-bookings-table">
        <thead>
          <tr className="bg-navy-700 text-white">
            <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider">#</th>
            <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider">Guest</th>
            <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider">Contact</th>
            <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider">Room</th>
            <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider">Dates</th>
            <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider">Nights</th>
            <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider">Total</th>
            <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider">Booked At</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {bookings.map((booking, idx) => (
            <tr key={booking.id} className="bg-white hover:bg-gold-50/40 transition-colors">
              <td className="px-4 py-3 text-gray-400 font-mono text-xs">{idx + 1}</td>
              <td className="px-4 py-3">
                <p className="font-semibold text-navy-700">{booking.name}</p>
              </td>
              <td className="px-4 py-3">
                <p className="text-gray-600">{booking.phone}</p>
                <p className="text-gray-400 text-xs">{booking.email}</p>
              </td>
              <td className="px-4 py-3">
                <p className="font-medium text-charcoal">{booking.rooms?.name || `Room #${booking.room_id}`}</p>
                <p className="text-xs text-gray-400">{booking.rooms?.type}</p>
              </td>
              <td className="px-4 py-3">
                <p className="text-xs text-gray-600">
                  <span className="font-medium">In:</span> {formatDate(booking.check_in)}
                </p>
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Out:</span> {formatDate(booking.check_out)}
                </p>
              </td>
              <td className="px-4 py-3 text-center font-semibold text-navy-700">
                {nights(booking.check_in, booking.check_out)}
              </td>
              <td className="px-4 py-3 font-semibold text-gold-600">
                ₹{(nights(booking.check_in, booking.check_out) * Number(booking.rooms?.price || 0)).toLocaleString('en-IN')}
              </td>
              <td className="px-4 py-3">
                <span className={booking.status === 'confirmed' ? 'badge-available' : 'badge-booked'}>
                  {booking.status}
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                {formatDateTime(booking.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
