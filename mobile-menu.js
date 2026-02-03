document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const langSelector = document.querySelector('.lang-selector');
    const body = document.body;

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            langSelector.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
    }

    // Close menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            langSelector.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });
});
