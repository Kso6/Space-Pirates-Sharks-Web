# 🚀 Quick Start Guide

Get your Global Sharks website running in 5 minutes!

---

## ⚡ Installation

```bash
# Install dependencies
npm install
```

---

## 🏃 Run Development Server

```bash
# Start the dev server
npm run dev
```

Open browser to: **http://localhost:3000**

---

## 🏗️ Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deploy to globalsharks.wiki

### Option 1: Netlify (Easiest)

1. Push code to GitHub (already done ✅)
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import from Git"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy"
7. Add custom domain: `globalsharks.wiki`
8. Update DNS at Porkbun with Netlify's records

### Option 2: One-Command Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navigation.jsx      # Top navigation bar
│   └── Hero.jsx            # Landing page
├── pages/
│   ├── MathematicalModel.jsx   # SFI equations & validation
│   ├── DataVisualization.jsx   # Interactive maps & charts
│   ├── TagSensor.jsx           # Tag architecture & specs
│   └── About.jsx               # Project information
├── styles/
│   └── index.css           # Global styles
├── App.jsx                 # Main app component
└── main.jsx               # Entry point
```

---

## 🎨 Customization

### Update Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  ocean: { /* your ocean colors */ },
  shark: { /* your shark colors */ }
}
```

### Add New Pages

1. Create file in `src/pages/YourPage.jsx`
2. Import in `App.jsx`
3. Add route in `renderPage()` function
4. Add navigation item in `Navigation.jsx`

### Modify Mathematical Model

Edit `src/pages/MathematicalModel.jsx` to update:
- Equations
- Charts
- Performance metrics
- Validation data

---

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- --port 3001
```

### Dependencies not installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
# Check Node version (need 18+)
node --version

# Update if needed
nvm install 18
nvm use 18
```

---

## 📊 Features Overview

### Page 1: Home
- Hero section with project overview
- Feature cards (clickable)
- Project statistics
- Call-to-action button

### Page 2: Mathematical Model
- SFI equation display
- Stochastic model explanation
- Interactive charts (Eddy profiles, Temperature)
- Performance metrics
- Cross-validation results

### Page 3: Data Visualization
- Real-time foraging hotspot map
- Satellite data overlays (SWOT, MODIS, PACE)
- 3D ocean profile analysis
- Temporal trends
- Correlation analysis
- Statistical heatmaps

### Page 4: Tag Sensor
- 3D capsule architecture diagram
- Sensing principle explanation
- Real-time feeding event simulation
- Power budget analysis
- Deployment protocol
- Species applications

### Page 5: About
- Project mission statement
- Challenge description
- Three-pipeline architecture
- NASA data sources
- Conservation impact
- Team information

---

## 🎯 Next Steps

1. **Customize Content**: Update team info in `About.jsx`
2. **Add Real Data**: Replace synthetic data with actual NASA datasets
3. **Deploy**: Push to production using Netlify/Vercel
4. **Test**: Verify all pages load correctly
5. **Share**: Submit to NASA Space Apps Challenge

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [Framer Motion](https://www.framer.com/motion)

---

## 🎉 You're Ready!

Your professional data visualization website is ready to showcase your NASA Space Apps project!

**Live URL**: https://globalsharks.wiki

---

**Need help?** Check `DEPLOYMENT.md` for detailed deployment instructions.
