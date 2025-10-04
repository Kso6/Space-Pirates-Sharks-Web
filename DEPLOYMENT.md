# 🚀 Deployment Guide

This guide will help you deploy the Global Sharks visualization platform to your domain.

---

## 📋 Prerequisites

- [x] Domain registered (e.g., globalsharks.wiki)
- [x] GitHub repository set up
- [x] Node.js 18+ installed
- [x] Project code ready for deployment

---

## 🎯 Deployment Options

### Option 1: GitHub Pages (Recommended)

**Why GitHub Pages?**

- ✅ Free hosting
- ✅ Automatic SSL certificate
- ✅ Built-in CI/CD via GitHub Actions
- ✅ Simple DNS configuration
- ✅ Fast global CDN

**Steps:**

1. **Push Code to GitHub**

   ```bash
   git add .
   git commit -m "Deploy Sharks from Space"
   git push origin main
   ```

2. **Configure GitHub Actions**

   - GitHub Actions workflow is already set up in `.github/workflows/deploy.yml`
   - It automatically builds and deploys when you push to `main`

3. **Add Custom Domain in GitHub**

   - Go to repository → Settings → Pages
   - Enter your domain in "Custom domain"
   - Check "Enforce HTTPS"

4. **Configure DNS Records**

   - Log into your domain registrar
   - Add these DNS records:
     ```
     A     @     185.199.108.153
     A     @     185.199.109.153
     A     @     185.199.110.153
     A     @     185.199.111.153
     CNAME  www   YOUR_USERNAME.github.io
     ```
   - Replace `YOUR_USERNAME` with your GitHub username

5. **Verify Deployment**
   - Wait 5-15 minutes for DNS propagation
   - Visit your domain to confirm it's working
   - Check HTTPS is enabled

### Option 2: Netlify

**Why Netlify?**

- ✅ Free tier with generous limits
- ✅ Automatic builds from GitHub
- ✅ Preview deployments for pull requests
- ✅ Form handling
- ✅ Serverless functions

**Steps:**

1. **Sign Up for Netlify**

   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Import GitHub Repository**

   - Click "New site from Git"
   - Choose GitHub → Select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Add Custom Domain**

   - Site settings → Domain management → Add custom domain
   - Enter your domain name
   - Follow Netlify's DNS instructions

4. **Configure DNS Records**

   - Option A: Use Netlify DNS (change nameservers)
   - Option B: Add these records at your registrar:
     ```
     CNAME  @     apex-loadbalancer.netlify.com
     CNAME  www   your-site.netlify.app
     ```

5. **Enable HTTPS**
   - Netlify automatically provisions SSL certificates
   - Ensure "HTTPS only" is enabled in domain settings

### Option 3: Vercel

**Why Vercel?**

- ✅ Free for personal projects
- ✅ Optimized for React applications
- ✅ Preview deployments
- ✅ Edge functions
- ✅ Analytics

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
   vercel domains add yourdomain.com
   ```

4. **Configure DNS Records**

   ```
   A     @     76.76.21.21
   CNAME  www   cname.vercel-dns.com
   ```

5. **Verify Deployment**
   - Vercel automatically provisions SSL certificates
   - Visit your domain to confirm it's working

### Option 4: Interactive Deployment Script

We've created a convenient script that guides you through deployment:

```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

The script will:

1. Ask which platform you want to use
2. Build the project
3. Deploy to your chosen platform
4. Provide DNS configuration instructions
5. Verify the deployment

---

## ✅ Post-Deployment Checklist

- [ ] Website loads at https://yourdomain.com
- [ ] HTTPS works correctly (green lock icon)
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
- This file is already included in the repository

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

### Already Configured

- Code splitting (React.lazy)
- Image optimization
- CSS minification
- Tree shaking
- Vendor chunk separation

### Additional Optimizations (Optional)

- Enable Brotli compression on your hosting
- Add Cache-Control headers for static assets
- Consider a CDN for global distribution

---

## 🔄 Continuous Deployment

### GitHub Actions (Already Configured)

- Automatically builds and deploys on push to `main`
- Configuration in `.github/workflows/deploy.yml`

### Manual Deployment

```bash
# Build locally
npm run build

# Deploy using your chosen platform's CLI
netlify deploy --prod
# or
vercel --prod
```

---

## 📈 Analytics (Optional)

Add Google Analytics or Plausible to track visitors:

1. **Get tracking code** from your analytics provider
2. **Add to `index.html`** in the `<head>` section
3. **Rebuild and redeploy**

---

## 🔒 Security Best Practices

### Already Implemented

- HTTPS enforcement
- Security headers in `netlify.toml` and `vercel.json`
- Content Security Policy
- XSS protection

### Additional Recommendations

- Regular dependency updates (`npm audit fix`)
- Limited API permissions
- Input validation

---

## 📚 Detailed DNS Configuration

For detailed DNS setup instructions, see [DNS-SETUP.md](./docs/DNS-SETUP.md)

---

<div align="center">

**Good luck with your deployment! 🚀🦈**

[Back to Documentation](./README.md)

</div>
