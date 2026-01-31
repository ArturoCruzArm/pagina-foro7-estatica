// Variables globales para lightbox
let currentImageIndex = 0;
const lightboxImages = [
    {
        src: 'images/gallery/boda-profesional-leon.jpg',
        title: 'Boda Profesional León',
        description: 'Capturamos cada momento especial de tu boda con la más alta calidad profesional'
    },
    {
        src: 'images/gallery/fotografia-boda.jpg',
        title: 'Fotografía de Boda',
        description: 'Retratos únicos que reflejan la esencia de cada pareja'
    },
    {
        src: 'images/gallery/video-4k-cinematografico.jpg',
        title: 'Video 4K Cinematográfico',
        description: 'Producción cinematográfica de alta calidad para tu evento especial'
    },
    {
        src: 'images/gallery/tomas-aereas-dron.jpg',
        title: 'Tomas Aéreas con Dron',
        description: 'Perspectivas únicas y espectaculares desde el aire'
    },
    {
        src: 'images/gallery/quinceanera-elegante.jpg',
        title: 'Quinceañera Elegante',
        description: 'Celebraciones de XV años con estilo y distinción'
    },
    {
        src: 'images/gallery/ceremonia-religiosa.jpg',
        title: 'Ceremonia Religiosa',
        description: 'Momentos sagrados capturados con respeto y profesionalismo'
    }
];

// Función principal de inicialización
function initializeApp() {
    // Navegación móvil
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
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
    
    // Inicializar todos los componentes
    initCounters();
    generateLightboxDots();
    initPriceCalculator();
    initInvitationTabs();
    initScrollAnimations();
    initSectionReveal();
    initUXEnhancements();
    initAllEffects();
    validateForm();
    initFAQ();
    initGalleryFilters();
}

// Gallery Filter
function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.photo-item');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden', 'fade-out');
                } else {
                    item.classList.add('fade-out');
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });

        // Keyboard accessibility
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

// Un solo event listener para DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeApp);

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

// Función para inicializar animaciones de scroll
function initScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .photo-item, .contact-info, .contact-form');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Ejecutar animación inmediatamente y en scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll, { passive: true });
}

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

// Send form data to WhatsApp
function sendToWhatsApp() {
    const form = document.getElementById('contactForm');
    const nombre = form.querySelector('#nombre').value.trim();
    const telefono = form.querySelector('#telefono').value.trim();
    const email = form.querySelector('#email').value.trim();
    const fechaEvento = form.querySelector('#fecha-evento').value;
    const servicio = form.querySelector('#servicio').value;
    const mensaje = form.querySelector('#mensaje').value.trim();

    // Validate required fields
    if (!nombre || !email || !mensaje) {
        alert('Por favor, completa los campos obligatorios: Nombre, Email y Mensaje.');
        return;
    }

    // Build WhatsApp message
    let whatsappMsg = `🎉 *NUEVA COTIZACIÓN - FORO 7*%0A%0A`;
    whatsappMsg += `👤 *Nombre:* ${nombre}%0A`;
    if (telefono) whatsappMsg += `📱 *Teléfono:* ${telefono}%0A`;
    whatsappMsg += `📧 *Email:* ${email}%0A`;
    if (fechaEvento) whatsappMsg += `📅 *Fecha del evento:* ${fechaEvento}%0A`;
    if (servicio) whatsappMsg += `📸 *Servicio:* ${getServiceName(servicio)}%0A`;
    whatsappMsg += `%0A💬 *Mensaje:*%0A${encodeURIComponent(mensaje)}%0A%0A`;
    whatsappMsg += `_Enviado desde invitados.org_`;

    // Open WhatsApp
    window.open(`https://wa.me/524779203776?text=${whatsappMsg}`, '_blank');
}

