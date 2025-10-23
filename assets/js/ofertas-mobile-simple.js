/**
 * Carrusel Móvil Simplificado
 * Versión minimalista sin transiciones complejas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del carrusel
    const items = document.querySelectorAll('.oferta-item-mobile');
    const dots = document.querySelectorAll('.carousel-dot-mobile');
    const prevBtn = document.querySelector('.prev-mobile');
    const nextBtn = document.querySelector('.next-mobile');
    
    // Si no hay elementos, salir
    if (items.length === 0) return;
    
    // Variables de estado
    let currentIndex = 0;
    let slideCount = items.length;
    
    // Ocultar todos los slides excepto el primero
    function initCarousel() {
        items.forEach((item, index) => {
            if (index === 0) {
                item.style.display = 'flex';
                item.classList.add('active');
            } else {
                item.style.display = 'none';
                item.classList.remove('active');
            }
        });
        updateDots();
    }
    
    // Actualizar los puntos de navegación
    function updateDots() {
        dots.forEach((dot, index) => {
            if (dot) {
                dot.classList.toggle('active', index === currentIndex);
            }
        });
    }
    
    // Función para cambiar de slide
    function goToSlide(index) {
        // Validar el índice
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;
        
        // Ocultar el slide actual
        items[currentIndex].style.display = 'none';
        items[currentIndex].classList.remove('active');
        
        // Mostrar el nuevo slide
        items[index].style.display = 'flex';
        items[index].classList.add('active');
        
        // Actualizar el índice actual
        currentIndex = index;
        
        // Actualizar los puntos de navegación
        updateDots();
    }
    
    // Event listeners para los botones
    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    }
    
    // Event listeners para los puntos
    dots.forEach((dot, index) => {
        if (dot) {
            dot.addEventListener('click', () => goToSlide(index));
        }
    });
    
    // Inicializar el carrusel
    initCarousel();
    
    // Auto-avance cada 5 segundos
    setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 10000);
});
