import { Link } from 'react-router-dom';

/* ── Data ──────────────────────────────────────────────────── */
const ROOM_TYPES = [
  {
    type: 'Standard', icon: '🛏️', price: 'from ₹1,499', tag: null,
    desc: 'Comfortable and cozy rooms with all essential amenities for a restful stay.',
    img: '/images/room-standard.png',
    amenities: ['AC', 'Free WiFi', 'TV', 'Hot Water'],
    border: 'border-blue-100',
  },
  {
    type: 'Deluxe', icon: '🛎️', price: 'from ₹2,499', tag: 'Most Popular',
    desc: 'Spacious rooms with premium furnishings, city views, and elevated luxuries.',
    img: '/images/room-deluxe.png',
    amenities: ['AC', 'Smart TV', 'Bathtub', 'Lounge'],
    border: 'border-purple-200 shadow-xl scale-[1.03]',
  },
  {
    type: 'Premium', icon: '👑', price: 'from ₹3,999', tag: '5★ Suite',
    desc: 'Our finest palatial suites — opulent, private, and unforgettable.',
    img: '/images/room-premium.png',
    amenities: ['Jacuzzi', 'Mini-bar', 'Spa', 'Butler'],
    border: 'border-gold-200',
  },
];

const FEATURES = [
  { icon: '🏊', title: 'Swimming Pool', desc: 'Temperature-controlled outdoor pool open all day.', img: '/images/amenity-pool.png' },
  { icon: '🍽️', title: 'Fine Restaurant', desc: 'Authentic local and continental cuisine, all day dining.', img: '/images/amenity-restaurant.png' },
  { icon: '🧖', title: 'Spa & Wellness', desc: 'Rejuvenate with signature ayurvedic treatments.' },
  { icon: '🚗', title: 'Free Parking', desc: 'Complimentary covered parking for all guests.' },
  { icon: '📶', title: 'High-Speed WiFi', desc: 'Fiber-optic Wi-Fi throughout property, no password needed.' },
  { icon: '🛎️', title: '24/7 Concierge', desc: 'Our team is available around the clock for every need.' },
];

const STEPS = [
  { num: '01', title: 'Browse Rooms', desc: 'Explore our 30 rooms across Standard, Deluxe, and Premium categories with filters.' },
  { num: '02', title: 'Pick Your Dates', desc: 'Select your check-in and check-out dates. Our system shows real-time availability.' },
  { num: '03', title: 'Fill Your Details', desc: 'Enter your name, phone, and email. No account needed — it takes under a minute.' },
  { num: '04', title: 'Confirm & Arrive', desc: 'Booking confirmed instantly. Just arrive and our team will be ready to welcome you.' },
];

const TESTIMONIALS = [
  { name: 'Anjali Sharma', location: 'Ranchi, Jharkhand', rating: 5, initial: 'A', color: 'bg-rose-500',
    text: 'Absolutely loved our stay! The rooms were spotless and the staff incredibly warm. Will definitely return.' },
  { name: 'Rajesh Gupta', location: 'Patna, Bihar', rating: 5, initial: 'R', color: 'bg-blue-500',
    text: 'Best hotel in Garhwa by far. The premium suite exceeded all our expectations. Highly recommended!' },
  { name: 'Priya Singh', location: 'Delhi', rating: 4, initial: 'P', color: 'bg-emerald-500',
    text: 'Excellent value for money. Clean, comfortable, and very nicely located. The restaurant was fantastic.' },
];

/* ── Helper Components ─────────────────────────────────────── */
const Stars = ({ count }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <span key={i} style={{ fontSize: '13px' }} className={i < count ? 'text-gold-400' : 'text-gray-700'}>★</span>
    ))}
  </div>
);

const OrnamentDivider = ({ light = false }) => (
  <div className={`flex items-center justify-center gap-3 my-8 ${light ? 'opacity-30' : 'opacity-100'}`}>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-300 max-w-[80px]" />
    <span className="text-gold-400 text-sm">❖</span>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-300 max-w-[80px]" />
  </div>
);

