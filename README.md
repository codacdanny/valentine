# 💖 Valentine's Day Special – 6 Months Edition

A romantic one-page experience to ask your girlfriend to be your Valentine. **No login, no database, no backend.** Edit one config file, add your photos and music, and you're done.

## ✨ What You Get

- **Landing** → **Our Story** (timeline + days counter) → **Gallery** (carousel + grid) → **Love Letters** (why I love you) → **Proposal** (“Will you be my Valentine?”) → **Celebration** (confetti)
- Particle background, Framer Motion animations, music player, responsive layout

## 🚀 Get Started (3 steps)

### 1. Install and run

```bash
npm install
npm run dev
```

Open the URL (e.g. http://localhost:5173). The site runs with no `.env` or API keys.

### 2. Customize everything in one place

Edit **`src/valentineConfig.js`**:

- `relationshipStartDate` – for the “days together” counter
- `partnerName` – optional name on the proposal page
- `milestones` – timeline (4 items: title, date, description, color)
- `loveReasons` – “why I love you” cards (9 items)
- `photos` – array of `{ id, url, caption, date }` (use `/photos/photo1.jpg` for files in `public/photos/`)
- `musicUrl` – path to your song (e.g. `'/music/romantic-song.mp3'`) or `null` to hide the music player

Save the file; the dev server will reload.

### 3. Add your photos and music

- **Photos:** Put images in `public/photos/` and reference them in `valentineConfig.js` (e.g. `url: '/photos/photo1.jpg'`). You can also use full image URLs.
- **Music:** Put an MP3 in `public/music/` (e.g. `romantic-song.mp3`) and set `musicUrl: '/music/romantic-song.mp3'` in the config.

## 📦 Build and deploy

```bash
npm run build
```

Upload the `dist` folder to any static host (Vercel, Netlify, GitHub Pages, etc.). No server or database needed.

## 👥 Multiple people (“the bros”)

Each person can have their own version:

1. Copy or fork the project.
2. Edit `src/valentineConfig.js` with their own dates, photos, reasons, and music.
3. Run `npm run build` and deploy (e.g. each bro gets their own Vercel/Netlify site and shareable link).

No shared backend—each site is independent.

## 🎨 Tech

- React 19, Vite, Framer Motion, Swiper, Lucide React, Canvas Confetti. No React Router; single-page flow is driven by the config.

## 🐛 Troubleshooting

- **Photos not loading:** Ensure files are in `public/photos/` and paths in config match (e.g. `/photos/photo1.jpg`).
- **Music not playing:** Set `musicUrl` in config; if you use `null`, the player is hidden. Browsers often require a user click before playing audio.
- **Blank page:** Check the browser console (F12). All content comes from `valentineConfig.js`; typos there can break the app.

---

Made with 💖 — edit the config, add your photos and song, and share the link.