function getServiceName(value) {
    const services = {
        'fotografia': '📸 Solo Fotografía',
        'video': '🎬 Solo Video 4K',
        'completo': '✨ Fotografía + Video',
        'premium': '🚁 Paquete Premium + Dron',
        'dron': '🚁 Solo Tomas con Dron',
        'invitaciones': '🎨 Invitaciones Personalizadas'
    };
    return services[value] || value;
}

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

// Función para inicializar reveal de secciones
function initSectionReveal() {
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
    window.addEventListener('scroll', revealSections, { passive: true });
}

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./service-worker.js')
            .then(function(registration) {
                // console.log('ServiceWorker registrado exitosamente: ', registration.scope);
            }, function(err) {
                console.error('ServiceWorker falló al registrarse: ', err);
            });
    });
}

// Funciones para contadores animados
function initCounters() {
    // Solo seleccionar elementos que sean contadores numéricos, no botones de tabs
    const counters = document.querySelectorAll('[data-target]:not(.tab-btn)');
    // console.log('Contadores encontrados (excluyendo botones):', counters.length);
    const speed = 200;

    const updateCount = (counter) => {
        const targetValue = counter.getAttribute('data-target');
        const target = +targetValue;
        
        // Solo procesar si data-target es un número válido
        if (isNaN(target)) {
            // console.log('Saltando contador no numérico:', counter);
            return;
        }
        
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
let previouslyFocusedElement = null;

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

    // Store previously focused element for accessibility
    previouslyFocusedElement = document.activeElement;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Set focus to close button for accessibility
    const closeBtn = modal.querySelector('.close');
    if (closeBtn) closeBtn.focus();

    // Enable focus trap
    modal.addEventListener('keydown', trapFocus);

    updateLightboxDots();
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';

    // Remove focus trap
    modal.removeEventListener('keydown', trapFocus);

    // Return focus to previously focused element
    if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
        previouslyFocusedElement = null;
    }
}

// Focus trap for modal accessibility
function trapFocus(e) {
    if (e.key !== 'Tab') return;

    const modal = document.getElementById('lightboxModal');
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
        // Shift + Tab: go to last element if at first
        if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        }
    } else {
        // Tab: go to first element if at last
        if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
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

// Función para mejorar UX
function initUXEnhancements() {
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
}

// Funciones para Invitaciones Digitales
function initInvitationTabs() {
    // Usar setTimeout para asegurar que el DOM esté completamente cargado
    setTimeout(() => {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const invitationDemos = document.querySelectorAll('.invitation-demo');
        
        // console.log('Inicializando tabs de invitaciones:', tabBtns.length, 'botones encontrados');
        
        // PROTEGER CONTENIDO DE BOTONES ANTES DE CUALQUIER MANIPULACIÓN
        const correctContents = [
            '<i class="fas fa-heart"></i><span>Bodas</span>',
            '<i class="fas fa-crown"></i><span>XV Años</span>',
            '<i class="fas fa-baby"></i><span>Bautizos</span>'
        ];
        
        tabBtns.forEach((btn, index) => {
            // Restaurar contenido correcto inmediatamente
            // console.log(`Restaurando contenido correcto del botón ${index}: de "${btn.innerHTML}" a "${correctContents[index]}"`);
            btn.innerHTML = correctContents[index];
            
            // Crear MutationObserver para prevenir cambios no deseados
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' || mutation.type === 'characterData') {
                        // Si el contenido cambió a algo que no sea el correcto, restaurarlo
                        if (btn.innerHTML !== correctContents[index] && (btn.innerHTML === 'NaN' || btn.innerHTML === '' || !btn.innerHTML.includes('span'))) {
                            // console.log(`Re-restaurando contenido del botón ${index} de "${btn.innerHTML}" a "${correctContents[index]}"`);
                            btn.innerHTML = correctContents[index];
                        }
                    }
                });
            });
            
            // Observar cambios en el botón
            observer.observe(btn, {
                childList: true,
                subtree: true,
                characterData: true
            });
            
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
        
        // Verificación final - asegurar que todos los botones tengan contenido correcto
        setTimeout(() => {
            tabBtns.forEach((btn, index) => {
                if (btn.innerHTML === 'NaN' || btn.innerHTML === '' || !btn.innerHTML.includes('span')) {
                    // console.log(`Corrección final del botón ${index}`);
                    btn.innerHTML = correctContents[index];
                }
            });
        }, 200);
        
    }, 100); // Pequeño delay para asegurar carga completa
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

