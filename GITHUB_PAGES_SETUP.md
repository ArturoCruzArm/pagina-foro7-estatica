# GitHub Pages - Guía de Configuración Avanzada

## 🎯 Objetivos

Implementar todas las mejores tecnologías modernas para maximizar:
- 🚀 Performance (Lighthouse > 90)
- 🔒 Seguridad (A+ en Security Headers)
- ♿ Accesibilidad (WCAG 2.1 AA)
- 📱 SEO y Mobile-first

## 📋 Estructura de Archivos

```
.
├── .github/
│   └── workflows/
│       ├── lighthouse-ci.yml          # Auditoría automática
│       ├── build-deploy.yml           # CI/CD pipeline
│       └── security-performance.yml   # Chequeos de seguridad
├── _config.yml                        # Configuración Jekyll
├── _headers                           # Security headers
├── _redirects                         # Redirecciones
├── index.html                         # Con optimizaciones
├── manifest.json                      # PWA manifest
├── sitemap.xml                        # SEO sitemap
├── robots.txt                         # Crawlers config
└── optimize-images.sh                 # Script de optimización
```

## 🚀 Pasos de Implementación

### 1. **Configurar GitHub Pages en Settings**

```
Repository Settings → Pages
- Source: Deploy from a branch
- Branch: main (o master)
- Folder: / (root)
- Enforce HTTPS: ✓
```

### 2. **Configurar Custom Domain**

```
- En Settings → Pages → Custom domain: foro7.com.mx
- Actualizar DNS registrar:
  CNAME foro7.com.mx → ArturoCruzArm.github.io
  (o usar A records para apex domain)
```

### 3. **Habilitar Features Avanzados**

```bash
# Crear rama para Pages
git branch -M main

# Push con configuración
git push -u origin main

# GitHub Actions se ejecutarán automáticamente
```

### 4. **Verificar Workflows**

```
Repository → Actions
- lighthouse-ci: Ejecuta en PRs y schedule semanal
- build-deploy: En cada push a main
- security-performance: Chequeos diarios
```

## 🔒 Security Headers Implementados

| Header | Valor | Propósito |
|--------|-------|----------|
| Content-Security-Policy | Restrictivo | Previene XSS |
| X-Frame-Options | SAMEORIGIN | Clickjacking protection |
| X-Content-Type-Options | nosniff | MIME sniffing protection |
| Strict-Transport-Security | 31536000s | Force HTTPS |
| Referrer-Policy | strict-origin | Control referrer |
| Permissions-Policy | Restrictivo | Desactiva APIs riesgosas |

## 🎨 Optimizaciones de Performance

### Preload Strategy
```html
<!-- Recursos críticos para above-the-fold -->
<link rel="preload" href="fonts/..." as="font" type="font/woff2">
<link rel="preload" href="images/hero.jpg" as="image">
```

### Preconnect Strategy
```html
<!-- Conexiones anticipadas a servidores terceros -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://vimeo.com">
```

### Lazy Loading
```html
<!-- Imágenes no críticas -->
<img src="image.jpg" loading="lazy" alt="...">
```

## 📱 PWA Features

```json
{
  "display": "standalone",
  "scope": "/",
  "start_url": "/",
  "theme_color": "#D2691E",
  "background_color": "#FFF8DC"
}
```

Beneficios:
- ✅ Instalable en home screen
- ✅ Funciona offline con Service Worker
- ✅ App-like experience

## 📊 Monitoreo Continuo

### Lighthouse CI
```bash
# Ejecuta en cada PR y push
# Genera reportes automatizados
# Comenta resultados en PRs
```

### Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5s ✓
- FID (First Input Delay): < 100ms ✓
- CLS (Cumulative Layout Shift): < 0.1 ✓

### Google PageSpeed Insights
```
URL: https://pagespeed.web.dev/
- Ingresa: https://foro7.com.mx
- Monitorea cambios
```

## 🔍 SEO Optimizations

### Meta Tags
- ✅ Open Graph (Facebook)
- ✅ Twitter Card
- ✅ Structured Data (JSON-LD)
- ✅ Mobile-friendly
- ✅ Canonical tags

### Indexing
```
- robots.txt: Permite crawlers
- sitemap.xml: URLs con metadata
- Submit a Google Search Console
```

## 🛡️ Security Checklist

- [ ] HTTPS habilitado
- [ ] Security headers configurados
- [ ] CSP policy implementada
- [ ] Dependencies auditadas (npm audit)
- [ ] No secrets en código
- [ ] Rate limiting (si aplica)

## 📈 Métricas Esperadas

```
Lighthouse Scores:
Performance: 95+
Accessibility: 98+
Best Practices: 95+
SEO: 100

Core Web Vitals:
LCP: 1.2s
FID: 0.8ms
CLS: 0.04
```

## 🔄 Mantenimiento Regular

```
Semanal:
- Revisar Lighthouse CI reports
- Monitorear Core Web Vitals

Mensual:
- Auditoria de seguridad
- Actualizar dependencias
- Revisar Google Search Console

Anual:
- Full security audit
- Performance optimization review
```

## 📚 Recursos Útiles

- [GitHub Pages Docs](https://docs.github.com/pages)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Web.dev](https://web.dev/) - Performance guides
- [OWASP Security Headers](https://owasp.org/www-project-secure-headers/)
- [MDN Web Docs](https://developer.mozilla.org/)

## ❓ Troubleshooting

### GitHub Pages no actualiza
```bash
git add .
git commit -m "Update"
git push origin main
# Esperar 1-2 minutos
```

### Workflows no corren
```
Settings → Actions → General
- Asegurar que "Actions" está habilitado
- Check: Allow GitHub Actions to create PRs
```

### Performance bajo
1. Ejecutar Lighthouse localmente
2. Revisar Network tab en DevTools
3. Optimizar imágenes grandes
4. Implementar lazy loading

---

**Documento de referencia:** 30/01/2026
**Tecnologías incluidas:** HTML5, CSS3, JavaScript, GitHub Actions, Lighthouse, PWA
