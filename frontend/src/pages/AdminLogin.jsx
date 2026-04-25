import { useState } from 'react';

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate network delay for premium feel
    setTimeout(() => {
      // Simple MVP password check
      if (password === 'admin123') {
        sessionStorage.setItem('hotel_admin_auth', 'true');
        onLogin();
      } else {
        setError('Invalid admin credentials.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-navy-700 flex items-center justify-center relative overflow-hidden px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-pattern-diagonal opacity-20" />
      <div className="absolute right-[-10%] top-[-10%] w-96 h-96 bg-gold-500/20 rounded-full blur-3xl" />
      
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm relative z-10 overflow-hidden animate-slide-up border border-gold-200/50">
        <div className="bg-gradient-to-br from-gold-400 to-gold-600 p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-white/40 shadow-inner">
            🏨
          </div>
          <h1 className="font-serif text-3xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Admin Portal
          </h1>
          <p className="text-white/80 text-sm mt-1 tracking-wide">Hotel ABCE Management</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-5 text-center animate-fade-in shadow-sm">
              🔑 {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">
              Admin Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Enter password"
              className="input-field border-gray-200 focus:border-gold-400 focus:ring-gold-400 shadow-sm"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-wait' : ''}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Authenticating...
              </>
            ) : (
              'Access Dashboard →'
            )}
          </button>
          <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mt-5">
            Restricted Access Only
          </p>
        </form>
      </div>
    </div>
  );
}
