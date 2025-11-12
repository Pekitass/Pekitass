// Función para inicializar el menú móvil
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const body = document.body;
  
  // Inicializar el acordeón
  initAccordion();
  
  // Función para cerrar el menú y todos los submenús
  const closeMenu = () => {
    if (menuToggle) menuToggle.classList.remove('active');
    if (mobileNav) mobileNav.classList.remove('active');
    body.classList.remove('menu-open');
    body.style.overflow = '';
    
    // Cerrar todos los submenús
    const openItems = document.querySelectorAll('#mobile-nav .open');
    openItems.forEach(item => {
      item.classList.remove('open');
      const submenu = item.querySelector('> .submenu');
      if (submenu) {
        submenu.style.display = 'none';
        submenu.style.maxHeight = '0';
      }
    });
  };
  
  // Manejar clic en el botón de menú
  if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isActive = this.classList.contains('active');
      
      if (isActive) {
        closeMenu();
      } else {
        this.classList.add('active');
        if (mobileNav) mobileNav.classList.add('active');
        body.classList.add('menu-open');
        body.style.overflow = 'hidden';
      }
    });
  }
  
  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', function(e) {
    if (mobileNav && mobileNav.classList.contains('active')) {
      const isClickInsideMenu = mobileNav.contains(e.target);
      const isClickOnToggle = menuToggle && menuToggle.contains(e.target);
      
      if (!isClickInsideMenu && !isClickOnToggle) {
        closeMenu();
      }
    }
  });
  
  // Manejar cambios de tamaño de ventana
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 1024) {
        // Cerrar menú en pantallas grandes
        closeMenu();
        
        // Ocultar elementos del menú móvil en escritorio
        const mobileNav = document.getElementById('mobile-nav');
        const menuToggle = document.querySelector('.menu-toggle');
        if (mobileNav) mobileNav.style.display = 'none';
        if (menuToggle) menuToggle.style.display = 'none';
      } else {
        // Mostrar elementos del menú móvil en móviles
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) menuToggle.style.display = 'flex';
      }
    }, 250);
  });
}

// Función para inicializar el acordeón
function initAccordion() {
  const accordion = document.getElementById('accordion');
  if (!accordion) return;
  
  // Ocultar todos los submenús al inicio
  const allSubmenus = accordion.querySelectorAll('.submenu');
  allSubmenus.forEach(submenu => {
    submenu.style.display = 'none';
    submenu.style.maxHeight = '0';
  });
  
  // Función para cerrar todos los submenús de un elemento
  function closeAllSubmenus(element) {
    const submenus = element.querySelectorAll('.submenu');
    submenus.forEach(submenu => {
      submenu.style.display = 'none';
      submenu.style.maxHeight = '0';
      submenu.closest('li').classList.remove('open');
    });
  }
  
  // Función para manejar el clic en los enlaces del menú
  function handleLinkClick(e) {
    const link = this;
    const parentLi = link.closest('li');
    const submenu = parentLi.querySelector('> .submenu');
    
    // Si no hay submenú, no hacer nada
    if (!submenu) return;
    
    // Prevenir la navegación predeterminada para elementos con submenú
    e.preventDefault();
    e.stopPropagation();
    
    // Si el elemento ya está abierto, cerrarlo
    if (parentLi.classList.contains('open')) {
      // Cerrar submenús anidados primero
      closeAllSubmenus(parentLi);
      
      // Cerrar el submenú actual
      submenu.style.maxHeight = '0';
      setTimeout(() => {
        submenu.style.display = 'none';
      }, 300);
      parentLi.classList.remove('open');
      return;
    }
    
    // Cerrar otros submenús en el mismo nivel
    const parentList = link.closest('ul');
    if (parentList) {
      parentList.querySelectorAll('> li').forEach(sibling => {
        if (sibling !== parentLi) {
          const otherSubmenu = sibling.querySelector('> .submenu');
          if (otherSubmenu) {
            // Cerrar submenús anidados
            closeAllSubmenus(sibling);
            
            // Cerrar el submenú del hermano
            otherSubmenu.style.maxHeight = '0';
            setTimeout(() => {
              otherSubmenu.style.display = 'none';
            }, 300);
            sibling.classList.remove('open');
          }
        }
      });
    }
    
    // Abrir el submenú actual con animación
    submenu.style.display = 'block';
    // Forzar un reflow para que la animación funcione
    void submenu.offsetHeight;
    submenu.style.maxHeight = submenu.scrollHeight + 'px';
    parentLi.classList.add('open');
  }
  
  // Agregar manejadores de eventos a los enlaces del menú
  const links = accordion.querySelectorAll('.link');
  links.forEach(link => {
    link.addEventListener('click', handleLinkClick);
    
    // Asegurarse de que los enlaces con submenús no naveguen
    if (link.closest('li').querySelector('> .submenu')) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
      });
    }
  });
  
  // Manejar clics en enlaces que no tienen submenú
  const menuItems = accordion.querySelectorAll('a[href^="/"], a[href^="http"], a[href^="#"]');
  menuItems.forEach(item => {
    if (!item.closest('li').querySelector('> .submenu')) {
      item.addEventListener('click', function() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        
        if (menuToggle) menuToggle.classList.remove('active');
        if (mobileNav) mobileNav.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
      });
    }
  });
  
  // Manejar clics en los enlaces de los submenús
  const submenuLinks = accordion.querySelectorAll('.submenu a');
  submenuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Si es un enlace externo, abrirlo en una nueva pestaña
      if (this.hostname !== window.location.hostname) {
        e.preventDefault();
        window.open(this.href, '_blank');
      }
      // Cerrar el menú después de hacer clic en un enlace
      const menuToggle = document.querySelector('.menu-toggle');
      const mobileNav = document.getElementById('mobile-nav');
      
      if (menuToggle) menuToggle.classList.remove('active');
      if (mobileNav) mobileNav.classList.remove('active');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    });
  });
}

// Inicializar el menú móvil cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar el menú móvil
  initMobileMenu();
  
  // Asegurarse de que el menú móvil esté oculto al cargar en pantallas grandes
  if (window.innerWidth > 1024) {
    const mobileNav = document.getElementById('mobile-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    if (mobileNav) mobileNav.style.display = 'none';
    if (menuToggle) menuToggle.style.display = 'none';
  } else {
    // Mostrar el botón de menú en dispositivos móviles
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) menuToggle.style.display = 'flex';
  }
  
  // Manejar cambios de tamaño de ventana
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
      // Ocultar menú móvil en pantallas grandes
      const mobileNav = document.getElementById('mobile-nav');
      const menuToggle = document.querySelector('.menu-toggle');
      if (mobileNav) mobileNav.style.display = 'none';
      if (menuToggle) menuToggle.style.display = 'none';
    } else {
      // Mostrar botón de menú en dispositivos móviles
      const menuToggle = document.querySelector('.menu-toggle');
      if (menuToggle) menuToggle.style.display = 'flex';
    }
  });
});
