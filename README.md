# OfferFind (launch-ready)


## Prereqs
- Node.js (>=16)
- MongoDB connection (Atlas or local)


## Setup
1. Clone this folder.
2. `cd backend`
3. Copy `.env.example` to `.env` and fill values.
4. `npm install`
5. `npm start`
6. Open `http://localhost:3000` (or your configured PORT)


Admin dashboard: `http://localhost:3000/admin.html`
Login credentials come from `.env` (ADMIN_USER / ADMIN_PASS).


Notes:
- Uploaded images are saved in `backend/uploads` and served from `/uploads`.
- For production, set `NODE_ENV=production` and use a proper session store.