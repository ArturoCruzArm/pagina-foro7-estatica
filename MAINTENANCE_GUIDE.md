# 🔧 Guía de Mantenimiento - Producciones Foro 7

Esta guía te ayudará a mantener y actualizar tu sitio web de manera sencilla.

## 📝 Actualizaciones Comunes

### 🖼️ Cambiar Fotos del Portafolio

**Archivo a editar**: `index.html`

1. Busca la sección `<div class="photo-gallery">`
2. Reemplaza las URLs de las imágenes:

```html
<!-- ANTES -->
<img src="https://images.unsplash.com/photo-1606216794074..." alt="Boda 1">

<!-- DESPUÉS -->
<img src="URL_DE_TU_NUEVA_FOTO" alt="Descripción de la boda">
```

**💡 Recomendaciones para fotos:**
- Tamaño recomendado: 800x600 píxeles
- Formato: JPG optimizado
- Peso máximo: 200KB por imagen
- Usar servicios como [TinyPNG](https://tinypng.com) para optimizar

### 📞 Actualizar Información de Contacto

**Archivo a editar**: `index.html`

Busca y reemplaza en estas secciones:

```html
<!-- WhatsApp -->
href="https://wa.me/5214779203776"
<!-- Cambiar por: -->
href="https://wa.me/NUEVO_NUMERO"

<!-- Email -->
contacto@foro7.com.mx
<!-- Cambiar por: -->
nuevo-email@dominio.com

<!-- Dirección -->
Padilla 112, Chapalita, León, Gto.
<!-- Cambiar por: -->
Nueva dirección completa
```

### 💰 Actualizar Precios de Servicios

**Archivo a editar**: `index.html`

1. Busca la sección `<div class="services-grid">`
2. Modifica las listas de servicios:

```html
<li>100 fotos editadas profesionalmente</li>
<!-- Cambiar cantidad o agregar precios -->
<li>100 fotos editadas profesionalmente - $X,XXX</li>
```

### 🎥 Cambiar Videos de Vimeo

**Archivo a editar**: `index.html`

1. Busca: `<iframe src="https://player.vimeo.com/video/showcase/10687071/embed"`
2. Reemplaza con el ID de tu nuevo video:

```html
<!-- Obtén el ID del video de Vimeo desde tu panel -->
<iframe src="https://player.vimeo.com/video/TU_VIDEO_ID/embed"
```

### 🔗 Actualizar Redes Sociales

**Archivo a editar**: `index.html`

Busca y actualiza los enlaces:

```html
<!-- Facebook -->
href="https://www.fb.com/foro7producciones"
<!-- Cambiar por tu página actual -->
href="https://www.facebook.com/tu-pagina"

<!-- Instagram (si quieres agregar) -->
<a href="https://www.instagram.com/tu-cuenta" target="_blank" rel="noopener">
    <i class="fab fa-instagram"></i>
</a>
```

## 🎨 Cambios de Diseño Simples

### 🎨 Cambiar Colores Principales

**Archivo a editar**: `styles.css`

Busca estas variables al inicio del archivo y cámbialas:

```css
/* Colores actuales */
#D2691E  /* Naranja principal */
#CD853F  /* Dorado */
#8B4513  /* Café */

/* Para cambiar todos los colores naranjas por azul: */
/* Usa Buscar y Reemplazar (Ctrl+H) */
/* Buscar: #D2691E */
/* Reemplazar por: #2E86AB (azul) */
```

### ✏️ Cambiar Tipografías

**Archivo a editar**: `styles.css`

1. Buscar: `font-family: 'Playfair Display'`
2. Reemplazar por otra tipografía de [Google Fonts](https://fonts.google.com)

```css
/* Ejemplo: cambiar a Montserrat */
font-family: 'Montserrat', serif;
```

3. Actualizar el enlace en `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
```

## 📱 Agregar Nuevas Secciones

### 📋 Agregar Nueva Sección de Servicios

1. **En `index.html`**, después de la última `service-card`:

```html
<div class="service-card">
    <i class="fas fa-ring"></i> <!-- Ícono de Font Awesome -->
    <h3>Compromiso</h3>
    <ul>
        <li>Servicio personalizado</li>
        <li>Atención 24/7</li>
        <li>Garantía de calidad</li>
    </ul>
</div>
```

### 📸 Agregar Galería de Instagram

1. **En `index.html`**, en la sección portfolio:

```html
<div class="instagram-section">
    <h3>Síguenos en Instagram</h3>
    <div class="instagram-feed">
        <!-- Widget de Instagram o fotos manuales -->
    </div>
</div>
```

## 🔧 Mantenimiento Técnico

### 🔄 Backup Regular

**Frecuencia recomendada**: Mensual

1. Descargar todos los archivos del repositorio GitHub
2. Guardar una copia en Google Drive o similar
3. Documentar los cambios realizados

### 📊 Monitoreo de Rendimiento

**Herramientas recomendadas**:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)

**Métricas importantes**:
- ✅ Velocidad de carga < 3 segundos
- ✅ Puntuación móvil > 90
- ✅ Todos los enlaces funcionando

### 🔍 SEO Básico

**Revisión mensual**:

1. **Google Search Console**:
   - Verificar errores de rastreo
   - Revisar palabras clave principales
   - Monitorear clics e impresiones

2. **Contenido actualizado**:
   - Fechas en el footer
   - Información de contacto
   - Precios actuales

## 🚨 Solución de Problemas Comunes

### ❌ Problema: Los cambios no se ven en el sitio

**Solución**:
1. Limpiar caché del navegador (Ctrl+F5)
2. Esperar 5-10 minutos para GitHub Pages
3. Verificar que los cambios se guardaron correctamente

### ❌ Problema: Formulario de contacto no funciona

**Solución**:
1. Verificar el número de WhatsApp en `script.js`
2. Probar el enlace de WhatsApp manualmente
3. Revisar la consola del navegador (F12) por errores

### ❌ Problema: Imágenes no cargan

**Solución**:
1. Verificar que las URLs sean correctas
2. Comprobar que las imágenes sean públicas
3. Usar servicios confiables como Unsplash o subir a GitHub

### ❌ Problema: El sitio se ve mal en móvil

**Solución**:
1. Probar en diferentes dispositivos
2. Usar las herramientas de desarrollador (F12)
3. Revisar los media queries en `styles.css`

## 📅 Calendario de Mantenimiento

### Semanal
- ✅ Verificar que todos los enlaces funcionen
- ✅ Revisar formulario de contacto
- ✅ Comprobar velocidad de carga

### Mensual  
- ✅ Actualizar fotos del portafolio
- ✅ Revisar información de contacto
- ✅ Backup de archivos
- ✅ Análisis de Google Analytics

### Semestral
- ✅ Renovar certificado SSL (automático)
- ✅ Actualizar librerías (Font Awesome, etc.)
- ✅ Revisar diseño y tendencias
- ✅ Optimizar SEO

## 📞 Soporte Técnico

**Para cambios complejos o problemas técnicos:**

- **WhatsApp**: 477-920-3776
- **Email**: contacto@foro7.com.mx

**Recursos útiles:**
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [HTML/CSS Reference](https://www.w3schools.com/)
- [Font Awesome Icons](https://fontawesome.com/icons)

---

¡Tu sitio web está diseñado para ser fácil de mantener! 🛠️✨