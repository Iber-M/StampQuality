document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const langSelector = document.querySelector('.lang-selector');
    const body = document.body;

    // Move lang selector inside nav-links for mobile structure
    if (window.innerWidth <= 1200 && navLinks && langSelector) {
        navLinks.appendChild(langSelector);
    }

    // Handle resize to move it back/forth if needed (optional but good)
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1200) {
            if (!navLinks.contains(langSelector)) navLinks.appendChild(langSelector);
        } else {
            const nav = document.querySelector('nav');
            if (nav && !nav.contains(langSelector)) nav.appendChild(langSelector);
        }
    });

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            // langSelector is now inside navLinks, so it animates with it
            // checking if we need specific active class on selector, maybe not if it's inside
            if (langSelector) langSelector.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
    }

    // Close menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            if (langSelector) langSelector.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });
});
