#!/bin/bash
# Image Optimization Script
# Convierte imágenes a WebP y optimiza JPG/PNG

# Instalación requerida:
# brew install imagemagick webp (Mac)
# apt-get install imagemagick webp (Linux)
# choco install imagemagick webp (Windows con Chocolatey)

echo "🖼️  Iniciando optimización de imágenes..."

# Variables
GALLERY_DIR="./images/gallery"
TESTIMONIALS_DIR="./images/testimonials"
QUALITY=85
WEBP_QUALITY=80

# Función para optimizar imágenes
optimize_images() {
    local dir=$1
    
    if [ ! -d "$dir" ]; then
        echo "Directorio no encontrado: $dir"
        return
    fi
    
    echo "Procesando: $dir"
    
    # Procesar JPG
    for file in "$dir"/*.jpg "$dir"/*.jpeg; do
        if [ -f "$file" ]; then
            echo "  Optimizando: $(basename "$file")"
            
            # Optimizar JPG original
            convert "$file" -quality $QUALITY -strip "$file"
            
            # Crear versión WebP
            convert "$file" -quality $WEBP_QUALITY "${file%.*}.webp"
        fi
    done
    
    # Procesar PNG
    for file in "$dir"/*.png; do
        if [ -f "$file" ]; then
            echo "  Optimizando: $(basename "$file")"
            
            # Optimizar PNG
            convert "$file" -strip "$file"
            
            # Crear versión WebP
            convert "$file" "${file%.*}.webp"
        fi
    done
}

# Ejecutar optimización
optimize_images "$GALLERY_DIR"
optimize_images "$TESTIMONIALS_DIR"

echo "✅ Optimización completada!"
echo "📊 Uso de espacio:"
du -sh ./images/

# Generar reporte
echo "
=== Reporte de Optimización ===
Archivos procesados en:
- $GALLERY_DIR
- $TESTIMONIALS_DIR

Formatos:
- JPG/PNG: Optimizados a calidad $QUALITY
- WebP: Versiones generadas con calidad $WEBP_QUALITY

Recomendaciones:
1. Usar <picture> tags para WebP con fallback JPG/PNG
2. Implementar lazy loading en imágenes
3. Configurar responsive images con srcset
" > IMAGE_OPTIMIZATION_REPORT.md

echo "📝 Reporte guardado en: IMAGE_OPTIMIZATION_REPORT.md"
