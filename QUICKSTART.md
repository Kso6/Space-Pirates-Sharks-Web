# 🚀 Quick Start Guide

Get **Sharks from Space** running locally in under 5 minutes!

## Prerequisites

- **Node.js 18+** ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download here](https://git-scm.com/))

## Installation (30 seconds)

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/sharks-from-space.git
cd sharks-from-space

# Install dependencies
npm install
```

## Run Development Server (10 seconds)

```bash
npm run dev
```

🌐 Open your browser to: **http://localhost:3000**

## Explore the App

### 🏠 Home Page
- Overview of all three pipelines
- Quick navigation cards
- Project statistics

### 📐 Mathematical Model
- Shark Foraging Index (SFI) equations
- 3D ocean modeling visualization
- Component contributions
- Model validation metrics

### 🗺️ Data Visualization
- Real-time NASA satellite data
- Interactive foraging hotspot maps
- 3D ocean depth profiles
- Temporal trends analysis

### 🔬 Tag Sensor
- Gastric capsule architecture
- pH & NH₄⁺ sensing principles
- Feeding event simulations
- Power budget analysis

### ℹ️ About
- Complete project overview
- NASA data sources
- Technology stack
- Future development plans

## Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## Deploy to Production

### Option 1: Quick Deploy Script (Easiest)

```bash
chmod +x deploy.sh
./deploy.sh
```

Choose your deployment platform:
1. GitHub Pages (Free)
2. Netlify (Free)
3. Vercel (Free)
4. Manual build only

### Option 2: GitHub Pages (Automated)

1. Push your code to GitHub
2. GitHub Actions automatically deploys
3. Configure DNS in Porkbun dashboard

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for detailed instructions.

### Option 3: Netlify (One-Click)

```bash
npm run deploy:netlify
```

### Option 4: Vercel

```bash
npm run deploy:vercel
```

## Project Structure Overview

```
src/
├── components/           # Reusable components
│   ├── Hero.jsx         # Landing page hero
│   └── Navigation.jsx   # Top navigation bar
├── pages/               # Main pages
│   ├── MathematicalModel.jsx
│   ├── DataVisualization.jsx
│   ├── TagSensor.jsx
│   └── About.jsx
├── App.jsx              # Main app component
└── main.jsx             # Entry point
```

## Common Tasks

### Update Content
- Edit components in `src/components/`
- Edit pages in `src/pages/`
- Add images to `public/`

### Change Styling
- Modify `src/styles/index.css`
- Update Tailwind config in `tailwind.config.js`

### Add New Page
1. Create new file in `src/pages/YourPage.jsx`
2. Add route in `src/App.jsx`
3. Add navigation item in `src/components/Navigation.jsx`

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or change port in vite.config.js
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear build cache
rm -rf dist
npm run build
```

### Slow Development Server
```bash
# Restart with clean cache
npm run dev -- --force
```

## Development Tips

### Hot Module Replacement (HMR)
- Changes automatically reload in browser
- No need to refresh manually

### React DevTools
- Install React DevTools browser extension
- Inspect component hierarchy

### Tailwind CSS IntelliSense
- Install Tailwind CSS IntelliSense VSCode extension
- Get autocompletion for Tailwind classes

## Next Steps

1. ✅ **Customize Content** - Update text, images, and data
2. ✅ **Add Features** - Implement new visualizations or pages
3. ✅ **Deploy** - Share your project with the world
4. ✅ **Configure DNS** - Point globalsharks.wiki to your deployment

## Need Help?

- 📖 **Full Documentation:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🐛 **Issues:** Open an issue on GitHub
- 💬 **Questions:** Check project README

## Key Commands Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `./deploy.sh` | Interactive deployment |
| `npm run deploy:netlify` | Deploy to Netlify |
| `npm run deploy:vercel` | Deploy to Vercel |

---

**Happy Coding! 🦈🛰️**

Team Space Pirates | NASA Space Apps Challenge 2025

