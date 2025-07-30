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

// Funcionalidad adicional para mejorar UX
document.addEventListener('DOMContentLoaded', function() {
    // Agregar indicador de carga para formulario
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    document.getElementById('contactForm').addEventListener('submit', function() {
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
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