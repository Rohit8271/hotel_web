import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../api/bookingsApi';
import toast from 'react-hot-toast';

const today = new Date().toISOString().split('T')[0];

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  check_in: '',
  check_out: '',
};

/**
 * BookingModal — Sliding right drawer with booking form.
 * @param {object} room   - The room being booked
 * @param {function} onClose  - Called when modal is dismissed
 * @param {function} onSuccess - Called after successful booking
 */
export default function BookingModal({ room, onClose, onSuccess }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  // Smooth unmount
  const triggerClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 400); // Matches sliding transition duration
  };

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') triggerClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await createBooking({
        room_id: room.id,
        name: form.name,
        phone: form.phone,
        email: form.email,
        check_in: form.check_in,
        check_out: form.check_out,
      });

      toast.success(`🎉 Booking confirmed for ${room.name}!`);
      // Attach room object to response data to display in receipt
      const bookingData = { ...response.data, rooms: room };
      
      onSuccess?.();
      onClose(); // Instantly unmount modal wrapper
      navigate('/success', { state: { booking: bookingData } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!room) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-400 ease-in-out ${isClosing ? 'opacity-0' : 'animate-fade-in opacity-100'}`}
      onClick={(e) => { if (e.target === e.currentTarget) triggerClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className={`bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl flex flex-col transform transition-transform duration-400 ease-in-out ${isClosing ? 'translate-x-[100%]' : 'animate-slide-in-right translate-x-0'}`}
      >
        {/* Header (Sticky) */}
        <div className="bg-gradient-to-r from-navy-700 to-navy-500 px-6 py-6 text-white sticky top-0 z-10 shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gold-300 text-xs font-semibold uppercase tracking-widest mb-1.5">Reservation</p>
              <h2 id="modal-title" className="font-serif font-bold text-3xl mb-1">{room.name}</h2>
              <p className="text-white/80 text-sm flex items-center gap-2">
                <span className="bg-white/10 px-2 py-0.5 rounded-md border border-white/20">{room.type}</span>
                <span className="text-gold-300 font-semibold tracking-wide">₹{Number(room.price).toLocaleString('en-IN')} <span className="text-xs font-normal opacity-70">/ Night</span></span>
              </p>
            </div>
            <button
              id="modal-close-btn"
              onClick={triggerClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Error Banner */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-fade-in shadow-sm">
                <span className="font-bold mr-1">Error:</span> {error}
              </div>
            )}

            <div className="space-y-1.5 animate-slide-up" style={{ animationFillMode: 'both', animationDelay: '0.1s' }}>
              <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider">Full Name <span className="text-gold-500">*</span></label>
              <input
                id="booking-name"
                name="name"
                type="text"
                required
                placeholder="e.g. Rohit Kumar"
                value={form.name}
                onChange={handleChange}
                className="input-field border-gray-300 focus:border-gold-400 shadow-sm"
              />
            </div>

            <div className="space-y-1.5 animate-slide-up" style={{ animationFillMode: 'both', animationDelay: '0.2s' }}>
              <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider">Phone Number <span className="text-gold-500">*</span></label>
              <input
                id="booking-phone"
                name="phone"
                type="tel"
                required
                placeholder="e.g. 9876543210"
                value={form.phone}
                onChange={handleChange}
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
                className="input-field border-gray-300 focus:border-gold-400 shadow-sm"
              />
            </div>

            <div className="space-y-1.5 animate-slide-up" style={{ animationFillMode: 'both', animationDelay: '0.3s' }}>
              <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider">Email Address <span className="text-gold-500">*</span></label>
              <input
                id="booking-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="input-field border-gray-300 focus:border-gold-400 shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 animate-slide-up" style={{ animationFillMode: 'both', animationDelay: '0.4s' }}>
              <div className="space-y-1.5">
                <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider">Check-in <span className="text-gold-500">*</span></label>
                <input
                  id="booking-checkin"
                  name="check_in"
                  type="date"
                  required
                  min={today}
                  value={form.check_in}
                  onChange={handleChange}
                  className="input-field border-gray-300 focus:border-gold-400 shadow-sm cursor-pointer"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider">Check-out <span className="text-gold-500">*</span></label>
                <input
                  id="booking-checkout"
                  name="check_out"
                  type="date"
                  required
                  min={form.check_in || today}
                  value={form.check_out}
                  onChange={handleChange}
                  className="input-field border-gray-300 focus:border-gold-400 shadow-sm cursor-pointer"
                />
              </div>
            </div>

            {/* Price Summary */}
            <div className="animate-slide-up" style={{ animationFillMode: 'both', animationDelay: '0.5s' }}>
              {form.check_in && form.check_out && new Date(form.check_out) > new Date(form.check_in) ? (
                <div className="bg-gradient-to-br from-gold-50 to-gold-100/50 border border-gold-200 rounded-2xl p-5 text-sm shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl pointer-events-none">🏨</div>
                  <h4 className="text-navy-700 font-serif font-bold text-lg mb-3">Booking Summary</h4>
                  <div className="flex justify-between text-gray-600 mb-2 font-medium">
                    <span>Duration</span>
                    <span>{Math.ceil((new Date(form.check_out) - new Date(form.check_in)) / (1000 * 60 * 60 * 24))} night(s)</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mb-3 font-medium">
                    <span>Rate (per night)</span>
                    <span>₹{Number(room.price).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="h-px w-full bg-gold-200/60 mb-3"></div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-semibold text-navy-700">Total Payable</span>
                    <span className="font-serif font-bold text-gold-600 text-2xl">
                      ₹{(
                        Math.ceil((new Date(form.check_out) - new Date(form.check_in)) / (1000 * 60 * 60 * 24)) * Number(room.price)
                      ).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-gray-200 bg-gray-50 rounded-2xl p-6 text-center text-gray-400 text-sm">
                  <span className="text-2xl block mb-2 opacity-50">📅</span>
                  <p>Select check-in and check-out dates<br/>to see your booking summary.</p>
                </div>
              )}
            </div>

          </form>
        </div>

        {/* Footer (Sticky) */}
        <div className="p-6 bg-white border-t border-gray-100 animate-slide-up" style={{ animationFillMode: 'both', animationDelay: '0.6s' }}>
          <button
            id="booking-submit-btn"
            type="submit"
            form="booking-form"
            disabled={loading}
            className={`btn-primary w-full py-4 text-base font-semibold shadow-xl shadow-gold-500/20 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Confirming...
              </>
            ) : (
              'Confirm Reservation →'
            )}
          </button>
          <p className="text-center text-[11px] text-gray-400 uppercase tracking-widest mt-3">Secure Booking system</p>
        </div>

      </div>
    </div>
  );
}
