// Función para manejar el desplazamiento suave
document.addEventListener('DOMContentLoaded', function() {
  // Manejar envío de formulario
  const form = document.querySelector('.contact-form');
  if(form) {
    form.addEventListener('submit', function(e) {
      //e.preventDefault();
      alert('¡Gracias por contactarnos! Pronto te responderemos.');
      //form.reset();
    });
  }

  // Función para manejar el desplazamiento a cualquier sección
  function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (!section) return;
    
    // Cerrar el menú móvil si está abierto
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    if (menuToggle && navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    
    // Calcular la posición de desplazamiento
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const scrollPosition = section.offsetTop - headerHeight;
    
    // Hacer scroll a la posición calculada
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }

  // Manejar clics en enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Ignorar enlaces vacíos o que no son a secciones
      if (targetId === '#' || !targetId.startsWith('#')) return;
      
      e.preventDefault();
      
      // Si es un enlace a la sección de ofertas y estamos en una subpágina
      if ((targetId === '#ofertas' || targetId.endsWith('#ofertas')) && 
          !window.location.pathname.endsWith('index.html') && 
          window.location.pathname !== '/') {
        window.location.href = 'index.html#ofertas';
        return;
      }
      
      // Para cualquier otra sección
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        scrollToSection(targetId);
      }
    });
  });
  
  // Manejar el hash en la URL al cargar la página
  if (window.location.hash === '#ofertas') {
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
      // Pequeño retraso para asegurar que el DOM esté completamente cargado
      setTimeout(() => {
        scrollToSection('#ofertas');
        // Asegurarse de que el título sea visible
        const ofertasSection = document.querySelector('#ofertas');
        const ofertasTitle = document.querySelector('.ofertas-title');
        if (ofertasSection && ofertasTitle) {
          const headerHeight = document.querySelector('header')?.offsetHeight || 0;
          const titlePosition = ofertasTitle.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
          window.scrollTo({
            top: titlePosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // Redirigir al index si estamos en una subpágina
      window.location.href = 'index.html#ofertas';
    }
  }
});
// Menú hamburguesa funcional para móviles (idéntico a index.html)
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  if(menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('open');
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !expanded);
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
    function closeMenuOnOutsideOrScroll(e) {
      if (window.innerWidth <= 768) {
        if (navMenu.classList.contains('open')) {
          if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    }
    // Variable para manejar el debounce del scroll
    let scrollTimer;
    
    // Función para manejar el cierre de los menús desplegables en escritorio
    function closeDesktopMenus() {
      const desktopDropdowns = document.querySelectorAll('header nav .dropdown');
      desktopDropdowns.forEach(dropdown => {
        if (dropdown.classList.contains('open')) {
          dropdown.classList.add('closing');
          dropdown.classList.remove('open');
          
          // Eliminar la clase de cierre después de la animación
          setTimeout(() => {
            dropdown.classList.remove('closing');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
              menu.style.display = 'none';
            }
          }, 300);
        }
      });
    }
    
    // Función para manejar el scroll
    function handleScroll() {
      // Solo para escritorio
      if (window.innerWidth > 768) {
        // Limpiar el temporizador anterior
        clearTimeout(scrollTimer);
        
        // Establecer un nuevo temporizador
        scrollTimer = setTimeout(closeDesktopMenus, 100);
      }
    }
    
    // Función principal de cierre en scroll
    function closeMenuOnScroll() {
      // Cerrar menú móvil si está abierto
      if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
      
      // Para escritorio, manejamos el cierre en handleScroll
      handleScroll();
    }
    document.addEventListener('click', closeMenuOnOutsideOrScroll);
    window.addEventListener('scroll', closeMenuOnScroll);
  }
});
