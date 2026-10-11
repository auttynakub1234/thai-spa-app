-- 1. รายการบริการ / ทรีตเมนต์
CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL,
    price REAL NOT NULL,
    category TEXT
);

-- 2. เตียง / ห้อง หรือ หมอนวด (Therapists)
CREATE TABLE IF NOT EXISTS therapists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    nickname TEXT,
    is_active INTEGER DEFAULT 1
);

-- 3. ตารางการจอง (Bookings)
CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_line_id TEXT,
    service_id INTEGER REFERENCES services(id),
    therapist_id INTEGER REFERENCES therapists(id),
    booking_date TEXT NOT NULL, -- YYYY-MM-DD
    start_time TEXT NOT NULL,   -- เช่น "14:00"
    end_time TEXT NOT NULL,     -- คำนวณตาม duration_minutes
    massage_pressure TEXT,      -- เบา / กลาง / หนัก
    health_notes TEXT,          -- จุดที่เน้นเป็นพิเศษ หรือข้อจำกัด
    status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled, completed
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
