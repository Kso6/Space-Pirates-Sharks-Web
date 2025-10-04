# 🚀 Deployment Guide for globalsharks.wiki

This guide will help you deploy the Global Sharks visualization platform to your domain.

---

## 📋 Prerequisites

- [x] Domain registered: `globalsharks.wiki` (via Porkbun)
- [x] GitHub repository: Space-Pirates-NASA-Hackathon-2025
- [x] Node.js 18+ installed
- [x] Git initialized and connected

---

## 🎯 Deployment Options

### Option 1: Netlify (Recommended - Free & Fast)

**Why Netlify?**
- Automatic builds from GitHub
- Free SSL certificate
- CDN distribution
- Instant rollbacks
- Form handling
- Continuous deployment

**Steps:**

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Connect Repository**
   ```bash
   # Push your code to GitHub (already done)
   git push origin main
   ```

3. **Deploy via Netlify Dashboard**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub → Select `Space-Pirates-NASA-Hackathon-2025`
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

4. **Configure Custom Domain**
   - In Netlify: Domain settings → Add custom domain → `globalsharks.wiki`
   - Copy the DNS records provided by Netlify

5. **Update Porkbun DNS**
   - Go to Porkbun dashboard → `globalsharks.wiki` → DNS
   - Add these records:
   ```
   Type: A
   Host: @
   Answer: <Netlify IP> (e.g., 75.2.60.5)
   
   Type: CNAME
   Host: www
   Answer: <your-site>.netlify.app
   ```
   - Wait 10-30 minutes for DNS propagation

6. **Enable HTTPS**
   - In Netlify: Domain settings → HTTPS → Enable automatic TLS certificate
   - Force HTTPS redirect

---

### Option 2: Vercel (Also Excellent)

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login and Deploy**
   ```bash
   vercel login
   vercel --prod
   ```

3. **Add Custom Domain**
   ```bash
   vercel domains add globalsharks.wiki
   ```

4. **Update Porkbun DNS**
   - Follow DNS instructions provided by Vercel

---

### Option 3: GitHub Pages

**Steps:**

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://globalsharks.wiki",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Configure Custom Domain**
   - Create `public/CNAME` file with content: `globalsharks.wiki`
   - Rebuild and deploy

5. **Update Porkbun DNS**
   ```
   Type: A
   Host: @
   Answer: 185.199.108.153
   
   Type: A
   Host: @
   Answer: 185.199.109.153
   
   Type: A
   Host: @
   Answer: 185.199.110.153
   
   Type: A
   Host: @
   Answer: 185.199.111.153
   
   Type: CNAME
   Host: www
   Answer: kso6.github.io
   ```

---

### Option 4: Porkbun Web Hosting (If Available)

1. **Check Hosting Options**
   - Log into Porkbun
   - Check if web hosting is available for your account

2. **Build Locally**
   ```bash
   npm run build
   ```

3. **Upload via FTP/SFTP**
   - Use FileZilla or similar FTP client
   - Upload contents of `dist/` folder to public_html or www directory

---

## 🔧 Build Optimization

Before deploying, optimize your build:

```bash
# Install dependencies
npm install

# Run linter (fix any issues)
npm run lint

# Build production bundle
npm run build

# Test production build locally
npm run preview
```

---

## 🌐 DNS Configuration Details (Porkbun)

### For Netlify:
```
Record Type: A
Host: @
Answer: 75.2.60.5
TTL: 600

Record Type: CNAME
Host: www
Answer: your-site.netlify.app
TTL: 600
```

### For Vercel:
```
Record Type: A
Host: @
Answer: 76.76.21.21
TTL: 600

Record Type: CNAME
Host: www
Answer: cname.vercel-dns.com
TTL: 600
```

---

## ✅ Post-Deployment Checklist

- [ ] Website loads at http://globalsharks.wiki
- [ ] HTTPS works (https://globalsharks.wiki)
- [ ] www subdomain redirects properly
- [ ] All pages navigate correctly
- [ ] Mathematical Model page displays equations
- [ ] Data Visualization renders charts
- [ ] Tag Sensor page shows diagrams
- [ ] About page loads
- [ ] Mobile responsive design works
- [ ] No console errors in browser dev tools

---

## 🐛 Troubleshooting

### DNS Not Propagating
- Wait 24-48 hours for full propagation
- Clear browser cache: Ctrl+Shift+Delete
- Use [whatsmydns.net](https://whatsmydns.net) to check propagation
- Try incognito/private browsing mode

### 404 Errors on Page Refresh
- Add `_redirects` file to `public/` folder:
  ```
  /*  /index.html  200
  ```
- Or configure your hosting provider for SPA routing

### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Missing Assets
- Check that `public/` folder is being copied to `dist/`
- Verify image paths in code

---

## 📊 Performance Optimization

### 1. Image Optimization
- Use WebP format for images
- Implement lazy loading
- Optimize SVGs

### 2. Code Splitting
Already configured in `vite.config.js`:
- React vendor bundle
- Three.js visualization bundle
- Chart libraries bundle
- Map libraries bundle

### 3. Caching
Configure headers on your hosting provider:
```
# Cache static assets for 1 year
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Cache HTML for 1 hour
/*.html
  Cache-Control: public, max-age=3600
```

---

## 🔄 Continuous Deployment

### Netlify Auto-Deploy
Once connected to GitHub, Netlify automatically:
1. Detects pushes to `main` branch
2. Runs `npm run build`
3. Deploys new version
4. Keeps previous versions for rollback

### Manual Deploy
```bash
# Make changes
git add .
git commit -m "Update: description of changes"
git push origin main

# Netlify/Vercel will auto-deploy
```

---

## 📈 Analytics (Optional)

Add Google Analytics or Plausible to track visitors:

1. **Create analytics account**
2. **Add tracking code to `index.html`**
   ```html
   <head>
     <!-- Google Analytics -->
     <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
     <script>
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'GA_MEASUREMENT_ID');
     </script>
   </head>
   ```

---

## 🎉 You're Live!

Once deployed, share your project:
- **Website**: https://globalsharks.wiki
- **GitHub**: https://github.com/Kso6/Space-Pirates-NASA-Hackathon-2025
- **NASA Space Apps**: Submit your project to the challenge

---

## 💡 Need Help?

- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
- GitHub Pages: https://pages.github.com
- Porkbun Support: https://porkbun.com/support

---

**Good luck with your deployment! 🚀🦈**
