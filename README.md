# BlogSphere

BlogSphere is an Express + EJS + MongoDB blog application.

## Styling
The project now uses plain, standalone CSS in `public/css/styles.css`.
Tailwind CSS, its CLI, the Tailwind input file, and Tailwind build scripts have been removed.

## Setup
1. Install Node.js (LTS recommended).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your own MongoDB and Cloudinary credentials.
4. Start the app:
   ```bash
   npm run dev
   ```
   Or use `npm start` for a normal start.

The application serves static assets from `public`, and the main EJS layout loads `/css/styles.css`.
# BlogSphere-a-bloging-platform
