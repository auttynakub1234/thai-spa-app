# Thai Spa Luxury – Full‑Stack App on Cloudflare

A luxury Thai massage booking web application built **entirely on Cloudflare**:

- **Frontend**: React + Vite + Tailwind CSS (earth‑tone luxury palette) hosted on Cloudflare Pages.
- **Backend**: Cloudflare Pages Functions (Workers) for API endpoints.
- **Database**: Cloudflare D1 (serverless SQLite) for services, therapists, and bookings.
- **Storage**: Cloudflare R2 for assets (images, receipts).
- **Notifications**: LINE Official Account push via Workers.

## Features
- Browse treatments with prices and durations.
- Real‑time slot availability checking (30‑min granularity) that prevents double‑booking.
- Booking form captures customer details, preferred therapist, date/time, pressure level, and health notes.
- Automatic LINE notification to shop admin upon successful booking.
- Admin dashboard placeholder (protected via Cloudflare Zero Trust Access).
- Responsive design, mobile‑first.

## Project Structure
```
my-thai-spa-app/
├── schema.sql               # D1 table definitions
├── wrangler.toml            # Bindings (D1, R2) and Pages config
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/                     # Frontend (React + Vite)
│   ├── index.html
│   ├── main.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── TreatmentList.jsx
│   │   └── BookingForm.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Admin.jsx
│   └── App.jsx
└── functions/               # Cloudflare Pages Functions (API)
    ├── api/
    │   ├── services.ts      # GET /api/services
    │   ├── slots.ts         # GET /api/slots?date=&therapistId=&duration=
    │   └── booking.ts       # POST /api/booking
    └── _middleware.ts       # (optional) CORS / auth hooks
```

## Getting Started

1. **Install tools**
   ```bash
   npm install -g wrangler   # Cloudflare CLI
   npm install               # local deps
   ```

2. **Create D1 database**
   ```bash
   wrangler d1 create spa-database
   # copy the returned database_id into wrangler.toml
   ```

3. **Apply schema**
   ```bash
   wrangler d1 execute spa-database --file=./schema.sql
   ```

4. **(Optional) Create R2 bucket**
   ```bash
   wrangler r2 bucket create spa-assets
   ```

5. **Add secrets (LINE token & admin LINE ID)**
   ```bash
   wrangler secret put LINE_CHANNEL_ACCESS_TOKEN
   wrangler secret put ADMIN_LINE_USER_OR_GROUP_ID
   ```

6. **Local development**
   ```bash
   npx wrangler pages dev   # runs Pages Functions + Vite dev server
   ```

7. **Deploy**
   ```bash
   npx wrangler pages deploy   # builds React (npm run build) and uploads + deploys Functions
   ```

## Environment Variables (secrets)
| Variable | Description |
|----------|-------------|
| `LINE_CHANNEL_ACCESS_TOKEN` | Token from LINE Official Account (for push messages). |
| `ADMIN_LINE_USER_OR_GROUP_ID` | LINE user ID or group ID where booking notifications are sent. |

## License
MIT – feel free to adapt and extend.

---
*Built with ❤️ for Thai spa owners who want a fast, zero‑cost, edge‑native solution.*
# Thai-Spa-Luxury-app
