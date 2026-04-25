import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import AdminPage from './pages/AdminPage';
import SuccessPage from './pages/SuccessPage';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px' },
          success: { iconTheme: { primary: '#C9A84C', secondary: '#fff' } },
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-cream pt-20">
            <div className="text-center">
              <p className="text-8xl font-bold text-gold-400 font-serif">404</p>
              <p className="text-navy-700 font-semibold text-xl mt-3">Page not found</p>
              <a href="/" className="btn-primary inline-block mt-6">Go Home</a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
