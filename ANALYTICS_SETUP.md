# 📊 Configuración de Analytics - Producciones Foro 7

Guía completa para configurar el seguimiento y análisis de tu sitio web.

## 🔍 Google Analytics 4 (GA4)

### 📝 Configuración Inicial

1. **Crear cuenta en Google Analytics:**
   - Ve a [analytics.google.com](https://analytics.google.com)
   - Crea una cuenta nueva para "Producciones Foro 7"
   - Configura una propiedad para el sitio web

2. **Obtener código de seguimiento:**
   - Copia tu MEASUREMENT_ID (ejemplo: G-XXXXXXXXXX)
   - Guárdalo para el siguiente paso

3. **Instalar en el sitio web:**

**Agregar al `index.html` antes de `</head>`:**

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TU_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TU_MEASUREMENT_ID');
</script>
```

### 🎯 Eventos Personalizados

**Agregar al `script.js`:**

```javascript
// Tracking de clicks en WhatsApp
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        gtag('event', 'whatsapp_click', {
            'event_category': 'contact',
            'event_label': 'whatsapp_button'
        });
    });
});

// Tracking de envío de formulario
document.getElementById('contactForm').addEventListener('submit', function() {
    gtag('event', 'form_submit', {
        'event_category': 'lead',
        'event_label': 'contact_form'
    });
});

// Tracking de visualización de videos
document.querySelector('.vimeo-container iframe').addEventListener('load', function() {
    gtag('event', 'video_view', {
        'event_category': 'engagement',
        'event_label': 'portfolio_video'
    });
});
```

## 📈 Google Search Console

### 🔧 Configuración

1. **Registrar propiedad:**
   - Ve a [search.google.com/search-console](https://search.google.com/search-console)
   - Agrega `https://foro7.com.mx` como nueva propiedad

2. **Verificar dominio:**
   - **Opción A**: Subir archivo HTML a la raíz del sitio
   - **Opción B**: Agregar meta tag al `<head>`:

```html
<meta name="google-site-verification" content="TU_CODIGO_VERIFICACION" />
```

3. **Enviar sitemap:**
   - En Search Console, ve a "Sitemaps"
   - Envía: `https://foro7.com.mx/sitemap.xml`

### 📊 Métricas Clave a Monitorear

**Rendimiento:**
- Clicks totales
- Impresiones
- CTR promedio
- Posición promedio

**Palabras Clave:**
- "fotografo bodas leon"
- "video bodas guanajuato"
- "foro 7 producciones"
- "fotografia profesional leon"

## 🎯 Facebook Pixel

### 📱 Configuración Meta Business

1. **Crear Facebook Business Manager:**
   - Ve a [business.facebook.com](https://business.facebook.com)
   - Configura cuenta para Producciones Foro 7

2. **Crear Pixel:**
   - En Eventos Manager, crea un nuevo pixel
   - Copia el código de instalación

3. **Instalar en el sitio:**

```html
<!-- Facebook Pixel -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'TU_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript>
<img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=TU_PIXEL_ID&ev=PageView&noscript=1"/>
</noscript>
```

### 🎯 Eventos Personalizados Facebook

```javascript
// Lead - Envío de formulario
fbq('track', 'Lead', {
    content_name: 'Contact Form',
    content_category: 'Wedding Photography'
});

// ViewContent - Visualización de portafolio
fbq('track', 'ViewContent', {
    content_name: 'Portfolio',
    content_type: 'product'
});

// Contact - Click en WhatsApp
fbq('track', 'Contact', {
    content_name: 'WhatsApp',
    content_category: 'Direct Contact'
});
```

## 📊 Google Tag Manager (Recomendado)

### 🏗️ Configuración Avanzada

1. **Crear cuenta GTM:**
   - Ve a [tagmanager.google.com](https://tagmanager.google.com)
   - Crea contenedor para foro7.com.mx

2. **Instalar códigos:**

**En `<head>`:**
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
```

**Después de `<body>`:**
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

## 🎯 Hotjar - Mapas de Calor

### 👁️ Análisis de Comportamiento

1. **Crear cuenta:**
   - Ve a [hotjar.com](https://hotjar.com)
   - Plan gratuito hasta 35 sesiones/día

2. **Instalar código:**

```html
<!-- Hotjar Tracking Code -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:XXXXXXX,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

### 📊 Análisis Recomendados

**Heatmaps:**
- Página principal (Hero section)
- Sección de servicios
- Portafolio/galería
- Formulario de contacto

**Recordings:**
- Primeros 10 visitantes semanales
- Sesiones con conversión
- Sesiones que abandonan

## 📱 WhatsApp Business API Analytics

### 📊 Métricas de WhatsApp

**KPIs Importantes:**
- Mensajes recibidos por día
- Tiempo de respuesta promedio
- Tasa de conversión chat → cotización
- Horarios de mayor actividad

**Herramientas Recomendadas:**
- WhatsApp Business (app nativa)
- ChatBot simple con respuestas automáticas
- CRM básico (Google Sheets/Airtable)

## 📈 Dashboard de Métricas

### 📊 Google Data Studio

**Conectar fuentes:**
- Google Analytics 4
- Google Search Console  
- Facebook/Instagram Insights
- Google My Business

**Métricas Principales:**
```
🌐 TRÁFICO WEB
- Visitantes únicos: [Número]
- Sesiones: [Número]  
- Duración promedio: [Tiempo]
- Tasa de rebote: [Porcentaje]

💬 CONVERSIONES
- Clicks WhatsApp: [Número]
- Formularios: [Número]
- Cotizaciones: [Número]
- Ventas: [Número]

📱 REDES SOCIALES  
- Seguidores: [Número]
- Engagement: [Porcentaje]
- Clicks al sitio: [Número]
- Leads sociales: [Número]
```

## 🎯 Objetivos SMART 2024

### 📊 Metas Cuantificables

**Tráfico:**
- 1,000+ visitantes únicos/mes (Dic 2024)
- 60%+ tráfico desde móvil
- <3 segundos tiempo de carga
- <50% tasa de rebote

**Conversiones:**
- 100+ clicks WhatsApp/mes
- 25+ formularios completados/mes
- 15+ cotizaciones enviadas/mes
- 5+ bodas contratadas/mes

**SEO:**
- Top 3 para "fotografo bodas leon"
- 50+ palabras clave posicionadas
- 20+ backlinks de calidad
- 4.8+ estrellas Google My Business

## 🔄 Reportes Automáticos

### 📧 Email Reports

**Semanal (Lunes 9am):**
- Resumen tráfico web
- Nuevos leads generados
- Mensajes WhatsApp recibidos

**Mensual (1ro de cada mes):**
- Dashboard completo
- Análisis vs objetivos
- Recomendaciones de mejora

### 📱 Notificaciones Importantes

**Alertas Inmediatas:**
- Nuevo formulario completado
- Sitio web caído (>5 min)
- Pico inusual de tráfico
- Nueva reseña Google

## 📞 Soporte Analytics

**Para configuración y dudas:**
- WhatsApp: 477-920-3776
- Email: contacto@foro7.com.mx
- Sesión de configuración: 1 hora incluida

---

¡Con estas herramientas tendrás control total del rendimiento de tu sitio! 📊✨