# DNS Configuration Guide for Porkbun

Complete guide to configure your Porkbun domain `globalsharks.wiki` for deployment.

## Current Domain Status

**Domain:** globalsharks.wiki  
**Registry Create Date:** 2025-10-04T12:54:55.61Z  
**Registry Expire Date:** 2026-10-04T12:54:55.61Z  
**Registrar:** Porkbun

**Current Nameservers:**
- curitiba.ns.porkbun.com
- fortaleza.ns.porkbun.com
- maceio.ns.porkbun.com
- salvador.ns.porkbun.com

✅ **Keep these nameservers** - Do not change them!

---

## Option 1: GitHub Pages (Recommended)

### Advantages
- ✅ Free forever
- ✅ Automatic HTTPS/SSL
- ✅ Fast global CDN
- ✅ Easy GitHub Actions integration
- ✅ Version control built-in

### Step 1: Add DNS Records in Porkbun

Login to Porkbun dashboard → Domain Management → DNS Records for `globalsharks.wiki`

**Add these 4 A records for apex domain (@):**

| Type | Host | Answer | TTL |
|------|------|--------|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |

**Add CNAME record for www subdomain:**

| Type | Host | Answer | TTL |
|------|------|--------|-----|
| CNAME | www | YOUR_GITHUB_USERNAME.github.io | 600 |

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

### Step 2: Push Code to GitHub