// Parallax Effect Avanzado
function initAdvancedParallax() {
    const parallaxElements = [
        { selector: '.hero-image', speed: 0.5 },
        { selector: '.phone-frame', speed: 0.3 },
        { selector: '.service-card', speed: 0.2 },
        // testimonial-card removido - causaba que las tarjetas se salieran de pantalla
        { selector: '.floating-icon', speed: 0.8 }
    ];
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(({ selector, speed }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    const yPos = -(scrollTop * speed);
                    const rotate = scrollTop * speed * 0.1;
                    
                    // Diferentes efectos para diferentes elementos
                    if (selector === '.floating-icon') {
                        element.style.transform = `translateY(${yPos}px) rotate(${rotate}deg) scale(${1 + Math.sin(scrollTop * 0.01) * 0.1})`;
                    } else if (selector === '.phone-frame') {
                        element.style.transform = `translateY(${yPos}px) rotateX(${rotate * 0.5}deg) rotateY(${rotate}deg)`;
                    } else {
                        element.style.transform = `translateY(${yPos}px)`;
                    }
                }
            });
        });
    }
    
    // Throttle para mejor performance
    let ticking = false;
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
}

// Efectos 3D Avanzados
function init3DEffects() {
    // Efecto de mouse tracking solo para service-cards (más agresivo)
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Testimonial cards - solo resetear cualquier transform inline previo
    // El efecto hover ya está manejado por CSS (scale 1.02)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        // Limpiar cualquier transform inline que pueda haber quedado
        card.style.transform = '';
    });
}

