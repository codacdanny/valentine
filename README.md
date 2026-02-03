# 💖 Valentine's Day Special - 6 Months Anniversary Edition

An extravagant and romantic web application to ask your girlfriend to be your Valentine! This is a complete revamp featuring multiple interactive pages, animations, and a photo gallery.

## ✨ Features

### 🎭 Multi-Page Experience
- **Landing Page** - Cinematic entrance with animated hearts
- **Our Story** - Timeline of your 6-month journey with milestones
- **Photo Gallery** - Beautiful carousel and grid view of your memories
- **Love Letters** - Reasons why you love her with stunning cards
- **Proposal Page** - Interactive "Will you be my Valentine?" with fun button mechanics
- **Celebration Page** - Massive confetti explosion when she says yes!

### 🎨 Stunning Visuals
- Particle background with floating hearts
- Smooth page transitions using Framer Motion
- 3D carousel with Swiper
- Interactive hover effects
- Gradient text and glass morphism design
- Custom animations throughout

### 🎵 Interactive Elements
- Built-in music player
- Confetti celebrations
- Photo upload functionality
- Lightbox view for photos
- Animated timeline
- Playful "No" button that runs away

## 🚀 Getting Started

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📸 Adding Your Photos

### Method 1: Using Placeholder Images

1. Create a `public/photos` folder in your project root
2. Add your photos with names: `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, etc.
3. The app will automatically load them

### Method 2: Update Photo Array

Edit `src/pages/Gallery.jsx` and update the `photos` array:

```javascript
const photos = [
  {
    id: 1,
    url: '/photos/first-date.jpg',  // Your actual photo path
    caption: 'Our amazing first date',  // Custom caption
    date: 'August 15, 2024'  // Your date
  },
  // Add more photos...
];
```

### Method 3: Upload Photos Live

The app has a built-in upload feature! Just click the "Add More Memories" button on the Gallery page.

## 🎵 Adding Background Music

1. Add your romantic song file to `public/music/` folder
2. Name it `romantic-song.mp3`
3. Or update the path in `src/components/MusicPlayer.jsx`:

```javascript
audioRef.current = new Audio('/music/your-song-name.mp3');
```

## ✏️ Customization Guide

### Update Relationship Start Date

In `src/pages/OurStory.jsx`, update line 10:

```javascript
const startDate = new Date('2024-08-03'); // Change to your actual start date
```

### Customize Timeline Milestones

Edit the `milestones` array in `src/pages/OurStory.jsx`:

```javascript
const milestones = [
  {
    icon: <Heart size={30} />,
    title: "Your Custom Title",
    date: "Your Date",
    description: "Your story here",
    color: "#ff6b9d"
  },
  // Add more milestones...
];
```

### Add More Love Reasons

In `src/pages/LoveLetters.jsx`, expand the `reasons` array:

```javascript
const reasons = [
  {
    icon: <Heart size={30} />,
    title: "Your Reason Title",
    text: "Why you love this about her",
    color: "#ff6b9d"
  },
  // Add more reasons...
];
```

### Customize Colors

Update CSS variables in `src/index.css`:

```css
:root {
  --primary: #ff1744;       /* Main pink/red color */
  --primary-light: #ff6b9d; /* Light pink */
  --primary-dark: #c44569;  /* Dark pink */
  --secondary: #f97f51;     /* Orange accent */
  --accent: #ffd700;        /* Gold accent */
}
```

## 🎯 Page Navigation Flow

1. **Landing** → Click "Begin Our Journey"
2. **Our Story** → See your relationship timeline
3. **Gallery** → View and upload photos
4. **Love Letters** → Read reasons why you love her
5. **Proposal** → The big question!
6. **Celebration** → Massive celebration when she says yes

## 💡 Pro Tips

### Make It Personal
- Replace placeholder text with your own memories
- Add inside jokes and special moments
- Use photos from your favorite dates
- Customize the proposal message with her name
- Add more timeline milestones

### Technical Tips
- Photos work best at 4:3 or 1:1 aspect ratio
- Recommended photo size: 1000x1000px to 2000x2000px
- MP3 format works best for music
- Test on mobile - it's fully responsive!

### Deployment
Deploy to any static hosting service:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use the built `dist` folder

## 📱 Mobile Responsive

The entire experience is optimized for:
- Desktop (1920px+)
- Tablet (768px - 1920px)
- Mobile (320px - 768px)

## 🎨 Tech Stack

- **React 19** - UI Framework
- **Vite** - Build Tool
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Swiper** - Carousel
- **Lucide React** - Icons
- **Canvas Confetti** - Celebration Effects

## 🐛 Troubleshooting

### Photos Not Loading
- Check that photos are in `public/photos/` folder
- Verify file names match the paths in Gallery.jsx
- Make sure file extensions are correct (.jpg, .png, etc.)

### Music Not Playing
- Check browser autoplay policies
- User must interact with page first
- Verify music file path is correct

### Build Errors
- Run `npm install` again
- Delete `node_modules` and reinstall
- Check console for specific errors

## 💝 Final Touches Before Showing Her

1. ✅ Add all your photos to the gallery
2. ✅ Customize all the text and dates
3. ✅ Add your romantic song
4. ✅ Test on mobile device
5. ✅ Make sure confetti works
6. ✅ Practice the full flow
7. ✅ Add any personal touches
8. ✅ Deploy to a live URL

## 🌟 Making It Extra Special

### Before You Show Her:
- Send her the link with a sweet message
- Make sure she's in a comfortable setting
- Have her favorite snacks ready
- Maybe print out a physical card too
- Prepare for her reaction! 😊

### After She Says Yes:
- Screenshot the celebration page
- Share it on your anniversary
- Keep adding photos throughout the year
- Update it for future Valentine's Days

## 📄 License

This is a personal project made with love! Feel free to use and customize for your own Valentine. ❤️

---

Made with 💖 for the most special person in my life.

*Remember: The best Valentine's gift is not just the grand gesture, but the thought, effort, and love you put into it. This app is just one way to show her how much she means to you.*

## 🎉 Good Luck!

You've got this! She's going to love it! 💕
