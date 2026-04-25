import { useLocation, Link, Navigate } from 'react-router-dom';

export default function SuccessPage() {
  const { state } = useLocation();
  const booking = state?.booking;

  // If someone navigates to /success directly without booking, redirect home.
  if (!booking) {
    return <Navigate type="replace" to="/" />;
  }

  // Calculate nights and total price
  const start = new Date(booking.check_in);
  const end = new Date(booking.check_out);
  const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  const roomPrice = Number(booking.rooms?.price || 0);
  const total = nights * roomPrice;

  // Format date nicely (e.g., "15 Jun 2024")
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Generate WhatsApp Message
  const hotelPhone = "919876543210"; // Hotel's actual WhatsApp number with Country Code (91 for India)
  const message = `🎉 *Hotel ABCE - New Booking Request*
----------------------------------------
*Name:* ${booking.name}
*Phone:* ${booking.phone}
*Email:* ${booking.email}
*Room:* ${booking.rooms?.name || 'Standard Room'} (${booking.rooms?.type || 'Standard'})
*Check-in:* ${formatDate(booking.check_in)}
*Check-out:* ${formatDate(booking.check_out)}
*Duration:* ${nights} Night(s)
*Total Price:* ₹${total.toLocaleString('en-IN')}

_Please confirm my reservation._`;
  
  const whatsappUrl = `https://wa.me/${hotelPhone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen bg-cream pt-20 pb-16 px-4 flex justify-center">
      <div className="max-w-2xl w-full">
        {/* Success Banner */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 border-4 border-green-50 shadow-md">
            ✓
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-navy-700" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Booking Confirmed!
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Thank you, {booking.name}. We look forward to welcoming you to Hotel ABCE.
          </p>
        </div>

        {/* Receipt Card */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-gold-100/50 overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <div className="bg-gradient-to-r from-navy-700 to-navy-600 px-6 py-5 text-white flex justify-between items-center">
            <div>
              <p className="text-gold-400 text-[10px] font-semibold uppercase tracking-widest mb-1">Receipt ID</p>
              <p className="font-mono text-lg">#{booking.id?.toString().padStart(6, '0')}</p>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest mb-1">Status</p>
              <p className="text-emerald-400 font-medium text-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse"></span> Confirmed
              </p>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Check-in</p>
                <p className="font-medium text-charcoal">{formatDate(booking.check_in)}</p>
                <p className="text-xs text-gray-500">After 12:00 PM</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Check-out</p>
                <p className="font-medium text-charcoal">{formatDate(booking.check_out)}</p>
                <p className="text-xs text-gray-500">Before 11:00 AM</p>
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Guest details</p>
                <p className="font-medium text-charcoal">{booking.name}</p>
                <p className="text-sm text-gray-500">{booking.phone}</p>
                <p className="text-sm text-gray-500">{booking.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Accommodation</p>
                <p className="font-medium text-charcoal">{booking.rooms?.name || 'Standard Room'}</p>
                <span className="inline-block mt-1 bg-gold-50 text-gold-700 text-xs px-2 py-0.5 rounded-full border border-gold-200">
                  {booking.rooms?.type || 'Standard'}
                </span>
              </div>
            </div>

            <div className="h-px w-full border-t-2 border-dashed border-gray-200" />

            <div className="flex justify-between items-center pt-2">
               <div>
                 <p className="text-charcoal font-semibold text-lg">Total Cost</p>
                 <p className="text-gray-400 text-sm">{nights} night(s) × ₹{roomPrice.toLocaleString('en-IN')}</p>
               </div>
               <p className="font-serif font-bold text-3xl text-gold-600" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                 ₹{total.toLocaleString('en-IN')}
               </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-3 active:scale-95 tracking-wide text-sm"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Get Receipt on WhatsApp
          </a>

          <Link to="/" className="flex-1 bg-white border-2 border-gray-100 hover:border-gold-200 hover:bg-gold-50 text-navy-700 font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center tracking-wide text-sm">
            Return to Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}