// Sistema de Chat Bot Inteligente
function initChatBot() {
    // Crear el chat bot
    const chatBot = document.createElement('div');
    chatBot.className = 'chat-bot';
    chatBot.innerHTML = `
        <div class="chat-header">
            <div class="chat-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="chat-info">
                <h4>Asistente Foro 7</h4>
                <span class="status">En línea</span>
            </div>
            <button class="chat-toggle" onclick="toggleChat()" aria-label="Cerrar chat">
                <i class="fas fa-times" aria-hidden="true"></i>
            </button>
        </div>
        <div class="chat-messages" id="chatMessages">
            <div class="message bot-message">
                <div class="message-content">
                    ¡Hola! 👋 Soy el asistente virtual de Foro 7. ¿En qué puedo ayudarte?
                </div>
                <div class="message-time">${new Date().toLocaleTimeString('es-MX', {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
        </div>
        <div class="quick-options">
            <button class="quick-btn" onclick="sendQuickMessage('Quiero cotizar una boda')">
                💒 Cotizar Boda
            </button>
            <button class="quick-btn" onclick="sendQuickMessage('Me interesan las invitaciones digitales')">
                💌 Invitaciones
            </button>
            <button class="quick-btn" onclick="sendQuickMessage('Quiero ver el portafolio')">
                📸 Ver Portafolio
            </button>
        </div>
        <div class="chat-input">
            <input type="text" placeholder="Escribe tu mensaje..." id="chatInput" onkeypress="handleChatKeyPress(event)">
            <button onclick="sendMessage()" class="send-btn" aria-label="Enviar mensaje">
                <i class="fas fa-paper-plane" aria-hidden="true"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(chatBot);
    
    // Botón flotante del chat
    const chatFloatBtn = document.createElement('button');
    chatFloatBtn.className = 'chat-float-btn';
    chatFloatBtn.setAttribute('aria-label', 'Abrir chat de asistencia');
    chatFloatBtn.innerHTML = `
        <i class="fas fa-comment-alt" aria-hidden="true"></i>
        <div class="chat-notification" aria-hidden="true">1</div>
    `;
    chatFloatBtn.onclick = toggleChat;
    
    document.body.appendChild(chatFloatBtn);
}

// Funciones del Chat Bot
function toggleChat() {
    const chatBot = document.querySelector('.chat-bot');
    const floatBtn = document.querySelector('.chat-float-btn');
    
    if (chatBot.classList.contains('active')) {
        chatBot.classList.remove('active');
        floatBtn.style.display = 'flex';
    } else {
        chatBot.classList.add('active');
        floatBtn.style.display = 'none';
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        // Simular respuesta del bot
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
}

function sendQuickMessage(message) {
    addMessage(message, 'user');
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

function addMessage(content, type) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    messageDiv.innerHTML = `
        <div class="message-content">${content}</div>
        <div class="message-time">${new Date().toLocaleTimeString('es-MX', {hour: '2-digit', minute:'2-digit'})}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('boda') || lowerMessage.includes('matrimonio')) {
        return `¡Perfecto! 💒 Nuestros paquetes de boda incluyen fotografía HD, video 4K y tomas con dron desde $15,000. ¿Te gustaría que te contactemos por WhatsApp para una cotización personalizada? <a href="https://wa.me/5214779203776?text=Hola!%20Me%20interesa%20un%20paquete%20de%20boda%20💒" target="_blank">¡Contactar ahora!</a>`;
    } else if (lowerMessage.includes('invitacion') || lowerMessage.includes('digital')) {
        return `¡Excelente elección! 💌 Nuestras invitaciones digitales web son desde $1,500 e incluyen diseño personalizado, RSVP digital y más. Puedes usar nuestra calculadora arriba para ver el precio exacto. ¿Qué tipo de evento es?`;
    } else if (lowerMessage.includes('precio') || lowerMessage.includes('costo')) {
        return `💰 Nuestros precios varían según el servicio:<br>
        📸 Solo Fotografía: desde $8,000<br>
        🎬 Foto + Video: desde $15,000<br>
        🚁 Paquete Premium + Dron: desde $25,000<br>
        💌 Invitaciones Digitales: desde $1,500<br>
        <a href="https://wa.me/5214779203776?text=Hola!%20Quiero%20información%20sobre%20precios%20💰" target="_blank">¡Cotiza ahora!</a>`;
    } else if (lowerMessage.includes('portafolio') || lowerMessage.includes('trabajo')) {
        return `📸 ¡Claro! Puedes ver nuestro portafolio aquí mismo en la galería de fotos, o visitar nuestro Instagram @foro7 para ver trabajos recientes. También tenemos videos en nuestro canal de Vimeo. ¿Te gustaría ver algún tipo específico de evento?`;
    } else {
        return `Gracias por tu mensaje 😊 Para una atención más personalizada, te recomiendo contactarnos directamente: <a href="https://wa.me/5214779203776?text=Hola!%20Tengo%20una%20consulta%20💬" target="_blank">WhatsApp</a> o al 477-920-3776. ¡Estaremos encantados de ayudarte!`;
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Sistema de Reservas Avanzado
let currentCalendarMonth = new Date();
let selectedDate = null;
let selectedTime = null;

// Horarios disponibles (formato 24h)
const availableTimeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
];

// Días no disponibles (domingos)
const unavailableDays = [0]; // 0 = Domingo

