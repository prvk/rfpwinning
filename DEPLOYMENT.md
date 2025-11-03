# 🚀 Deployment Guide - RFP Winning Assistant

## Netlify Deployment (Empfohlen für MVP)

### Option 1: GitHub Integration (Automatisch)

1. **Repository auf GitHub pushen**
```bash
cd "/Users/petervonknobloch/Documents/Development/RFP winnning"
git init
git add .
git commit -m "Initial commit: RFP Winning Assistant Level 10"
git branch -M main
git remote add origin https://github.com/prvk/rfpwinning.git
git push -u origin main
```

2. **Netlify Dashboard öffnen**
   - Gehe zu [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Wähle "GitHub" als Provider
   - Autorisiere Netlify für dein Repository
   - Wähle das Repository `prvk/rfpwinning`

3. **Build Settings konfigurieren**
   ```
   Build command: npm run build
   Publish directory: dist
   Node version: 18
   ```

4. **Deploy!**
   - Click "Deploy site"
   - Netlify baut und deployt automatisch
   - URL wird generiert: `https://YOUR-SITE.netlify.app`

5. **Custom Domain (Optional)**
   - Settings → Domain management
   - Add custom domain: `rfp-assistant.com`
   - DNS konfigurieren (Netlify DNS oder externe DNS)

### Option 2: Netlify CLI (Manuell)

```bash
# Netlify CLI installieren
npm install -g netlify-cli

# Login
netlify login

# Projekt initialisieren
netlify init

# Build & Deploy
npm run build
netlify deploy --prod
```

### Environment Variables (wenn Backend kommt)
```bash
# Netlify Dashboard → Site settings → Environment variables
VITE_API_URL=https://api.rfp-assistant.com
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
```

---

## Alternative Hosting-Optionen

### Vercel

1. **Repository auf GitHub**
2. **Vercel Dashboard**
   - Import Project from GitHub
   - Framework: Vite
   - Build: `npm run build`
   - Output: `dist`

### AWS S3 + CloudFront

```bash
# Build
npm run build

# AWS CLI Setup
aws configure

# S3 Bucket erstellen
aws s3 mb s3://rfp-assistant

# Upload
aws s3 sync dist/ s3://rfp-assistant --acl public-read

# CloudFront Distribution erstellen
# (via AWS Console)
```

### Docker (für Backend-Integration)

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]
```

```bash
# Build Docker Image
docker build -t rfp-assistant .

# Run Container
docker run -p 3000:3000 rfp-assistant
```

---

## CI/CD Setup

### GitHub Actions (Automatisch bei Push)

Erstelle `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install Dependencies
      run: npm ci

    - name: Build
      run: npm run build

    - name: Deploy to Netlify
      uses: netlify/actions/cli@master
      with:
        args: deploy --prod
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### Secrets konfigurieren
1. GitHub Repository → Settings → Secrets → New repository secret
2. `NETLIFY_AUTH_TOKEN`: Von Netlify User Settings
3. `NETLIFY_SITE_ID`: Von Netlify Site Settings

---

## Performance Optimization (Production)

### 1. Lighthouse Optimierung

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'icons': ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

### 2. Image Optimization
- Nutze WebP für Images
- Lazy Loading für Images: `loading="lazy"`
- CDN für Static Assets

### 3. Caching Strategy
```toml
# netlify.toml
[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## Monitoring & Analytics

### 1. Netlify Analytics
```bash
# Aktivieren in Netlify Dashboard
Site settings → Analytics → Enable
```

### 2. Google Analytics (Optional)
```html
<!-- index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. Sentry (Error Tracking)
```bash
npm install @sentry/react
```

```javascript
// main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

---

## Rollback & Versioning

### Netlify Rollback
```bash
# Liste alle Deploys
netlify deploy:list

# Rollback zu spezifischem Deploy
netlify deploy:rollback DEPLOY_ID
```

### Git Tags für Releases
```bash
# Tag erstellen
git tag -a v1.0.0 -m "Release v1.0.0: Level 10 MVP"
git push origin v1.0.0

# Bei Problemen: Rollback
git checkout v1.0.0
netlify deploy --prod
```

---

## Troubleshooting

### Build Failed
```bash
# Lokal testen
npm run build

# Netlify Build Logs checken
netlify build

# Node Version prüfen
node --version  # Sollte >= 18.0.0 sein
```

### 404 Errors (SPA Routing)
Netlify.toml sollte enthalten:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Slow Build Times
```bash
# Dependencies cachen
# Netlify macht das automatisch

# Oder Build Command optimieren:
npm ci --prefer-offline
npm run build
```

---

## Security Checklist

- [ ] HTTPS aktiviert (Netlify macht automatisch)
- [ ] Environment Variables für Secrets (nicht in Code!)
- [ ] CSP Headers konfiguriert
- [ ] Rate Limiting (bei Backend)
- [ ] CORS konfiguriert (bei Backend)
- [ ] Dependency Security Audit: `npm audit`

---

## Post-Deployment Checklist

- [ ] Live-URL testen: `https://YOUR-SITE.netlify.app`
- [ ] Demo-Modus funktioniert
- [ ] Alle 3 Demo-RFPs laden korrekt
- [ ] Knowledge Base (FAQ, Glossar, Portale) vollständig
- [ ] Templates laden korrekt
- [ ] Export-Funktionen zeigen Modals
- [ ] Mobile Responsiveness prüfen
- [ ] Lighthouse Score > 85
- [ ] Accessibility Score > 90

---

## Next Steps nach MVP Deployment

1. **Backend entwickeln** (siehe `docs/backend-architecture.md`)
2. **Domain registrieren** (z.B. `rfp-assistant.com`)
3. **SSL Zertifikat** (Netlify automatisch)
4. **Analytics einrichten**
5. **Error Tracking** (Sentry)
6. **User Feedback** sammeln (Hotjar, Intercom)

---

**Ready to deploy?** 🚀

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

Netlify deployt automatisch in ~2 Minuten!
