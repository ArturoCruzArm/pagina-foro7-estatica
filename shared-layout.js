/**
 * Shared header & footer for all pages — Foro 7 Producciones
 * Include this file and call: insertHeader() / insertFooter()
 * or use <div id="shared-header"></div> / <div id="shared-footer"></div>
 */

(function () {
    'use strict';

    // Detect current page to mark active link
    var path = location.pathname.split('/').pop() || 'index.html';
    if (path === '' || path === '/') path = 'index.html';

    var pages = [
        { href: 'index.html',       label: 'Inicio',        emoji: '' },
        { href: 'bodas.html',       label: 'Bodas',         emoji: '\uD83D\uDC8D ' },
        { href: 'xv-anos.html',     label: 'XV A\u00f1os',  emoji: '\uD83D\uDC51 ' },
        { href: 'eventos.html',     label: 'Eventos',       emoji: '\uD83C\uDF89 ' },
        { href: 'empresas.html',    label: 'Empresas',      emoji: '\uD83C\uDFE2 ' },
        { href: 'corporativo.html', label: 'Corporativo',   emoji: '\uD83D\uDCBC ' },
        { href: 'redes.html',       label: 'Redes',         emoji: '\uD83D\uDCF1 ' },
        { href: 'paginas.html',     label: 'P\u00e1ginas',  emoji: '\uD83C\uDF10 ' },
        { href: 'paquetes.html',    label: 'Paquetes',      emoji: '' },
        { href: 'index.html#contacto', label: 'Contacto',   emoji: '', isHash: true }
    ];

    var explore = [
        { href: 'index.html#servicios',   label: 'Servicios' },
        { href: 'index.html#portafolio',  label: 'Portafolio' },
        { href: 'index.html#testimonios', label: 'Testimonios' },
        { href: 'index.html#nosotros',    label: 'Nosotros' },
        { href: 'index.html#faq',         label: 'Preguntas frecuentes' },
        { href: 'index.html#contacto',    label: 'Contacto' }
    ];

    var socials = [
        { href: 'https://www.instagram.com/foro7/',            icon: 'fab fa-instagram',  label: 'Instagram @foro7' },
        { href: 'https://www.tiktok.com/@forosietefotograf',   icon: '',                  label: 'TikTok',  text: 'TK' },
        { href: 'https://www.fb.com/forosiete',                icon: 'fab fa-facebook-f', label: 'Facebook' },
        { href: 'https://www.youtube.com/@Foro7',              icon: 'fab fa-youtube',    label: 'YouTube' },
        { href: 'https://vimeo.com/produccionesforo7',         icon: 'fab fa-vimeo-v',    label: 'Vimeo' },
        { href: 'https://wa.me/5214779203776',                 icon: 'fab fa-whatsapp',   label: 'WhatsApp' }
    ];

    /* ---- helpers ---- */

    function isActive(href) {
        if (href === 'index.html#contacto') return false; // never mark hash-only as active
        return path === href;
    }

    // For index.html, hash links should be #section, not index.html#section
    function resolveHref(href) {
        if (path === 'index.html' && href.startsWith('index.html#')) {
            return href.replace('index.html', '');
        }
        return href;
    }

    /* ---- HEADER ---- */

    function buildHeader() {
        var navItems = pages.map(function (p) {
            var cls = isActive(p.href) ? ' class="active"' : '';
            var h = resolveHref(p.href);
            return '<li><a href="' + h + '"' + cls + '>' + p.emoji + p.label + '</a></li>';
        }).join('\n                    ');

        return '<header class="header">\n' +
            '    <nav class="navbar">\n' +
            '        <div class="nav-container">\n' +
            '            <a href="index.html" class="nav-logo">\n' +
            '                <img src="logo.png" alt="Foro 7 Producciones" style="height:52px;width:auto;display:block;" width="974" height="402">\n' +
            '            </a>\n' +
            '            <ul class="nav-menu">\n' +
            '                    ' + navItems + '\n' +
            '            </ul>\n' +
            '            <button id="shared-theme-toggle" class="theme-toggle" aria-label="Cambiar tema">\n' +
            '                <i class="fas fa-moon"></i>\n' +
            '                <i class="fas fa-sun"></i>\n' +
            '            </button>\n' +
            '            <div class="nav-toggle">\n' +
            '                <span></span>\n' +
            '                <span></span>\n' +
            '                <span></span>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </nav>\n' +
            '</header>';
    }

    /* ---- FOOTER ---- */

    function buildFooter() {
        var pageLinks = pages.filter(function (p) { return !p.isHash; }).map(function (p) {
            return '<li><a href="' + p.href + '">' + p.emoji + p.label + '</a></li>';
        }).join('\n                        ');

        var exploreLinks = explore.map(function (e) {
            var h = resolveHref(e.href);
            return '<li><a href="' + h + '">' + e.label + '</a></li>';
        }).join('\n                        ');

        var socialLinks = socials.map(function (s) {
            var inner = s.text
                ? '<span style="font-size:13px;font-weight:700;">' + s.text + '</span>'
                : '<i class="' + s.icon + '"></i>';
            return '<a href="' + s.href + '" target="_blank" rel="noopener noreferrer" aria-label="' + s.label + '">' + inner + '</a>';
        }).join('\n                        ');

        return '<footer class="footer">\n' +
            '    <div class="container">\n' +
            '        <div class="footer-content">\n' +
            '            <div class="footer-section">\n' +
            '                <h3>Foro 7 Producciones</h3>\n' +
            '                <p>Fotograf\u00eda, video y p\u00e1ginas web para eventos en Le\u00f3n, Guanajuato.</p>\n' +
            '                <p style="margin-top:10px;"><i class="fas fa-phone"></i> 477-920-3776</p>\n' +
            '                <p><i class="fas fa-envelope"></i> foro7.producciones@hotmail.com</p>\n' +
            '            </div>\n' +
            '            <div class="footer-section">\n' +
            '                <h4>P\u00e1ginas</h4>\n' +
            '                <ul>\n' +
            '                        ' + pageLinks + '\n' +
            '                </ul>\n' +
            '            </div>\n' +
            '            <div class="footer-section">\n' +
            '                <h4>Explora</h4>\n' +
            '                <ul>\n' +
            '                        ' + exploreLinks + '\n' +
            '                </ul>\n' +
            '            </div>\n' +
            '            <div class="footer-section">\n' +
            '                <h4>S\u00edguenos</h4>\n' +
            '                <div class="footer-social">\n' +
            '                        ' + socialLinks + '\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="footer-bottom">\n' +
            '            <p>&copy; 2026 Foro 7 Producciones. Todos los derechos reservados.</p>\n' +
            '            <div class="footer-links">\n' +
            '                <a href="privacidad.html">Aviso de Privacidad</a>\n' +
            '                <span>|</span>\n' +
            '                <a href="terminos.html">T\u00e9rminos</a>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</footer>';
    }

    /* ---- INIT ---- */

    function initSharedLayout() {
        // Insert header
        var headerSlot = document.getElementById('shared-header');
        if (headerSlot) {
            headerSlot.outerHTML = buildHeader();
        }

        // Insert footer
        var footerSlot = document.getElementById('shared-footer');
        if (footerSlot) {
            footerSlot.outerHTML = buildFooter();
        }

        // Theme toggle
        var toggle = document.getElementById('shared-theme-toggle') || document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', function () {
                var current = document.documentElement.getAttribute('data-theme');
                var next = current === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
            });
        }

        // Mobile nav toggle
        var navBtn = document.querySelector('.nav-toggle');
        var navMenu = document.querySelector('.nav-menu');
        if (navBtn && navMenu) {
            navBtn.addEventListener('click', function () {
                navMenu.classList.toggle('active');
                navBtn.classList.toggle('active');
            });
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSharedLayout);
    } else {
        initSharedLayout();
    }
})();