function openReservationModal() {
    const modal = document.getElementById('reservationModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Inicializar calendario
    generateCalendar();
    resetAppointmentForm();
}

function closeReservationModal() {
    const modal = document.getElementById('reservationModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset selections
    selectedDate = null;
    selectedTime = null;
    updateAppointmentSummary();
}

function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const monthHeader = document.getElementById('calendarMonth');
    
    // Limpiar calendario
    calendarGrid.innerHTML = '';
    
    // Configurar mes
    const year = currentCalendarMonth.getFullYear();
    const month = currentCalendarMonth.getMonth();
    
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    monthHeader.textContent = `${monthNames[month]} ${year}`;
    
    // Headers de días
    const dayHeaders = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    dayHeaders.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day header';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });
    
    // Primer día del mes y número de días
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    // Espacios vacíos para los días anteriores
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        const currentDate = new Date(year, month, day);
        const isPastDate = currentDate < today.setHours(0, 0, 0, 0);
        const isUnavailable = unavailableDays.includes(currentDate.getDay()) || isPastDate;
        
        dayElement.className = `calendar-day ${isUnavailable ? 'unavailable' : 'available'}`;
        dayElement.textContent = day;
        
        if (!isUnavailable) {
            dayElement.addEventListener('click', (e) => {
                selectDate(new Date(year, month, day), e.target);
            });
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

function selectDate(date, element) {
    selectedDate = date;
    
    // Actualizar calendario visual
    document.querySelectorAll('.calendar-day.selected').forEach(day => {
        day.classList.remove('selected');
    });
    
    if (element) {
        element.classList.add('selected');
    }
    
    // Actualizar display de fecha seleccionada
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    document.getElementById('selectedDate').textContent = 
        date.toLocaleDateString('es-MX', options);
    
    // Generar horarios disponibles
    generateTimeSlots();
    updateAppointmentSummary();
}

function generateTimeSlots() {
    const timeGrid = document.getElementById('timeGrid');
    timeGrid.innerHTML = '';
    
    availableTimeSlots.forEach(time => {
        const timeElement = document.createElement('div');
        timeElement.className = 'time-slot available';
        timeElement.textContent = formatTime(time);
        
        timeElement.addEventListener('click', () => {
            selectTime(time, timeElement);
        });
        
        timeGrid.appendChild(timeElement);
    });
}

function selectTime(time, element) {
    selectedTime = time;
    
    // Actualizar visual
    document.querySelectorAll('.time-slot.selected').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    element.classList.add('selected');
    updateAppointmentSummary();
}

function formatTime(time24) {
    const [hours, minutes] = time24.split(':');
    const hour12 = hours % 12 || 12;
    const ampm = hours < 12 ? 'AM' : 'PM';
    return `${hour12}:${minutes} ${ampm}`;
}

function changeMonth(direction) {
    currentCalendarMonth.setMonth(currentCalendarMonth.getMonth() + direction);
    
    // No permitir meses anteriores al actual
    const today = new Date();
    if (currentCalendarMonth < new Date(today.getFullYear(), today.getMonth(), 1)) {
        currentCalendarMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    }
    
    generateCalendar();
    
    // Reset selections si cambia el mes
    selectedDate = null;
    selectedTime = null;
    document.getElementById('selectedDate').textContent = 'Selecciona una fecha';
    document.getElementById('timeGrid').innerHTML = '';
    updateAppointmentSummary();
}

function updateAppointmentSummary() {
    const summaryDate = document.getElementById('summaryDate');
    const summaryTime = document.getElementById('summaryTime');
    const confirmBtn = document.getElementById('confirmBtn');
    
    if (selectedDate) {
        const options = { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        };
        summaryDate.textContent = selectedDate.toLocaleDateString('es-MX', options);
    } else {
        summaryDate.textContent = 'No seleccionada';
    }
    
    if (selectedTime) {
        summaryTime.textContent = formatTime(selectedTime);
    } else {
        summaryTime.textContent = 'No seleccionada';
    }
    
    // Habilitar/deshabilitar botón de confirmación
    confirmBtn.disabled = !selectedDate || !selectedTime;
}

function resetAppointmentForm() {
    document.getElementById('appointmentForm').reset();
    selectedDate = null;
    selectedTime = null;
    document.getElementById('selectedDate').textContent = 'Selecciona una fecha';
    document.getElementById('timeGrid').innerHTML = '';
    updateAppointmentSummary();
}

function confirmAppointment() {
    const form = document.getElementById('appointmentForm');
    const formData = new FormData(form);
    
    // Validar campos requeridos
    const clientName = document.getElementById('clientName').value.trim();
    const clientPhone = document.getElementById('clientPhone').value.trim();
    const eventType = document.getElementById('eventType').value;
    
    if (!clientName || !clientPhone || !eventType || !selectedDate || !selectedTime) {
        alert('Por favor, completa todos los campos requeridos y selecciona fecha y hora.');
        return;
    }
    
    // Crear mensaje para WhatsApp
    const dateStr = selectedDate.toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const eventDate = document.getElementById('eventDate').value;
    const notes = document.getElementById('notes').value;
    
    let whatsappMessage = `🗓️ *SOLICITUD DE CITA - FORO 7*%0A%0A`;
    whatsappMessage += `👤 *Cliente:* ${clientName}%0A`;
    whatsappMessage += `📱 *Teléfono:* ${clientPhone}%0A`;
    whatsappMessage += `🎉 *Tipo de Evento:* ${getEventTypeName(eventType)}%0A%0A`;
    whatsappMessage += `📅 *Fecha de Cita Solicitada:*%0A${dateStr} a las ${formatTime(selectedTime)}%0A%0A`;
    
    if (eventDate) {
        whatsappMessage += `🎊 *Fecha del Evento:* ${eventDate}%0A%0A`;
    }
    
    if (notes) {
        whatsappMessage += `💬 *Comentarios:*%0A${notes}%0A%0A`;
    }
    
    whatsappMessage += `¡Gracias por elegir Producciones Foro 7! 📸✨%0A%0A`;
    whatsappMessage += `Enviado desde: www.foro7.com.mx`;
    
    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/5214779203776?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Mostrar confirmación y cerrar modal
    alert('¡Perfecto! Te redirigiremos a WhatsApp para confirmar tu cita. Te contactaremos pronto para confirmar la disponibilidad.');
    closeReservationModal();
}

function getEventTypeName(eventType) {
    const eventTypes = {
        'boda': '💒 Boda',
        'xv': '👑 XV Años',
        'bautizo': '👶 Bautizo',
        'social': '🎉 Evento Social',
        'corporativo': '🏢 Corporativo',
        'consulta': '💬 Consulta General'
    };
    return eventTypes[eventType] || eventType;
}

// Cerrar modal al hacer clic fuera
window.addEventListener('click', function(event) {
    const modal = document.getElementById('reservationModal');
    if (event.target === modal) {
        closeReservationModal();
    }
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('reservationModal');
        if (modal && modal.style.display === 'block') {
            closeReservationModal();
        }
    }
});

// Función de debug para verificar botones
function debugTabButtons() {
    // Debug function - disabled in production
    // const tabBtns = document.querySelectorAll('.tab-btn');
    // console.log('=== DEBUG BOTONES ===');
    // tabBtns.forEach((btn, index) => {
    //     console.log(`Botón ${index}:`);
    //     console.log('- innerHTML:', btn.innerHTML);
    //     console.log('- textContent:', btn.textContent);
    //     console.log('- data-target:', btn.getAttribute('data-target'));
    //     console.log('---');
    // });
}

// Función para inicializar todos los efectos
function initAllEffects() {
    // Debug inicial
    setTimeout(() => {
        debugTabButtons();
    }, 500);

    initAdvancedParallax();
    init3DEffects();
    initChatBot();
}

// ==========================================
// MODERN WEB APIs
// ==========================================

// Service Worker Registration with update handling
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/service-worker.js', {
                scope: '/',
                updateViaCache: 'none'
            });

            // Check for updates periodically
            setInterval(() => registration.update(), 60 * 60 * 1000); // Every hour

            // Handle updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New version available
                        console.log('[App] Nueva versión disponible');
                    }
                });
            });

            console.log('[SW] Service Worker registrado exitosamente');
        } catch (error) {
            console.log('[SW] Error al registrar Service Worker:', error);
        }
    });
}