```bash
# Initialize git if not already done
git init
git branch -M main

# Add your repository
git remote add origin https://github.com/YOUR_USERNAME/sharks-from-space.git

# Commit and push
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your GitHub repository
2. Settings → Pages
3. Source: GitHub Actions (this uses the workflow in `.github/workflows/deploy.yml`)
4. Custom domain: Enter `globalsharks.wiki`
5. Check "Enforce HTTPS" (wait 5 minutes for SSL to provision)

### Step 4: Verify

Wait 5-15 minutes for DNS propagation, then visit:
- https://globalsharks.wiki
- https://www.globalsharks.wiki

Both should work!

---

## Option 2: Netlify

### Advantages
- ✅ Free tier generous
- ✅ Instant deploys
- ✅ Branch previews
- ✅ Automatic SSL
- ✅ Built-in forms & serverless functions

### Step 1: Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

Or use the Netlify web interface to import from GitHub.

### Step 2: Add Custom Domain in Netlify

1. Site settings → Domain management
2. Add custom domain: `globalsharks.wiki`
3. Netlify will provide DNS instructions

### Step 3: Update Porkbun DNS

**Option A: Netlify DNS (Recommended)**

| Type | Host | Answer | TTL |
|------|------|--------|-----|
| CNAME | @ | apex-loadbalancer.netlify.com | 600 |
| CNAME | www | YOUR_SITE.netlify.app | 600 |

Replace `YOUR_SITE` with your actual Netlify site name.

**Option B: A Record + CNAME**

| Type | Host | Answer | TTL |
|------|------|--------|-----|
| A | @ | 75.2.60.5 | 600 |
| CNAME | www | YOUR_SITE.netlify.app | 600 |

### Step 4: Enable SSL in Netlify

1. Domain settings → HTTPS
2. Verify DNS configuration
3. Wait for Let's Encrypt certificate (usually < 1 minute)

---

## Option 3: Vercel

### Advantages
- ✅ Free for hobby projects
- ✅ Instant global CDN
- ✅ Automatic SSL
- ✅ Preview deployments
- ✅ Edge functions support

### Step 1: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Or import from GitHub at vercel.com

### Step 2: Add Custom Domain

1. Project settings → Domains
2. Add domain: `globalsharks.wiki`
3. Vercel will provide DNS instructions

### Step 3: Update Porkbun DNS

**Recommended Configuration:**

| Type | Host | Answer | TTL |
|------|------|--------|-----|
| A | @ | 76.76.21.21 | 600 |
| CNAME | www | cname.vercel-dns.com | 600 |

### Step 4: Verify SSL

Vercel automatically provisions SSL certificates. Visit your site to verify.

---

## Option 4: Cloudflare (Free CDN + SSL)

### Why Use Cloudflare?
- ✅ Free CDN and DDoS protection
- ✅ Faster global performance
- ✅ Analytics included
- ✅ Works with any hosting

### Step 1: Sign Up for Cloudflare

1. Go to [cloudflare.com](https://cloudflare.com)
2. Add your site: `globalsharks.wiki`
3. Choose Free plan

### Step 2: Update Nameservers in Porkbun

Cloudflare will provide custom nameservers like:
- `alice.ns.cloudflare.com`
- `bob.ns.cloudflare.com`

**In Porkbun:**
1. Domain Management → globalsharks.wiki
2. Authoritative Nameservers
3. Change from Porkbun nameservers to Cloudflare nameservers

⚠️ **Warning:** This changes DNS management from Porkbun to Cloudflare!

### Step 3: Configure DNS in Cloudflare

Add the DNS records for your hosting provider (GitHub Pages, Netlify, or Vercel) in the Cloudflare dashboard instead of Porkbun.

### Step 4: Enable SSL

1. Cloudflare Dashboard → SSL/TLS
2. Choose "Full" or "Full (strict)"
3. Enable "Always Use HTTPS"

---

## DNS Record Types Explained

### A Record
- Points domain to IP address
- Use for apex domain (`globalsharks.wiki`)
- Example: `@ → 185.199.108.153`

### CNAME Record
- Points domain to another domain
- Use for subdomains (`www.globalsharks.wiki`)
- Example: `www → username.github.io`
- ⚠️ Cannot use for apex domain (use A record or ALIAS)

### ALIAS Record (if supported)
- Like CNAME but works for apex domain
- Porkbun doesn't support ALIAS records
- Use A records instead for apex domain

### TTL (Time To Live)
- How long DNS records are cached
- 600 = 10 minutes
- Lower TTL = faster updates, more DNS queries
- Higher TTL = slower updates, fewer DNS queries

---

## Common DNS Configurations

### For GitHub Pages

```
Type    Host    Answer                      TTL
A       @       185.199.108.153             600
A       @       185.199.109.153             600
A       @       185.199.110.153             600
A       @       185.199.111.153             600
CNAME   www     username.github.io          600
```

### For Netlify

```
Type    Host    Answer                          TTL
CNAME   @       apex-loadbalancer.netlify.com   600
CNAME   www     your-site.netlify.app           600
```

### For Vercel

```
Type    Host    Answer                  TTL
A       @       76.76.21.21             600
CNAME   www     cname.vercel-dns.com    600
```

### Email (Optional - if you want email on your domain)

```
Type    Host    Answer                  Priority    TTL
MX      @       mail.example.com        10          600
```

---

## Verification & Testing

### Check DNS Propagation

```bash
# Command line
dig globalsharks.wiki
nslookup globalsharks.wiki

# For Windows
nslookup globalsharks.wiki
```

### Online Tools

- [What's My DNS](https://www.whatsmydns.net/#A/globalsharks.wiki)
- [DNS Checker](https://dnschecker.org/#A/globalsharks.wiki)
- [DNS Lookup](https://mxtoolbox.com/SuperTool.aspx?action=a%3aglobalsharks.wiki)

### Test SSL Certificate

```bash
# Command line
curl -vI https://globalsharks.wiki

