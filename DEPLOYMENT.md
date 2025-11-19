# Deployment Guide

This guide covers deploying Readable Spokable PDF to various static hosting platforms.

## Prerequisites

-   Git installed
-   GitHub account (for GitHub Pages)
-   Vercel/Netlify account (for those platforms)

## Option 1: GitHub Pages (Recommended)

### Step 1: Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Spokable PDF application"

# Create repository on GitHub, then:
git remote add origin https://github.com/chirag127/spokable-pdf.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Your site will be live at: `https://chirag127.github.io/spokable-pdf/`

## Option 2: Vercel

### Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? spokable-pdf
# - Directory? ./
# - Override settings? No
```

### Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click **New Project**
3. Import your GitHub repository
4. Click **Deploy**
5. Your site will be live at: `https://spokable-pdf.vercel.app`

## Option 3: Netlify

### Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy

# For production:
netlify deploy --prod
```

### Using Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Connect to GitHub and select your repository
4. Build settings:
    - Build command: (leave empty)
    - Publish directory: `.`
5. Click **Deploy site**
6. Your site will be live at: `https://spokable-pdf.netlify.app`

## Option 4: Custom Server

### Using Apache

1. Copy all files to your web root:

```bash
cp -r * /var/www/html/spokable-pdf/
```

2. Ensure `.htaccess` is configured (if needed):

```apache
# Enable CORS for CDN resources
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>
```

### Using Nginx

1. Copy files to web root:

```bash
cp -r * /usr/share/nginx/html/spokable-pdf/
```

2. Configure nginx:

```nginx
server {
    listen 80;
    server_name spokable-pdf.yourdomain.com;
    root /usr/share/nginx/html/spokable-pdf;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/css text/javascript application/javascript;
}
```

## Post-Deployment Checklist

-   [ ] Test all pages load correctly
-   [ ] Verify dark mode toggle works
-   [ ] Test PDF upload and processing
-   [ ] Check Settings page saves correctly
-   [ ] Verify external CDN resources load (PDF.js, jsPDF)
-   [ ] Test on mobile devices
-   [ ] Check browser console for errors
-   [ ] Verify HTTPS is enabled (recommended)

## Custom Domain Setup

### GitHub Pages

1. Add `CNAME` file to repository root:

```
spokable-pdf.yourdomain.com
```

2. Configure DNS:

```
Type: CNAME
Name: spokable-pdf
Value: chirag127.github.io
```

### Vercel

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS as instructed

### Netlify

1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS as instructed

## Environment Variables

This application doesn't require environment variables as it's 100% client-side. Users provide their own API keys through the Settings page.

## Performance Optimization

### Enable Caching

Add cache headers for static assets:

```nginx
# Nginx
location ~* \.(css|js|jpg|png|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

```apache
# Apache
<FilesMatch "\.(css|js|jpg|png|svg)$">
    Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>
```

### Enable Compression

Ensure gzip/brotli compression is enabled for text files.

### CDN (Optional)

Consider using Cloudflare or similar CDN for:

-   DDoS protection
-   Global distribution
-   Additional caching
-   SSL/TLS

## Monitoring

### Basic Analytics (Optional)

If you want to add analytics, consider privacy-friendly options:

-   Plausible Analytics
-   Simple Analytics
-   Fathom Analytics

Add tracking code to `index.html` before `</body>`:

```html
<!-- Example: Plausible -->
<script
    defer
    data-domain="yourdomain.com"
    src="https://plausible.io/js/script.js"
></script>
```

## Troubleshooting

### CORS Issues

-   Ensure CDN resources (PDF.js, jsPDF) are loading correctly
-   Check browser console for CORS errors
-   Verify HTTPS is enabled

### Module Loading Errors

-   Ensure all JS files use `.js` extension
-   Verify import paths are correct
-   Check that server serves JS files with correct MIME type

### API Key Issues

-   Users must provide their own Gemini API keys
-   Keys are stored in browser LocalStorage
-   No server-side configuration needed

## Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **CSP Headers**: Consider adding Content Security Policy
3. **API Keys**: Never commit API keys to repository
4. **Updates**: Keep CDN dependencies updated

## Backup & Recovery

Since this is a static site with no backend:

-   Keep repository backed up on GitHub
-   Export LocalStorage settings if needed
-   No database to backup

## Support

For deployment issues:

-   Check [GitHub Issues](https://github.com/chirag127/spokable-pdf/issues)
-   Email: chiragsinghal127@gmail.com

---

Last Updated: November 19, 2025