// Badge API - Show notification count
async function setBadge(count) {
    if ('setAppBadge' in navigator) {
        try {
            if (count > 0) {
                await navigator.setAppBadge(count);
            } else {
                await navigator.clearAppBadge();
            }
        } catch (error) {
            console.log('[Badge] API no disponible');
        }
    }
}

// Web Share API - Native sharing
async function shareContent(title, text, url) {
    const shareData = {
        title: title || 'Producciones Foro 7',
        text: text || 'Fotografía y video profesional para bodas y eventos',
        url: url || window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        try {
            await navigator.share(shareData);
            console.log('[Share] Contenido compartido exitosamente');
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.log('[Share] Error al compartir:', error);
                fallbackShare(shareData);
            }
        }
    } else {
        fallbackShare(shareData);
    }
}

function fallbackShare(data) {
    // Fallback: Copy to clipboard
    const shareText = `${data.title}\n${data.text}\n${data.url}`;
    navigator.clipboard?.writeText(shareText).then(() => {
        alert('Enlace copiado al portapapeles');
    });
}

// Network Information API - Connection-aware loading
function getConnectionInfo() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        return {
            effectiveType: connection.effectiveType, // '4g', '3g', '2g', 'slow-2g'
            downlink: connection.downlink, // Mbps
            saveData: connection.saveData, // User preference
            rtt: connection.rtt // Round-trip time in ms
        };
    }
    return null;
}