# Check SSL details
openssl s_client -connect globalsharks.wiki:443 -servername globalsharks.wiki
```

### Online SSL Checker

- [SSL Labs](https://www.ssllabs.com/ssltest/analyze.html?d=globalsharks.wiki)
- [SSL Checker](https://www.sslshopper.com/ssl-checker.html#hostname=globalsharks.wiki)

---

## Troubleshooting

### DNS Not Resolving

**Symptom:** Domain doesn't load or shows "DNS_PROBE_FINISHED_NXDOMAIN"

**Solutions:**
1. Wait 15-30 minutes for DNS propagation
2. Clear your DNS cache:
   ```bash
   # macOS
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # Windows
   ipconfig /flushdns
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```
3. Verify DNS records in Porkbun dashboard
4. Check nameservers are correct

### SSL Certificate Not Working

**Symptom:** "Your connection is not private" or "NET::ERR_CERT_COMMON_NAME_INVALID"

**Solutions:**
1. Wait 15-30 minutes after DNS configuration
2. Verify DNS is pointing to correct IP/domain
3. Enable "Enforce HTTPS" in hosting provider
4. Check SSL status in hosting dashboard

### www Not Working

**Symptom:** `www.globalsharks.wiki` doesn't load but `globalsharks.wiki` works

**Solutions:**
1. Add CNAME record for `www` subdomain
2. Enable "www redirect" in hosting provider
3. Wait for DNS propagation

### Redirect Loop

**Symptom:** Page keeps redirecting endlessly

**Solutions:**
1. Check SSL mode in Cloudflare (if using)
2. Verify "Force HTTPS" settings
3. Clear browser cache and cookies

### Mixed Content Warnings

**Symptom:** "This page contains insecure content"

**Solutions:**
1. Ensure all assets use `https://` not `http://`
2. Check for hardcoded http:// URLs in code
3. Use relative URLs instead of absolute URLs

---

## DNS Propagation Timeline

| Time | What Happens |
|------|-------------|
| 0 min | DNS records updated in Porkbun |
| 5 min | Some DNS servers see new records |
| 15 min | Most DNS servers updated |
| 30 min | Majority of users can access site |
| 2 hours | Almost all DNS servers updated |
| 24 hours | Complete worldwide propagation |
| 48 hours | 100% propagation guaranteed |

💡 **Tip:** Use a different network (mobile data) to test if DNS has propagated, as your computer may cache old DNS records.

---

## Monitoring & Maintenance

### Uptime Monitoring

Set up monitoring to get alerts if your site goes down:

- [UptimeRobot](https://uptimerobot.com) - Free, 50 monitors
- [Pingdom](https://www.pingdom.com) - Free trial
- [StatusCake](https://www.statuscake.com) - Free tier

### SSL Certificate Renewal

All recommended hosting providers automatically renew SSL certificates:
- GitHub Pages: Automatic (Let's Encrypt)
- Netlify: Automatic (Let's Encrypt)
- Vercel: Automatic (Let's Encrypt)
- Cloudflare: Automatic (Cloudflare Universal SSL)

Check SSL expiry:
```bash
echo | openssl s_client -servername globalsharks.wiki -connect globalsharks.wiki:443 2>/dev/null | openssl x509 -noout -dates
```

---

## Security Best Practices

### Enable Security Headers

Add to your hosting configuration:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'
```

These are already configured in `netlify.toml` and `vercel.json`.

### DNSSEC (Optional)

DNSSEC adds an extra layer of security to DNS.

**Enable in Porkbun:**
1. Domain Management → globalsharks.wiki
2. DNSSEC section
3. Enable DNSSEC
4. Add DS records if required

⚠️ **Warning:** Only enable if you understand DNSSEC. Misconfiguration can break your site.

---

## Quick Reference: Porkbun Dashboard

### Where to Find Things

**DNS Records:**
1. Login to Porkbun
2. Account → Domain Management
3. Click on `globalsharks.wiki`
4. Scroll to "DNS Records" section

**Nameservers:**
1. Domain Management → globalsharks.wiki
2. "Details" tab
3. "Authoritative Nameservers" section

**Auto-Renew:**
1. Domain Management → globalsharks.wiki
2. Toggle "Auto Renew" switch

**SSL Certificate (if using Porkbun hosting):**
1. Domain Management → globalsharks.wiki
2. "SSL" section

---

## Support Resources

- **Porkbun Docs:** [kb.porkbun.com](https://kb.porkbun.com)
- **GitHub Pages Docs:** [docs.github.com/pages](https://docs.github.com/pages)
- **Netlify Docs:** [docs.netlify.com](https://docs.netlify.com)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Cloudflare Docs:** [developers.cloudflare.com](https://developers.cloudflare.com)

---

**Domain:** globalsharks.wiki  
**Project:** Sharks from Space  
**Team:** Space Pirates  
**NASA Space Apps Challenge 2025**

