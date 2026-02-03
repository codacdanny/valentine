# 🚀 Quick Start Guide

## ⚡ Get Up and Running in 5 Minutes!

### Step 1: Install & Run (Already Done!)
```bash
npm install  # ✅ Already completed
npm run dev  # App is running at http://localhost:5174
```

### Step 2: Add Your Photos
1. Open the `public/photos/` folder
2. Add your couple photos named: `photo1.jpg`, `photo2.jpg`, etc.
3. They'll automatically appear in the gallery!

### Step 3: Customize the Content

#### Update Your Start Date
**File:** `src/pages/OurStory.jsx` (Line 10)
```javascript
const startDate = new Date('2024-08-03'); // Change to YOUR date!
```

#### Update Timeline Events
**File:** `src/pages/OurStory.jsx` (Lines 17-40)
- Edit the 4 milestones with your real memories
- Change dates, titles, and descriptions

#### Personalize Love Reasons
**File:** `src/pages/LoveLetters.jsx` (Lines 6-60)
- Make each reason specific to her
- Add your own unique reasons
- Use inside jokes and special memories

### Step 4: Optional Enhancements

#### Add Background Music
1. Get your romantic song (MP3 format)
2. Put it in `public/music/romantic-song.mp3`
3. Click the music button in the bottom right!

#### Update Photo Captions
**File:** `src/pages/Gallery.jsx` (Lines 11-32)
- Change captions to match your photos
- Update dates

### Step 5: Test Everything
Visit: `http://localhost:5174`

Navigate through:
1. ✅ Landing → Click "Begin Our Journey"
2. ✅ Our Story → Check timeline & dates
3. ✅ Gallery → See your photos
4. ✅ Love Letters → Read your reasons
5. ✅ Proposal → Click YES!
6. ✅ Celebration → Enjoy the confetti! 🎉

### Step 6: Deploy (When Ready)

#### Option A: Vercel (Easiest)
```bash
npm install -g vercel
npm run build
vercel
```

#### Option B: Netlify
```bash
npm run build
# Upload the 'dist' folder to Netlify
```

## 📋 Pre-Launch Checklist

Before showing her:
- [ ] Added 6+ photos
- [ ] Updated all dates
- [ ] Customized timeline milestones
- [ ] Personalized love reasons
- [ ] Added music (optional)
- [ ] Tested full flow
- [ ] Fixed any typos
- [ ] Deployed to live URL

## 🎨 Color Customization

Want different colors? Edit `src/index.css` (Lines 5-11):

```css
:root {
  --primary: #ff1744;       /* Change these! */
  --primary-light: #ff6b9d;
  --primary-dark: #c44569;
}
```

## 💡 Pro Tips

1. **Photos:** Use 1000x1000px square images for best results
2. **Music:** Keep file under 10MB for fast loading
3. **Personal Touch:** Add inside jokes in the love reasons
4. **Mobile:** Test on your phone - it's fully responsive!
5. **Timing:** Pick a special moment to show her

## 🆘 Troubleshooting

**App won't start?**
- Run `npm install` again
- Check Node.js is installed: `node --version`

**Photos not showing?**
- Verify they're in `public/photos/`
- Check file names: `photo1.jpg`, not `photo-1.jpg`
- Try .jpg, .png, or .jpeg formats

**Music not playing?**
- Click the music button first
- File must be named `romantic-song.mp3`
- Check browser allows audio autoplay

## 🎯 What Makes This Special

✨ **6 Interactive Pages** - A complete journey through your relationship  
💖 **Photo Gallery** - Beautiful carousel + grid view with upload feature  
🎭 **Smooth Animations** - Professional-grade transitions and effects  
🎵 **Music Player** - Play your special song  
🎊 **Confetti Celebration** - Massive party when she says yes!  
📱 **Mobile Responsive** - Perfect on any device  
🎨 **Beautiful Design** - Modern, romantic, and polished  

## 🎉 Final Step

When you're ready:
1. Send her the link (or show her in person)
2. Watch her reaction 😊
3. Take a screenshot of the celebration page
4. Enjoy your Valentine's Day! 💕

---

## 📚 Full Documentation

- **README.md** - Complete feature list and setup
- **CUSTOMIZATION.md** - Detailed customization guide
- **QUICK-START.md** - This file!

---

Made with 💖 for your special someone.

**Remember:** She'll love it not just for how it looks, but for the thought and effort you put into every detail. Good luck! 🍀
