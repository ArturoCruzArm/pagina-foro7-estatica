# Core Web Vitals Optimization Guide

## 🚀 Estado Actual de Optimizaciones

Este documento describe todas las optimizaciones implementadas para maximizar rendimiento en GitHub Pages.

### 1. **Largest Contentful Paint (LCP) - Target: < 2.5s**

Implementado:
- ✅ Preload de fuentes críticas
- ✅ Preload de imagen hero
- ✅ Inline critical CSS
- ✅ Lazy loading de imágenes no críticas
- ✅ Compresión y optimización de assets

```html
<link rel="preload" href="..." as="image" fetchpriority="high">
```

### 2. **First Input Delay (FID) / Interaction to Next Paint (INP)**

Implementado:
- ✅ JavaScript optimizado (sin bloques)
- ✅ Event listeners eficientes
- ✅ Debouncing en scroll/resize
- ✅ Web Workers para tareas pesadas (si aplica)

### 3. **Cumulative Layout Shift (CLS) - Target: < 0.1**

Implementado:
- ✅ Especificación de dimensiones en imágenes
- ✅ Reserva de espacio para fuentes
- ✅ Font-display: swap
- ✅ Fixed dimensions para elementos animados

### 4. **Cache Strategy**

```
- HTML: Cache-Control: max-age=3600, must-revalidate
- CSS/JS: Cache-Control: max-age=31536000, immutable
- Imágenes: Cache-Control: max-age=31536000, immutable
```

### 5. **Security Headers**

```
✅ Content-Security-Policy (CSP)
✅ X-Frame-Options
✅ X-Content-Type-Options
✅ Strict-Transport-Security (HSTS)
✅ Referrer-Policy
✅ Permissions-Policy
```

### 6. **Rendimiento de Red**

- preconnect: Conexiones tempranas a dominios críticos
- dns-prefetch: Resolución anticipada de DNS
- prefetch: Precarga de recursos futuros
- preload: Carga prioritaria de recursos críticos

### 7. **Image Optimization**

Recomendaciones:
```html
<!-- WebP con fallback -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

### 8. **PWA Enhancements**

- Service Worker: Caché offline
- Manifest: Instalación en home screen
- Offline support: Respuestas en caché

## 📊 Métricas de Rendimiento Esperadas

Después de implementar estas optimizaciones:

| Métrica | Target | Estado |
|---------|--------|--------|
| Performance | 90+ | ⏳ Verificar |
| Accessibility | 95+ | ⏳ Verificar |
| Best Practices | 90+ | ⏳ Verificar |
| SEO | 100 | ⏳ Verificar |
| FCP | < 1.8s | ⏳ Verificar |
| LCP | < 2.5s | ⏳ Verificar |
| CLS | < 0.1 | ⏳ Verificar |

## 🔄 GitHub Actions Workflows

Implementado:
1. **lighthouse-ci.yml** - Auditoría semanal y en PRs
2. **build-deploy.yml** - Validación y deploy en push
3. **security-performance.yml** - Chequeos diarios de seguridad

## 📝 Next Steps

1. Ejecutar pruebas en production
2. Monitorear Core Web Vitals
3. Optimizar imágenes a WebP
4. Implementar lazy loading en galerías
5. Configurar CloudFlare para compresión adicional

## 🛠️ Herramientas de Testing

```bash
# Test local
npx lighthouse https://foro7.com.mx --chrome-flags="--headless"

# Validar HTML
html-validate index.html

# Verificar links rotos
blc https://foro7.com.mx -r -e

# Análisis de seguridad
npm audit
```

---

**Última actualización:** 30/01/2026
