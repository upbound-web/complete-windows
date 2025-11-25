# Complete Window Cleaning Website

A modern, responsive website for Complete Window Cleaning services in Manning Valley & Mid North Coast NSW.

## Features

### Website Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Two service pages (Window Cleaning & Solar Panel Cleaning)
- ✅ Contact forms and quote request system
- ✅ FAQ sections with interactive toggles
- ✅ Before/After image galleries
- ✅ Testimonials and social proof
- ✅ Interactive navigation

### **NEW: Built-in Content Editor** 🎉
- ✅ **No coding required** - Click to edit text and images
- ✅ **Save changes** to browser or download backups
- ✅ **Simple interface** - Perfect for non-technical users
- ✅ **Safe** - Can't break the layout or design
- ✅ **Reversible** - Easy to undo mistakes

## Files

```
complete-windows/
├── index.html              # Main website file
├── main.js                 # All JavaScript (page switching + editing)
├── edit-system.js          # Standalone editing system (backup)
├── EDITING-GUIDE.md        # User guide for customers
├── README.md               # This file
└── public/
    ├── icon_logo.png       # Logo
    ├── hero_image.png      # Main hero image
    └── waterFedImage.jpg   # Technology section image
```

## Quick Start

### For Viewing the Website
1. Open `index.html` in any web browser
2. Navigate between Window Cleaning and Solar Panel Cleaning pages

### For Editing Content
1. Open `index.html` in your browser
2. Click **"Edit Mode: OFF"** button in the navigation
3. Click any text or image to edit
4. Click **"💾 Save Changes"** when done
5. **Read [EDITING-GUIDE.md](EDITING-GUIDE.md) for detailed instructions**

## How the Editing System Works

### For Your Customer

**This is NOT GrapeJS or a complex page builder.** This is a simple, purpose-built solution for your specific needs:

1. **Text Editing**: Click any text → Edit → Save
2. **Image Editing**: Click "Change Image" button → Enter new URL → Save
3. **Saving**:
   - Browser storage (automatic reload on next visit)
   - Download JSON backup (portable, can email to you)
   - Load backup (restore previous versions)

### Technical Details

- **No database required** - Uses localStorage and JSON files
- **No server required** - Works completely client-side
- **Lightweight** - ~8KB of JavaScript (vs 200KB+ for GrapeJS)
- **Non-destructive** - Original HTML is never modified
- **Layout-safe** - Can't break responsive design

### Why Not GrapeJS?

| Feature | This Solution | GrapeJS |
|---------|--------------|---------|
| **Purpose** | Edit existing content | Build pages from scratch |
| **Size** | ~8KB | 200KB+ |
| **Complexity** | Click and type | Drag, drop, configure |
| **Learning curve** | 5 minutes | 1-2 hours |
| **Layout safety** | Can't break design | Can break responsiveness |
| **Code required** | ~20 lines integration | ~200+ lines integration |
| **Best for** | Text/image updates | Full page building |

## Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## Deployment Options

### Option 1: GitHub Pages (Free)
1. Push to GitHub repository
2. Enable GitHub Pages in settings
3. Your site is live at `username.github.io/complete-windows`

### Option 2: Traditional Web Hosting
1. Upload all files to your web host via FTP
2. Ensure `index.html` is in the root directory
3. Your site is live at your domain

### Option 3: Netlify/Vercel (Free, Easy)
1. Drag and drop the folder to Netlify or Vercel
2. Instant deployment with custom domain support

## Customization

### Changing Colors
Edit the Tailwind config in `index.html` (lines 14-33):
```javascript
colors: {
    primary: {
        DEFAULT: '#007aff', // Your primary color
        dark: '#005ecb',
    }
}
```

### Adding More Editable Elements
Elements with these tags are automatically editable in Edit Mode:
- `h1, h2, h3, h4` (headings)
- `p` (paragraphs)
- `li` (list items)
- `img` (images)

### Hiding the Edit Button from Customers
To hide the Edit Mode button, remove lines 117-119 in `index.html`:
```html
<button id="edit-mode-toggle" ... >
    Edit Mode: OFF
</button>
```

Or add this to the `<style>` section:
```css
#edit-mode-toggle { display: none; }
```

## Security Considerations

### Current Setup (Client-Side Only)
- ✅ Safe for local editing
- ✅ Changes stay in browser or backup files
- ❌ Not suitable for live customer editing without authentication

### For Production (If Customers Edit Live Site)
You should add:
1. **Password protection** for Edit Mode
2. **Server-side saving** with authentication
3. **Backup system** on the server
4. **Version control** for rollbacks

**Simple password protection example:**
```javascript
function toggleEditMode() {
    if (!editMode) {
        const password = prompt('Enter edit password:');
        if (password !== 'your-secure-password') {
            alert('Incorrect password');
            return;
        }
    }
    // ... rest of function
}
```

## Support

### For End Users
- See [EDITING-GUIDE.md](EDITING-GUIDE.md) for detailed editing instructions
- Keep backup files safe
- Save regularly when editing

### For Developers
- All JavaScript is in [main.js](main.js)
- Edit mode functions are clearly commented
- No build process required
- Vanilla JS - no frameworks

## Future Enhancements (Optional)

Easy additions you could make:
- [ ] Password protection for Edit Mode
- [ ] Server-side persistence (PHP/Node.js backend)
- [ ] Image upload (instead of just URLs)
- [ ] Rich text formatting (bold, italic, links)
- [ ] Undo/Redo functionality
- [ ] Multi-language support
- [ ] Analytics integration

## License

Proprietary - Complete Window Cleaning

---

## Summary

You now have a **simple, customer-friendly editing system** that:
- ✅ Lets customers edit text and images easily
- ✅ Doesn't require technical knowledge
- ✅ Can't break your carefully designed layout
- ✅ Is much simpler than GrapeJS for your use case
- ✅ Saves changes to JSON files (easy to version control)

**Total implementation:** ~400 lines of JavaScript vs 1000+ for GrapeJS integration
**Learning curve:** 5 minutes vs 2 hours
**Perfect for:** Your specific needs (text/image editing only)
