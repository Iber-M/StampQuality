// Auto-apply data-i18n attributes to HTML elements
(function () {
    'use strict';

    // Mapping of CSS selectors to translation keys
    const i18nMapping = {
        // Hero Section
        '.hero .tagline': 'hero_tagline',
        '.hero h1': 'hero_title',
        '.hero .hero-description': 'hero_description',
        '.hero .cta-primary': 'hero_cta_primary',
        '.hero .cta-secondary': 'hero_cta_secondary',
        '.hero .stat-label:nth-of-type(1)': 'hero_guarantee',
        '.hero .stat-label:nth-of-type(2)': 'hero_inspection',

        // Services Section
        '#servicios .tag': 'services_tag',
        '#servicios .sec-header h2': 'services_title',
        '#servicios .sec-header p': 'services_subtitle',

        '#servicios .card:nth-of-type(1) h3': 'service1_title',
        '#servicios .card:nth-of-type(1) p': 'service1_desc',
        '#servicios .card:nth-of-type(1) li:nth-of-type(1)': 'service1_item1',
        '#servicios .card:nth-of-type(1) li:nth-of-type(2)': 'service1_item2',
        '#servicios .card:nth-of-type(1) li:nth-of-type(3)': 'service1_item3',

        '#servicios .card:nth-of-type(2) h3': 'service2_title',
        '#servicios .card:nth-of-type(2) p': 'service2_desc',
        '#servicios .card:nth-of-type(2) li:nth-of-type(1)': 'service2_item1',
        '#servicios .card:nth-of-type(2) li:nth-of-type(2)': 'service2_item2',
        '#servicios .card:nth-of-type(2) li:nth-of-type(3)': 'service2_item3',

        '#servicios .card:nth-of-type(3) h3': 'service3_title',
        '#servicios .card:nth-of-type(3) p': 'service3_desc',
        '#servicios .card:nth-of-type(3) li:nth-of-type(1)': 'service3_item1',
        '#servicios .card:nth-of-type(3) li:nth-of-type(2)': 'service3_item2',
        '#servicios .card:nth-of-type(3) li:nth-of-type(3)': 'service3_item3',

        // Methodology Section
        '#metodologia .tag': 'methodology_tag',
        '#metodologia .sec-header h2': 'methodology_title',
        '#metodologia .sec-header p': 'methodology_subtitle',

        '#metodologia .pillar:nth-of-type(1) h3': 'method1_title',
        '#metodologia .pillar:nth-of-type(1) p': 'method1_desc',
        '#metodologia .pillar:nth-of-type(2) h3': 'method2_title',
        '#metodologia .pillar:nth-of-type(2) p': 'method2_desc',
        '#metodologia .pillar:nth-of-type(3) h3': 'method3_title',
        '#metodologia .pillar:nth-of-type(3) p': 'method3_desc',
        '#metodologia .pillar:nth-of-type(4) h3': 'method4_title',
        '#metodologia .pillar:nth-of-type(4) p': 'method4_desc',
        '#metodologia .pillar:nth-of-type(5) h3': 'method5_title',
        '#metodologia .pillar:nth-of-type(5) p': 'method5_desc',

        // Results Section
        '.results-section .tag': 'results_tag',
        '.results-section .sec-header h2': 'results_title',
        '.results-section .sec-header p': 'results_subtitle',

        '.results-section .stat-card:nth-of-type(1) .stat-value': 'result1_value',
        '.results-section .stat-card:nth-of-type(1) h3': 'result1_title',
        '.results-section .stat-card:nth-of-type(1) p': 'result1_desc',

        '.results-section .stat-card:nth-of-type(2) .stat-value': 'result2_value',
        '.results-section .stat-card:nth-of-type(2) h3': 'result2_title',
        '.results-section .stat-card:nth-of-type(2) p': 'result2_desc',

        '.results-section .stat-card:nth-of-type(3) .stat-value': 'result3_value',
        '.results-section .stat-card:nth-of-type(3) h3': 'result3_title',
        '.results-section .stat-card:nth-of-type(3) p': 'result3_desc',

        '.results-section .stat-card:nth-of-type(4) .stat-value': 'result4_value',
        '.results-section .stat-card:nth-of-type(4) h3': 'result4_title',
        '.results-section .stat-card:nth-of-type(4) p': 'result4_desc',

        // Authority Section
        '.authority-section .tag': 'authority_tag',
        '.authority-section .sec-header h2': 'authority_title',

        '.authority-section .pillar:nth-of-type(1) h3': 'pillar1_title',
        '.authority-section .pillar:nth-of-type(1) p': 'pillar1_desc',
        '.authority-section .pillar:nth-of-type(2) h3': 'pillar2_title',
        '.authority-section .pillar:nth-of-type(2) p': 'pillar2_desc',
        '.authority-section .pillar:nth-of-type(3) h3': 'pillar3_title',
        '.authority-section .pillar:nth-of-type(3) p': 'pillar3_desc',

        // Standards Section
        '.standards-section .tag': 'standards_tag',
        '.standards-section .sec-header h2': 'standards_title',
        '.standards-section .sec-header p': 'standards_subtitle',

        '.standards-section .std-item:nth-of-type(1) span': 'std1_title',
        '.standards-section .std-item:nth-of-type(2) span': 'std2_title',
        '.standards-section .std-item:nth-of-type(3) span': 'std3_title',
        '.standards-section .std-item:nth-of-type(4) span': 'std4_title',
        '.standards-section .std-item:nth-of-type(5) span': 'std5_title',
        '.standards-section .std-item:nth-of-type(6) span': 'std6_title',

        // Partners Section
        '.partners-section .tag': 'partners_tag',
        '.partners-section .sec-header h2': 'partners_title',
        '.partners-section .sec-header p': 'partners_subtitle',

        // Contact Section
        '.contact-cta .tag': 'contact_tag',
        '.contact-cta h2': 'contact_title',
        '.contact-cta p': 'contact_desc',
        '.contact-cta .btn-large': 'contact_cta',

        // Footer
        'footer p': 'footer_copyright'
    };

    // Apply data-i18n attributes when DOM is ready
    function applyI18nAttributes() {
        Object.keys(i18nMapping).forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.setAttribute('data-i18n', i18nMapping[selector]);
            }
        });
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyI18nAttributes);
    } else {
        applyI18nAttributes();
    }
})();
