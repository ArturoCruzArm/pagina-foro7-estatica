// Variables globales para lightbox
let currentImageIndex = 0;
const lightboxImages = [
    {
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85',
        title: 'Boda Profesional León',
        description: 'Capturamos cada momento especial de tu boda con la más alta calidad profesional'
    },
    {
        src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85',
        title: 'Fotografía de Boda',
        description: 'Retratos únicos que reflejan la esencia de cada pareja'
    },
    {
        src: 'https://images.unsplash.com/photo-1594736797933-d0f06b6fde26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85',
        title: 'Video 4K Cinematográfico',
        description: 'Producción cinematográfica de alta calidad para tu evento especial'
    },
    {
        src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85',
        title: 'Tomas Aéreas con Dron',
        description: 'Perspectivas únicas y espectaculares desde el aire'
    },
    {
        src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85',
        title: 'Quinceañera Elegante',
        description: 'Celebraciones de XV años con estilo y distinción'
    },
    {
        src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85',
        title: 'Ceremonia Religiosa',
        description: 'Momentos sagrados capturados con respeto y profesionalismo'
    }
];

// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animación del menú hamburguesa
            navToggle.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Inicializar contadores animados
    initCounters();
    
    // Generar dots para lightbox
    generateLightboxDots();
    
    // Inicializar calculadora de precios
    initPriceCalculator();
    
    // Inicializar tabs de invitaciones
    initInvitationTabs();
});

// Scroll suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Cambiar estilo del header al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)';
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        header.style.background = 'linear-gradient(135deg, #D2691E 0%, #CD853F 100%)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        fechaEvento: document.getElementById('fecha-evento').value,
        servicio: document.getElementById('servicio').value,
        mensaje: document.getElementById('mensaje').value
    };
    
    // Validar campos requeridos
    if (!formData.nombre || !formData.email || !formData.mensaje) {
        alert('Por favor, completa todos los campos requeridos.');
        return;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Por favor, ingresa un email válido.');
        return;
    }
    
    // Crear mensaje para WhatsApp
    let whatsappMessage = `¡Hola! Me gustaría cotizar sus servicios:%0A%0A`;
    whatsappMessage += `*Nombre:* ${formData.nombre}%0A`;
    whatsappMessage += `*Email:* ${formData.email}%0A`;
    
    if (formData.telefono) {
        whatsappMessage += `*Teléfono:* ${formData.telefono}%0A`;
    }
    
    if (formData.fechaEvento) {
        whatsappMessage += `*Fecha del evento:* ${formData.fechaEvento}%0A`;
    }
    
    if (formData.servicio) {
        const servicios = {
            'fotografia': 'Fotografía',
            'video': 'Video 4K',
            'completo': 'Fotografía + Video',
            'dron': 'Tomas con Dron',
            'invitaciones': 'Invitaciones'
        };
        whatsappMessage += `*Servicio de interés:* ${servicios[formData.servicio]}%0A`;
    }
    
    whatsappMessage += `%0A*Mensaje:*%0A${formData.mensaje}%0A%0A`;
    whatsappMessage += `Mensaje enviado desde www.foro7.com.mx`;
    
    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/5214779203776?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Mostrar mensaje de confirmación
    alert('¡Gracias por tu mensaje! Te redirigiremos a WhatsApp para completar tu consulta.');
    
    // Limpiar formulario
    document.getElementById('contactForm').reset();
});

// Funciones para modales
function openPrivacyModal() {
    document.getElementById('privacyModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePrivacyModal() {
    document.getElementById('privacyModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openCreditsModal() {
    document.getElementById('creditsModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCreditsModal() {
    document.getElementById('creditsModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar modales al hacer clic fuera del contenido
window.addEventListener('click', function(event) {
    const privacyModal = document.getElementById('privacyModal');
    const creditsModal = document.getElementById('creditsModal');
    
    if (event.target === privacyModal) {
        closePrivacyModal();
    }
    
    if (event.target === creditsModal) {
        closeCreditsModal();
    }
});

// Cerrar modales con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePrivacyModal();
        closeCreditsModal();
    }
});

// Animaciones al hacer scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .photo-item, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Inicializar elementos para animación
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.service-card, .photo-item, .contact-info, .contact-form');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Ejecutar animación inmediatamente y en scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});

// Lazy loading para imágenes
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        imageObserver.observe(img);
    });
}

