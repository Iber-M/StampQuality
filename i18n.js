// i18n.js - Internationalization system for Stamp Quality
(function () {
    'use strict';

    // Default language
    let currentLang = localStorage.getItem('stampquality_lang') || 'es';

    // Initialize i18n system
    function init() {
        // Set initial language
        setLanguage(currentLang);

        // Add event listeners to language selectors
        document.querySelectorAll('[data-lang]').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                setLanguage(lang);
            });
        });
    }

    // Set language and update all translatable elements
    function setLanguage(lang) {
        if (!translations[lang]) {
            console.error(`Language ${lang} not found`);
            return;
        }

        currentLang = lang;
        localStorage.setItem('stampquality_lang', lang);

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Update active language indicator
        document.querySelectorAll('[data-lang]').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose setLanguage function globally
    window.setLanguage = setLanguage;
})();
