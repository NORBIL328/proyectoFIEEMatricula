document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-links li a'); // Cambiado a .nav-links
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-links'); // Selecciona la lista de navegación

    // Función para mostrar/ocultar el botón "Volver arriba" y resaltar el enlace activo
    window.addEventListener('scroll', () => {
        // Mostrar/ocultar el botón "Volver arriba"
        if (window.scrollY > 400) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }

        // Resaltar el enlace de navegación activo
        let currentSectionId = '';
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 1;

            if (scrollY >= sectionTop && scrollY < section.offsetTop + section.clientHeight - headerHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    });

    // Función para desplazamiento suave al hacer clic en el botón "Volver arriba"
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Lógica para el menú hamburguesa
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active'); // Alterna la clase 'active' en el menú
        menuToggle.classList.toggle('active'); // Alterna la clase 'active' en el botón para la animación
    });

    // Desplazamiento suave al hacer clic en los enlaces de navegación (y cerrar menú móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const offsetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Cierra el menú desplegable después de hacer clic en un enlace (solo en móvil)
                if (window.innerWidth <= 900) { // Ajusta este breakpoint según tu CSS
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
});