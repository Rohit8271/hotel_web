import { useState, useEffect, useCallback } from 'react';
import { fetchAllBookings } from '../api/bookingsApi';
import BookingTable from '../components/BookingTable';
import AdminLogin from './AdminLogin';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAllBookings();
      setBookings(data.data || []);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  // Initialize auth state
  useEffect(() => {
    if (sessionStorage.getItem('hotel_admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('hotel_admin_auth');
    setIsAuthenticated(false);
  };

  // Summary stats
  const confirmed = bookings.filter((b) => b.status === 'confirmed').length;
  const totalRevenue = bookings.reduce((sum, b) => {
    const nights = Math.ceil(
      (new Date(b.check_out) - new Date(b.check_in)) / (1000 * 60 * 60 * 24)
    );
    return sum + nights * Number(b.rooms?.price || 0);
  }, 0);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-cream pt-20">
      {/* Page Header */}
      <div className="bg-navy-700 py-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-diagonal opacity-40" />
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div>
            <p className="text-gold-400 text-xs font-medium uppercase tracking-[0.25em] mb-2">Hotel ABCE</p>
            <h1 className="font-serif text-5xl font-semibold text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '-0.01em' }}>
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-400" />
              <span className="text-gold-400 text-xs">❖</span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-400" />
              <p className="text-gray-500 text-xs">
                Last updated: {lastRefresh.toLocaleTimeString('en-IN')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              id="admin-logout-btn"
              onClick={handleLogout}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium px-4 py-2.5 rounded-lg transition border border-red-500/20"
            >
              Sign Out
            </button>
            <button
              id="admin-refresh-btn"
              onClick={loadBookings}
              disabled={loading}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition border border-white/20"
            >
            <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: bookings.length, icon: '📋', color: 'bg-blue-50 text-blue-700' },
            { label: 'Confirmed', value: confirmed, icon: '✅', color: 'bg-green-50 text-green-700' },
            { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: '💰', color: 'bg-gold-50 text-gold-700' },
            { label: 'Unique Guests', value: new Set(bookings.map((b) => b.email)).size, icon: '👥', color: 'bg-purple-50 text-purple-700' },
          ].map((stat) => (
            <div key={stat.label} className={`card p-5 ${stat.color}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="text-2xl font-bold font-serif">{stat.value}</p>
              <p className="text-xs font-medium opacity-70 mt-1 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl mb-6 flex items-center gap-3">
            <span>⚠️</span>
            <p className="text-sm">{error}</p>
            <button onClick={loadBookings} className="ml-auto text-xs underline">Retry</button>
          </div>
        )}

        {/* Table */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-navy-700 text-lg">All Bookings</h2>
          <span className="text-sm text-gray-400">{bookings.length} record{bookings.length !== 1 ? 's' : ''}</span>
        </div>
        <BookingTable bookings={bookings} loading={loading} />
      </div>
    </div>
  );
}