// Adapt loading based on connection
function adaptToConnection() {
    const conn = getConnectionInfo();
    if (conn) {
        const html = document.documentElement;
        if (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') {
            html.classList.add('save-data');
            console.log('[Network] Modo ahorro de datos activado');
        }
        if (conn.effectiveType === '4g' && conn.downlink > 5) {
            html.classList.add('high-bandwidth');
        }
    }
}

// Initialize connection-aware features
adaptToConnection();

// Listen for connection changes
if (navigator.connection) {
    navigator.connection.addEventListener('change', adaptToConnection);
}

// Visibility API - Pause heavy operations when hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - pause animations, etc.
        document.documentElement.classList.add('page-hidden');
    } else {
        // Page is visible again
        document.documentElement.classList.remove('page-hidden');
    }
});

// Wake Lock API - Keep screen on during video playback
let wakeLock = null;

async function requestWakeLock() {
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('[WakeLock] Pantalla activa');
        } catch (error) {
            console.log('[WakeLock] No disponible:', error);
        }
    }
}

async function releaseWakeLock() {
    if (wakeLock) {
        await wakeLock.release();
        wakeLock = null;
        console.log('[WakeLock] Liberado');
    }
}

// Screen Orientation API - Lock to portrait for certain views
async function lockOrientation(orientation = 'portrait-primary') {
    if (screen.orientation && screen.orientation.lock) {
        try {
            await screen.orientation.lock(orientation);
        } catch (error) {
            // Orientation lock not supported or not in fullscreen
        }
    }
}

// Fullscreen API helper
function toggleFullscreen(element) {
    if (!document.fullscreenElement) {
        element.requestFullscreen?.() ||
        element.webkitRequestFullscreen?.() ||
        element.msRequestFullscreen?.();
    } else {
        document.exitFullscreen?.() ||
        document.webkitExitFullscreen?.() ||
        document.msExitFullscreen?.();
    }
}

// Performance Observer - Monitor Core Web Vitals
if ('PerformanceObserver' in window) {
    // Observe LCP
    try {
        const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('[Perf] LCP:', Math.round(lastEntry.startTime), 'ms');
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {}

    // Observe CLS
    try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {}

    // Observe FID
    try {
        const fidObserver = new PerformanceObserver((entryList) => {
            const firstInput = entryList.getEntries()[0];
            console.log('[Perf] FID:', Math.round(firstInput.processingStart - firstInput.startTime), 'ms');
        });
        fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {}
}