// Validación mejorada para el formulario
function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#e74c3c';
                this.style.boxShadow = '0 0 5px rgba(231, 76, 60, 0.3)';
            } else {
                this.style.borderColor = '#27ae60';
                this.style.boxShadow = '0 0 5px rgba(39, 174, 96, 0.3)';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(231, 76, 60)' && this.value.trim() !== '') {
                this.style.borderColor = '#27ae60';
                this.style.boxShadow = '0 0 5px rgba(39, 174, 96, 0.3)';
            }
        });
    });
}

// Inicializar validación del formulario
document.addEventListener('DOMContentLoaded', validateForm);

// Preloader simple
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Smooth reveal para secciones
function revealSections() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 100;
        
        if (sectionTop < window.innerHeight - sectionVisible) {
            section.classList.add('revealed');
        }
    });
}

// Inicializar reveal de secciones
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // CSS para secciones reveladas
    const style = document.createElement('style');
    style.textContent = `
        section.revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    revealSections();
    window.addEventListener('scroll', revealSections);
});

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration) {
                console.log('ServiceWorker registrado exitosamente: ', registration.scope);
            }, function(err) {
                console.log('ServiceWorker falló al registrarse: ', err);
            });
    });
}

// Funciones para contadores animados
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    const speed = 200;

    const updateCount = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => updateCount(counter), 10);
        } else {
            counter.innerText = target;
        }
    };

    // Intersection Observer para activar contadores cuando sean visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    updateCount(counter);
                }
            }
        });
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Funciones del Lightbox
function openLightbox(index) {
    currentImageIndex = index;
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImage');
    const title = document.getElementById('lightboxTitle');
    const description = document.getElementById('lightboxDescription');
    
    const imageData = lightboxImages[currentImageIndex];
    img.src = imageData.src;
    img.alt = imageData.title;
    title.textContent = imageData.title;
    description.textContent = imageData.description;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    updateLightboxDots();
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeLightboxImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= lightboxImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = lightboxImages.length - 1;
    }
    
    const img = document.getElementById('lightboxImage');
    const title = document.getElementById('lightboxTitle');
    const description = document.getElementById('lightboxDescription');
    
    const imageData = lightboxImages[currentImageIndex];
    
    // Animación de transición
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = imageData.src;
        img.alt = imageData.title;
        title.textContent = imageData.title;
        description.textContent = imageData.description;
        img.style.opacity = '1';
    }, 150);
    
    updateLightboxDots();
}

function generateLightboxDots() {
    const dotsContainer = document.querySelector('.lightbox-dots');
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        lightboxImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'lightbox-dot';
            dot.onclick = () => {
                currentImageIndex = index;
                changeLightboxImage(0);
            };
            dotsContainer.appendChild(dot);
        });
    }
}

function updateLightboxDots() {
    const dots = document.querySelectorAll('.lightbox-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentImageIndex);
    });
}

// Funciones del Modal de Video
function openVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = modal.querySelector('iframe');
    iframe.src = 'https://www.youtube.com/embed/c6z6Fs1bxZ8?autoplay=1';
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = modal.querySelector('iframe');
    iframe.src = '';
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar modales con Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
        closeVideoModal();
        closePrivacyModal();
        closeCreditsModal();
    }
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', function(e) {
    const lightboxModal = document.getElementById('lightboxModal');
    const videoModal = document.getElementById('videoModal');
    const privacyModal = document.getElementById('privacyModal');
    const creditsModal = document.getElementById('creditsModal');
    
    if (e.target === lightboxModal) {
        closeLightbox();
    }
    if (e.target === videoModal) {
        closeVideoModal();
    }
    if (e.target === privacyModal) {
        closePrivacyModal();
    }
    if (e.target === creditsModal) {
        closeCreditsModal();
    }
});

// Navegación del lightbox con teclado
document.addEventListener('keydown', function(e) {
    const lightboxModal = document.getElementById('lightboxModal');
    if (lightboxModal.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            changeLightboxImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeLightboxImage(1);
        }
    }
});

// Funcionalidad adicional para mejorar UX
document.addEventListener('DOMContentLoaded', function() {
    // Agregar indicador de carga para formulario
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        const originalText = submitBtn.textContent;
        
        document.getElementById('contactForm').addEventListener('submit', function() {
            submitBtn.textContent = 'Enviando...';
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Mejorar accesibilidad del menú móvil
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        navToggle.setAttribute('role', 'button');
        navToggle.setAttribute('tabindex', '0');
        
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
});

// Funciones para Invitaciones Digitales
function initInvitationTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const invitationDemos = document.querySelectorAll('.invitation-demo');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            
            // Remover active de todos los tabs y demos
            tabBtns.forEach(tab => tab.classList.remove('active'));
            invitationDemos.forEach(demo => demo.classList.remove('active'));
            
            // Activar el tab clickeado
            btn.classList.add('active');
            
            // Activar el demo correspondiente
            const targetDemo = document.querySelector(`[data-type="${target}"]`);
            if (targetDemo) {
                targetDemo.classList.add('active');
            }
        });
    });
}

function initPriceCalculator() {
    const eventTypeSelect = document.getElementById('eventType');
    const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
    const guestCountSlider = document.getElementById('guestCount');
    const guestDisplay = document.getElementById('guestDisplay');
    
    // Elementos de precio
    const basePrice = document.getElementById('basePrice');
    const extrasPrice = document.getElementById('extrasPrice');
    const discountPrice = document.getElementById('discountPrice');
    const totalPrice = document.getElementById('totalPrice');
    
    function calculatePrice() {
        // Precio base del evento
        const selectedOption = eventTypeSelect.selectedOptions[0];
        const base = parseInt(selectedOption.getAttribute('data-price'));
        
        // Calcular extras
        let extras = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                extras += parseInt(checkbox.getAttribute('data-price'));
            }
        });
        
        // Número de invitados
        const guests = parseInt(guestCountSlider.value);
        
        // Descuento por volumen (más de 200 invitados = 10% descuento)
        let discount = 0;
        if (guests > 200) {
            discount = (base + extras) * 0.1;
        }
        
        const total = base + extras - discount;
        
        // Actualizar display
        basePrice.textContent = `$${base.toLocaleString()}`;
        extrasPrice.textContent = `$${extras.toLocaleString()}`;
        discountPrice.textContent = discount > 0 ? `-$${discount.toLocaleString()}` : '$0';
        totalPrice.textContent = `$${total.toLocaleString()}`;
        
        // Mostrar/ocultar línea de descuento
        const discountLine = document.querySelector('.price-line.discount');
        discountLine.style.display = discount > 0 ? 'flex' : 'none';
    }
    
    // Event listeners
    if (eventTypeSelect) {
        eventTypeSelect.addEventListener('change', calculatePrice);
    }
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculatePrice);
    });
    
    if (guestCountSlider && guestDisplay) {
        guestCountSlider.addEventListener('input', () => {
            guestDisplay.textContent = guestCountSlider.value;
            calculatePrice();
        });
    }
    
    // Calcular precio inicial
    calculatePrice();
}

// Parallax Effect para Invitaciones Digitales
function initParallaxEffect() {
    const section = document.querySelector('.digital-invitations');
    if (!section) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const parallaxElements = section.querySelectorAll('.phone-frame');
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Inicializar efectos adicionales
document.addEventListener('DOMContentLoaded', function() {
    initParallaxEffect();
});