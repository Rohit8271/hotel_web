import StatusBadge from './StatusBadge';

const TYPE_ICONS = { Standard: '🛏️', Deluxe: '🛎️', Premium: '👑' };

const TYPE_COLORS = {
  Standard: 'bg-blue-50 text-blue-700 border-blue-200',
  Deluxe:   'bg-purple-50 text-purple-700 border-purple-200',
  Premium:  'bg-amber-50 text-amber-700 border-amber-200',
};

// Fallback images per room type
const TYPE_IMAGES = {
  Standard: '/images/room-standard.png',
  Deluxe:   '/images/room-deluxe.png',
  Premium:  '/images/room-premium.png',
};

// Amenity badges shown per room type
const TYPE_AMENITIES = {
  Standard: ['❄️ AC', '📺 TV', '📶 WiFi', '🚿 Shower'],
  Deluxe:   ['❄️ AC', '📺 Smart TV', '📶 WiFi', '🛁 Bathtub', '🛋️ Lounge'],
  Premium:  ['❄️ AC', '📺 Smart TV', '📶 WiFi', '🛁 Jacuzzi', '🧖 Spa Access', '🍾 Mini-bar'],
};

export default function RoomCard({ room, available = true, onBook }) {
  const imageSrc = room.image_url || TYPE_IMAGES[room.type] || null;
  const amenities = TYPE_AMENITIES[room.type] || [];

  return (
    <article className="card overflow-hidden group animate-slide-up flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${room.type} room — ${room.name}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy-700 to-navy-500 flex flex-col items-center justify-center text-white/70">
            <span className="text-5xl mb-1">{TYPE_ICONS[room.type] || '🏨'}</span>
            <span className="text-xs font-medium">{room.name}</span>
          </div>
        )}

        {/* Availability overlay */}
        {!available && (
          <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-1">
            <span className="text-white font-serif font-semibold text-lg tracking-widest">Booked</span>
            <span className="text-white/60 text-xs">Select different dates</span>
          </div>
        )}

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${TYPE_COLORS[room.type]}`}>
            {TYPE_ICONS[room.type]} {room.type}
          </span>
        </div>

        {/* Status badge top-right */}
        <div className="absolute top-3 right-3">
          <StatusBadge available={available} />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Room name + number */}
        <div className="mb-3">
          <h3 className="font-serif font-semibold text-navy-700 text-xl leading-tight">{room.name}</h3>
          {room.description && (
            <p className="text-gray-400 text-xs mt-1 line-clamp-2 leading-relaxed">{room.description}</p>
          )}
        </div>

        {/* Amenity badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {amenities.map((a) => (
            <span key={a} className="badge-amenity">{a}</span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-4 mt-auto" />

        {/* Price + Book */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Per Night</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-navy-700" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                ₹{Number(room.price).toLocaleString('en-IN')}
              </span>
              <span className="text-gray-400 text-xs">+ taxes</span>
            </div>
          </div>
          <button
            id={`book-room-${room.id}`}
            onClick={() => onBook && onBook(room)}
            disabled={!available}
            className={`text-sm font-semibold py-2.5 px-5 rounded-xl transition-all duration-200
              ${available
                ? 'btn-primary'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
          >
            {available ? 'Book Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </article>
  );
}
