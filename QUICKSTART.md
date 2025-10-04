# 🚀 Quick Start Guide

Get your Global Sharks website running in 5 minutes!

---

## ⚡ Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/sharks-from-space.git
cd sharks-from-space

# Install dependencies
npm install
```

---

## 🏃 Run Development Server

```bash
# Start the dev server
npm run dev
```

Open browser to: **http://localhost:5173**

---

## 🏗️ Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deploy to Your Domain

### Option 1: GitHub Pages (Recommended)

1. Push code to GitHub (already done ✅)
2. GitHub Actions will automatically deploy
3. Configure DNS in your domain registrar:
   ```
   A     @     185.199.108.153
   A     @     185.199.109.153
   A     @     185.199.110.153
   A     @     185.199.111.153
   CNAME  www   YOUR_USERNAME.github.io
   ```
4. Add custom domain in GitHub Pages settings

### Option 2: One-Command Deploy

```bash
# Make deploy script executable
chmod +x deploy.sh

# Run interactive deployment
./deploy.sh
```

Choose your platform (Netlify, Vercel, or GitHub Pages) and follow the prompts.

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.jsx   # Top navigation bar
│   └── Hero.jsx         # Landing page
├── pages/               # Main application pages
│   ├── MathematicalModel.jsx   # SFI equations & validation
│   ├── DataVisualization.jsx   # Interactive maps & charts
│   ├── TagSensor.jsx           # Tag architecture & specs
│   └── About.jsx               # Project information
├── styles/
│   └── index.css        # Global styles
├── App.jsx              # Main app component
└── main.jsx            # Entry point
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

---

## 🐛 Troubleshooting

### Port 5173 already in use

```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
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
- Feature cards for each pipeline
- Project statistics
- Call-to-action buttons

### Page 2: Mathematical Model

- SFI equation display
- Stochastic model explanation
- Interactive charts
- Performance metrics
- Cross-validation results

### Page 3: Data Visualization

- Real-time foraging hotspot map
- Satellite data overlays
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

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [NASA APIs](https://api.nasa.gov)
- [Deployment Guide](./DEPLOYMENT.md)
- [Project Summary](./PROJECT-SUMMARY.md)

---

<div align="center">

## 🎉 You're Ready!

Your professional data visualization website is ready to showcase your NASA Space Apps project!

**Live URL**: [example.com](https://example.com)

[Back to Documentation](./README.md)

</div>
