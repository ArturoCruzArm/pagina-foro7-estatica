# 🚀 Guía de Despliegue - Producciones Foro 7

Esta guía te ayudará a subir el sitio web a GitHub Pages paso a paso.

## 📋 Prerrequisitos

- Cuenta de GitHub
- Git instalado en tu computadora
- Acceso al dominio foro7.com.mx

## 🔧 Paso 1: Crear Repositorio en GitHub

1. Ve a [GitHub.com](https://github.com) e inicia sesión
2. Haz clic en el botón verde **"New"** para crear un repositorio
3. Configura el repositorio:
   - **Repository name**: `pagina-foro7-estatica`
   - **Description**: `Sitio web oficial de Producciones Foro 7 - Fotografía y video para bodas en León, Gto.`
   - ✅ **Public** (marcado)
   - ❌ **Add a README file** (desmarcado, ya tenemos uno)
   - ❌ **Add .gitignore** (desmarcado, ya tenemos uno)
   - ❌ **Choose a license** (desmarcado por ahora)

4. Haz clic en **"Create repository"**

## 📤 Paso 2: Subir Archivos al Repositorio

### Opción A: Usando Git (Recomendado)

```bash
# Ya tienes el repositorio inicializado, solo necesitas agregar el remote
cd "C:\pagina-foro7-estatica"
git remote add origin https://github.com/TU_USUARIO/pagina-foro7-estatica.git
git branch -M main
git push -u origin main
```

### Opción B: Subida Manual

1. En la página del repositorio recién creado, haz clic en **"uploading an existing file"**
2. Arrastra y suelta todos los archivos de la carpeta `C:\pagina-foro7-estatica`
3. Escribe un mensaje de commit: "Sitio web inicial Producciones Foro 7"
4. Haz clic en **"Commit changes"**

## 🌐 Paso 3: Activar GitHub Pages

1. En tu repositorio, ve a **Settings** (pestaña superior)
2. Desplázate hacia abajo hasta la sección **"Pages"** (menú lateral izquierdo)
3. En **"Source"**, selecciona:
   - **Deploy from a branch**
   - **Branch**: `main` 
   - **Folder**: `/ (root)`
4. Haz clic en **"Save"**

⏱️ **Espera 5-10 minutos** - GitHub procesará tu sitio.

## 🏷️ Paso 4: Configurar Dominio Personalizado

### En GitHub:
1. En la sección **Pages** de Settings
2. En **"Custom domain"**, escribe: `foro7.com.mx`
3. ✅ Marca **"Enforce HTTPS"**
4. Haz clic en **"Save"**

### En tu Proveedor de Dominio:
Agrega estos registros DNS:

```
Tipo: CNAME
Nombre: www
Valor: TU_USUARIO.github.io

Tipo: A
Nombre: @
Valores: 
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

## ✅ Paso 5: Verificar Funcionamiento

1. Visita: `https://TU_USUARIO.github.io/pagina-foro7-estatica`
2. Verifica que todo funcione correctamente
3. Una vez configurado el dominio, visita: `https://foro7.com.mx`

## 🔄 Actualizaciones Futuras

Para actualizar el sitio:

```bash
# Hacer cambios en los archivos
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

El sitio se actualizará automáticamente en 1-2 minutos.

## 🛠️ Configuraciones Adicionales

### Analytics (Opcional)
Para añadir Google Analytics, agrega este código antes de `</head>` en `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Search Console
1. Ve a [Google Search Console](https://search.google.com/search-console/)
2. Agrega la propiedad: `https://foro7.com.mx`
3. Verifica con el archivo HTML o meta tag

## 🚨 Solución de Problemas

### Problema: El sitio no carga
- ✅ Verifica que GitHub Pages esté activado
- ✅ Revisa que los archivos estén en la rama `main`
- ✅ Espera 10-15 minutos después de activar Pages

### Problema: El dominio no funciona
- ✅ Verifica los registros DNS (pueden tardar 24-48 horas)
- ✅ Confirma que el archivo `CNAME` contenga solo: `foro7.com.mx`
- ✅ Revisa que "Enforce HTTPS" esté activado

### Problema: Formulario no funciona
- ✅ El formulario redirige a WhatsApp automáticamente
- ✅ Verifica que el número de WhatsApp sea correcto
- ✅ No se requiere configuración adicional

## 📞 Contacto para Soporte

Si necesitas ayuda con el despliegue:
- **Email**: contacto@foro7.com.mx  
- **WhatsApp**: 477-920-3776

---

**¡Tu sitio web profesional estará listo en minutos!** 🎉

El sitio incluye todas las funcionalidades necesarias:
- ✅ Responsive design
- ✅ Integración WhatsApp
- ✅ Formulario de contacto
- ✅ Galería de fotos
- ✅ Videos de Vimeo
- ✅ SEO optimizado
- ✅ Despliegue automático