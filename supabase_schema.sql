-- ============================================================
-- Hotel ABCE — Supabase SQL Schema
-- Run this entire script in Supabase SQL Editor
-- ============================================================

-- 1. ROOMS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS rooms (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  type        TEXT NOT NULL CHECK (type IN ('Standard', 'Deluxe', 'Premium')),
  price       NUMERIC(10, 2) NOT NULL,
  description TEXT,
  image_url   TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rooms_type ON rooms(type);


-- 2. BOOKINGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
  id         SERIAL PRIMARY KEY,
  room_id    INT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  phone      TEXT NOT NULL,
  email      TEXT NOT NULL,
  check_in   DATE NOT NULL,
  check_out  DATE NOT NULL,
  status     TEXT NOT NULL DEFAULT 'confirmed'
               CHECK (status IN ('confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT chk_dates CHECK (check_out > check_in)
);

CREATE INDEX IF NOT EXISTS idx_bookings_room_id      ON bookings(room_id);
CREATE INDEX IF NOT EXISTS idx_bookings_dates        ON bookings(check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at   ON bookings(created_at DESC);


-- 3. SEED DATA — 30 Rooms (10 Standard, 10 Deluxe, 10 Premium)
-- ============================================================

INSERT INTO rooms (name, type, price, description) VALUES
-- Standard Rooms (101–110)
('Room 101', 'Standard', 1499.00, 'Comfortable single bed room with AC, TV, and attached bathroom. Perfect for solo travelers.'),
('Room 102', 'Standard', 1499.00, 'Cozy twin-bed room with city-facing window. Includes complimentary breakfast.'),
('Room 103', 'Standard', 1499.00, 'Standard room with a garden view. Ideal for a peaceful overnight stay.'),
('Room 104', 'Standard', 1599.00, 'Spacious standard room with double bed and wardrobe. Great for couples.'),
('Room 105', 'Standard', 1599.00, 'Standard room on the first floor with easy access and corner balcony view.'),
('Room 106', 'Standard', 1499.00, 'Economy standard room with all essential amenities and 24/7 hot water.'),
('Room 107', 'Standard', 1499.00, 'Standard room with bunk beds. Suitable for two guests or families on budget.'),
('Room 108', 'Standard', 1699.00, 'Premium standard room with upgraded linen and refreshment mini-bar.'),
('Room 109', 'Standard', 1499.00, 'Standard room near hotel reception. Quick access to all services.'),
('Room 110', 'Standard', 1599.00, 'Modern standard room with flat-screen TV and study desk.'),

-- Deluxe Rooms (201–210)
('Room 201', 'Deluxe', 2499.00, 'Spacious deluxe room with king-size bed, seating area, and premium toiletries.'),
('Room 202', 'Deluxe', 2499.00, 'Deluxe room with panoramic garden views and a luxurious bathtub.'),
('Room 203', 'Deluxe', 2699.00, 'Corner deluxe room with extra natural light, sofa, and large wardrobe.'),
('Room 204', 'Deluxe', 2499.00, 'Elegant deluxe room with tasteful décor and premium bed linens.'),
('Room 205', 'Deluxe', 2599.00, 'Deluxe double room for couples with jacuzzi and room service included.'),
('Room 206', 'Deluxe', 2499.00, 'Quiet deluxe room facing the courtyard. Perfect for work or relaxation.'),
('Room 207', 'Deluxe', 2799.00, 'Superior deluxe room with a writing desk, lounge chair, and city view.'),
('Room 208', 'Deluxe', 2499.00, 'Deluxe family room with a double and single bed setup. Kid-friendly.'),
('Room 209', 'Deluxe', 2699.00, 'Deluxe room with private balcony, open-air seating, and refreshment bar.'),
('Room 210', 'Deluxe', 2499.00, 'Stylish deluxe room with plush furnishings and an in-room Nespresso machine.'),

-- Premium Rooms (301–310)
('Room 301', 'Premium', 3999.00, 'Luxurious premium suite with a king bed, private living room, and city-skyline view.'),
('Room 302', 'Premium', 4299.00, 'Premium corner suite with floor-to-ceiling windows, walk-in closet, and soaking tub.'),
('Room 303', 'Premium', 3999.00, 'Executive premium suite with a dedicated workspace, premium amenities, and lounge area.'),
('Room 304', 'Premium', 4499.00, 'Signature premium suite — handcrafted furnishings, private balcony, and butler service.'),
('Room 305', 'Premium', 3999.00, 'Premium family suite with two bedrooms, a shared living room, and kitchenette.'),
('Room 306', 'Premium', 4199.00, 'Honeymoon suite with romantic décor, rose bath, and champagne on arrival.'),
('Room 307', 'Premium', 3999.00, 'Premium suite with a spa bathtub, waterfall shower, and private garden access.'),
('Room 308', 'Premium', 4299.00, 'Grand premium suite — the ultimate luxury stay with panoramic windows and personal butler.'),
('Room 309', 'Premium', 3999.00, 'Presidential room with custom artwork, high-thread-count linens, and VIP concierge.'),
('Room 310', 'Premium', 4599.00, 'The Royal Suite — Hotel ABCE''s finest. Private rooftop access, sauna, and infinity bath.');
