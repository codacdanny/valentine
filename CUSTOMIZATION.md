# 🎨 Quick Customization Guide

This guide will help you personalize the Valentine app before showing it to your girlfriend!

## 🚀 Essential Customizations

### 1. Update Your Relationship Start Date

**File:** `src/pages/OurStory.jsx`  
**Line:** ~10

```javascript
const startDate = new Date('2024-08-03'); // ← Change this to your actual start date
```

Example:
```javascript
const startDate = new Date('2024-08-03'); // August 3, 2024
```

---

### 2. Add Your Photos

**Location:** `public/photos/` folder

**Steps:**
1. Copy 6-10 of your best couple photos
2. Rename them: `photo1.jpg`, `photo2.jpg`, etc.
3. The app will automatically load them!

**Alternative:** Update photo details in `src/pages/Gallery.jsx`:

```javascript
const photos = [
  {
    id: 1,
    url: '/photos/photo1.jpg',
    caption: 'Our first date - unforgettable',  // ← Customize this
    date: 'August 2024'  // ← And this
  },
  // Add more photos...
];
```

---

### 3. Customize Timeline Milestones

**File:** `src/pages/OurStory.jsx`  
**Starting Line:** ~17

```javascript
const milestones = [
  {
    icon: <Heart size={30} />,
    title: "The Beginning",  // ← Customize
    date: "August 3, 2024",  // ← Your date
    description: "The day we made it official...",  // ← Your story
    color: "#ff6b9d"
  },
  // Edit all 4 milestones with your story!
];
```

---

### 4. Personalize Love Letters

**File:** `src/pages/LoveLetters.jsx`  
**Starting Line:** ~6

Edit each reason to be specific to your girlfriend:

```javascript
const reasons = [
  {
    icon: <Heart size={30} />,
    title: "Your Beautiful Smile",  // ← Customize
    text: "Every time you smile...",  // ← Write your own
    color: "#ff6b9d"
  },
  // Update all 9 reasons (or add more!)
];
```

**Pro Tip:** Make these super specific! Use:
- Inside jokes
- Specific memories
- Her unique qualities
- Things only you two would understand

---

### 5. Add Background Music

**Location:** `public/music/romantic-song.mp3`

1. Choose your special song (or her favorite)
2. Convert to MP3 if needed
3. Rename to `romantic-song.mp3`
4. Place in `public/music/` folder

---

### 6. Update Proposal Message (Optional)

**File:** `src/pages/Proposal.jsx`  
**Starting Line:** ~110

```javascript
<motion.h1 className="proposal-line">
  My Love,  // ← Add her name or a pet name
</motion.h1>
```

---

### 7. Final Message Signature

**File:** `src/pages/Celebration.jsx`  
**Line:** ~115

```javascript
<p className="final-text">
  Forever and Always,<br />
  Your Valentine 💕  // ← Add your name or nickname
</p>
```

---

## 🎨 Advanced Customizations

### Change Color Scheme

**File:** `src/index.css`  
**Lines:** 5-11

```css
:root {
  --primary: #ff1744;       /* Main color - try #e91e63, #f06292 */
  --primary-light: #ff6b9d; /* Light shade */
  --primary-dark: #c44569;  /* Dark shade */
  --secondary: #f97f51;     /* Accent color */
  --accent: #ffd700;        /* Gold/yellow accent */
}
```

**Color Palette Suggestions:**
- **Classic Red:** `#e74c3c`, `#c0392b`
- **Soft Pink:** `#f8b4d9`, `#e91e63`
- **Purple Love:** `#9b59b6`, `#8e44ad`
- **Rose Gold:** `#b76e79`, `#de7a7b`

---

### Add More Photos

Just keep adding: `photo7.jpg`, `photo8.jpg`, etc. to the `public/photos/` folder!

Or update the array in `src/pages/Gallery.jsx` to add more photo objects.

---

### Add More Timeline Events

In `src/pages/OurStory.jsx`, add more objects to the `milestones` array:

```javascript
{
  icon: <Star size={30} />,
  title: "That Special Trip",
  date: "December 2024",
  description: "Remember when we...",
  color: "#f97f51"
}
```

**Available icons:**
- `<Heart />`
- `<Star />`
- `<Sparkles />`
- `<Calendar />`
- `<Coffee />`
- `<Music />`
- `<Sun />`
- `<Smile />`
- `<Camera />`

---

### Add More Love Reasons

In `src/pages/LoveLetters.jsx`, add more objects to the `reasons` array.

**Aim for 10-15 reasons** for the best effect!

---

## ✅ Pre-Launch Checklist

Before you show her the app, make sure you've done:

- [ ] Updated relationship start date
- [ ] Added 6+ photos to gallery
- [ ] Customized all timeline milestones
- [ ] Personalized all love reasons
- [ ] Added background music
- [ ] Tested the app (`npm run dev`)
- [ ] Checked on mobile (responsive design)
- [ ] Fixed any typos or errors
- [ ] Deployed to a live URL (optional)
- [ ] Practiced the flow

---

## 🧪 Testing

Run the development server:
```bash
npm run dev
```

Then visit: `http://localhost:5173`

Test the full journey:
1. Landing page loads beautifully
2. Navigate through all pages
3. Upload photo feature works
4. Music player works
5. Proposal buttons work correctly
6. Confetti fires on "Yes"
7. All animations are smooth

---

## 🚀 Deployment (Optional)

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
npm run build
vercel --prod
```

### Option 2: Netlify
1. Run `npm run build`
2. Upload the `dist` folder to Netlify
3. Get your live URL!

### Option 3: GitHub Pages
1. Build: `npm run build`
2. Push `dist` folder to GitHub
3. Enable GitHub Pages

---

## 💡 Extra Ideas

### Add Easter Eggs
Hide little surprises in the code or add secret click areas that reveal special messages!

### Create a Video Message
Record a video message and add it to one of the pages.

### Print a QR Code
Generate a QR code to your deployed site and put it in a physical card!

### Add Her Favorite Quote
Find her favorite love quote and add it to any page.

### Create a Future Section
Add predictions or wishes for your future together.

---

## 🆘 Need Help?

If you run into issues:

1. Check the console for errors (F12 in browser)
2. Make sure all files are saved
3. Restart the dev server
4. Check file paths are correct
5. Review the main README.md

---

## 🎉 You're Ready!

Once you've made all these customizations, your Valentine app will be truly unique and special. She's going to love it! 💖

Remember: It's not just about the code - it's about the thought, effort, and love you put into every detail. Good luck! 🍀
