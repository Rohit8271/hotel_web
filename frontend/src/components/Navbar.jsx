import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Rooms', to: '/rooms' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled
        ? 'bg-navy-700/98 backdrop-blur-md shadow-xl border-b border-gold-500/20'
        : 'bg-navy-700/90 backdrop-blur-sm'
      }`}
    >
      {/* Gold top accent line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-lg group-hover:bg-gold-500/30 transition-colors">
              🏨
            </div>
            <div>
              <span className="font-serif font-semibold text-white text-lg leading-none block tracking-wide"
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.05em' }}>
                Hotel ABCE
              </span>
              <p className="text-gold-400 text-[10px] leading-none tracking-[0.15em] uppercase mt-0.5">
                Garhwa · Jharkhand
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${pathname === link.to
                    ? 'text-gold-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/8'
                  }`}
              >
                {link.label}
                {pathname === link.to && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gold-500 rounded-full" />
                )}
              </Link>
            ))}
            <div className="w-px h-5 bg-white/20 mx-2" />
            <Link 
              to="/admin" 
              title="Admin Login"
              className={`text-xl p-2 rounded-full transition-colors ${pathname === '/admin' ? 'bg-white/10 text-gold-400' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
            >
              🗝️
            </Link>
            <Link to="/rooms" className="ml-2 btn-primary text-sm py-2 px-5 shadow-lg">
              Book Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-btn"
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-700 border-t border-white/10 px-4 pb-4 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg my-1 text-sm font-medium transition
                ${pathname === link.to
                  ? 'text-gold-400 bg-white/5 border-l-2 border-gold-500'
                  : 'text-gray-300 hover:bg-white/10'
                }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-4 px-4">
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="flex-1 bg-white/5 border border-white/10 text-center py-3 rounded-lg text-lg hover:bg-white/10 transition"
              title="Admin Login"
            >
              🗝️ <span className="text-sm ml-2 text-gray-300 font-medium">Admin</span>
            </Link>
            <Link
              to="/rooms"
              onClick={() => setMenuOpen(false)}
              className="btn-primary flex-[2] text-center py-3 text-sm shadow-xl"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
