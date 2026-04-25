import { useState, useEffect, useCallback } from 'react';
import { fetchRooms } from '../api/roomsApi';
import { fetchAllBookings } from '../api/bookingsApi';
import RoomCard from '../components/RoomCard';
import FilterBar from '../components/FilterBar';
import BookingModal from '../components/BookingModal';

/**
 * Helper: Check if a room has any confirmed booking overlapping today's date or after.
 * We show availability as "currently booked" if any active booking covers today.
 */
const isRoomCurrentlyBooked = (roomId, bookings) => {
  const today = new Date().toISOString().split('T')[0];
  return bookings.some(
    (b) =>
      b.room_id === roomId &&
      b.status === 'confirmed' &&
      b.check_in <= today &&
      b.check_out > today
  );
};

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ type: '', minPrice: '', maxPrice: '' });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [roomsData, bookingsData] = await Promise.all([
        fetchRooms(filters),
        fetchAllBookings(),
      ]);
      setRooms(roomsData.data || []);
      setBookings(bookingsData.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters, refreshKey]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const availableCount = rooms.filter((r) => !isRoomCurrentlyBooked(r.id, bookings)).length;

  return (
    <div className="min-h-screen bg-cream pt-20">
      {/* Page Header */}
      <div className="bg-navy-700 py-14 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-diagonal opacity-40" />
        <div className="relative z-10">
          <p className="text-gold-400 text-xs font-medium uppercase tracking-[0.25em] mb-3">Hotel ABCE</p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '-0.01em' }}>
            Our Rooms
          </h1>
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400" />
            <span className="text-gold-400 text-xs">❖</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400" />
          </div>
          <p className="text-gray-400 text-sm">
            {loading ? 'Loading…' : `${availableCount} of ${rooms.length} rooms available right now`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filter Bar */}
        <div className="mb-8">
          <FilterBar filters={filters} onChange={handleFilterChange} />
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="h-52 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-8 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">⚠️</span>
            <p className="text-red-600 font-medium mb-2">{error}</p>
            <p className="text-gray-400 text-sm mb-6">Please check your connection and try again.</p>
            <button onClick={loadData} className="btn-primary text-sm">Retry</button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && rooms.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <span className="text-5xl block mb-3">🔍</span>
            <p className="text-lg font-medium text-gray-500">No rooms match your filters.</p>
            <p className="text-sm mt-1">Try adjusting the filters above.</p>
          </div>
        )}

        {/* Room Grid */}
        {!loading && !error && rooms.length > 0 && (
          <>
            <p className="text-sm text-gray-400 mb-4">{rooms.length} room{rooms.length !== 1 ? 's' : ''} found</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {rooms.map((room) => {
                const booked = isRoomCurrentlyBooked(room.id, bookings);
                return (
                  <RoomCard
                    key={room.id}
                    room={room}
                    available={!booked}
                    onBook={() => !booked && setSelectedRoom(room)}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Booking Modal */}
      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onSuccess={() => {
            setSelectedRoom(null);
            setRefreshKey((k) => k + 1);
          }}
        />
      )}
    </div>
  );
}