/* ── Page ──────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src="/images/hero-hotel.png" alt="Hotel ABCE" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-700/75 via-navy-700/55 to-navy-700/85" />
        <div className="absolute inset-0 bg-pattern-diagonal" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          {/* Location pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-gold-400/30 text-gold-300 text-xs font-medium px-5 py-2 rounded-full mb-8 animate-fade-in backdrop-blur-sm tracking-[0.1em]">
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" />
            GARHWA · JHARKHAND · INDIA
          </div>

          {/* Heading */}
          <h1 className="display-title text-6xl md:text-8xl mb-2 animate-slide-up drop-shadow-lg"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, letterSpacing: '-0.02em' }}>
            Hotel ABCE
          </h1>
          <p className="text-gold-300 text-lg md:text-xl font-light italic mb-6 tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Where Comfort Meets Heritage
          </p>

          <OrnamentDivider light />

          <p className="text-gray-200 text-base md:text-lg mb-10 max-w-xl mx-auto animate-fade-in leading-relaxed font-light">
            Experience unmatched hospitality in the heart of Garhwa — warm service,
            curated rooms, and memories that last a lifetime.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link to="/rooms" id="hero-explore-btn" className="btn-primary text-base px-9 py-4 shadow-2xl tracking-wider">
              Explore Rooms →
            </Link>
            <a href="#rooms-preview" className="border border-white/40 text-white hover:bg-white/10 font-medium py-4 px-8 rounded-lg transition-all duration-200 text-base backdrop-blur-sm tracking-wide">
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-sm mx-auto mt-16 animate-fade-in">
            {[['30', 'Rooms'], ['3', 'Room Types'], ['5★', 'Rating']].map(([n, l]) => (
              <div key={l} className="text-center">
                <p className="text-gold-400 font-semibold mb-0.5"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', lineHeight: 1 }}>
                  {n}
                </p>
                <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em]">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ══════════════ ROOM TYPES ══════════════ */}
      <section id="rooms-preview" className="section-padded bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-subtitle">Our Accommodations</p>
            <OrnamentDivider />
            <h2 className="section-title">Choose Your Perfect Room</h2>
            <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
              From cozy standards to palatial suites — 30 rooms across 3 tiers, each designed with your comfort in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-end">
            {ROOM_TYPES.map((t) => (
              <div key={t.type} className={`bg-white rounded-3xl border-2 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${t.border}`}>
                {/* Image */}
                <div className="h-52 overflow-hidden relative">
                  <img src={t.img} alt={`${t.type} room`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  {t.tag && (
                    <span className="absolute top-3 right-3 bg-gold-500 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase shadow-lg">
                      {t.tag}
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-2xl">{t.icon}</span>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-2xl font-semibold text-navy-700" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{t.type}</h3>
                    <span className="text-gold-600 font-semibold text-sm">{t.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{t.desc}</p>

                  {/* Amenity tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {t.amenities.map((a) => (
                      <span key={a} className="text-xs bg-gray-50 text-gray-500 border border-gray-100 px-2.5 py-1 rounded-full">{a}</span>
                    ))}
                  </div>

                  <Link to="/rooms" className="btn-outline text-sm py-2 px-5 inline-block w-full text-center">
                    View {t.type} Rooms
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ HOW TO BOOK ══════════════ */}
      <section className="section-padded bg-navy-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-diagonal opacity-50" />
        <div className="absolute right-0 top-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <p className="section-subtitle text-gold-400">Simple Process</p>
            <OrnamentDivider light />
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              How to Book Your Stay
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.num} className="relative text-center group">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-[-50%] h-px bg-gradient-to-r from-gold-500/60 to-transparent" />
                )}
                {/* Number */}
                <div className="w-16 h-16 rounded-full border-2 border-gold-500/40 bg-gold-500/10 flex items-center justify-center mx-auto mb-4 group-hover:border-gold-400 group-hover:bg-gold-500/20 transition-all duration-300">
                  <span className="text-gold-400 font-semibold tracking-wider text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {s.num}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{s.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/rooms" className="btn-primary px-10 py-4 text-base tracking-wider">
              Browse All Rooms →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ AMENITIES ══════════════ */}
      <section id="features" className="section-padded bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-subtitle">Why Choose Us</p>
            <OrnamentDivider />
            <h2 className="section-title">World-Class Amenities</h2>
            <p className="text-gray-500 mt-4 max-w-md mx-auto text-sm">
              Every comfort you'd expect — and a few surprises too.
            </p>
          </div>

          {/* Featured photo amenities */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            {FEATURES.filter(f => f.img).map((f) => (
              <div key={f.title} className="relative rounded-2xl overflow-hidden h-60 group cursor-default">
                <img src={f.img} alt={f.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-700/90 via-navy-700/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <span className="text-2xl block mb-1">{f.icon}</span>
                  <h3 className="font-serif text-xl font-semibold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {f.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Icon amenity grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {FEATURES.filter(f => !f.img).map((f) => (
              <div key={f.title} className="flex gap-3 items-start p-4 rounded-xl border border-gray-50 hover:border-gold-200 hover:bg-gold-50/30 transition-all duration-200 group">
                <span className="text-xl mt-0.5 group-hover:scale-110 transition-transform">{f.icon}</span>
                <div>
                  <h3 className="font-semibold text-navy-700 text-sm">{f.title}</h3>
                  <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ LOCATION ══════════════ */}
      <section className="section-padded bg-cream">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-subtitle">Find Us</p>
            <OrnamentDivider />
            <h2 className="section-title">Visit Hotel ABCE</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Info */}
            <div className="space-y-5">
              {[
                { icon: '📍', label: 'Address', value: 'Hotel ABCE, Main Road, Garhwa, Jharkhand — 822114, India' },
                { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
                { icon: '✉️', label: 'Email', value: 'reservations@hotelabce.in' },
                { icon: '🕐', label: 'Check-in / Check-out', value: 'Check-in: 12:00 PM  ·  Check-out: 11:00 AM' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-100 flex items-center justify-center flex-shrink-0 text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="text-charcoal text-sm font-medium leading-relaxed">{item.value}</p>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <Link to="/rooms" className="btn-primary inline-flex items-center gap-2 text-sm py-2.5 px-6">
                  Book a Room
                </Link>
              </div>
            </div>

            {/* Real OpenStreetMap — Garhwa, Jharkhand (24.1618°N, 83.8131°E) */}
            <div className="rounded-2xl overflow-hidden border-2 border-gold-100 shadow-xl h-80 relative">
              <iframe
                title="Hotel ABCE Location — Garhwa, Jharkhand"
                src="https://www.openstreetmap.org/export/embed.html?bbox=83.7731%2C24.1418%2C83.8531%2C24.1818&layer=mapnik&marker=24.1618%2C83.8131"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
              {/* Hotel label */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md flex items-center gap-2 pointer-events-none">
                <span className="text-base">📍</span>
                <div>
                  <p className="text-navy-700 font-semibold text-xs leading-none">Hotel ABCE</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">Garhwa, Jharkhand</p>
                </div>
              </div>
              {/* Directions button */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Garhwa+Jharkhand+India"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-3 right-3 bg-gold-500 hover:bg-gold-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg transition-all duration-200 flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="section-padded bg-navy-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-diagonal opacity-30" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <p className="section-subtitle text-gold-400">Guest Reviews</p>
            <OrnamentDivider light />
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              What Guests Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white/8 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-gold-500/30 transition-colors duration-300 flex flex-col">
                <Stars count={t.rating} />
                <p className="text-gray-200 text-sm mt-4 mb-5 italic leading-relaxed flex-1 font-light"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center font-bold text-white text-sm flex-shrink-0`}>
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="section-padded bg-gradient-to-br from-gold-500 via-gold-400 to-gold-600 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-diagonal opacity-20" />
        <div className="relative z-10">
          <p className="text-white/70 text-xs uppercase tracking-[0.25em] mb-3">Limited Availability</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4 drop-shadow"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Ready to Experience Hotel ABCE?
          </h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Book your stay instantly — no calls, no waiting. Choose your room, pick your dates, and you're all set.
          </p>
          <Link id="cta-book-btn" to="/rooms"
            className="bg-navy-700 hover:bg-navy-800 text-white font-semibold py-4 px-12 rounded-xl inline-block transition-all duration-200 shadow-xl hover:shadow-2xl tracking-wider text-base">
            Book Your Room →
          </Link>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="bg-navy-700 border-t border-white/10 text-gray-400 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="font-serif text-white text-xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.05em' }}>
                Hotel ABCE
              </p>
              <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">Garhwa · Jharkhand</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                A destination for warmth, comfort, and genuine Indian hospitality.
              </p>
            </div>
            <div>
              <p className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Quick Links</p>
              <div className="space-y-1.5">
                {[['/', 'Home'], ['/rooms', 'Rooms'], ['/admin', 'Admin Panel']].map(([to, label]) => (
                  <Link key={to} to={to} className="block text-gray-500 hover:text-gold-400 text-sm transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Contact</p>
              <div className="space-y-1.5 text-sm text-gray-500">
                <p>📍 Garhwa, Jharkhand 822114</p>
                <p>📞 +91 98765 43210</p>
                <p>✉️ reservations@hotelabce.in</p>
              </div>
            </div>
          </div>
          <OrnamentDivider light />
          <p className="text-center text-xs text-gray-600 mt-4">
            © {new Date().getFullYear()} Hotel ABCE · All rights reserved · Built with ❤️ in Jharkhand
          </p>
        </div>
      </footer>
    </div>
  );
}
